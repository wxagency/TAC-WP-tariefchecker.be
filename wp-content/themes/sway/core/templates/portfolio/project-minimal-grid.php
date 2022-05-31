<?php
/**
 * Template part for displaying portfolio item boxes
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package sway
 * by KeyDesign
 */

?>

<?php
	$without_image_class = '';

	if ( !has_post_thumbnail() ) {
		$without_image_class .= 'without-image';
	}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> >
	<?php if ( has_post_thumbnail() ) : ?>
		<div class="entry-image">
			<a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail('keydesign-grid-image'); ?></a>
		</div>
	<?php endif; ?>
	<div class="entry-categories">
		<ul class="post-categories">
			<?php
				$terms = get_the_terms($post->ID, 'portfolio-category' );
				foreach ( $terms as $term ) {
        	$term_link = get_term_link( $term, 'portfolio-category' );
          if ( is_wp_error( $term_link ) ) {
            continue;
					} else {
						echo '<li><a href="' . $term_link . '" rel="category tag">' . $term->name . '</a></li>';
					}
        }
			?>
		</ul>
	</div>
	<div class="entry-wrapper <?php echo esc_attr( $without_image_class ); ?>">
		<h5 class="blog-single-title"><a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h5>
		<div class="entry-content">
			<a class="tt_button tt_primary_button btn_primary_color hover_solid_secondary post_button" href="<?php esc_url(the_permalink()); ?>"><span class="prim_text"><?php echo apply_filters( 'portfolio_related_grid_text', esc_html__("View project", "sway") ); ?></span><span class="fa fa-chevron-right iconita"></span></a>
		</div>
	</div>
</article>
