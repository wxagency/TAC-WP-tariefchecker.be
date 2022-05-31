<?php if (is_home() && sway_get_option( 'tek-blog-header-template' ) == 'blog-header-revslider') {
    if ( '' != sway_get_option( 'tek-blog-header-slider-alias' ) ) : ?>
     <div id="kd-blog-slider">
        <?php echo do_shortcode('[rev_slider alias="'. esc_attr( sway_get_option( 'tek-blog-header-slider-alias') ). '"]' ); ?>
     </div>
   <?php endif; ?>
<?php } else {
    get_template_part( 'core/templates/header/content', 'title-bar' );
  }
?>
