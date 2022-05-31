<?php
// ------------------------------------------------------------------------
// Register widgetized areas
// ------------------------------------------------------------------------

  if( ! function_exists( 'sway_sidebars_register' ) ) {
    function sway_sidebars_register() {
  		register_sidebar(
        array(
          'name' => esc_html__( 'Blog Sidebar', 'sway' ),
          'id' => 'blog-sidebar',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the blog sidebar area. If none added, default sidebar widgets will be used.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="blog_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      register_sidebar(
        array(
          'name' => esc_html__( 'Shop Sidebar', 'sway' ),
          'id' => 'shop-sidebar',
          'class' => '',
          'description' => esc_html__( 'A sidebar that only appears on WooCommerce Shop pages.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="blog_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      if ( class_exists( 'bbPress' ) ) {
        register_sidebar(
          array(
            'name' => esc_html__( 'bbPress Sidebar', 'sway' ),
            'id' => 'bbpress-sidebar',
            'class' => '',
            'description' => esc_html__( 'A sidebar that only appears on bbPress pages.', 'sway' ),
            'before_widget' => '<div id="%1$s" class="blog_widget widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h5 class="widget-title"><span>',
            'after_title' => '</span></h5>',
          )
        );
      }

      register_sidebar(
        array(
          'name' => esc_html__( 'Page Sidebar', 'sway' ),
          'id' => 'page-sidebar',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the single page sidebar area.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="blog_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      register_sidebar(
        array(
          'name' => esc_html__( 'Footer first widget area', 'sway' ),
          'id' => 'footer-first-widget-area',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the first footer widget area.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="footer_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      register_sidebar(
        array(
          'name' => esc_html__( 'Footer second widget area', 'sway' ),
          'id' => 'footer-second-widget-area',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the second footer widget area.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="footer_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      register_sidebar(
        array(
          'name' => esc_html__( 'Footer third widget area', 'sway' ),
          'id' => 'footer-third-widget-area',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the third footer widget area.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="footer_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      register_sidebar(
        array(
          'name' => esc_html__( 'Footer fourth widget area', 'sway' ),
          'id' => 'footer-fourth-widget-area',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the fourth footer widget area.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="footer_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      register_sidebar(
        array(
          'name' => esc_html__( 'Footer fifth widget area', 'sway' ),
          'id' => 'footer-fifth-widget-area',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the fifth footer widget area.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="footer_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );

      register_sidebar(
        array(
          'name' => esc_html__( 'Footer sixth widget area', 'sway' ),
          'id' => 'footer-sixth-widget-area',
          'class' => '',
          'description' => esc_html__( 'Add widgets for the sixth footer widget area.', 'sway' ),
          'before_widget' => '<div id="%1$s" class="footer_widget widget %2$s">',
          'after_widget' => '</div>',
          'before_title' => '<h5 class="widget-title"><span>',
          'after_title' => '</span></h5>',
        )
      );
    }
  }

  add_action( 'widgets_init', 'sway_sidebars_register' );
