<?php
/**
 * Theme header
 * @package sway
 * by KeyDesign
 */
 ?>

<!DOCTYPE html>
<html <?php language_attributes( 'html' ); ?>>
   <head>
      <meta charset="<?php echo esc_attr( get_bloginfo( 'charset' ) ); ?>">
      <meta name="viewport" content="width=device-width">
      <link rel="profile" href="http://gmpg.org/xfn/11">
      <link rel="pingback" href="<?php esc_url(bloginfo( 'pingback_url' )); ?>" />
      <?php wp_head(); ?>
   </head>
   <body <?php body_class();?>>
     <?php wp_body_open(); ?>
     <?php do_action( 'sway_main_header' ); ?>

     <div id="wrapper" class="<?php echo esc_attr( implode( ' ', (array) apply_filters( 'sway_wrapper_class', array() ) ) ); ?>">
       <?php do_action( 'sway_page_header' ); ?>
