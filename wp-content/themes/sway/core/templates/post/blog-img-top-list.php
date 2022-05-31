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

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> >
	<?php get_template_part( 'core/templates/post/post-type/content', get_post_format() ); ?>
	<?php get_template_part( 'core/templates/post/partials/content', 'meta' ); ?>
	<?php if ('quote' === get_post_format()) : ?>
	  <h2 class="blog-single-title quote"><?php the_title(); ?></h2>
	<?php else : ?>
	  <h2 class="blog-single-title"><a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
	<?php endif; ?>
	<div class="entry-content">
		<div class="page-content">
			<?php the_excerpt(); ?>
		</div>
		<?php wp_link_pages(); ?>
		<a class="tt_button tt_primary_button btn_primary_color hover_solid_secondary post_button" href="<?php esc_url(the_permalink()); ?>"><span class="prim_text"><?php echo apply_filters( 'blog-readmore-text', esc_html__("Read more", "sway") ); ?></span><span class="fa fa-chevron-right iconita"></span></a>
	</div>
</article>
