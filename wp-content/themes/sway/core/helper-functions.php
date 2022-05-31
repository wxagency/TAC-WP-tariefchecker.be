<?php
/**
 * Helper functions for Sway Theme.
 *
 * @package Sway
 * @since 1.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Fire the wp_body_open action. Backward compatibility for WordPress versions < 5.2
 */
	if ( ! function_exists( 'wp_body_open' ) ) {
		function wp_body_open() {
			do_action( 'wp_body_open' );
	 }
	}

/**
 * Return Theme options.
 */
	 if ( ! function_exists( 'sway_get_option' ) ) {
	 	function sway_get_option( $option, $default = '' ) {
	 		global $redux_ThemeTek;

	 		if ( empty( $redux_ThemeTek ) ) {
	 			if ( is_multisite() ) {
	 				$redux_ThemeTek = get_blog_option( get_current_blog_id(), 'redux_ThemeTek' );
	 			} else {
	 				$redux_ThemeTek = get_option( 'redux_ThemeTek' );
	 			}
	 		}

	 		if ( ( isset( $redux_ThemeTek[$option] ) && $redux_ThemeTek[$option] === '0') || !empty( $redux_ThemeTek[$option] ) ) {
	 			return $redux_ThemeTek[$option];
	 		} else {
	 			return $default;
	 		}

	 	}
	 }

/**
 * Compress CSS
 */
	if ( ! function_exists( 'sway_compress_css' ) ) {
		function sway_compress_css( $css = '' ) {
				if ( ! empty( $css ) ) {
					$css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
					$css = str_replace( array( "\r\n", "\r", "\n", "\t", '  ', '    ', '    ' ), '', $css );
					$css = str_replace( ', ', ',', $css );
				}
				return $css;
		}
	}

/**
 * Theme activation option
 */
	if ( ! function_exists( 'sway_activation_option' ) ) {
		function sway_activation_option() {
			add_option( 'keydesign-verify', 'no', '', false );
			add_option( 'envato_purchase_code_sway', '', '', false );
		}
	}
	add_action( 'admin_init', 'sway_activation_option' );

/**
 * Display search form
 */

	if ( ! function_exists( 'sway_get_search_form' ) ) {
		function sway_get_search_form( $echo = true ) {
			$form = '<form role="search" method="get" class="search-form" action="' . esc_url( home_url( '/' ) ) . '">
			<label>
				<span class="screen-reader-text">' . _x( 'Search for:', 'label', 'sway' ) . '</span>
				<input type="search" class="search-field" placeholder="' . apply_filters( 'sway_search_field_placeholder', esc_attr_x( 'Search &hellip;', 'placeholder', 'sway' ) ) . '" value="' . get_search_query() . '" name="s" />';
				if ( 'search-all' != sway_get_option( 'tek-search-form-content' ) && '' != sway_get_option( 'tek-search-form-content' ) ) {
					$form .= '<input type="hidden" name="post_type" value="' . sway_get_option( 'tek-search-form-content' ) . '">';
				}
			$form .= '</label>
			<input type="submit" class="search-submit">
		</form>';

		$result_escaped = apply_filters( 'sway_get_search_form', $form );

		if ( null === $result_escaped ) {
			$result_escaped = $form;
		}

		// The $result_escaped variable has been safely escaped

		if ( $echo ) {
			echo "" . $result_escaped;
		} else {
			return $result_escaped;
		}

		}
	}

/**
 * Allowed HTML tags
 */
	if ( ! function_exists( 'sway_allowed_html_tags' ) ) {
		function sway_allowed_html_tags() {
			$allowed_tags = array(
				 'a' => array(
					 'class' => array(),
					 'href'  => array(),
					 'rel'   => array(),
					 'title' => array(),
					 'target' => array(),
				 ),
				 'b' => array(),
				 'br' => array(),
				 'div' => array(
					 'class' => array(),
					 'title' => array(),
					 'style' => array(),
				 ),
				 'em' => array(),
				 'h1' => array(),
				 'h2' => array(),
				 'h3' => array(),
				 'h4' => array(),
				 'h5' => array(),
				 'h6' => array(),
				 'i' => array(),
				 'img' => array(
					 'alt'    => array(),
					 'class'  => array(),
					 'height' => array(),
					 'src'    => array(),
					 'width'  => array(),
				 ),
				 'p' => array(
					 'class' => array(),
				 ),
				 'span' => array(
					 'class' => array(),
					 'title' => array(),
					 'style' => array(),
				 ),
				 'strong' => array(),
			 );

			 return $allowed_tags;
		 }
	 }

 /**
	* Remove parantheses with Blog Categories widget
	*/
	if ( ! function_exists( 'sway_postcount_filter' ) ) {
	 function sway_postcount_filter($variable) {
		 $variable = str_replace('(', '<span class="post_count"> ', $variable);
		 $variable = str_replace(')', ' </span>', $variable);
		 return $variable;
	 }
	}
	add_filter('wp_list_categories','sway_postcount_filter');

 /**
	* Output social icons in topbar and footer areas
	*/
	if ( ! function_exists( 'sway_social_icons' ) ) {
	 function sway_social_icons( $echo = true ) {
		 $social_items = sway_get_option( 'tek-social-profiles' );
		 $output = $output_escaped = '';
		 if ( class_exists( 'ReduxFramework' ) ) {
			 $output = '<ul class="redux-social-media-list clearfix">';
			 if ( is_array( $social_items ) ) {
				 foreach ( $social_items as $key => $social_item ) {
					 if ( $social_item[ 'enabled' ] ) {
						 $icon = $social_item[ 'icon' ];
						 $base_url = $social_item[ 'url' ];

						 $output .= '<li>';
						 $output .= '<a target="_blank" href="'. $base_url . '">';
						 $output .= '<i class="fab ' . $icon . '"></i>';
						 $output .= "</a>";
						 $output .= "</li>";
					 }
				 }
			 }
			 $output .= '</ul>';
			 $output_escaped = $output;
		 }

		 // The $output_escaped variable has been safely escaped
		 if ( $echo ) {
			 echo "" . $output_escaped;
		 } else {
			 return $output_escaped;
		 }
	 }
	}

	if ( ! function_exists( 'sway_main_header_content' ) ) {
		function sway_main_header_content() {
 			get_template_part( 'core/templates/header/content', 'header' );
		}
	}
	add_action( 'sway_main_header', 'sway_main_header_content' );


	if ( ! function_exists( 'sway_wrapper_classes' ) ) {
	 function sway_wrapper_classes() {
		 $classes[] = '';
		 $page_showhide_title_section = get_post_meta( get_the_ID(), 'keydesign_page_showhide_title_section', true );
	   if ( $page_showhide_title_section && ! is_search() ) {
	     $classes[] = 'hide-title-section';
	   }

		 if ( sway_get_option( 'tek-disable-animations' ) == true ) {
	     $classes[] = 'no-mobile-animation';
	   }

		 if ( '' != sway_get_option( 'tek-btn-effect' ) ) {
	     $classes[] = sway_get_option( 'tek-btn-effect' );
	   }

		 if ( sway_get_option( 'tek-single-post-template' ) && is_singular('post')) {
			 $classes[] =  sway_get_option( 'tek-single-post-template' );
		 }

		 return $classes;
	 }
	}
	add_filter( 'sway_wrapper_class', 'sway_wrapper_classes' );

	if ( ! function_exists( 'sway_navbar_classes' ) ) {
	 function sway_navbar_classes() {

	   $classes[] = 'navbar';
	   $classes[] = 'navbar-default';
	   $classes[] = 'navbar-fixed-top';

		 if ( '' != sway_get_option( 'tek-btn-effect' ) ) {
	     $classes[] = sway_get_option( 'tek-btn-effect' );
	   }

		 if ( sway_get_option( 'tek-menu-style' ) == '2') {
	     $classes[] = 'full-width';
	   }

		 if ( sway_get_option( 'tek-menu-behaviour' ) == '2') {
	     $classes[] = 'fixed-menu';
	   }

		 if ( '' != sway_get_option( 'tek-logo-alignment' ) ) {
			 $classes[] = sway_get_option( 'tek-logo-alignment' );
		 }

		 if ( sway_get_option( 'tek-topbar' ) == '1') {
	     $classes[] = 'with-topbar';
	   }

		 if ( sway_get_option( 'tek-topbar' ) == '1' && sway_get_option( 'tek-topbar-mobile' ) == '1') {
	     $classes[] = 'with-topbar-mobile';
	   }

		 if ( sway_get_option( 'tek-topbar-sticky' ) == '1') {
	     $classes[] = 'with-topbar-sticky';
	   }

		 if ( sway_get_option( 'tek-sticky-nav-logo' ) == 'nav-secondary-logo') {
	     $classes[] = 'nav-secondary-logo';
	   }

		 if ( sway_get_option( 'tek-transparent-nav-logo' ) == 'nav-secondary-logo' ) {
	     $classes[] = 'nav-transparent-secondary-logo';
	   }

		 return $classes;
	 }
	}
	add_filter( 'sway_navbar_class', 'sway_navbar_classes' );

	if ( ! function_exists( 'sway_main_menu_classes' ) ) {
	function sway_main_menu_classes() {

		$classes[] = 'collapse';
		$classes[] = 'navbar-collapse';

		if ( '' != sway_get_option( 'tek-dropdown-nav-hover' ) ) {
	    $classes[] = sway_get_option( 'tek-dropdown-nav-hover' );
	  } else {
	    $classes[] = 'default-dropdown-effect';
	  }

		return $classes;
	}
	}
	add_filter( 'sway_main_menu_class', 'sway_main_menu_classes' );

	if ( ! function_exists( 'sway_page_header_content' ) ) {
		function sway_page_header_content() {
			get_template_part( 'core/templates/header/content', 'page-header' );
		}
	}
	add_action( 'sway_page_header', 'sway_page_header_content' );

	if ( ! function_exists( 'sway_wishlist_header_icon' ) ) {
		function sway_wishlist_header_icon() {
			if ( ! class_exists( 'YITH_WCWL' ) || ! class_exists( 'WooCommerce' ) || sway_get_option( 'tek-woo-display-wishlist-icon' ) == false ) {
				return;
			}

			$wrapper_class = '';
			$wishlist_url = YITH_WCWL()->get_wishlist_url();
			$wishlist_count = yith_wcwl_count_products();
			$count = ( $wishlist_count > 0 ) ? $wishlist_count : '';
			?>
			<div class="header-wishlist">
				<a href="<?php echo esc_url( $wishlist_url ); ?>">
					<i class="sway-heart"></i>
					<span class="badge"><?php echo esc_html( $count ); ?></span>
				</a>
			</div>
		<?php
		}
	}
	add_action( 'sway_header_desktop_icons', 'sway_wishlist_header_icon', 5 );
	add_action( 'sway_header_wishlist', 'sway_wishlist_header_icon' );

	if ( ! function_exists( 'sway_cart_header_icon' ) ) {
		function sway_cart_header_icon() {
			if ( ! class_exists( 'WooCommerce' ) || sway_get_option( 'tek-woo-display-cart-icon' ) == false ) {
				return;
			}

			$keydesign_minicart = '';
			$keydesign_minicart = sway_add_cart_in_menu();
			echo do_shortcode( shortcode_unautop( $keydesign_minicart ) );
		}
	}
	add_action( 'sway_header_desktop_icons', 'sway_cart_header_icon', 10 );

	if ( ! function_exists( 'sway_search_header_icon' ) ) {
		function sway_search_header_icon() {
			if ( sway_get_option( 'tek-topbar-search' ) == false ) {
				return;
			}
			?>
			<div class="topbar-search">
				 <span class="toggle-search sway-search-header fa"></span>
				 <div class="topbar-search-container">
					 <?php sway_get_search_form(); ?>
				 </div>
			</div>
			<?php
		}
	}
	add_action( 'sway_header_desktop_icons', 'sway_search_header_icon', 10 );

	if ( ! function_exists( 'sway_collapsible_faq' ) ) {
		function sway_collapsible_faq( $classes ) {
			$classes[] = '';
			if ( sway_get_option( 'tek-faq-collapsible' ) == true) {
		  	$classes[] = 'collapsible-faq';
			}
	   	return $classes;
		}
	}
	add_filter( 'body_class','sway_collapsible_faq' );
