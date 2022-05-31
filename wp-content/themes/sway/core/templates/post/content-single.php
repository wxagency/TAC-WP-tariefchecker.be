<?php
/**
 * The Template for displaying all single posts.
 * @package sway
 * by KeyDesign
 */
?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="blog-single-content">
		<div class="blog-content">
			<?php the_content(); ?>
			<?php wp_link_pages(); ?>
		</div>
		<div class="meta-content">
			<?php do_action( 'sway_post_after_main_content' ); ?>
		</div>
		<?php get_template_part( 'core/templates/post/partials/content', 'comments' ); ?>
	</div>
</div>
