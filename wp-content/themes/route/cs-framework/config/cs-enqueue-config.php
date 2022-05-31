<?php
/**
 *
 * Theme Enqueue Scripts
 * @since 1.0.0
 * @version 1.1.0
 *
 */
function cs_wp_enqueue_scripts() {

  if  ( isset( $_SERVER['HTTP_USER_AGENT'] ) && ( false !== strpos( $_SERVER['HTTP_USER_AGENT'], 'MSIE' ) ) && ( false === strpos( $_SERVER['HTTP_USER_AGENT'], 'MSIE 9' ) ) ) {
    wp_enqueue_script( 'html5shiv',   THEME_URI . '/js/iefix/html5shiv.min.js', array(), null, false );
    wp_enqueue_script( 'selectivizr', THEME_URI . '/js/iefix/selectivizr.js',   array(), null, false );
  }

  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ){
    wp_enqueue_script( 'comment-reply' );
  }


  wp_register_script( 'cs-royalslider',     THEME_URI . '/js/vendor/jquery.royalslider.min.js',   array( 'jquery' ), '9.5.1', true );
  wp_register_script( 'cs-caroufredsel',    THEME_URI . '/js/vendor/jquery.caroufredsel.min.js',  array( 'jquery' ), '6.2.1', true );
  wp_register_script( 'cs-countdown',       THEME_URI . '/js/vendor/jquery.countdown.min.js',     array( 'jquery' ), '2.0.0', true );
  wp_register_script( 'cs-queryloader2',    THEME_URI . '/js/vendor/jquery.queryloader2.min.js',  array( 'jquery' ), null, true );

  wp_enqueue_script( 'modernizr',           THEME_URI . '/js/modernizr.min.js',                   array(), null, false );
  wp_enqueue_script( 'cs-jquery-plugins',   THEME_URI . '/js/jquery.plugins.min.js',              array( 'jquery' ), null, true );
  wp_enqueue_script( 'cs-jquery-register',  THEME_URI . '/js/jquery.register.js',                 array( 'jquery' ), null, true );

  wp_localize_script('cs-jquery-register', 'cs_ajax', array(
    'ajaxurl'         => admin_url( 'admin-ajax.php' ),
    'siteurl'         => THEME_URI,
    'loved'           => __( 'Already loved!', 'route' ),
    'error'           => __( 'Error!', 'route' ),
    'nonce'           => wp_create_nonce( 'love-it-nonce' ),
    'viewport'        => cs_get_option( 'menu_max_width' ),
    'sticky'          => cs_get_option( 'header_sticky' ),
    'header'          => cs_get_option( 'header_height_sticky' ),
    'accent'          => ( cs_get_option( 'skin' ) != 'default' ) ? cs_get_option( 'accent_color' ) : '#428bca',
    'non_responsive'  => cs_get_option( 'non_responsive' ),
    'no_smoothscroll' => ( cs_get_option( 'smoothscroll' ) ) ? '1' : '0',
  ));

  if( is_front_page() && cs_get_option( 'home_loader' ) ) {
    wp_enqueue_script( 'cs-queryloader2' );
  }

}
add_action( 'wp_enqueue_scripts', 'cs_wp_enqueue_scripts' );


/**
 *
 * Theme Enqueue Styles
 * @since 1.0.0
 * @version 1.2.0
 *
 */
function cs_wp_enqueue_styles() {

  cs_enqueue_google_fonts();

  if( cs_get_option('icomoon') ) {
    wp_enqueue_style( 'cs-icomoon',    THEME_URI . '/css/vendor/icomoon.css', array(), null );
  }

  $cs_grid = ( cs_get_option( 'non_responsive' ) ) ? 'non-responsive' : 'grid';

  wp_register_style( 'cs-royalslider',  THEME_URI . '/css/vendor/royalslider.css' );
  wp_enqueue_style( 'cs-royalslider' );

  wp_enqueue_style( 'cs-font-awesome',  THEME_URI . '/css/vendor/font-awesome.css',     array(), null );
  wp_enqueue_style( 'cs-fancybox',      THEME_URI . '/css/vendor/fancybox.css',         array(), null );
  wp_enqueue_style( 'cs-animations',    THEME_URI . '/css/vendor/animations.css',       array(), null );
  wp_enqueue_style( 'cs-shortcodes',    THEME_URI . '/css/vendor/shortcodes.css',       array(), null );
  wp_enqueue_style( 'cs-grid',          THEME_URI . '/css/vendor/'. $cs_grid .'.css',   array(), null );
  wp_enqueue_style( 'cs-style',         THEME_URI . '/css/style.css',                   array(), null );
  wp_enqueue_style( 'cs-gutenberg',     THEME_URI . '/css/vendor/gutenberg.css',        array(), null );

  if ( is_rtl() ) {
    wp_enqueue_style( 'cs-rtl',         THEME_URI . '/css/vendor/rtl.css',              array(), null );
  }

  if( cs_get_option( 'cache_css' ) && is_writable( THEME_CACHE_DIR ) && empty( $_POST['wp_customize'] ) ) {

    $already_cached = get_option( CACHED_OPTION_NAME );
    if( ! $already_cached ) {
      cs_cache_css_file();
    }

    global $blog_id;
    $is_multisite_active = ( is_multisite() ) ? '-'. $blog_id : '';
    wp_enqueue_style( 'cs-custom', THEME_URI .'/cache/custom-style'. $is_multisite_active .'.css', array(), null );

  } else {
    add_action( 'wp_head', 'cs_custom_css', 99 );
  }

  if ( is_child_theme() ){
    wp_enqueue_style( 'route', get_stylesheet_uri() );
  }

}
add_action( 'wp_enqueue_scripts', 'cs_wp_enqueue_styles' );


/**
 *
 * Enqueue Inline Styles
 * @since 1.0.0
 * @version 1.0.1
 *
 */
if ( ! function_exists( 'cs_enqueue_inline_styles' ) ) {
  function cs_enqueue_inline_styles() {

    global $cs_inline_styles;

    if ( ! empty( $cs_inline_styles ) ) {
      echo '<style type="text/css">'. cs_css_compress( join( '', $cs_inline_styles ) ) .'</style>';
      $cs_inline_styles = array();
    }

  }
  add_action( 'wp_footer', 'cs_enqueue_inline_styles' );
}


/**
 *
 * If cache folder is not writable
 * @since 1.0.0
 * @version 1.0.0
 *
 */
if( ! function_exists( 'cs_custom_css' ) ) {
  function cs_custom_css() {

    echo '<style type="text/css">';
    $output  = cs_get_custom_style();
    $output .= cs_get_custom_skin();
    $output .= cs_get_woocoomerce_style();
    $output .= cs_get_option( 'custom_css' );
    echo cs_css_compress( $output );
    do_action( 'cs_add_custom_css' );
    echo '</style>'."\n";

  }
}

/**
 *
 * If cache folder is writable create skin.css
 * @since 1.0.0
 * @version 1.0.0
 *
 */
if( ! function_exists( 'cs_cache_css_file' ) ) {
  function cs_cache_css_file() {

    if( is_multisite() ) {
      global $blog_id;
      $output_file = THEME_CACHE_DIR . '/custom-style-'. $blog_id .'.css';
    } else {
      $output_file = THEME_CACHE_DIR . '/custom-style.css';
    }

    $banner  = "/**\n";
    $banner .= " * Do not touch this file! This file created by PHP\n";
    $banner .= " * Last modifiyed time: ". date( 'M d Y, h:s:i' ) ."\n";
    $banner .= " */\n";

    $output  = cs_get_custom_style();
    $output .= "\n\n";
    $output .= cs_get_custom_skin();
    $output .= cs_get_woocoomerce_style();
    $output .= cs_get_option( 'custom_css' );
    $output  = $banner . cs_css_compress( $output );

    require_once( ABSPATH . 'wp-admin/includes/file.php' );
    WP_Filesystem();
    global $wp_filesystem;

    if ( ! $wp_filesystem->put_contents( $output_file, $output, FS_CHMOD_FILE ) ) {
      update_option( CACHED_OPTION_NAME, false );
    } else {
      update_option( CACHED_OPTION_NAME, true );
    }

  }
}