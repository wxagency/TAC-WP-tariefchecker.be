<?php
/**
 *
 * Style Parser
 * @since 1.0.0
 * @version 1.0.0
 *
 */

// custom style
// -------------------------------------------------------------
function cs_get_custom_style() {

$cs_get_typography   = cs_get_typography();
$font_family         = cs_get_option( 'font_family' );
$non_responsive      = cs_get_option( 'non_responsive' );
$header_height       = cs_get_option( 'header_height' );
$menu_max_width      = cs_get_option( 'menu_max_width' );
$height_sticky       = cs_get_option( 'header_height_sticky' );
$logo_top            = cs_get_option( 'logo_top' );
$logo_bottom         = cs_get_option( 'logo_bottom' );
$visible_top_bar     = cs_get_option( 'visible_top_bar' );
$mobile_animations   = cs_get_option( 'mobile_animations' );
$extra_header_height = ( ! empty( $header_height ) || $header_height === 0 ) ? $header_height + 40 : 140;

ob_start();

if( ! empty( $font_family ) ) {

  foreach ( $font_family as $font ) {
    echo '@font-face{';

    echo 'font-family: "'. $font['name'] .'";';

    if( empty( $font['css'] ) ) {
      echo 'font-style: normal;';
      echo 'font-weight: normal;';
    } else {
      echo $font['css'];
    }

    echo ( ! empty( $font['ttf']  ) ) ? 'src: url('. $font['ttf'] .');' : '';
    echo ( ! empty( $font['eot']  ) ) ? 'src: url('. $font['eot'] .');' : '';
    echo ( ! empty( $font['svg']  ) ) ? 'src: url('. $font['svg'] .');' : '';
    echo ( ! empty( $font['woff'] ) ) ? 'src: url('. $font['woff'] .');' : '';
    echo ( ! empty( $font['otf']  ) ) ? 'src: url('. $font['otf'] .');' : '';

    echo '}';
  }

}

// stop mobile animations
// -----------------------------------------------------------
if ( ! empty( $mobile_animations ) && wp_is_mobile() ) {
  echo '.cs-animation{ visibility: inherit; }';
}

// typography
// -----------------------------------------------------------
echo $cs_get_typography;

// header height
// -----------------------------------------------------------
if( $header_height ) {
echo <<<CSS
  .cs-sticky-item{
    line-height: {$header_height}px !important;
    height: {$header_height}px !important;
  }

  .cs-header-transparent #page-header .md-padding{
    padding-top: {$extra_header_height}px;
  }

  .cs-header-transparent #navigation-mobile{
    padding-top: {$header_height}px;
  }
CSS;
}

// header sticky height
// -----------------------------------------------------------
if( $height_sticky ) {
echo <<<CSS
  .is-compact .cs-sticky-item{
    line-height: {$height_sticky}px !important;
    height: {$height_sticky}px !important;
  }
CSS;
}

// logo top
// -----------------------------------------------------------
if( cs_not_empty( $logo_top ) || cs_not_empty( $logo_bottom ) ) {
  $logo_top      = ( cs_not_empty( $logo_top ) ) ? 'padding-top:'. $logo_top .'px;' : '';
  $logo_bottom   = ( cs_not_empty( $logo_bottom ) ) ? 'padding-bottom:'. $logo_bottom .'px;' : '';
  echo '#site-logo h1, #site-logo img{'. $logo_top . $logo_bottom .'}';
}

// non responsive check
// -----------------------------------------------------------
if( ! $non_responsive ) {

echo <<<CSS
@media (max-width: {$menu_max_width}px) {

  #site-logo-right,
  #site-nav{
    display: none !important;
  }

  .cs-header-left #site-logo{
    display: block !important;
    float: left;
  }

  #cs-mobile-icon{
    display: block;
  }

  #main{
    padding-top: 0 !important;
  }

  .cs-header-fancy #site-logo{
    text-align: left;
    max-width: 85%;
  }

  .cs-header-fancy .cs-fancy-row{
    margin-left: 0;
    margin-right: 0;
  }

}
CSS;

if( ! $visible_top_bar && ! $non_responsive ) {

echo <<<CSS
@media (max-width: {$menu_max_width}px) {

  .is-transparent #top-bar,
  #top-bar{
    display: none !important;
  }

  .is-transparent.is-transparent-top-bar #masthead{
    margin-top:0 !important;
  }

  .is-transparent-top-bar #page-header .md-padding{
    padding-top:140px;
  }

}
CSS;
}

}

$output = ob_get_clean();

return $output;
}


// custom skin
// -------------------------------------------------------------
function cs_get_custom_skin() {

  $skin              = cs_get_option( 'skin' );
  $accent            = ( cs_get_option( 'accent_color' ) ) ? cs_get_option( 'accent_color' ) : '#428bca';
  $accent_brightness = cs_brightness( $accent, 0.7901 );
  $accent_darkness   = cs_brightness( $accent, -0.7901 );
  $accent_rgba_06    = cs_hex2rgba( $accent_brightness, 0.6 );

  // accent elements colors
  // -----------------------------------------------------------
  if( $skin == 'accent' ) {

return <<<CSS
  .cs-tab .cs-tab-nav ul li a:hover,
  .cs-tab .cs-tab-nav ul li.active a,
  .cs-toggle-title .cs-in,
  .cs-progress-icon .active,
  .cs-icon-accent.cs-icon-outlined,
  .cs-icon-default,
  .cs-faq-filter a.active,
  .cs-faq-filter a:hover,
  .cs-counter,
  .ajax-close:hover,
  .isotope-filter a:hover, .isotope-filter a.active,
  .cs-accordion-title .cs-in,
  #sidebar .widget_nav_menu ul li.current-menu-item > a,
  #sidebar .widget_nav_menu ul li a:hover,
  .route_widget .widget-title h4,
  .route_widget ul li a:hover,
  .portfolio-item-description .item-title a:hover,
  .cs-lang-top-modal ul li a:hover,
  .comment-reply-link,
  .related-posts ul li a:hover,
  .entry-title a:hover,
  .entry-meta a:hover,
  .post-navigation a:hover,
  .page-pagination a:hover,
  #site-nav ul li ul li .cs-link:hover,
  #site-nav > ul > li > .cs-link:hover,
  #site-nav .current-menu-ancestor > .cs-link,
  #site-nav .current-menu-item > .cs-link,
  #site-logo h1 a:hover,
  .cs-lang-top-modal ul li a:hover,
  .cs-top-module > a:hover,
  .cs-top-module .cs-open-modal:hover,
  a,
  .cs-accent-color {
    color: {$accent};
  }

  #cs-footer-block-before,
  #cs-footer-block-after,
  .bbp-pagination-links span.current,
  #bbp_user_edit_submit,
  .bbp-submit-wrapper .button,
  .cs-cart-count,
  .cs-tab .cs-tab-nav ul li.active a:after,
  .cs-progress-bar,
  .cs-pricing-column-accent .cs-pricing-price,
  .cs-icon-accent.cs-icon-bordered,
  .cs-icon-accent.cs-icon-bgcolor,
  .cs-highlight,
  .cs-fancybox-accent.cs-fancybox-bgcolor,
  .cs-cta-bgcolor,
  .cs-btn-outlined-accent:hover,
  .cs-btn-flat-accent,
  .page-pagination .current,
  .widget_calendar tbody a,
  #sidebar .widget_nav_menu ul li.current-menu-item > a:after,
  .ajax-pagination .cs-loader:after,
  #page-header,
  .cs-menu-effect-7 .cs-depth-0:hover .cs-link-depth-0,
  .cs-menu-effect .cs-link-depth-0:before,
  .cs-module-social a:hover,
  .cs-accent-background {
    background-color: {$accent};
  }

  .bbp-pagination-links span.current,
  .cs-icon-accent.cs-icon-outlined,
  .cs-icon-accent.cs-icon-outer,
  .cs-faq-filter a.active,
  .cs-fancybox-outlined,
  .cs-cta-outlined,
  blockquote,
  .ajax-close:hover,
  .isotope-filter a:hover, .isotope-filter a.active,
  .page-pagination .current,
  .cs-menu-effect-6 .cs-link-depth-0:before,
  #site-nav > ul > li > ul,
  .cs-modal-content,
  .cs-accent-border  {
    border-color: {$accent};
  }

  .cs-menu-effect-4 .cs-link-depth-0:before{
    color: {$accent};
    text-shadow: 0 0 {$accent};
  }

  .cs-menu-effect-4 .cs-link-depth-0:hover::before{
    text-shadow: 8px 0 {$accent}, -8px 0 {$accent};
  }

  #bbp_user_edit_submit:hover,
  .bbp-submit-wrapper .button:hover,
  .cs-btn-flat-accent:hover {
    background-color: {$accent_brightness};
  }

  .cs-btn-outlined-accent {
    color: {$accent} !important;
    border-color: {$accent};
  }

  .cs-btn-3d-accent {
    background-color: {$accent};
    -webkit-box-shadow: 0 0.3em 0 {$accent_darkness};
    box-shadow: 0 0.3em 0 {$accent_darkness};
  }

  .cs-pricing-column-accent .cs-pricing-title{
    background-color: {$accent_darkness};
  }

  select:focus,
  textarea:focus,
  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="email"]:focus,
  input[type="url"]:focus,
  input[type="search"]:focus {
    border-color: {$accent};
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px {$accent_rgba_06};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px {$accent_rgba_06};
  }

  ::selection{
    background-color: {$accent};
  }

  ::-moz-selection{
    background-color: {$accent};
  }
CSS;

  } else if ( $skin == 'custom' ) {

  // top-bar
  // -----------------------------------------------------------------
  $top_bar_image        = cs_get_option('top_bar_image');
  $top_bar_repeat       = cs_get_option('top_bar_repeat');
  $top_bar_position     = cs_get_option('top_bar_position');
  $top_bar_attachment   = cs_get_option('top_bar_attachment');
  $top_bar_size         = cs_get_option('top_bar_size');
  $top_bar_bg           = cs_get_option('top_bar_bg');
  $top_bar_border       = cs_get_option('top_bar_border');
  $top_bar_text         = cs_get_option('top_bar_text');
  $top_bar_link         = cs_get_option('top_bar_link');
  $top_bar_link_hover   = cs_get_option('top_bar_link_hover');
  $top_bar_icon_color   = cs_get_option('top_bar_icon_color');
  $top_bar_social_color = cs_get_option('top_bar_social_color');
  $top_bar_social_hover = cs_get_option('top_bar_social_hover');

  if( ! empty( $top_bar_image ) ) {
    $top_bar_css  = 'background-image: url('. $top_bar_image .');';
    $top_bar_css .= ( ! empty( $top_bar_repeat ) ) ? 'background-repeat: '. $top_bar_repeat .';' : '';
    $top_bar_css .= ( ! empty( $top_bar_position ) ) ? 'background-position: '. $top_bar_position .';' : '';
    $top_bar_css .= ( ! empty( $top_bar_attachment ) ) ? 'background-attachment: '. $top_bar_attachment .';' : '';
    $top_bar_css .= ( ! empty( $top_bar_size ) ) ? 'background-size: '. $top_bar_size .';' : '';
    $top_bar_css .= ( ! empty( $top_bar_bg ) ) ? 'background-color: '. $top_bar_bg .';' : '';
  } else {
    $top_bar_css = 'background-color:'. $top_bar_bg .';';
  }

  // header
  // -----------------------------------------------------------------
  $header_image         = cs_get_option('header_image');
  $header_repeat        = cs_get_option('header_repeat');
  $header_position      = cs_get_option('header_position');
  $header_attachment    = cs_get_option('header_attachment');
  $header_size          = cs_get_option('header_size');
  $header_bg            = cs_get_option('header_bg');
  $header_bg_opacity    = cs_hex2rgba( $header_bg, 0.95 );
  $header_border        = cs_get_option('header_border');
  $header_link          = cs_get_option('header_link');
  $header_link_hover    = cs_get_option('header_link_hover');
  $header_link_hover_bg = cs_get_option('header_link_hover_bg');

  if( ! empty( $header_image ) ) {
    $header_css  = 'background-image: url('. $header_image .');';
    $header_css .= ( ! empty( $header_repeat ) ) ? 'background-repeat: '. $header_repeat .';' : '';
    $header_css .= ( ! empty( $header_position ) ) ? 'background-position: '. $header_position .';' : '';
    $header_css .= ( ! empty( $header_attachment ) ) ? 'background-attachment: '. $header_attachment .';' : '';
    $header_css .= ( ! empty( $header_size ) ) ? 'background-size: '. $header_size .';' : '';
    $header_css .= ( ! empty( $header_bg ) ) ? 'background-color: '. $header_bg .';' : '';
  } else {
    $header_css = 'background-color:'. $header_bg .';';
  }

  $header_link_hover_bg_css = ( ! empty( $header_link_hover_bg ) ) ? 'background-color: '. $header_link_hover_bg .';' : '';

  // sub-menu
  // -----------------------------------------------------------------
  $submenu_bg                 = cs_get_option('submenu_bg');
  $submenu_bg_hover           = cs_get_option('submenu_bg_hover');
  $submenu_border             = cs_get_option('submenu_border');
  $submenu_link               = cs_get_option('submenu_link');
  $submenu_link_hover         = cs_get_option('submenu_link_hover');
  $submenu_mega_title_color   = cs_get_option('submenu_mega_title_color');
  $submenu_mega_title_bgcolor = cs_get_option('submenu_mega_title_bgcolor');
  $submenu_mega_title_border  = cs_get_option('submenu_mega_title_border');

  // page-header
  // -----------------------------------------------------------------
  $page_header_image      = cs_get_option('page_header_image');
  $page_header_repeat     = cs_get_option('page_header_repeat');
  $page_header_position   = cs_get_option('page_header_position');
  $page_header_attachment = cs_get_option('page_header_attachment');
  $page_header_size       = cs_get_option('page_header_size');
  $page_header_bg         = cs_get_option('page_header_bg');
  $page_header_color      = cs_get_option('page_header_color');
  $breadcrumb_bgcolor     = cs_hex2rgba( cs_get_option('breadcrumb_bgcolor'), 0.5 );
  $breadcrumb_color       = cs_hex2rgba( cs_get_option('breadcrumb_color'), 0.7 );
  $breadcrumb_link_color  = cs_get_option('breadcrumb_link_color');

  if( ! empty( $page_header_image ) ) {
    $page_header_css  = 'background-image: url('. $page_header_image .');';
    $page_header_css .= ( ! empty( $page_header_repeat ) ) ? 'background-repeat: '. $page_header_repeat .';' : '';
    $page_header_css .= ( ! empty( $page_header_position ) ) ? 'background-position: '. $page_header_position .';' : '';
    $page_header_css .= ( ! empty( $page_header_attachment ) ) ? 'background-attachment: '. $page_header_attachment .';' : '';
    $page_header_css .= ( ! empty( $page_header_size ) ) ? 'background-size: '. $page_header_size .';' : '';
    $page_header_css .= ( ! empty( $page_header_bg ) ) ? 'background-color: '. $page_header_bg .';' : '';
  } else {
    $page_header_css = 'background-color:'. $page_header_bg .';';
  }

  // footer
  // -----------------------------------------------------------------
  $footer_image        = cs_get_option('footer_image');
  $footer_repeat       = cs_get_option('footer_repeat');
  $footer_position     = cs_get_option('footer_position');
  $footer_attachment   = cs_get_option('footer_attachment');
  $footer_size         = cs_get_option('footer_size');
  $footer_bg           = cs_get_option('footer_bg');
  $footer_color        = cs_get_option('footer_color');
  $footer_link_color   = cs_get_option('footer_link_color');
  $footer_link_hover   = cs_get_option('footer_link_hover');
  $footer_title_color  = cs_get_option('footer_title_color');
  $footer_border_color = cs_get_option('footer_border_color');

  if( ! empty( $footer_image ) ) {
    $footer_css  = 'background-image: url('. $footer_image .');';
    $footer_css .= ( ! empty( $footer_repeat ) ) ? 'background-repeat: '. $footer_repeat .';' : '';
    $footer_css .= ( ! empty( $footer_position ) ) ? 'background-position: '. $footer_position .';' : '';
    $footer_css .= ( ! empty( $footer_attachment ) ) ? 'background-attachment: '. $footer_attachment .';' : '';
    $footer_css .= ( ! empty( $footer_size ) ) ? 'background-size: '. $footer_size .';' : '';
    $footer_css .= ( ! empty( $footer_bg ) ) ? 'background-color: '. $footer_bg .';' : '';
  } else {
    $footer_css = 'background-color:'. $footer_bg .';';
  }

  // footer before and after
  // -----------------------------------------------------------------
  $footer_ba_image        = cs_get_option('footer_ba_image');
  $footer_ba_repeat       = cs_get_option('footer_ba_repeat');
  $footer_ba_position     = cs_get_option('footer_ba_position');
  $footer_ba_attachment   = cs_get_option('footer_ba_attachment');
  $footer_ba_size         = cs_get_option('footer_ba_size');
  $footer_ba_bg           = cs_get_option('footer_ba_bg');
  $footer_ba_color        = cs_get_option('footer_ba_color');
  $footer_ba_link_color   = cs_get_option('footer_ba_link_color');
  $footer_ba_link_hover   = cs_get_option('footer_ba_link_hover');
  $footer_ba_title_color  = cs_get_option('footer_ba_title_color');
  $footer_ba_border_color = cs_get_option('footer_ba_border_color');

  if( ! empty( $footer_ba_image ) ) {
    $footer_ba_css  = 'background-image: url('. $footer_ba_image .');';
    $footer_ba_css .= ( ! empty( $footer_ba_repeat ) ) ? 'background-repeat: '. $footer_ba_repeat .';' : '';
    $footer_ba_css .= ( ! empty( $footer_ba_position ) ) ? 'background-position: '. $footer_ba_position .';' : '';
    $footer_ba_css .= ( ! empty( $footer_ba_attachment ) ) ? 'background-attachment: '. $footer_ba_attachment .';' : '';
    $footer_ba_css .= ( ! empty( $footer_ba_size ) ) ? 'background-size: '. $footer_ba_size .';' : '';
    $footer_ba_css .= ( ! empty( $footer_ba_bg ) ) ? 'background-color: '. $footer_ba_bg .';' : '';
  } else {
    $footer_ba_css = 'background-color:'. $footer_ba_bg .';';
  }

  // copyright
  // -----------------------------------------------------------------
  $copyright_image      = cs_get_option('copyright_image');
  $copyright_repeat     = cs_get_option('copyright_repeat');
  $copyright_position   = cs_get_option('copyright_position');
  $copyright_attachment = cs_get_option('copyright_attachment');
  $copyright_size       = cs_get_option('copyright_size');
  $copyright_bg         = cs_get_option('copyright_bg');
  $copyright_color      = cs_get_option('copyright_color');
  $copyright_link_color = cs_get_option('copyright_link_color');
  $copyright_link_hover = cs_get_option('copyright_link_hover');

  if( ! empty( $copyright_image ) ) {
    $copyright_css  = 'background-image: url('. $copyright_image .');';
    $copyright_css .= ( ! empty( $copyright_repeat ) ) ? 'background-repeat: '. $copyright_repeat .';' : '';
    $copyright_css .= ( ! empty( $copyright_position ) ) ? 'background-position: '. $copyright_position .';' : '';
    $copyright_css .= ( ! empty( $copyright_attachment ) ) ? 'background-attachment: '. $copyright_attachment .';' : '';
    $copyright_css .= ( ! empty( $copyright_size ) ) ? 'background-size: '. $copyright_size .';' : '';
    $copyright_css .= ( ! empty( $copyright_bg ) ) ? 'background-color: '. $copyright_bg .';' : '';
  } else {
    $copyright_css = 'background-color:'. $copyright_bg .';';
  }

  // logo bar
  // -----------------------------------------------------------------
  $logo_bar_image      = cs_get_option('logo_bar_image');
  $logo_bar_repeat     = cs_get_option('logo_bar_repeat');
  $logo_bar_position   = cs_get_option('logo_bar_position');
  $logo_bar_attachment = cs_get_option('logo_bar_attachment');
  $logo_bar_size       = cs_get_option('logo_bar_size');
  $logo_bar_bg         = cs_get_option('logo_bar_bg');
  $logo_bar_color      = cs_get_option('logo_bar_color');
  $logo_bar_css        = '';

  if( ! empty( $logo_bar_image ) ) {
    $logo_bar_css .= '#header-logo{';
    $logo_bar_css .= 'color:'. $logo_bar_color .';';
    $logo_bar_css .= 'background-image: url('. $logo_bar_image .');';
    $logo_bar_css .= ( ! empty( $logo_bar_repeat ) ) ? 'background-repeat: '. $logo_bar_repeat .';' : '';
    $logo_bar_css .= ( ! empty( $logo_bar_position ) ) ? 'background-position: '. $logo_bar_position .';' : '';
    $logo_bar_css .= ( ! empty( $logo_bar_attachment ) ) ? 'background-attachment: '. $logo_bar_attachment .';' : '';
    $logo_bar_css .= ( ! empty( $logo_bar_size ) ) ? 'background-size: '. $logo_bar_size .';' : '';
    $logo_bar_css .= ( ! empty( $logo_bar_bg ) ) ? 'background-color: '. $logo_bar_bg .';' : '';
    $logo_bar_css .= '}';
  } else {
    $logo_bar_css .= '#header-logo{';
    $logo_bar_css .= 'color:'. $logo_bar_color .';';
    $logo_bar_css .= 'background-color:'. $logo_bar_bg .';';
    $logo_bar_css .= '}';
  }

return <<<CSS
{$logo_bar_css}

#top-bar{
  color: {$top_bar_text};
  border-color: {$top_bar_border};
  {$top_bar_css}
}

#top-bar .cs-top-module{
  border-color: {$top_bar_border};
}

#top-bar .cs-top-module > a,
#top-bar .cs-top-module .cs-open-modal{
  color: {$top_bar_link};
}

#top-bar .cs-top-module > a:hover,
#top-bar .cs-top-module .cs-open-modal:hover {
  color: {$top_bar_link_hover};
}

#top-bar .cs-in {
  color: {$top_bar_icon_color};
}

#top-bar .cs-module-social a {
  color: {$top_bar_social_color};
}

#top-bar .cs-module-social a:hover {
  background-color: {$top_bar_social_hover};
}

#top-bar .cs-modal-content-hover,
#top-bar .cs-modal-content{
  border-color: {$top_bar_border};
}

#masthead{
 {$header_css}
}

#masthead.is-compact{
  background-color: {$header_bg_opacity};
}

#cs-mobile-icon,
#site-nav > ul > li > .cs-link{
  color: {$header_link};
}

#cs-mobile-icon i{
  background-color: {$header_link};
}

#site-nav .current-menu-ancestor > .cs-link,
#site-nav .current-menu-item > .cs-link,
#site-nav > ul > li > .cs-link:hover {
  color: {$header_link_hover};
  {$header_link_hover_bg_css}
}

#site-nav > ul > li > ul,
#site-nav .cs-modal-content{
  border-color: {$header_link_hover};
}

.cs-header-center #masthead,
.cs-header-center .cs-depth-0,
.cs-header-fancy #masthead,
.cs-header-fancy .cs-depth-0,
.cs-header-left #masthead,
.cs-header-left .cs-depth-0{
  border-color: {$header_border};
}

#site-nav ul li ul .current-menu-ancestor > .cs-link,
#site-nav ul li ul .current-menu-item > .cs-link{
  color: {$submenu_link_hover};
  background-color: {$submenu_bg_hover};
}

#site-nav ul li ul{
  background-color: {$submenu_bg};
}

#site-nav ul li ul li .cs-link{
  color: {$submenu_link};
  background-color: {$submenu_bg};
  border-top-color: {$submenu_border};
}

#site-nav ul li ul li .cs-link:hover{
  color: {$submenu_link_hover};
  background-color: {$submenu_bg_hover};
}

#site-nav .cs-mega-menu > ul > li .cs-link {
  border-right-color: {$submenu_border};
}

#site-nav .cs-mega-menu > ul > li .cs-title:hover,
#site-nav .cs-mega-menu > ul > li .cs-title{
  color: {$submenu_mega_title_color} !important;
  background-color: {$submenu_mega_title_bgcolor} !important;
  border-right-color: {$submenu_mega_title_border} !important;
}

.cs-menu-effect .cs-link-depth-0:before{
  background-color: {$header_link_hover};
}

.cs-menu-effect-4 .cs-link-depth-0:before{
  color: {$header_link_hover};
  text-shadow: 0 0 {$header_link_hover};
}

.cs-menu-effect-4 .cs-link-depth-0:hover::before{
  text-shadow: 8px 0 {$header_link_hover}, -8px 0 {$header_link_hover};
}

.cs-menu-effect-6 .cs-link-depth-0:before{
  border: 2px solid {$header_link_hover};
}

.cs-menu-effect-7 .cs-depth-0:hover .cs-link-depth-0{
  color: {$header_link_hover};
  {$header_link_hover_bg_css}
}

#page-header{
  color: {$page_header_color};
  {$page_header_css}
}

#page-header .page-title{
  color: {$page_header_color};
}

.cs-breadcrumb .cs-inner{
  color: {$breadcrumb_color};
  background-color: {$breadcrumb_bgcolor};
}

.cs-breadcrumb a {
  color: {$breadcrumb_link_color};
}

#colophon{
  color: {$footer_color};
  {$footer_css}
}

#colophon a{
  color: {$footer_link_color};
}

#colophon a:hover{
  color: {$footer_link_hover};
}

#colophon .route_widget .widget-title h4{
  color: {$footer_title_color};
}

#colophon .route_widget ul li,
#colophon .route_widget ul ul{
  border-color: {$footer_border_color};
}

#cs-footer-block-after,
#cs-footer-block-before{
  color: {$footer_ba_color};
  {$footer_ba_css}
}

#cs-footer-block-after a,
#cs-footer-block-before a{
  color: {$footer_ba_link_color};
}

#cs-footer-block-after a:hover,
#cs-footer-block-before a:hover{
  color: {$footer_ba_link_hover};
}

#cs-footer-block-after .route_widget .widget-title h4,
#cs-footer-block-before .route_widget .widget-title h4{
  color: {$footer_ba_title_color};
}

#cs-footer-block-before .route_widget ul li,
#cs-footer-block-after .route_widget ul li,
#cs-footer-block-before .route_widget ul ul,
#cs-footer-block-after .route_widget ul ul{
  border-color: {$footer_ba_border_color};
}

#copyright{
  color: {$copyright_color};
  {$copyright_css}
}

#copyright a{
  color: {$copyright_link_color};
}

#copyright a:hover{
  color: {$copyright_link_hover};
}

.cs-tab .cs-tab-nav ul li a:hover,
.cs-tab .cs-tab-nav ul li.active a,
.cs-toggle-title .cs-in,
.cs-progress-icon .active,
.cs-icon-accent.cs-icon-outlined,
.cs-icon-default,
.cs-faq-filter a.active,
.cs-faq-filter a:hover,
.cs-counter,
.ajax-close:hover,
.isotope-filter a:hover, .isotope-filter a.active,
.cs-accordion-title .cs-in,
#sidebar .widget_nav_menu ul li.current-menu-item > a,
#sidebar .widget_nav_menu ul li a:hover,
.route_widget .widget-title h4,
.route_widget ul li a:hover,
.portfolio-item-description .item-title a:hover,
.cs-lang-top-modal ul li a:hover,
.comment-reply-link,
.related-posts ul li a:hover,
.entry-title a:hover,
.entry-meta a:hover,
.post-navigation a:hover,
.page-pagination a:hover,
a,
.cs-accent-color {
  color: {$accent};
}

.bbp-pagination-links span.current,
#bbp_user_edit_submit,
.bbp-submit-wrapper .button,
.cs-cart-count,
.cs-tab .cs-tab-nav ul li.active a:after,
.cs-progress-bar,
.cs-pricing-column-accent .cs-pricing-price,
.cs-icon-accent.cs-icon-bordered,
.cs-icon-accent.cs-icon-bgcolor,
.cs-highlight,
.cs-fancybox-accent.cs-fancybox-bgcolor,
.cs-cta-bgcolor,
.cs-btn-outlined-accent:hover,
.cs-btn-flat-accent,
.page-pagination .current,
.widget_calendar tbody a,
#sidebar .widget_nav_menu ul li.current-menu-item > a:after,
.ajax-pagination .cs-loader:after,
.cs-accent-background {
  background-color: {$accent};
}

.bbp-pagination-links span.current,
.cs-icon-accent.cs-icon-outlined,
.cs-icon-accent.cs-icon-outer,
.cs-faq-filter a.active,
.cs-fancybox-outlined,
.cs-cta-outlined,
blockquote,
.ajax-close:hover,
.isotope-filter a:hover, .isotope-filter a.active,
.page-pagination .current,
.cs-accent-border  {
  border-color: {$accent};
}

#bbp_user_edit_submit:hover,
.bbp-submit-wrapper .button:hover,
.cs-btn-flat-accent:hover {
  background-color: {$accent_brightness};
}

.cs-btn-outlined-accent {
  color: {$accent} !important;
  border-color: {$accent};
}

.cs-btn-3d-accent {
  background-color: {$accent};
  -webkit-box-shadow: 0 0.3em 0 {$accent_darkness};
  box-shadow: 0 0.3em 0 {$accent_darkness};
}

.cs-pricing-column-accent .cs-pricing-title{
  background-color: {$accent_darkness};
}

select:focus,
textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus {
  border-color: {$accent};
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px {$accent_rgba_06};
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px {$accent_rgba_06};
}

::selection{
  background-color: {$accent};
}

::-moz-selection{
  background-color: {$accent};
}
CSS;

  } else {
    return;
  }

}

function cs_get_woocoomerce_style() {

  if( is_woocommerce_activated() ) {

  $accent = ( cs_get_option( 'accent_color' ) ) ? cs_get_option( 'accent_color' ) : '#428bca';
  $accent_brightness = cs_brightness( $accent, 0.7901 );

return <<<CSS

  .woocommerce .button,
  .woocommerce-page .button{
    background-color: {$accent};
  }

  .woocommerce .button:hover,
  .woocommerce-page .button:hover{
    background-color: {$accent_brightness};
  }

  .woocommerce .cs-btn-outlined.button,
  .woocommerce-page .cs-btn-outlined.button{
    color: {$accent};
    border-color: {$accent};
    background-color: transparent;
  }

  .woocommerce .cs-btn-outlined.button:hover,
  .woocommerce-page .cs-btn-outlined.button:hover{
    background-color: {$accent};
  }

CSS;

  } else {
    return;
  }

}