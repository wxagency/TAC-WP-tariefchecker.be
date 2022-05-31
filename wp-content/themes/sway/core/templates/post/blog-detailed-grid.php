<?php
/**
 * Template part for displaying standard posts
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

	$global_post_meta = sway_get_option( 'tek-post-meta' );
	$post_meta_categories = sway_get_option( 'tek-post-meta-categories' );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> >
	<?php if (has_post_thumbnail()) : ?>
		<div class="entry-image">
			<a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail('keydesign-grid-image'); ?></a>
		</div>
	<?php endif; ?>
	<?php if ( $global_post_meta == true && $post_meta_categories == true ) : ?>
		<div class="entry-categories">
			<?php the_category(); ?>
		</div>
	<?php endif; ?>
	<div class="entry-wrapper <?php echo esc_attr($without_image_class); ?>">
		<h4 class="blog-single-title"><a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h4>
		<?php get_template_part( 'core/templates/post/partials/content', 'meta' ); ?>
		<div class="entry-content">
			<?php the_excerpt(); ?>
			<?php wp_link_pages(); ?>
		</div>
		<a class="tt_button tt_secondary_button btn_primary_color hover_solid_secondary post_button" href="<?php esc_url(the_permalink()); ?>"><span class="prim_text"><?php echo apply_filters( 'blog-readmore-text', esc_html__("Read more", "sway") ); ?></span><span class="fa fa-chevron-right iconita"></span></a>
	</div>
</article>
