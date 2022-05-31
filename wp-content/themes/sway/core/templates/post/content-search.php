<?php
/**
 * Template part for displaying posts with excerpts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package sway
 * by KeyDesign
 */
?>

<?php
	$global_post_meta = sway_get_option( 'tek-post-meta' );

	$post_meta_date = sway_get_option( 'tek-post-meta-date' );
	$post_meta_author = sway_get_option( 'tek-post-meta-author' );
	$post_meta_categories = sway_get_option( 'tek-post-meta-categories' );
	$post_meta_comments = sway_get_option( 'tek-post-meta-comments' );

	if ( ! class_exists( 'ReduxFramework' ) ) {
    $global_post_meta = $post_meta_date = $post_meta_author = $post_meta_categories = $post_meta_comments = true;
  }
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> >
	<?php if ( 'post' === get_post_type() ) : ?>
		<?php if ( $global_post_meta == true ) : ?>
			<div class="entry-meta">
				<span class="page-type"><span class="far fa-file-alt"></span><?php esc_html_e( 'Post', 'sway' ); ?></span>
				<?php if ( $post_meta_date == true ) : ?>
					<span class="published"><span class="far fa-clock"></span><a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php  the_time( get_option('date_format') ); ?></a></span>
				<?php endif; ?>
				<?php if ( $post_meta_author == true ) : ?>
					<span class="author"><span class="far sway-author-meta"></span><?php  the_author_posts_link(); ?></span>
				<?php endif; ?>
				<?php if ( $post_meta_categories == true ) : ?>
					<span class="blog-label"><span class="far sway-categories-meta"></span><?php  the_category(', '); ?></span>
				<?php endif; ?>
				<?php if ( $post_meta_comments == true ) : ?>
					<span class="comment-count"><span class="far sway-comments-meta"></span><?php  comments_popup_link( esc_html__('No comments yet', 'sway'), esc_html__('1 comment', 'sway'), esc_html__('% comments', 'sway') ); ?></span>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	<?php else : ?>
		<div class="entry-meta">
			<?php if ( 'page' === get_post_type() ) : ?>
				<span class="page-type"><span class="far fa-file-alt"></span><?php esc_html_e( 'Page', 'sway' ); ?></span>
			<?php elseif ( 'portfolio' === get_post_type() ) : ?>
				<span class="page-type"><span class="far fa-file-image"></span><?php esc_html_e( 'Portfolio', 'sway' ); ?></span>
			<?php elseif ( 'product' === get_post_type() ) : ?>
				<span class="page-type"><span class="fas sway-shopping-cart-header"></span><?php esc_html_e( 'Product', 'sway' ); ?></span>
			<?php endif; ?>
			<?php if ( $post_meta_date == true ) : ?>
				<span class="published"><span class="far fa-clock"></span><a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php  the_time( get_option('date_format') ); ?></a></span>
			<?php endif; ?>
		</div>
	<?php endif; ?>
		<h2 class="blog-single-title"><a href="<?php esc_url(the_permalink()); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
		<div class="entry-content">
			<?php if ( has_excerpt() ) {
				the_excerpt();
			} ?>
			<a class="tt_button tt_primary_button btn_primary_color hover_solid_secondary post_button" href="<?php esc_url(the_permalink()); ?>"><span class="prim_text"><?php echo apply_filters( 'blog-readmore-text', esc_html__("Read more", "sway") ); ?></span><span class="fa fa-chevron-right iconita"></span></a>
		</div>
</article>
