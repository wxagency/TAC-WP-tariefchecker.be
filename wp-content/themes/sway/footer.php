<?php
/**
 * The template for displaying the footer
 * Contains the closing of the #wrapper div and all content after.
 *
 * @package sway
 * by KeyDesign
 */

  $footer_wrapper_class = $footer_fixed_class = $link_hover_effect = $footer_active_widgets = $blog_subscribe_form_class = $subscribe_section_show = $subscribe_section_bg = $subscribe_section_style = $footer_section_style = $fixed_footer_mb = $hide_footer_mb = $upper_footer = $footer_width_class = '';
  $backtotop_wrapper_class = '';

  $footer_active_widgets = is_active_sidebar( 'footer-first-widget-area' ) + is_active_sidebar( 'footer-second-widget-area' ) + is_active_sidebar( 'footer-third-widget-area' ) + is_active_sidebar( 'footer-fourth-widget-area' ) + is_active_sidebar( 'footer-fifth-widget-area' ) + is_active_sidebar( 'footer-sixth-widget-area' );

  if ( sway_get_option( 'tek-footer-fixed' ) == '1') {
    $footer_fixed_class ='fixed';
  } else {
    $footer_fixed_class ='classic';
  }

  if ( sway_get_option( 'tek-footer-width' ) == 'fullwidth') {
    $footer_width_class = 'fullwidth-footer';
  }

  $hide_footer_mb = get_post_meta( get_the_ID(), 'keydesign_hide_footer', true );
  $fixed_footer_mb = get_post_meta( get_the_ID(), 'keydesign_fixed_footer', true );

  if ( $fixed_footer_mb == 'on' ) {
    $footer_fixed_class ='fixed';
  } elseif ( $fixed_footer_mb == 'off' ) {
    $footer_fixed_class ='classic';
  }

  $upper_footer = sway_get_option( 'tek-upper-footer' );
  $lower_footer = sway_get_option( 'tek-lower-footer-switch' );
  if ( ! class_exists( 'ReduxFramework' ) ) {
    $upper_footer = $lower_footer = true;
  }

  if ( '' != sway_get_option( 'tek-footer-link-hover-effect' ) ) {
    $link_hover_effect = sway_get_option( 'tek-footer-link-hover-effect' );
  } else {
    $link_hover_effect = 'default-footer-link-effect';
  }

  $subscribe_section_visibility = sway_get_option( 'tek-blog-subscribe-section-show' );
  $display_subscribe_form = false;

  $single_pages_check = $arhive_pages_check = $blog_pages_check = false;
  if ( $subscribe_section_visibility == 'blog-single-pages' && is_singular( 'post' ) ) {
    $single_pages_check = true;
  }

  if ( $subscribe_section_visibility == 'archive-pages' && ( is_home() || is_post_type_archive( 'post' ) || is_category() || is_tag() || is_date() || is_author() ) ) {
    $arhive_pages_check = true;
  }

  if ( $subscribe_section_visibility == 'all-blog-pages' && ( is_home() || is_post_type_archive( 'post' ) || is_category() || is_tag() || is_date() || is_author() || is_singular( 'post' ) ) ) {
    $blog_pages_check = true;
  }

  if ( sway_get_option( 'tek-blog-subscribe-section-switch' ) ) {
    if ( $single_pages_check || $arhive_pages_check || $blog_pages_check ) {
      $blog_subscribe_form_class = 'blog-subscribe-form';
      $display_subscribe_form = true;
      $subscribe_section_bg = sway_get_option( 'tek-blog-subscribe-section-bg-image' );
    }
  }

  $top_padding = get_post_meta( get_the_ID(), 'keydesign_footer_top_padding', true );
  $bottom_padding = get_post_meta( get_the_ID(), 'keydesign_footer_bottom_padding', true );

  if ( '' !== $top_padding ) {
    $footer_section_style .= 'padding-top:' . ( preg_match( '/(px|em|\%|pt|cm)$/', $top_padding ) ? $top_padding : $top_padding . 'px' ) . ';';
  }
  if ( '' !== $bottom_padding ) {
    $footer_section_style .= 'padding-bottom:' . ( preg_match( '/(px|em|\%|pt|cm)$/', $bottom_padding ) ? $bottom_padding : $bottom_padding . 'px' ) . ';';
  }

  $footer_wrapper_class = implode( ' ', array( $footer_width_class, $footer_fixed_class, $link_hover_effect, $blog_subscribe_form_class ) );

  // Back to top wrapper class
  $backtotop_position = sway_get_option( 'tek-backtotop-position' );
  $backtotop_style = sway_get_option( 'tek-backtotop-scroll-style' );
  $backtotop_wrapper_class = implode( ' ', array( 'back-to-top', $backtotop_position, $backtotop_style ) );
?>

<?php if ( $display_subscribe_form == true ) : ?>
  <div class="blog-footer-subscribe-form">
    <div class="container">
      <div class="blog-subscribe-wrapper">
        <div class="blog-subscribe-content-wrapper">
          <?php if ( sway_get_option( 'tek-blog-subscribe-section-title' ) ) : ?>
            <h4><?php echo esc_html( sway_get_option( 'tek-blog-subscribe-section-title' ) ); ?></h4>
          <?php endif; ?>
          <?php if ( sway_get_option( 'tek-blog-subscribe-section-subtitle' ) ) : ?>
            <p class="blog-subscribe-subtitle"><?php echo wp_kses( sway_get_option( 'tek-blog-subscribe-section-subtitle' ), sway_allowed_html_tags() ); ?></p>
          <?php endif; ?>
          <?php if ( sway_get_option( 'tek-blog-subscribe-section-form-id' ) ) : ?>
            <div class="kd-contact-form inline-cf">
              <?php echo do_shortcode('[contact-form-7 id="'. esc_attr( sway_get_option( 'tek-blog-subscribe-section-form-id' ) ).'"]'); ?>
            </div>
          <?php endif; ?>
        </div>
        <?php if ( isset( $subscribe_section_bg['url'] ) && '' != $subscribe_section_bg['url'] ) : ?>
          <div class="blog-subscribe-background">
            <img src="<?php echo esc_url($subscribe_section_bg['url']) ?>" />
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
<?php endif; ?>

</div>

<?php if ( empty($hide_footer_mb) ) : ?>
  <footer id="footer" class="<?php echo esc_attr( trim( $footer_wrapper_class ) ); ?>">
    <div class="upper-footer" style="<?php echo esc_attr( $footer_section_style ); ?>">
      <div class="container">
        <?php if( sway_get_option( 'tek-footer-bar' ) == 1 ) : ?>
          <div class="footer-bar <?php if ( $upper_footer == "0") { echo " no-upper-footer"; } ?>">
            <?php if ( has_nav_menu( 'footer-menu' ) ) : ?>
              <div class="footer-nav-menu">
                <?php wp_nav_menu( array( 'theme_location' => 'footer-menu', 'depth' => 1, 'container' => false, 'menu_class' => 'navbar-footer', 'fallback_cb' => 'false' ) ); ?>
              </div>
            <?php endif; ?>
            <?php if ( class_exists( 'ReduxFramework' ) ) : ?>
              <div class="footer-socials-bar">
                <?php sway_social_icons(); ?>
              </div>
            <?php endif; ?>
          </div>
        <?php endif; ?>

        <?php if ( $upper_footer ) : ?>
          <?php if ( $footer_active_widgets >= "1" ) : ?>
            <div class="footer-widget-area">
              <?php get_sidebar( 'footer' ); ?>
            </div>
          <?php endif; ?>
        <?php endif; ?>
      </div>
    </div>
    <?php if ( $lower_footer ) : ?>
      <div class="lower-footer <?php echo sway_get_option( 'tek-footer-copyright-alignment' ); ?>">
        <div class="container">
           <span>
             <?php if ( sway_get_option( 'tek-footer-text' ) ) {
               echo wp_kses( sway_get_option( 'tek-footer-text' ), sway_allowed_html_tags() );
             } else {
               echo esc_html('Sway by KeyDesign. All rights reserved.');
             } ?>
           </span>
       </div>
      </div>
    <?php endif; ?>
  </footer>
<?php endif; ?>

<?php if ( sway_get_option( 'tek-backtotop' ) == true) : ?>
    <div class="<?php echo esc_attr( trim( $backtotop_wrapper_class ) ); ?>">
       <i class="fa fa-chevron-up"></i>
       <?php if ( $backtotop_style == 'scroll-position-style' ) : ?>
         <svg height="50" width="50">
           <circle cx="25" cy="25" r="24" />
         </svg>
       <?php endif; ?>
    </div>
<?php endif; ?>

<?php if ( is_single() && sway_get_option( 'tek-blog-rebar' ) ) : ?>
    <div class="rebar-wrapper <?php echo esc_attr( sway_get_option( 'tek-blog-rebar-position' ) ); ?>">
       <div class="rebar-element"></div>
    </div>
<?php endif; ?>

<?php if ( sway_get_option( 'tek-header-button-action' ) == '1' ) : ?>
  <?php get_template_part( 'core/templates/header/content', 'modal-box' ); ?>
<?php endif; ?>

<?php if ( sway_get_option( 'tek-panel-button-action' ) == '1' ) : ?>
  <?php get_template_part( 'core/templates/header/content', 'side-panel' ); ?>
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>
