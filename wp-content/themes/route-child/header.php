<?php
/**
 *
 * The Header for our theme
 * @since 1.0.0
 * @version 1.0.0
 *
 */
?><!DOCTYPE html>
<!--[if IE 6]><html class="ie ie6 no-js" <?php language_attributes(); ?>><![endif]-->
<!--[if IE 7]><html class="ie ie7 no-js" <?php language_attributes(); ?>><![endif]-->
<!--[if IE 8]><html class="ie ie8 no-js" <?php language_attributes(); ?>><![endif]-->
<!--[if !(IE 7) | !(IE 8) ]><!-->
<html class="no-js" <?php language_attributes(); ?>>
<!--<![endif]-->
  <head>
	  <meta name="google-site-verification" content="8ldiHdKANgJ88lR6Zpfs5tsklorirADTqZ0KCNpZRtE" />
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <?php if( ! cs_get_option( 'non_responsive' ) ) { ?>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <?php } else { ?>
    <meta name="viewport" content="width=1200">
    <?php } ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php if ( is_search() || is_404() ) { echo '<meta name="robots" content="noindex, nofollow" />'; } ?>
    <?php if ( cs_get_option( 'favicon' ) ) { echo '<link rel="shortcut icon" href="'. cs_get_option( 'favicon' ) .'" />'; } ?>
 
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://use.fontawesome.com/2c807575d5.js"></script>
    <?php wp_head(); ?>

  </head>
  <body <?php body_class(); ?>>

<?php if(ICL_LANGUAGE_CODE == 'fr'){ ?>
  <script type="text/javascript">
  $( document ).ready(function() {
    $(".js-wpml-ls-item-toggle").click(function(e){
    e.preventDefault();
    $(".wpml-ls-sub-menu").toggleClass("visibleItem"); 
    });
  });
  
  </script>
  <style type="text/css">
    .visibleItem{
      visibility: visible!important;
    }
  </style>

<?php } ?>   
<!-- This site is converting visitors into subscribers and customers with OptinMonster - https://optinmonster.com :: Campaign Title: WFL - popup - signup - NL --><div id="om-wpaugqy5szc7p3oc9tbt-holder"></div><script>var wpaugqy5szc7p3oc9tbt,wpaugqy5szc7p3oc9tbt_poll=function(){var r=0;return function(n,l){clearInterval(r),r=setInterval(n,l)}}();!function(e,t,n){if(e.getElementById(n)){wpaugqy5szc7p3oc9tbt_poll(function(){if(window['om_loaded']){if(!wpaugqy5szc7p3oc9tbt){wpaugqy5szc7p3oc9tbt=new OptinMonsterApp();return wpaugqy5szc7p3oc9tbt.init({"u":"29001.756505","staging":0,"dev":0,"beta":0});}}},25);return;}var d=false,o=e.createElement(t);o.id=n,o.src="https://a.omappapi.com/app/js/api.min.js",o.async=true,o.onload=o.onreadystatechange=function(){if(!d){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){try{d=om_loaded=true;wpaugqy5szc7p3oc9tbt=new OptinMonsterApp();wpaugqy5szc7p3oc9tbt.init({"u":"29001.756505","staging":0,"dev":0,"beta":0});o.onload=o.onreadystatechange=null;}catch(t){}}}};(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(o)}(document,"script","omapi-script");</script><!-- / OptinMonster -->
    <?php echo cs_header_before(); ?>

    <div id="page" class="hfeed site">

      <?php echo cs_top_bar(); ?>

      <?php get_template_part( 'templates/header', cs_get_option( 'header_style' ) ); ?>

      <?php if( ! cs_get_option( 'non_responsive' ) ) { ?>
        <div id="navigation-mobile">
          <div class="container">

            <?php echo cs_site_mobile_menu(); ?><!-- site-mobile-menu -->

            <?php
            $cs_menu_search = cs_get_option( 'menu_search' );
            if( ! empty( $cs_menu_search ) ) { ?>
            <form id="mobile-search" action="<?php echo home_url( '/' ); ?>" method="get">
              <input type="text" name="s" placeholder="<?php _e( 'Search', 'route' ); ?>" />
              <button type="submit" class="fa fa-search"></button>
            </form>
            <?php } ?>

            <?php echo cs_site_mobile_languages(); ?>

          </div>
        </div><!-- /navigation-mobile -->
      <?php } ?>

      <div id="main">

        <div id="content" class="site-content">