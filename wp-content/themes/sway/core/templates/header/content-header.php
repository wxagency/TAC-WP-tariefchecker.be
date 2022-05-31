<?php
  $logo_alignment = '';
  $main_nav_alignment = $header_bttns_wrapper = '';

  $logo_alignment = sway_get_option( 'tek-logo-alignment' );

  if ( sway_get_option( 'tek-menu-alignment' ) == 'main-nav-left') {
    $main_nav_alignment = 'main-nav-left';
  } elseif (  sway_get_option( 'tek-menu-alignment' ) == 'main-nav-center' ) {
    $main_nav_alignment = 'main-nav-center';
  } elseif ( sway_get_option( 'tek-menu-alignment' ) == 'main-nav-right' ) {
    $main_nav_alignment = 'main-nav-right';
  } else {
    $main_nav_alignment = 'main-nav-right';
  }

  if ( sway_get_option( 'tek-modal-button' ) || sway_get_option( 'tek-panel-button' ) ) {
    $header_bttns_wrapper = true;
  }

  // Hide header metabox
  $hide_header_mb = get_post_meta( get_the_ID(), 'keydesign_hide_header', true );

?>

<?php if ( empty( $hide_header_mb ) ) : ?>
  <nav class="<?php echo esc_attr( implode( ' ', (array) apply_filters( 'sway_navbar_class', array() ) ) ); ?>" >
    <?php /* Topbar template */ ?>
    <?php if ( sway_get_option( 'tek-topbar' ) == 1 ) : ?>
      <?php get_template_part( 'core/templates/header/content', 'topbar' ); ?>
    <?php endif; ?>
    <?php /* END Topbar template */ ?>

    <?php
      $primary_logo = sway_get_option( 'tek-logo' );
      $secondary_logo = sway_get_option( 'tek-logo2' );
      $logo_size = sway_get_option( 'tek-logo-image-size' );
      $text_logo = sway_get_option( 'tek-text-logo' );
    ?>

    <div class="menubar <?php echo esc_attr($main_nav_alignment); ?>">
      <div class="container">
       <div id="logo">
         <?php if ( '' != sway_get_option( 'tek-logo-style' ) ) : ?>
           <?php if ( sway_get_option( 'tek-logo-style' ) == '1') : ?>
             <?php /* Image logo */ ?>
             <a class="logo" href="<?php echo esc_url(home_url()); ?>">
               <?php if ( isset( $primary_logo['url'] ) && '' != $primary_logo['url'] ) { ?>
                 <img class="fixed-logo" src="<?php echo esc_url( $primary_logo['url'] ); ?>" <?php if ( isset( $logo_size ) && '' != $logo_size ) { echo 'width="' . esc_attr( $logo_size ) .'"'; }?> alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" />

                 <?php if ( isset( $secondary_logo['url'] ) && '' != $secondary_logo['url'] ) { ?>
                 <img class="nav-logo" src="<?php echo esc_url( $secondary_logo['url'] ); ?>" <?php if ( isset( $logo_size ) && '' != $logo_size ) { echo 'width="' . esc_attr( $logo_size ) .'"'; }?> alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" />
                 <?php } ?>

               <?php } else { ?>
                 <img class="fixed-logo" src="<?php echo esc_url(get_template_directory_uri() . '/core/assets/images/logo.png'); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" />
                 <img class="nav-logo" src="<?php echo esc_url(get_template_directory_uri() . '/core/assets/images/logo-2.png'); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" />
               <?php } ?>
             </a>
           <?php elseif ( sway_get_option( 'tek-logo-style' ) == '2') : ?>
             <?php /* Text logo */ ?>
             <a class="logo" href="<?php echo esc_url(home_url()); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><?php echo esc_html( sway_get_option( 'tek-text-logo' ) );?></a>
           <?php endif; ?>
         <?php endif; ?>
         <?php if ( !class_exists( 'ReduxFramework' ) ) : ?>
            <a class="logo blog-info-name" href="<?php echo esc_url(site_url()); ?>"><?php bloginfo( 'name' ); ?></a>
         <?php endif; ?>
       </div>
       <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-menu">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </button>

                <?php do_action( 'sway_header_wishlist' ); ?>

                <div class="mobile-cart">
                  <?php if ( sway_get_option( 'tek-woo-display-cart-icon' ) == '1' ) {
                      if ( class_exists( 'WooCommerce' ) ) {
                          $keydesign_minicart = '';
                          $keydesign_minicart = sway_add_cart_in_menu();
                          echo do_shortcode( shortcode_unautop( $keydesign_minicart ) );
                      }
                    } ?>
                </div>
                <?php if( sway_get_option( 'tek-topbar-search' ) == 1 ) : ?>
                    <div class="topbar-search mobile-search">
                       <span class="toggle-search sway-search-header fa"></span>
                       <div class="topbar-search-container">
                         <?php sway_get_search_form(); ?>
                       </div>
                    </div>
                <?php endif; ?>
        </div>
        <?php if ( $logo_alignment == 'logo-center' ) : ?>
          <div class="logo-center-group-fix">
        <?php endif; ?>
          <div id="main-menu" class="<?php echo esc_attr( implode( ' ', (array) apply_filters( 'sway_main_menu_class', array() ) ) ); ?>">
             <?php wp_nav_menu( array( 'theme_location' => 'header-menu', 'depth' => 3, 'container' => false, 'menu_class' => 'nav navbar-nav', 'fallback_cb' => 'wp_bootstrap_navwalker::fallback', 'walker' => new wp_bootstrap_navwalker()) ); ?>
          </div>
          <div class="main-nav-extra-content">
            <div class="search-cart-wrapper">
              <?php do_action( 'sway_header_desktop_icons' ); ?>
            </div>
            <?php if ( $header_bttns_wrapper ) : ?>
              <div class="header-bttn-wrapper">
                  <?php if ( sway_get_option( 'tek-modal-button' ) ) {
                      get_template_part( 'core/templates/header/content', 'modal-button' );
                  } ?>
                  <?php if ( sway_get_option( 'tek-panel-button' ) ) {
                      get_template_part( 'core/templates/header/content', 'panel-button' );
                  } ?>
              </div>
            <?php endif; ?>
          </div>
        <?php if ( $logo_alignment == 'logo-center' ) : ?>
        </div>
        <?php endif; ?>
        </div>
     </div>
  </nav>
<?php endif; ?>
