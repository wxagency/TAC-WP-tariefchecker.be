<?php

use \WPML\FP\Relation;
use \WPML\FP\Fns;
use WPML\TaxonomyTermTranslation\Hooks as TermTranslationHooks;

class WPML_Term_Query_Filter {

	/** @var WPML_Term_Translation $term_translation */
	private $term_translation;

	/** @var WPML_Debug_BackTrace $debug_backtrace */
	private $debug_backtrace;

	/** @var wpdb $wpdb */
	private $wpdb;

	/** @var IWPML_Taxonomy_State $taxonomy_state */
	private $taxonomy_state;

	/** @var string $current_language */
	private $current_language;

	/** @var string $default_language */
	private $default_language;

	/** @var bool $lock */
	private $lock;

	/**
	 * WPML_Term_query_Filter constructor.
	 *
	 * @param WPML_Term_Translation $term_translation
	 * @param WPML_Debug_BackTrace  $debug_backtrace
	 * @param wpdb                  $wpdb
	 * @param IWPML_Taxonomy_State  $taxonomy_state
	 */
	public function __construct(
		WPML_Term_Translation $term_translation,
		WPML_Debug_BackTrace $debug_backtrace,
		wpdb $wpdb,
		IWPML_Taxonomy_State $taxonomy_state
	) {
		$this->term_translation = $term_translation;
		$this->debug_backtrace  = $debug_backtrace;
		$this->wpdb             = $wpdb;
		$this->taxonomy_state   = $taxonomy_state;
	}

	/** @param string $current_language */
	/** @param string $default_language */
	public function set_lang( $current_language, $default_language ) {
		$this->current_language = $current_language;
		$this->default_language = $default_language;
	}

	/**
	 * @param array $args
	 * @param array $taxonomies
	 *
	 * @return array
	 */
	public function get_terms_args_filter( $args, $taxonomies ) {
		if ( $this->lock ) {
			return $args;
		}

		if ( TermTranslationHooks::shouldSkip( $args ) ) {
			return $args;
		}

		if ( 0 === count( array_filter( (array) $taxonomies, array( $this->taxonomy_state, 'is_translated_taxonomy' ) ) ) ) {
			return $args;
		}

		$this->lock = true;

		if ( isset( $args['cache_domain'] ) ) {
			$args['cache_domain'] .= '_' . $this->current_language;
		}

		$isOrderByEqualTo = Relation::propEq( 'orderby', Fns::__, $args );

		$params = array( 'include', 'exclude', 'exclude_tree' );
		foreach ( $params as $param ) {
			$adjusted_ids = $this->adjust_taxonomies_terms_ids( $args[ $param ], $isOrderByEqualTo( $param ) );

			if ( ! empty( $adjusted_ids ) ) {
				$args[ $param ] = $adjusted_ids;
			}
		}

		$params = array( 'child_of', 'parent' );
		foreach ( $params as $param ) {
			if ( ! isset( $args[ $param ] ) ) {
				continue;
			}

			$adjusted_ids = $this->adjust_taxonomies_terms_ids( $args[ $param ], $isOrderByEqualTo( $param ) );

			if ( ! empty( $adjusted_ids ) ) {
				$args[ $param ] = array_pop( $adjusted_ids );
			}
		}

		if ( ! empty( $args['slug'] ) ) {
			$args = $this->adjust_taxonomies_terms_slugs( $args, $taxonomies );
		}

		// special case for when term hierarchy is cached in wp_options
		if ( $this->debug_backtrace->is_function_in_call_stack( '_get_term_hierarchy' ) ) {
			$args['_icl_show_all_langs'] = true;
		}

		$this->lock = false;
		return $args;
	}

	/**
	 * @param string|array $terms_ids
	 * @param bool         $orderByTermId
	 *
	 * @return array
	 */
	private function adjust_taxonomies_terms_ids( $terms_ids, $orderByTermId ) {
		$terms_ids = array_filter( array_unique( $this->explode_and_trim( $terms_ids ) ) );

		if ( empty( $terms_ids ) ) {
			return $terms_ids;
		}

		$terms          = $this->get_terms( $terms_ids, $orderByTermId );
		$translated_ids = array();

		foreach ( $terms as $term ) {

			if ( $this->taxonomy_state->is_translated_taxonomy( $term->taxonomy ) ) {
				$translated_id = $this->term_translation->term_id_in( $term->term_id, $this->current_language );
				if ( ! $translated_id && ! is_admin() && $this->taxonomy_state->is_display_as_translated_taxonomy( $term->taxonomy ) ) {
					$translated_id = $this->term_translation->term_id_in( $term->term_id, $this->default_language );
				}
				$translated_ids[] = $translated_id;
			} else {
				$translated_ids[] = $term->term_id;
			}
		}

		return array_filter( $translated_ids );
	}

	/**
	 * @param array $args
	 * @param array $taxonomies
	 *
	 * @return array
	 */
	private function adjust_taxonomies_terms_slugs( $args, array $taxonomies ) {
		$terms_slugs = $args['slug'];
		if ( is_string( $terms_slugs ) ) {
			$terms_slugs = [ $terms_slugs ];
		}

		$duplicateSlugTranslations = [];
		$translated_slugs          = [];
		foreach ( $terms_slugs as $terms_slug ) {
			$term = $this->guess_term( $terms_slug, $taxonomies );

			if ( $term ) {
				$translated_id   = $this->term_translation->term_id_in( $term->term_id, $this->current_language );
				$translated_term = get_term( $translated_id, $term->taxonomy );
				if ( $translated_term instanceof WP_Term ) {
					if ( $terms_slug === $translated_term->slug ) {
						$duplicateSlugTranslations[] = $translated_id;
					}
					$terms_slug = $translated_term->slug;
				}
			}
			$translated_slugs[] = $terms_slug;
		}

		if ( is_admin() && count( $duplicateSlugTranslations ) === 1 ) {
			$args['include'] = $duplicateSlugTranslations;
			$args['slug']    = '';
		} else {
			$args['slug'] = array_filter( $translated_slugs );
		}

		return $args;
	}

	/**
	 * @param array $ids
	 * @param bool  $orderByTermId
	 *
	 * @return stdClass[]
	 */
	private function get_terms( $ids, $orderByTermId ) {
		$safeIds = wpml_prepare_in( $ids, '%d' );
		$sql     = "SELECT taxonomy, term_id FROM {$this->wpdb->term_taxonomy}
				 WHERE term_id IN ({$safeIds})
				 ";
		$sql    .= $orderByTermId ? "ORDER BY FIELD(term_id, {$safeIds})" : '';
		return $this->wpdb->get_results( $sql );
	}

	/**
	 * @param string $slug
	 * @param array  $taxonomies
	 *
	 * @return null|WP_Term
	 */
	private function guess_term( $slug, array $taxonomies ) {
		foreach ( $taxonomies as $taxonomy ) {
			$term = get_term_by( 'slug', $slug, $taxonomy );

			if ( $term ) {
				return $term;
			}
		}

		return null;
	}

	/**
	 * @param string|array $source
	 *
	 * @return array
	 */
	private function explode_and_trim( $source ) {
		if ( ! is_array( $source ) ) {
			$source = array_map( 'trim', explode( ',', $source ) );
		}

		return $source;
	}

}
