<?php
  /*
  * ReduxFramework Options Config
  */

  if ( ! class_exists( 'Redux' ) ) {
    return;
  }

  $opt_name = 'redux_ThemeTek';

  $theme = wp_get_theme();

  $args = array(
    'opt_name' => $opt_name,
    'display_name' => $theme->get( 'Name' ),
    'display_version' => $theme->get( 'Version' ),
    'menu_type' => 'submenu',
    'allow_sub_menu' => true,
    'menu_title' => esc_html__( 'Theme Options', 'sway' ),
    'page_title' => esc_html__( 'Theme Options', 'sway' ),
    'async_typography' => true,
    'admin_bar' => true,
    'dev_mode' => false,
    'update_notice' => false,
    'show_options_object' => false,
    'customizer' => false,
    'page_parent' => 'sway-dashboard',
    'page_slug' => 'theme-options',
    'page_permissions' => 'manage_options',
    'save_defaults' => true,
    'show_import_export' => true,
    'network_sites' => '1',
    'transient_time' => 60 * MINUTE_IN_SECONDS,
  );

  Redux::setArgs( $opt_name, $args );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Management',
    'title' => esc_html__('Business Info', 'sway'),
    'desc' => esc_html__('Edit the contact details for your company/organization. These details are listed in Theme Options > Header > Topbar / Popup Modal / Side Panel.', 'sway'),
    'fields' => array(
        array(
            'id' => 'tek-business-phone',
            'type' => 'text',
            'title' => esc_html__('Business Phone', 'sway'),
            'subtitle' => 'Edit business phone.',
            'default' => '(222) 400-630',
        ),
        array(
            'id' => 'tek-secondary-business-phone',
            'type' => 'text',
            'title' => esc_html__('Secondary Business Phone', 'sway'),
            'subtitle' => 'Edit secondary business phone.',
            'default' => '',
        ),
        array(
            'id' => 'tek-business-email',
            'type' => 'text',
            'title' => esc_html__('Business Email', 'sway'),
            'subtitle' => 'Edit business email.',
            'default' => 'hello@swaythemes.com',
        ),
        array(
            'id' => 'tek-business-opening-hours',
            'type' => 'text',
            'title' => esc_html__('Business Opening Hours', 'sway'),
            'subtitle' => 'Edit business opening hours.',
            'default' => 'Mon - Fri: 10:00 - 22:00',
        ),
        array(
            'id' => 'tek-social-profiles',
            'type' => 'social_profiles',
            'title' => 'Social Icons',
            'subtitle' => 'Click on icon to activate it, drag and drop to change the icon order.',
        ),
    )
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Gear',
    'title' => esc_html__('Global Options', 'sway'),
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Gears',
    'title' => esc_html__('Global Settings', 'sway'),
    'desc' => esc_html__('General settings that are applied site-wide.', 'sway'),
    'subsection' => true,
    'fields' => array(
      array(
          'id' => 'tek-smooth-scroll',
          'type' => 'switch',
          'title' => esc_html__('Smooth Mouse Scroll', 'sway'),
          'subtitle' => esc_html__('Turn on to replace basic website scrolling effect with nice smooth scroll.', 'sway'),
          'default' => false
      ),
      array(
          'id' => 'tek-google-api',
          'type' => 'text',
          'title' => esc_html__('Google Map API Key', 'sway'),
          'default' => '',
          'subtitle' => esc_html__('Generate, copy and paste here Google Maps API Key.', 'sway'),
          'desc' => wp_kses('Click <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target=_blank>here</a> to get an API key', 'sway')
      ),
      array(
          'id' => 'tek-disable-animations',
          'type' => 'switch',
          'title' => esc_html__('Disable Animations on Mobile', 'sway'),
          'subtitle' => esc_html__('Turn on/off element animation on mobile.', 'sway'),
          'default' => true
      ),
      array(
          'id' => 'tek-favicon',
          'type' => 'media',
          'title' => esc_html__('Favicon', 'sway'),
          'desc' => wp_kses('Users on WordPress 4.3 or above must upload favicon from WordPress <a href="'.admin_url( 'customize.php?autofocus[section]=title_tagline' ).'">Customizer panel</a>.', 'sway'),
      ),
    )
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Palette',
    'title' => esc_html__('Color Schemes', 'sway'),
    'desc' => esc_html__('General color schemes that are applied site-wide.', 'sway'),
    'subsection' => true,
    'fields' => array(
      array(
        'id' => 'tek-main-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Primary Accent Color', 'sway'),
        'subtitle' => esc_html__('Option for setting the primary color of the theme.', 'sway'),
        'default' => '#777AF2',
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-secondary-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Secondary Accent Color', 'sway'),
        'subtitle' => esc_html__('Option for setting the secondary color of the theme.', 'sway'),
        'default' => '#39364E',
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-titlebar-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Title Bar Background Color', 'sway'),
        'default' => '',
        'subtitle' => esc_html__('Select the background color used for the single pages title bar section.', 'sway'),
        'validate' => 'color'
      ),
      array(
          'id' => 'tek-titlebar-text-color',
          'type' => 'color',
          'transparent' => false,
          'title' => esc_html__('Title Bar Text Color', 'sway'),
          'default' => '',
          'subtitle' => esc_html__('Select the single page title color.', 'sway'),
          'validate' => 'color'
      ),
      array(
            'id' => 'tek-link-color',
            'type' => 'link_color',
            'title' => esc_html__( 'Links Color', 'sway' ),
            'subtitle' => esc_html__('Normal and hover states of default links.', 'sway'),
            'active' => false,
            'visited' => false,
      ),
    )
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Loading-3',
    'title' => esc_html__('Preloader', 'sway'),
    'desc' => esc_html__('Preloader general settings.', 'sway'),
    'subsection' => true,
    'fields' => array(
      array(
        'id' => 'tek-preloader',
        'type' => 'switch',
        'title' => esc_html__('Preloader', 'sway'),
        'subtitle' => esc_html__('Enable/Disable a preloader screen before loading the page.', 'sway'),
        'default' => true
      ),
      array(
        'id' => 'tek-preloader-bg-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Preloader Background Color', 'sway'),
        'subtitle' => esc_html__('Edit preloader background color.', 'sway'),
        'required' => array('tek-preloader','equals',true),
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-preloader-image',
        'type' => 'media',
        'readonly' => false,
        'url' => true,
        'title' => esc_html__('Preloader Image', 'sway'),
        'subtitle' => esc_html__('Upload preloader image/logo.', 'sway'),
        'required' => array('tek-preloader','equals',true),
      ),
      array(
        'id' => 'tek-preloader-image-size-desktop',
        'type' => 'text',
        'class' => 'kd-numeric-input',
        'title' => esc_html__('Preloader Image Size', 'sway'),
        'subtitle' => esc_html__('Control the preloader image size (pixel value). Example: 200.', 'sway'),
        'required' => array('tek-preloader','equals',true),
      ),
      array(
        'id' => 'tek-preloader-image-size-mobile',
        'type' => 'text',
        'class' => 'kd-numeric-input',
        'title' => esc_html__('Preloader Mobile Image Size', 'sway'),
        'subtitle' => esc_html__('Control the preloader image size on mobile devices (pixel value). Example: 140.', 'sway'),
        'required' => array('tek-preloader','equals',true),
      ),
    )
  ) );

Redux::setSection( $opt_name, array(
  'icon' => 'iconsmind-Go-Top',
  'title' => esc_html__('Go to Top Button', 'sway'),
  'desc' => esc_html__('Go to top button general settings.', 'sway'),
  'subsection' => true,
  'fields' => array(
    array(
        'id' => 'tek-backtotop',
        'type' => 'switch',
        'title' => esc_html__('Go to Top Button', 'sway'),
        'subtitle' => esc_html__('Enable/Disable a "Go to top" button in the right bottom corner the page.', 'sway'),
        'default' => true
    ),
    array(
      'id' => 'tek-backtotop-position',
      'type' => 'button_set',
      'title' => esc_html__('Go to Top Button Position', 'sway'),
      'subtitle' => esc_html__('Control the position of the "Go to top" button.', 'sway'),
      'options' => array(
        'left-aligned' => 'Left',
        'right-aligned' => 'Right'
       ),
       'required' => array('tek-backtotop','equals',true),
       'default' => 'right-aligned'
    ),
    array(
        'id' => 'tek-backtotop-scroll-style',
        'type' => 'select',
        'title' => esc_html__('Go to Top Button Style', 'sway'),
        'subtitle' => esc_html__('Edit header button style on mouse over.', 'sway'),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
            'default-style' => 'Default',
            'scroll-position-style' => 'Scroll Position',
        ),
        'default' => 'default-style'
    ),
  )
) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Upload-Window',
    'title' => esc_html__('Header', 'sway'),
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Settings-Window',
    'title' => esc_html__('Header Bar', 'sway'),
    'desc' => esc_html__('Edit header bar general settings.', 'sway'),
    'subsection' => true,
    'fields' => array(
      array(
        'id'=>'tek-header-bar-section-start',
        'type' => 'section',
        'title' => esc_html__('Header Bar Settings', 'sway'),
        'indent' => true,
      ),
      array(
        'id' => 'tek-menu-style',
        'type' => 'button_set',
        'title' => esc_html__('Header Bar Width', 'sway'),
        'subtitle' => esc_html__('Control the width of your main navigation menu:  Contained/Full Width.', 'sway'),
        'options' => array(
          '1' => 'Contained',
          '2' => 'Full-Width'
         ),
        'default' => '1'
      ),
      array(
        'id' => 'tek-menu-behaviour',
        'type' => 'button_set',
        'title' => esc_html__('Header Bar Behaviour', 'sway'),
        'subtitle' => esc_html__('select the header behavior when scrolling down the page', 'sway'),
        'options' => array(
            '1' => 'Sticky',
            '2' => 'Fixed'
         ),
        'default' => '1'
      ),
      array(
        'id' => 'tek-header-spacing',
        'type' => 'spinner',
        'title' => esc_html__('Header Bar Spacing', 'sway'),
        'subtitle' => esc_html__('Control the top and bottom padding for the header bar. Pixel value.', 'sway'),
        'min' => 0,
        'max' => 30,
        'default' => 0,
      ),
      array(
        'id' => 'tek-header-menu-bg',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Header Bar Background Color', 'sway'),
        'subtitle' => esc_html__('Select the background color for the fixed menu bar.', 'sway'),
        'default' => '#ffffff',
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-header-menu-bg-sticky',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Sticky Header Bar Background Color', 'sway'),
        'subtitle' => esc_html__('Select the background color for the sticky menu bar.', 'sway'),
        'default' => '#ffffff',
        'required' => array('tek-menu-behaviour','equals', '1'),
        'validate' => 'color'
      ),
      array(
        'id'=>'tek-header-bar-section-end',
        'type' => 'section',
        'indent' => false,
      ),
      array(
        'id'=>'tek-header-icons-section-start',
        'type' => 'section',
        'title' => esc_html__('Header Bar Icons', 'sway'),
        'indent' => true,
      ),
      array(
        'id' => 'tek-topbar-search',
        'type' => 'switch',
        'title' => esc_html__('Search Icon', 'sway'),
        'subtitle' => esc_html__('Turn on/off the search icon', 'sway'),
        'default' => true
      ),
      array(
        'id' => 'tek-woo-display-cart-icon',
        'type' => 'switch',
        'title' => esc_html__('Cart Icon', 'sway'),
        'subtitle' => esc_html__('Turn on/off the cart icon.', 'sway'),
        'default' => true,
      ),
      array(
        'id' => 'tek-woo-cart-icon-selector',
        'type' => 'button_set',
        'title' => esc_html__('Cart Icon', 'sway'),
        'subtitle' => esc_html__('Change cart icon style.', 'sway'),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
            'shopping-cart' => 'Shopping cart',
            'shopping-bag' => 'Shopping bag',
        ),
        'required' => array('tek-woo-display-cart-icon','equals','1'),
        'default' => 'shopping-cart'
      ),
      array(
        'id' => 'tek-woo-display-wishlist-icon',
        'type' => 'switch',
        'title' => esc_html__('Wishlist Icon', 'sway'),
        'subtitle' => esc_html__('Turn on/off the wishlist icon.', 'sway'),
        'default' => true,
      ),
      array(
        'id'=>'tek-header-icons-section-end',
        'type' => 'section',
        'indent' => false,
      ),
    )
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Favorite-Window',
    'title' => esc_html__('Logo', 'sway'),
    'desc' => esc_html__('General logo settings.', 'sway'),
    'subsection' => true,
    'fields' => array(
      array(
        'id' => 'tek-logo-alignment',
        'type' => 'button_set',
        'title' => esc_html__('Logo Alignment', 'sway'),
        'subtitle' => esc_html__('Control the position of the logo.', 'sway'),
        'desc' => esc_html__('If set to "Center" the main menu will be automatically centered.', 'sway'),
        'options' => array(
          'logo-left' => 'Left',
          'logo-center' => 'Center',
         ),
        'default' => 'logo-left'
      ),
      array(
        'id' => 'tek-logo-spacing',
        'type' => 'spacing',
        'mode' => 'padding',
        'units' => array('em', 'px'),
        'left' => false,
        'right' => false,
        'title' => esc_html__('Logo Spacing', 'sway'),
        'subtitle' => esc_html__('Control the top and bottom padding for the logo element.', 'sway'),
        'required' => array('tek-logo-alignment','equals','logo-center'),
        'default' => array(
          'units' => 'px',
        )
      ),
      array(
        'id' => 'tek-logo-style',
        'type' => 'button_set',
        'title' => esc_html__('Logo Type', 'sway'),
        'subtitle' => esc_html__('Select the logo type: Text/Image.', 'sway'),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
            '1' => 'Image logo',
            '2' => 'Text logo'
        ),
        'default' => '2'
      ),
      array(
        'id' => 'tek-logo',
        'type' => 'media',
        'readonly' => false,
        'url' => true,
        'title' => esc_html__('Primary Image Logo', 'sway'),
        'subtitle' => esc_html__('Upload primary logo image. This logo is used with the fixed header bar.', 'sway'),
        'required' => array('tek-logo-style','equals','1'),
      ),
      array(
        'id' => 'tek-logo2',
        'type' => 'media',
        'readonly' => false,
        'url' => true,
        'title' => esc_html__('Secondary Image Logo', 'sway'),
        'subtitle' => esc_html__('Upload secondary image logo.', 'sway'),
        'required' => array('tek-logo-style','equals','1'),
      ),
      array(
        'id' => 'tek-sticky-nav-logo',
        'type' => 'select',
        'title' => esc_html__('Sticky Header Logo Image', 'sway'),
        'subtitle' => esc_html__('Select logo image for the sticky header bar.', 'sway'),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
            'nav-primary-logo' => 'Primary logo image',
            'nav-secondary-logo' => 'Secondary logo image',
        ),
        'default' => 'nav-primary-logo',
        'required' => array(
          array ('tek-menu-behaviour', 'equals','1'),
          array ('tek-logo-style','equals','1'),
        ),
      ),
      array(
        'id' => 'tek-transparent-nav-logo',
        'type' => 'select',
        'title' => esc_html__('Transparent Header Logo Image', 'sway'),
        'subtitle' => esc_html__('Select logo image for the transparent header bar.', 'sway'),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
          'nav-primary-logo' => 'Primary logo image',
          'nav-secondary-logo' => 'Secondary logo image',
        ),
        'default' => 'nav-secondary-logo',
        'required' => array('tek-logo-style','equals','1'),
      ),
      array(
        'id' => 'tek-logo-image-size',
        'type' => 'text',
        'class' => 'kd-numeric-input',
        'title' => esc_html__('Logo Size', 'sway'),
        'subtitle' => esc_html__('Control the logo width (pixels value). Example: 200.', 'sway'),
        'required' => array('tek-logo-style','equals','1'),
      ),
      array(
        'id' => 'tek-mobile-logo-image-size',
        'type' => 'text',
        'class' => 'kd-numeric-input',
        'title' => esc_html__('Mobile Logo Size', 'sway'),
        'subtitle' => esc_html__('Control the mobile logo width (pixels value). Example: 140.', 'sway'),
        'required' => array('tek-logo-style','equals','1'),
      ),
      array(
        'id' => 'tek-text-logo',
        'type' => 'text',
        'title' => esc_html__('Text Logo', 'sway'),
        'subtitle' => esc_html__('Name of your website displayed instead of the regular image logo', 'sway'),
        'required' => array('tek-logo-style','equals','2'),
        'default' => 'Sway'
      ),
      array(
        'id' => 'tek-text-logo-typo',
        'type' => 'typography',
        'title' => esc_html__('Text Logo Font Settings', 'sway'),
        'subtitle' => esc_html__('Edit the typography settings of your text logo.', 'sway'),
        'required' => array('tek-logo-style','equals', '2'),
        'google' => true,
        'font-family' => true,
        'font-style' => true,
        'font-size' => true,
        'font-size' => true,
        'line-height' => false,
        'letter-spacing' => true,
        'color' => false,
        'text-align' => false,
        'all_styles' => false,
        'units' => 'px',
      ),
      array(
        'id' => 'tek-main-logo-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Primary Logo Text Color', 'sway'),
        'subtitle' => esc_html__('Default logo text color', 'sway'),
        'required' => array('tek-logo-style','equals','2'),
        'default' => '',
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-secondary-logo-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Secondary Logo Text Color', 'sway'),
        'subtitle' => esc_html__('Logo text color for sticky navigation', 'sway'),
        'required' => array('tek-logo-style','equals','2'),
        'default' => '',
        'validate' => 'color'
      ),
    )
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-One-Window',
    'title' => esc_html__('Main Menu', 'sway'),
    'desc' => esc_html__('Edit main menu general settings.', 'sway'),
    'subsection' => true,
    'fields' => array(
      array(
        'id'=>'tek-menu-settings-section-start',
        'type' => 'section',
        'title' => esc_html__('Main Menu Settings', 'sway'),
        'indent' => true,
      ),
      array(
        'id' => 'tek-menu-alignment',
        'type' => 'button_set',
        'title' => esc_html__('Menu Alignment', 'sway'),
        'subtitle' => esc_html__('Control the position of the main menu.', 'sway'),
        'options' => array(
          'main-nav-left' => 'Left',
          'main-nav-center' => 'Center',
          'main-nav-right' => 'Right'
        ),
        'required' => array('tek-logo-alignment','equals','logo-left'),
        'default' => 'main-nav-right'
      ),
      array(
        'id' => 'tek-menu-typo',
        'type' => 'typography',
        'title' => esc_html__('Menu Font Settings', 'sway'),
        'subtitle' => esc_html__('Control the typography settings of the menu.', 'sway'),
        'google' => true,
        'font-style' => true,
        'font-size' => true,
        'line-height' => false,
        'text-transform' => true,
        'color' => false,
        'text-align' => false,
        'letter-spacing' => true,
        'all_styles' => false,
        'default' => array(
          'font-weight' => '',
          'font-family' => '',
          'font-size' => '16',
          'text-transform' => '',
          'letter-spacing' => '',
        ),
        'units' => 'px',
      ),
      array(
        'id' => 'tek-header-menu-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Menu Link Color', 'sway'),
        'subtitle' => esc_html__('Select the default menu text color.', 'sway'),
        'default' => '',
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-header-menu-color-hover',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Menu Link Hover Color', 'sway'),
        'subtitle' => esc_html__('Select the default menu text color on mouse over.', 'sway'),
        'default' => '',
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-header-menu-color-sticky',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Sticky Menu Link Color', 'sway'),
        'subtitle' => esc_html__('Select the sticky menu text color.', 'sway'),
        'default' => '',
        'required' => array('tek-menu-behaviour','equals', '1'),
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-header-menu-color-sticky-hover',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Sticky Menu Link Hover Color', 'sway'),
        'subtitle' => esc_html__('Select the sticky menu text color on mouse over.', 'sway'),
        'default' => '',
        'required' => array('tek-menu-behaviour','equals', '1'),
        'validate' => 'color'
      ),
      array(
        'id' => 'tek-dropdown-nav-hover',
        'type' => 'button_set',
        'title' => esc_html__('Dropdown Menu Link Hover Effect', 'sway'),
        'subtitle' => esc_html__('Select the hover effect on dropdown menu links.', 'sway'),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
            'default-dropdown-effect' => 'Default',
            'background-dropdown-effect' => 'Background color',
            'underline-effect' => 'Underline animation',
        ),
        'default' => 'background-dropdown-effect',
      ),
      array(
        'id'=>'tek-menu-settings-section-end',
        'type' => 'section',
        'indent' => false,
      ),
      array(
        'id'=>'tek-home-transparent-section-start',
        'type' => 'section',
        'title' => esc_html__('Transparent Navigation Options', 'sway'),
        'indent' => true,
      ),
      array(
        'id' => 'tek-transparent-homepage-menu-colors',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Menu Link Color', 'sway'),
        'subtitle' => esc_html__('Navigation color when using a transparent background.', 'sway'),
        'default' => '',
        'validate' => 'color',
      ),
      array(
        'id'=>'tek-home-transparent-section-end',
        'type' => 'section',
        'indent' => false,
      ),
    )
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Add-Window',
    'title' => esc_html__('Top Bar', 'sway'),
    'desc' => esc_html__('Edit topbar general settings.', 'sway'),
    'subsection' => true,
    'fields' => array(
      array(
        'id' => 'tek-topbar',
        'type' => 'switch',
        'title' => esc_html__('Enable Topbar', 'sway'),
        'subtitle' => esc_html__('Enable/Disable the topbar.', 'sway'),
        'default' => true
      ),
      array(
        'id' => 'tek-topbar-sticky',
        'type' => 'switch',
        'title' => esc_html__('Sticky Topbar', 'sway'),
        'required' => array('tek-topbar','equals', true),
        'subtitle' => esc_html__('Enable/Disable sticky topbar.', 'sway'),
        'default' => false
      ),
      array(
        'id' => 'tek-topbar-mobile',
        'type' => 'switch',
        'title' => esc_html__('Enable Topbar on Mobile', 'sway'),
        'required' => array('tek-topbar','equals', true),
        'subtitle' => esc_html__('Show/hide the topbar  on mobile devices.', 'sway'),
        'default' => true
      ),
      array(
        'id' => 'tek-topbar-left-content',
        'type' => 'button_set',
        'title' => esc_html__('Topbar Left Content', 'sway'),
        'subtitle' => esc_html__('Select the content for the topbar left section.', 'sway'),
        'required' => array('tek-topbar','equals', true),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
          'contact-info' => 'Contact info',
          'social-links' => 'Social links',
          'navigation' => 'Navigation',
          'empty' => 'Empty',
        ),
        'default' => 'contact-info',
      ),
      array(
        'id' => 'tek-topbar-right-content',
        'type' => 'button_set',
        'title' => esc_html__('Topbar Right Content', 'sway'),
        'subtitle' => esc_html__('Select the content for the topbar right section.', 'sway'),
        'required' => array('tek-topbar','equals', true),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
          'contact-info' => 'Contact info',
          'social-links' => 'Social links',
          'navigation' => 'Navigation',
          'empty' => 'Empty',
        ),
        'default' => 'social-links',
      ),
      array(
        'id' => 'tek-topbar-content-design',
        'type' => 'button_set',
        'title' => esc_html__('Topbar Content Design', 'sway'),
        'subtitle' => esc_html__('Select the topbar content design.', 'sway'),
        'required' => array('tek-topbar','equals', true),
        'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
        'options'  => array(
          'tb-default-design' =>'No Borders',
          'tb-border-design' => 'With Borders',
        ),
        'default' => 'tb-border-design',
      ),
      array(
        'id' => 'tek-topbar-typo',
        'type' => 'typography',
        'title' => esc_html__('Topbar Font Settings', 'sway'),
        'subtitle' => esc_html__('Select topbar font weight and size.', 'sway'),
        'required' => array('tek-topbar','equals', true),
        'google' => true,
        'font-family' => true,
        'font-style' => true,
        'font-size' => true,
        'line-height' => false,
        'color' => false,
        'text-align' => false,
        'all_styles' => false,
        'units' => 'px',
      ),
      array(
        'id' => 'tek-topbar-bg-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Topbar Background Color', 'sway'),
        'subtitle' => esc_html__('Edit  topbar background.', 'sway'),
        'default' => '',
        'validate' => 'color',
        'required' => array('tek-topbar','equals', true),
      ),
      array(
        'id' => 'tek-topbar-text-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Topbar Text Color', 'sway'),
        'subtitle' => esc_html__('Edit  topbar text & links color.', 'sway'),
        'default' => '',
        'validate' => 'color',
        'required' => array('tek-topbar','equals', true),
      ),
      array(
        'id' => 'tek-topbar-hover-text-color',
        'type' => 'color',
        'transparent' => false,
        'title' => esc_html__('Topbar Text Hover Color', 'sway'),
        'subtitle' => esc_html__('Edit  topbar links color on mouse over.', 'sway'),
        'default' => '',
        'validate' => 'color',
        'required' => array('tek-topbar','equals', true),
      ),
    )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Duplicate-Window',
      'title' => esc_html__('Popup Modal', 'sway'),
      'desc' => esc_html__('Control the settings of the popup modal used to display additional content on all pages and posts, without sacrificing space. The modal box can be triggered using the button displayed near the Main Menu. This button can also be used to open a new page or smooth scroll to a page section ID.', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
              'id'=>'tek-btn-settings-section-start',
              'type' => 'section',
              'title' => esc_html__('Header Button Settings', 'sway'),
              'indent' => true,
          ),
          array(
              'id' => 'tek-modal-button',
              'type' => 'switch',
              'title' => esc_html__('Enable Header Button', 'sway'),
              'subtitle' => esc_html__('Enable/disable the header button. The button will be displayed near the main navigation area to the right.', 'sway'),
              'default' => false
          ),
          array(
              'id' => 'tek-header-button-text',
              'type' => 'text',
              'title' => esc_html__('Button Text', 'sway'),
              'subtitle' => esc_html__('Edit header button text.', 'sway'),
              'default' => 'Get a quote'
          ),
          array(
              'id' => 'tek-header-button-style',
              'type' => 'button_set',
              'title' => esc_html__('Button Style', 'sway'),
              'subtitle' => esc_html__('Edit header button style.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'solid-button' => 'Solid',
                  'outline-button' => 'Outline',
              ),
              'default' => 'outline-button'
          ),
          array(
              'id' => 'tek-header-button-color',
              'type' => 'button_set',
              'title' => esc_html__('Button Color Scheme', 'sway'),
              'subtitle' => esc_html__('Edit header button color scheme.  Primary and secondary colors can be set in Theme Options > Global Options > Color schemes.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'primary-color' => 'Primary color',
                  'secondary-color' => 'Secondary color',
              ),
              'default' => 'primary-color'
          ),
          array(
              'id' => 'tek-header-button-hover-style',
              'type' => 'select',
              'title' => esc_html__('Button Hover State', 'sway'),
              'subtitle' => esc_html__('Edit header button style on mouse over.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'default_header_btn' => 'Default',
                  'hover_solid_primary' => 'Solid - Primary color',
                  'hover_solid_secondary' => 'Solid - Secondary color',
                  "hover_solid_white" => "Solid - White color",
                  'hover_outline_primary' => 'Outline - Primary color',
                  'hover_outline_secondary' => 'Outline - Secondary color',
                  "hover_outline_white" => "Outline - White color",
              ),
              'default' => 'default_header_btn'
          ),
          array(
              'id' => 'tek-header-button-action',
              'type' => 'button_set',
              'title' => esc_html__('Button Action', 'sway'),
              'subtitle' => esc_html__('Select button action: Open modal / Scroll to a section / Open a new page.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  '1' => 'Open Modal Box',
                  '2' => 'Scroll to section',
                  '3' => 'Open a new page'
              ),
              'default' => '1'
          ),
          array(
              'id'=>'tek-btn-settings-section-end',
              'type' => 'section',
              'indent' => false,
          ),
          array(
              'id'=>'tek-modal-section-start',
              'type' => 'section',
              'title' => esc_html__('Modal Box Settings', 'sway'),
              'indent' => true,
              'required' => array('tek-header-button-action','equals','1'),
          ),
          array(
              'id' => 'tek-modal-title',
              'type' => 'text',
              'title' => esc_html__('Modal Heading', 'sway'),
              'subtitle' => esc_html__('Heading text for the modal.', 'sway'),
              'required' => array('tek-header-button-action','equals','1'),
              'default' => 'Let\'s get in touch'
          ),
          array(
              'id' => 'tek-modal-subtitle',
              'type' => 'editor',
              'title' => esc_html__('Modal Contents', 'sway'),
              'subtitle' => esc_html__('Content text for the modal. HTML is allowed.', 'sway'),
              'required' => array('tek-header-button-action','equals','1'),
              'default' => '',
              'args' => array(
                'teeny' => true,
                'textarea_rows' => 10,
                'media_buttons' => false,
              ),
          ),
          array(
              'id' => 'tek-modal-bg-image',
              'type' => 'media',
              'readonly' => false,
              'url' => true,
              'title' => esc_html__('Modal Background Image', 'sway'),
              'subtitle' => esc_html__('Upload modal background image.', 'sway'),
              'required' => array('tek-header-button-action','equals','1'),
              'default' => '',
          ),
          array(
              'id' => 'tek-modal-contact-links',
              'type' => 'switch',
              'title' => esc_html__('Contact Links', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the phone and email links. The links can be configured in the Business Info panel.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-modal-socials',
              'type' => 'switch',
              'title' => esc_html__('Social Icons', 'sway'),
              'subtitle' => esc_html__('Enable/Disable social icons list. The list can be configured in the Business Info panel.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-modal-form-select',
              'type' => 'select',
              'title' => esc_html__('Contact Form Plugin', 'sway'),
              'subtitle' => esc_html__('Display a contact form inside the Modal Box. Select the contact vendor from the dropdown list.', 'sway'),
              'required' => array('tek-header-button-action','equals','1'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  '1' => 'Contact Form 7',
                  '2' => 'Ninja Forms',
                  '3' => 'Gravity Forms',
                  '4' => 'WP Forms',
                  '5' => 'Other',
              ),
              'default' => '1'
          ),
          array(
              'id' => 'tek-modal-contactf7-formid',
              'type' => 'select',
              'data' => 'posts',
              'args' => array( 'post_type' => 'wpcf7_contact_form', 'posts_per_page' => -1, ),
              'title' => esc_html__('Contact Form 7 Title', 'sway'),
              'subtitle' => esc_html__('Select the Contact Form 7 from the dropdown. The list is automatically populated.', 'sway'),
              'required' => array('tek-modal-form-select','equals','1'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'default' => ''
          ),
          array(
              'id' => 'tek-modal-ninja-formid',
              'type' => 'text',
              'title' => esc_html__('Ninja Form ID', 'sway'),
              'required' => array('tek-modal-form-select','equals','2'),
              'default' => ''
          ),
          array(
              'id' => 'tek-modal-gravity-formid',
              'type' => 'text',
              'title' => esc_html__('Gravity Form ID', 'sway'),
              'required' => array('tek-modal-form-select','equals','3'),
              'default' => ''
          ),
          array(
              'id' => 'tek-modal-wp-formid',
              'type' => 'text',
              'title' => esc_html__('WP Form ID', 'sway'),
              'required' => array('tek-modal-form-select','equals','4'),
              'default' => ''
          ),
          array(
              'id' => 'tek-modal-other-form-shortcode',
              'type' => 'text',
              'title' => esc_html__('Form Shortcode', 'sway'),
              'subtitle' => esc_html__('Insert the shortcode for a custom contact form plugin.', 'sway'),
              'required' => array('tek-modal-form-select','equals','5'),
              'default' => ''
          ),
          array(
              'id' => 'tek-modal-css-class',
              'type' => 'text',
              'title' => esc_html__('CSS Class', 'sway'),
              'subtitle' => esc_html__('Add a class to the wrapping HTML element for further CSS customization.', 'sway'),
              'default' => ''
          ),
          array(
              'id'=>'tek-modal-section-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-header-button-action','equals','1'),
          ),
          array(
              'id'=>'tek-scroll-section-start',
              'type' => 'section',
              'title' => esc_html__('Scroll Section Settings', 'sway'),
              'indent' => true,
              'required' => array('tek-header-button-action','equals','2'),
          ),
          array(
              'id' => 'tek-scroll-id',
              'type' => 'text',
              'title' => esc_html__('Scroll to Section ID', 'sway'),
              'required' => array('tek-header-button-action','equals','2'),
              'default' => '#download-sway'
          ),
          array(
              'id'=>'tek-scroll-section-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-header-button-action','equals','2'),
          ),
          array(
              'id'=>'tek-new-page-settings-start',
              'type' => 'section',
              'title' => esc_html__('New Page Link Settings', 'sway'),
              'indent' => true,
              'required' => array('tek-header-button-action','equals','3'),
          ),
          array(
              'id' => 'tek-button-new-page',
              'type' => 'text',
              'title' => esc_html__('Button Link', 'sway'),
              'required' => array('tek-header-button-action','equals','3'),
              'default' => '#'
          ),
          array(
              'id' => 'tek-button-target',
              'type' => 'button_set',
              'title' => esc_html__('Link Target', 'sway'),
              'required' => array('tek-header-button-action','equals','3'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'new-page' => 'Open in a new page',
                  'same-page' => 'Open in same page'
              ),
              'default' => 'new-page'
          ),
          array(
              'id'=>'tek-new-page-settings-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-header-button-action','equals','3'),
          ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Sidebar-Window',
      'title' => esc_html__('Side Panel', 'sway'),
      'desc' => esc_html__('Control the settings of the Side Panel used to display additional content on all pages and posts, without sacrificing space. The Side Panel can be triggered using the Header Button displayed near the Main Menu. This button can also be used to open a new page or smooth scroll to a page section ID.', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
              'id'=>'tek-panel-btn-section-start',
              'type' => 'section',
              'title' => esc_html__('Header Button Settings', 'sway'),
              'indent' => true,
          ),
          array(
              'id' => 'tek-panel-button',
              'type' => 'switch',
              'title' => esc_html__('Enable Header Button', 'sway'),
              'subtitle' => esc_html__('Enable/disable the side panel. The button will be displayed near the main navigation area to the right.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-panel-button-text',
              'type' => 'text',
              'title' => esc_html__('Button Text', 'sway'),
              'subtitle' => esc_html__('Edit header button text.', 'sway'),
              'default' => 'Purchase Sway'
          ),
          array(
              'id' => 'tek-panel-button-style',
              'type' => 'button_set',
              'title' => esc_html__('Button Style', 'sway'),
              'subtitle' => esc_html__('Edit header button style.', 'sway'),
              'subtitle' => esc_html__('Edit header button text.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'solid-button' => 'Solid',
                  'outline-button' => 'Outline',
              ),
              'default' => 'solid-button'
          ),
          array(
              'id' => 'tek-panel-button-color',
              'type' => 'button_set',
              'title' => esc_html__('Button Color Scheme', 'sway'),
              'subtitle' => esc_html__('Edit header button color scheme.  Primary and secondary colors can be set in Theme Options > Global Options > Color schemes.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'primary-color' => 'Primary color',
                  'secondary-color' => 'Secondary color',
              ),
              'default' => 'primary-color'
          ),
          array(
              'id' => 'tek-panel-button-hover-style',
              'type' => 'select',
              'title' => esc_html__('Button Hover State', 'sway'),
              'subtitle' => esc_html__('Edit header button style on mouse over.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'default_header_btn' => 'Default',
                  'hover_solid_primary' => 'Solid - Primary color',
                  'hover_solid_secondary' => 'Solid - Secondary color',
                  "hover_solid_white" => "Solid - White color",
                  'hover_outline_primary' => 'Outline - Primary color',
                  'hover_outline_secondary' => 'Outline - Secondary color',
                  "hover_outline_white" => "Outline - White color",
              ),
              'default' => 'default_header_btn'
          ),
          array(
              'id' => 'tek-panel-button-action',
              'type' => 'button_set',
              'title' => esc_html__('Button Action', 'sway'),
              'subtitle' => esc_html__('Select button action: Open side panel / Scroll to a section / Open a new page.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  '1' => 'Open Side Panel',
                  '2' => 'Scroll to section',
                  '3' => 'Open a new page'
              ),
              'default' => '1'
          ),
          array(
              'id'=>'tek-panel-btn-section-end',
              'type' => 'section',
              'indent' => false,
          ),
          array(
              'id'=>'tek-panel-section-start',
              'type' => 'section',
              'title' => esc_html__('Side Panel Settings', 'sway'),
              'indent' => true,
              'required' => array('tek-panel-button-action','equals','1'),
          ),
          array(
              'id' => 'tek-panel-title',
              'type' => 'text',
              'title' => esc_html__('Panel Heading', 'sway'),
              'subtitle' => esc_html__('Heading text for the side panel.', 'sway'),
              'required' => array('tek-panel-button-action','equals','1'),
              'default' => 'Enquire now'
          ),
          array(
              'id' => 'tek-panel-subtitle',
              'type' => 'editor',
              'title' => esc_html__('Panel Contents', 'sway'),
              'subtitle' => esc_html__('Content text for the side panel.', 'sway'),
              'required' => array('tek-panel-button-action','equals','1'),
              'default' => 'Give us a call or fill in the form below and we will contact you. We endeavor to answer all inquiries within 24 hours on business days.',
                  'args' => array(
                'teeny' => true,
                'textarea_rows' => 10,
                'media_buttons' => false,
                    ),
          ),
          array(
              'id' => 'tek-panel-contact-links',
              'type' => 'switch',
              'title' => esc_html__('Contact Links', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the phone and email links. The links can be configured in the Business Info panel.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-panel-socials',
              'type' => 'switch',
              'title' => esc_html__('Social Icons', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the social icons list. The list can be configured in the Business Info panel.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-panel-form-select',
              'type' => 'select',
              'title' => esc_html__('Contact Form Plugin', 'sway'),
              'subtitle' => esc_html__('Display a contact form inside the Side Panel. Select the contact vendor from the dropdown list.', 'sway'),
              'required' => array('tek-panel-button-action','equals','1'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  '1' => 'Contact Form 7',
                  '2' => 'Ninja Forms',
                  '3' => 'Gravity Forms',
                  '4' => 'WP Forms',
                  '5' => 'Other',
              ),
              'default' => '1'
          ),
          array(
              'id' => 'tek-panel-contactf7-formid',
              'type' => 'select',
              'data' => 'posts',
              'args' => array( 'post_type' => 'wpcf7_contact_form', 'posts_per_page' => -1, ),
              'title' => esc_html__('Contact Form 7 Title', 'sway'),
              'subtitle' => esc_html__('Select the Contact Form 7 from the dropdown. The list is automatically populated.', 'sway'),
              'required' => array('tek-panel-form-select','equals','1'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'default' => ''
          ),
          array(
              'id' => 'tek-panel-ninja-formid',
              'type' => 'text',
              'title' => esc_html__('Ninja Form ID', 'sway'),
              'required' => array('tek-panel-form-select','equals','2'),
              'default' => ''
          ),
          array(
              'id' => 'tek-panel-gravity-formid',
              'type' => 'text',
              'title' => esc_html__('Gravity Form ID', 'sway'),
              'required' => array('tek-panel-form-select','equals','3'),
              'default' => ''
          ),
          array(
              'id' => 'tek-panel-wp-formid',
              'type' => 'text',
              'title' => esc_html__('WP Form ID', 'sway'),
              'required' => array('tek-panel-form-select','equals','4'),
              'default' => ''
          ),
          array(
              'id' => 'tek-panel-other-form-shortcode',
              'type' => 'text',
              'title' => esc_html__('Form Shortcode', 'sway'),
              'subtitle' => esc_html__('Insert the shortcode for a custom contact form plugin.', 'sway'),
              'required' => array('tek-panel-form-select','equals','5'),
              'default' => ''
          ),
          array(
              'id' => 'tek-panel-css-class',
              'type' => 'text',
              'title' => esc_html__('CSS Class', 'sway'),
              'subtitle' => esc_html__('Add a class to the wrapping HTML element for further CSS customization.', 'sway'),
              'default' => ''
          ),
          array(
              'id'=>'tek-panel-section-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-panel-button-action','equals','1'),
          ),
          array(
              'id'=>'tek-panel-scroll-section-start',
              'type' => 'section',
              'title' => esc_html__('Scroll Section Settings', 'sway'),
              'indent' => true,
              'required' => array('tek-panel-button-action','equals','2'),
          ),
          array(
              'id' => 'tek-panel-scroll-id',
              'type' => 'text',
              'title' => esc_html__('Scroll to Section ID', 'sway'),
              'required' => array('tek-panel-button-action','equals','2'),
              'default' => '#download-sway'
          ),
          array(
              'id'=>'tek-panel-scroll-section-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-panel-button-action','equals','2'),
          ),
          array(
              'id'=>'tek-panel-new-page-settings-start',
              'type' => 'section',
              'title' => esc_html__('New Page Settings', 'sway'),
              'indent' => true,
              'required' => array('tek-panel-button-action','equals','3'),
          ),
          array(
              'id' => 'tek-panel-button-new-page',
              'type' => 'text',
              'title' => esc_html__('Button Link', 'sway'),
              'required' => array('tek-panel-button-action','equals','3'),
              'default' => '#'
          ),
          array(
              'id' => 'tek-panel-button-target',
              'type' => 'button_set',
              'title' => esc_html__('Link Target', 'sway'),
              'required' => array('tek-panel-button-action','equals','3'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'new-page' => 'Open in a new page',
                  'same-page' => 'Open in same page'
              ),
              'default' => 'new-page'
          ),
          array(
              'id'=>'tek-panel-new-page-settings-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-panel-button-action','equals','3'),
          ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Width-Window',
      'title' => esc_html__('Layout', 'sway'),
      'desc' => esc_html__('General layout settings that are applied site-wide.', 'sway'),
      'fields' => array(
          array(
              'id' => 'tek-layout-style',
              'type' => 'button_set',
              'title' => esc_html__('Layout Style', 'sway'),
              'subtitle' => esc_html__('Select the general width for the entire site.', 'sway'),
              'options' => array(
                  'full-width' => 'Full-Width',
                  'boxed' => 'Boxed'
               ),
              'default' => 'full-width'
          ),
          array(
              'id' => 'tek-layout-boxed-width',
              'type' => 'slider',
              'title' => esc_html__( 'Content Width', 'sway' ),
              'subtitle' => esc_html__( 'Control the width of the boxed content area.', 'sway' ),
              'default' => 1560,
              'min' => 1280,
              'max' => 1920,
              'required' => array('tek-layout-style','equals','boxed'),
          ),
          array(
              'id' => 'tek-layout-boxed-body-bg',
              'type' => 'background',
              'transparent' => false,
              'title' => esc_html__('Body Background Settings', 'sway'),
              'subtitle' => esc_html__('Option available only if the layout style Boxed is selected. Configure the body background settings.', 'sway'),
              'preview' => false,
              'required' => array('tek-layout-style','equals','boxed'),
          ),
          array(
              'id' => 'tek-layout-fw-content-bg',
              'type' => 'color',
              'transparent' => false,
              'title' => esc_html__('Content Background Color', 'sway'),
              'subtitle' => esc_html__('Select the content background color.', 'sway'),
              'default' => '',
              'validate' => 'color'
          ),
      )
  ) );

  Redux::setSection( $opt_name, array(
    'icon' => 'iconsmind-Download-Window',
    'title' => esc_html__('Footer', 'sway'),
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Settings-Window',
      'title' => esc_html__('Footer Settings', 'sway'),
      'desc' => esc_html__('Footer global options.', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
            'id'=>'tek-footer-global-options-start',
            'type' => 'section',
            'title' => esc_html__('Footer Global Options', 'sway'),
            'indent' => true,
          ),
          array(
            'id' => 'tek-footer-width',
            'type' => 'button_set',
            'title' => esc_html__('Footer Width', 'sway'),
            'subtitle' => esc_html__('Control the width of the footer area.', 'sway'),
            'options' => array(
              'contained' => 'Contained',
              'fullwidth' => 'Full-Width'
             ),
            'default' => 'contained'
          ),
          array(
              'id' => 'tek-footer-fixed',
              'type' => 'switch',
              'title' => esc_html__('Fixed Footer', 'sway'),
              'subtitle' => esc_html__('Enable/disable the footer fixed scroll effect.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-footer-bar',
              'type' => 'switch',
              'title' => esc_html__('Footer Bar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer bar. Contains footer menu and social icons.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-upper-footer-color',
              'type' => 'color',
              'transparent' => false,
              'title' => esc_html__('Upper Footer Background Color', 'sway'),
              'subtitle' => esc_html__('Select the upper footer background color.', 'sway'),
              'default' => '#212240',
              'validate' => 'color'
          ),
          array(
              'id' => 'tek-lower-footer-color',
              'type' => 'color',
              'transparent' => false,
              'title' => esc_html__('Lower Footer Background Color', 'sway'),
              'subtitle' => esc_html__('Select the lower footer background color.', 'sway'),
              'default' => '#212240',
              'validate' => 'color'
          ),
          array(
          	'id'=>'tek-footer-global-options-end',
          	'type' => 'section',
          	'indent' => false,
          ),
          array(
          	'id'=>'tek-footer-background-image-start',
          	'type' => 'section',
          	'title' => esc_html__('Footer Background Image', 'sway'),
          	'indent' => true,
          ),
          array(
            'id' => 'tek-footer-background-image',
            'type' => 'media',
            'readonly' => false,
            'url' => true,
            'title' => esc_html__('Background Image', 'sway'),
            'subtitle' => esc_html__('Select an image for the footer area. If left empty, the footer background color will be used.', 'sway'),
          ),
          array(
            'id' => 'tek-footer-background-style',
            'type' => 'select',
            'title' => esc_html__('Background Style', 'sway'),
            'subtitle' => esc_html__('Select how the background image repeats.', 'sway'),
            'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
            'options' => array(
              'cover' => 'Cover',
              'contain' => 'Contain',
              'no-repeat' => 'No repeat',
              'repeat' => 'Repeat',
             ),
            'default' => 'cover'
          ),
          array(
              'id' => 'tek-footer-background-image-position',
              'type' => 'select',
              'title' => esc_html__('Background Position', 'sway'),
              'subtitle' => esc_html__('Select how the background image is positioned.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                'left top' => 'left top',
                'left center' => 'left center',
                'left bottom' => 'left bottom',
                'right top' => 'right top',
                'right center' => 'right center',
                'right bottom' => 'right bottom',
                'center top' => 'center top',
                'center center' => 'center center',
                'center bottom' => 'center bottom',
              ),
              'required' => array('tek-footer-background-style','equals','no-repeat'),
              'default' => 'left top'
          ),
          array(
          	'id'=>'tek-footer-background-image-end',
          	'type' => 'section',
          	'indent' => false,
          ),
        )
    ) );

    Redux::setSection( $opt_name, array(
        'icon' => 'iconsmind-Font-Window',
        'title' => esc_html__('Footer Typography', 'sway'),
        'desc' => esc_html__('Footer typography settings.', 'sway'),
        'subsection' => true,
        'fields' => array(

          array(
              'id' => 'tek-footer-typo',
              'type' => 'typography',
              'title' => esc_html__('Footer Typography', 'sway'),
              'subtitle' => esc_html__('Edit the typography settings of the footer.', 'sway'),
              'google' => true,
              'font-style' => true,
              'font-size' => true,
              'line-height' => false,
              'text-transform' => true,
              'color' => false,
              'text-align' => false,
              'letter-spacing' => true,
              'all_styles' => false,
              'default' => array(
                  'font-weight' => '',
                  'font-family' => '',
                  'font-size' => '',
                  'text-transform' => '',
              ),
              'units' => 'px',
          ),
          array(
              'id' => 'tek-footer-heading-color',
              'type' => 'color',
              'transparent' => false,
              'title' => esc_html__('Footer Heading Color', 'sway'),
              'subtitle' => esc_html__('Select the text color used for the footer widget titles.', 'sway'),
              'default' => '#ffffff',
              'validate' => 'color'
          ),
          array(
              'id' => 'tek-footer-text-color',
              'type' => 'color',
              'transparent' => false,
              'title' => esc_html__('Footer Text Color', 'sway'),
              'subtitle' => esc_html__('Select the text color used for the footer widget paragraphs.', 'sway'),
              'default' => '#BDBEC8',
              'validate' => 'color'
          ),
          array(
                'id' => 'tek-footer-link-color',
                'type' => 'link_color',
                'title' => esc_html__( 'Footer Link Color', 'sway' ),
                'subtitle' => esc_html__('Select the text color used for the footer links.', 'sway'),
                'active' => false,
                'visited' => false,
          ),
          array(
              'id' => 'tek-footer-link-hover-effect',
              'type' => 'button_set',
              'title' => esc_html__('Footer Link Hover Effect', 'sway'),
              'subtitle' => esc_html__('Select the hover effect on footer links.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'default-footer-link-effect' => 'Default',
                  'underline-effect' => 'Underline animation',
              ),
              'default' => 'underline-effect',
          ),
        )
    ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Network-Window',
      'title' => esc_html__('Footer Widgets', 'sway'),
      'desc' => esc_html__('Footer widgets settings.', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
            'id' => 'tek-upper-footer',
            'type' => 'switch',
            'title' => esc_html__('Footer Widgets Section', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the footer widget section. Contains footer widget areas.', 'sway'),
            'default' => true
          ),
          array(
          	'id'=>'tek-footer-first-widget-section-start',
          	'type' => 'section',
          	'title' => esc_html__('First Widget Area', 'sway'),
            'required' => array('tek-upper-footer', 'equals', true),
          	'indent' => true,
          ),
          array(
              'id' => 'tek-footer-first-widget-switch',
              'type' => 'switch',
              'title' => esc_html__('First Widget Area', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer first widget area.', 'sway'),
              'default' => true
          ),
          array(
            'id' => 'tek-footer-first-widget-width',
            'type' => 'button_set',
            'title' => esc_html__('First Widget Width', 'sway'),
            'subtitle' => esc_html__('Control the width of the first footer widget area.', 'sway'),
            'options' => array(
              '6' => '1/2',
              '4' => '1/3',
              '3' => '1/4',
              '2-4' => '1/5',
              '2' => '1/6',
             ),
            'default' => '4',
            'required' => array('tek-footer-first-widget-switch', 'equals', true),
          ),
          array(
            'id' => 'tek-footer-first-widget-text-align',
            'type' => 'button_set',
            'title' => esc_html__('First Widget Text Align', 'sway'),
            'subtitle' => esc_html__('Select content text alignment for the first footer widget area.', 'sway'),
            'options' => array(
              'text-left' => 'Left',
              'text-center' => 'Center',
              'text-right' => 'Right',
             ),
            'default' => 'text-left',
            'required' => array('tek-footer-first-widget-switch', 'equals', true),
          ),
          array(
          	'id'=>'tek-footer-first-widget-section-end',
          	'type' => 'section',
          	'indent' => false,
          ),
          array(
          	'id'=>'tek-footer-second-widget-section-start',
          	'type' => 'section',
          	'title' => esc_html__('Second Widget Area', 'sway'),
            'required' => array('tek-upper-footer', 'equals', true),
          	'indent' => true,
          ),
          array(
              'id' => 'tek-footer-second-widget-switch',
              'type' => 'switch',
              'title' => esc_html__('Second Widget Area', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer second widget area.', 'sway'),
              'default' => true
          ),
          array(
            'id' => 'tek-footer-second-widget-width',
            'type' => 'button_set',
            'title' => esc_html__('Second Widget Width', 'sway'),
            'subtitle' => esc_html__('Control the width of the second footer widget area.', 'sway'),
            'options' => array(
              '6' => '1/2',
              '4' => '1/3',
              '3' => '1/4',
              '2-4' => '1/5',
              '2' => '1/6',
             ),
            'default' => '2',
            'required' => array('tek-footer-second-widget-switch', 'equals', true),
          ),
          array(
            'id' => 'tek-footer-second-widget-text-align',
            'type' => 'button_set',
            'title' => esc_html__('Second Widget Text Align', 'sway'),
            'subtitle' => esc_html__('Select content text alignment for the second footer widget area.', 'sway'),
            'options' => array(
              'text-left' => 'Left',
              'text-center' => 'Center',
              'text-right' => 'Right',
             ),
            'default' => 'text-left',
            'required' => array('tek-footer-second-widget-switch', 'equals', true),
          ),
          array(
          	'id'=>'tek-footer-second-widget-section-end',
          	'type' => 'section',
          	'indent' => false,
          ),
          array(
          	'id'=>'tek-footer-third-widget-section-start',
          	'type' => 'section',
          	'title' => esc_html__('Third Widget Area', 'sway'),
            'required' => array('tek-upper-footer', 'equals', true),
          	'indent' => true,
          ),
          array(
              'id' => 'tek-footer-third-widget-switch',
              'type' => 'switch',
              'title' => esc_html__('Third Widget Area', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer third widget area.', 'sway'),
              'default' => true
          ),
          array(
            'id' => 'tek-footer-third-widget-width',
            'type' => 'button_set',
            'title' => esc_html__('Third Widget Width', 'sway'),
            'subtitle' => esc_html__('Control the width of the third footer widget area.', 'sway'),
            'options' => array(
              '6' => '1/2',
              '4' => '1/3',
              '3' => '1/4',
              '2-4' => '1/5',
              '2' => '1/6',
             ),
            'default' => '2',
            'required' => array('tek-footer-third-widget-switch', 'equals', true),
          ),
          array(
            'id' => 'tek-footer-third-widget-text-align',
            'type' => 'button_set',
            'title' => esc_html__('Third Widget Text Align', 'sway'),
            'subtitle' => esc_html__('Select content text alignment for the third footer widget area.', 'sway'),
            'options' => array(
              'text-left' => 'Left',
              'text-center' => 'Center',
              'text-right' => 'Right',
             ),
            'default' => 'text-left',
            'required' => array('tek-footer-third-widget-switch', 'equals', true),
          ),
          array(
          	'id'=>'tek-footer-third-widget-section-end',
          	'type' => 'section',
          	'indent' => false,
          ),
          array(
          	'id'=>'tek-footer-fourth-widget-section-start',
          	'type' => 'section',
          	'title' => esc_html__('Fourth Widget Area', 'sway'),
            'required' => array('tek-upper-footer', 'equals', true),
          	'indent' => true,
          ),
          array(
              'id' => 'tek-footer-fourth-widget-switch',
              'type' => 'switch',
              'title' => esc_html__('Fourth Widget Area', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer fourth widget area.', 'sway'),
              'default' => true
          ),
          array(
            'id' => 'tek-footer-fourth-widget-width',
            'type' => 'button_set',
            'title' => esc_html__('Fourth Widget Width', 'sway'),
            'subtitle' => esc_html__('Control the width of the fourth footer widget area.', 'sway'),
            'options' => array(
              '6' => '1/2',
              '4' => '1/3',
              '3' => '1/4',
              '2-4' => '1/5',
              '2' => '1/6',
             ),
            'default' => '2',
            'required' => array('tek-footer-fourth-widget-switch', 'equals', true),
          ),
          array(
            'id' => 'tek-footer-fourth-widget-text-align',
            'type' => 'button_set',
            'title' => esc_html__('Fourth Widget Text Align', 'sway'),
            'subtitle' => esc_html__('Select content text alignment for the fourth footer widget area.', 'sway'),
            'options' => array(
              'text-left' => 'Left',
              'text-center' => 'Center',
              'text-right' => 'Right',
             ),
            'default' => 'text-left',
            'required' => array('tek-footer-fourth-widget-switch', 'equals', true),
          ),
          array(
          	'id'=>'tek-footer-fourth-widget-section-end',
          	'type' => 'section',
          	'indent' => false,
          ),
          array(
          	'id'=>'tek-footer-fifth-widget-section-start',
          	'type' => 'section',
          	'title' => esc_html__('Fifth Widget Area', 'sway'),
            'required' => array('tek-upper-footer', 'equals', true),
          	'indent' => true,
          ),
          array(
              'id' => 'tek-footer-fifth-widget-switch',
              'type' => 'switch',
              'title' => esc_html__('Fifth Widget Area', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer fifth widget area.', 'sway'),
              'default' => true
          ),
          array(
            'id' => 'tek-footer-fifth-widget-width',
            'type' => 'button_set',
            'title' => esc_html__('Fifth Widget Width', 'sway'),
            'subtitle' => esc_html__('Control the width of the fifth footer widget area.', 'sway'),
            'options' => array(
              '6' => '1/2',
              '4' => '1/3',
              '3' => '1/4',
              '2-4' => '1/5',
              '2' => '1/6',
             ),
            'default' => '2',
            'required' => array('tek-footer-fifth-widget-switch', 'equals', true),
          ),
          array(
            'id' => 'tek-footer-fifth-widget-text-align',
            'type' => 'button_set',
            'title' => esc_html__('Fifth Widget Text Align', 'sway'),
            'subtitle' => esc_html__('Select content text alignment for the fifth footer widget area.', 'sway'),
            'options' => array(
              'text-left' => 'Left',
              'text-center' => 'Center',
              'text-right' => 'Right',
             ),
            'default' => 'text-left',
            'required' => array('tek-footer-fifth-widget-switch', 'equals', true),
          ),
          array(
          	'id'=>'tek-footer-fifth-widget-section-end',
          	'type' => 'section',
          	'indent' => false,
          ),
          array(
          	'id'=>'tek-footer-sixth-widget-section-start',
          	'type' => 'section',
          	'title' => esc_html__('Sixth Widget Area', 'sway'),
            'required' => array('tek-upper-footer', 'equals', true),
          	'indent' => true,
          ),
          array(
              'id' => 'tek-footer-sixth-widget-switch',
              'type' => 'switch',
              'title' => esc_html__('Sixth Widget Area', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer sixth widget area.', 'sway'),
              'default' => false
          ),
          array(
            'id' => 'tek-footer-sixth-widget-width',
            'type' => 'button_set',
            'title' => esc_html__('Sixth Widget Width', 'sway'),
            'subtitle' => esc_html__('Control the width of the sixth footer widget area.', 'sway'),
            'options' => array(
              '6' => '1/2',
              '4' => '1/3',
              '3' => '1/4',
              '2-4' => '1/5',
              '2' => '1/6',
             ),
            'default' => '2',
            'required' => array('tek-footer-sixth-widget-switch', 'equals', true),
          ),
          array(
            'id' => 'tek-footer-sixth-widget-text-align',
            'type' => 'button_set',
            'title' => esc_html__('Sixth Widget Text Align', 'sway'),
            'subtitle' => esc_html__('Select content text alignment for the sixth footer widget area.', 'sway'),
            'options' => array(
              'text-left' => 'Left',
              'text-center' => 'Center',
              'text-right' => 'Right',
             ),
            'default' => 'text-left',
            'required' => array('tek-footer-sixth-widget-switch', 'equals', true),
          ),
          array(
          	'id'=>'tek-footer-sixth-widget-section-end',
          	'type' => 'section',
          	'indent' => false,
          ),
        )
    ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-URL-Window',
      'title' => esc_html__('Footer Copyright', 'sway'),
      'desc' => esc_html__('Footer copyright settings.', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
              'id' => 'tek-lower-footer-switch',
              'type' => 'switch',
              'title' => esc_html__('Footer Copyright Section', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the footer copyright section. Contains the copyright text.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-footer-text',
              'type' => 'editor',
              'title' => esc_html__('Copyright Text', 'sway'),
              'subtitle' => esc_html__('Enter footer bottom copyright text', 'sway'),
              'default' => 'Sway by KeyDesign. All rights reserved.',
              'args' => array(
                  'teeny' => true,
                  'textarea_rows' => 3,
                  'media_buttons' => false,
              ),
              'required' => array('tek-lower-footer-switch', 'equals', true),
          ),
          array(
              'id' => 'tek-footer-copyright-alignment',
              'type' => 'button_set',
              'title' => esc_html__('Copyright Text Alignment', 'sway'),
              'subtitle' => esc_html__('Select the text alignment with footer copyright area.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'copyright-left' => 'Left',
                  'copyright-center' => 'Center',
                  'copyright-right' => 'Right',
                  'copyright-justify' => 'Justify',
              ),
              'default' => 'copyright-center',
              'required' => array('tek-lower-footer-switch', 'equals', true),
          ),

      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Font-Window',
      'title' => esc_html__('Typography', 'sway'),
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Aa',
      'title' => esc_html__('General Fonts', 'sway'),
      'desc' => esc_html__('Customize the font properties across the entire website. Choose from over 800 open-source Google fonts, free for commercial use.', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
            'id'   => 'tek-typography-info',
            'type' => 'info',
            'desc' => esc_html__('Important! Resetting this section will result in losing the demo imported settings and default to the theme original settings.', 'sway')
          ),
          array(
              'id' => 'tek-default-typo',
              'type' => 'typography',
              'title' => esc_html__('Body Typography', 'sway'),
              'subtitle' => esc_html__('Configure the global body font typography.', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'all_styles' => false,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h1-heading',
              'type' => 'typography',
              'title' => esc_html__('H1 Heading', 'sway'),
              'subtitle' => esc_html__('Configure H1 heading typography.', 'sway'),
              'line-height' => true,
              'text-align' => true,
              'text-transform' => true,
              'letter-spacing' => true,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h2-heading',
              'type' => 'typography',
              'title' => esc_html__('H2 Heading', 'sway'),
              'subtitle' => esc_html__('Configure H2 heading typography.', 'sway'),
              'line-height' => true,
              'text-align' => true,
              'text-transform' => true,
              'letter-spacing' => true,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h3-heading',
              'type' => 'typography',
              'title' => esc_html__('H3 Heading', 'sway'),
              'subtitle' => esc_html__('Configure H3 heading typography.', 'sway'),
              'line-height' => true,
              'text-align' => true,
              'text-transform' => true,
              'letter-spacing' => true,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h4-heading',
              'type' => 'typography',
              'title' => esc_html__('H4 Heading', 'sway'),
              'subtitle' => esc_html__('Configure H4 heading typography.', 'sway'),
              'line-height' => true,
              'text-align' => true,
              'text-transform' => true,
              'letter-spacing' => true,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h5-heading',
              'type' => 'typography',
              'title' => esc_html__('H5 Heading', 'sway'),
              'subtitle' => esc_html__('Configure H5 heading typography.', 'sway'),
              'line-height' => true,
              'text-align' => true,
              'text-transform' => true,
              'letter-spacing' => true,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h6-heading',
              'type' => 'typography',
              'title' => esc_html__('H6 Heading', 'sway'),
              'subtitle' => esc_html__('Configure H6 heading typography.', 'sway'),
              'line-height' => true,
              'text-align' => true,
              'text-transform' => true,
              'letter-spacing' => true,
              'units' => 'px',
          ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Font-Name',
      'title' => esc_html__('Typekit Fonts', 'sway'),
      'desc' => __('Typekit fonts are premium fonts that can be used only with an active monthly subscription to Adobe CC.', 'sway'),
      'subsection' => true,
      'fields' => array(
        array(
            'id' => 'tek-typekit-switch',
            'type' => 'switch',
            'title' => esc_html__('Enable Typekit', 'sway'),
            'subtitle' => esc_html__('Enable/Disable Typekit fonts.', 'sway'),
            'default' => false
        ),
        array(
            'id' => 'tek-typekit',
            'type' => 'text',
            'title' => esc_html__('Typekit ID', 'sway'),
            'subtitle' => esc_html__('Add Typekit ID. Only published data is accessible. Please make sure that any changes of a kit are updated.', 'sway'),
            'mode' => 'text',
            'default' => '',
            'theme' => 'chrome',
            'required' => array('tek-typekit-switch','equals', true),
        ),
        array(
            'id' => 'tek-body-typekit-selector',
            'type' => 'text',
            'title' => esc_html__('Body Typography', 'sway'),
            'subtitle' => esc_html__('Add the font family name used for the main body typography.', 'sway'),
            'default' => '',
            'required' => array('tek-typekit-switch','equals', true),
        ),
        array(
            'id' => 'tek-heading-typekit-selector',
            'type' => 'text',
            'title' => esc_html__('Headings Typography', 'sway'),
            'subtitle' => esc_html__('Add the font family name used for the main headings (H1 to H6) typography.', 'sway'),
            'default' => '',
            'required' => array('tek-typekit-switch','equals', true),
        ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Text-Effect',
      'title' => esc_html__('Custom Fonts', 'sway'),
      'desc' => esc_html__('Upload your own custom fonts. Only .ttf and .woff files are required.', 'sway'),
      'subsection' => true,
      'fields' => array(
        array(
            'id' => 'tek-custom-fonts-switch',
            'type' => 'switch',
            'title' => esc_html__('Enable Custom Fonts', 'sway'),
            'default' => false
        ),
        array(
            'id'=>'tek-primary-font-section-start',
            'type' => 'section',
            'title' => esc_html__('Primary Custom Font', 'sway'),
            'indent' => true,
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id' => 'tek-primary-ttf-font',
            'type' => 'media',
            'title' => esc_html__('Primary .ttf File', 'sway'),
            'subtitle' => esc_html__('Upload primary font .ttf file.', 'sway'),
            'readonly' => false,
            'preview' => false,
            'url' => true,
            'mode' => 'ttf',
            'library_filter' => 'ttf',
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id' => 'tek-primary-woff-font',
            'type' => 'media',
            'title' => esc_html__('Primary .woff File', 'sway'),
            'subtitle' => esc_html__('Upload primary font .woff file.', 'sway'),
            'readonly' => false,
            'preview' => false,
            'url' => true,
            'mode' => 'woff',
            'library_filter' => 'woff',
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id'=>'tek-primary-font-section-end',
            'type' => 'section',
            'indent' => false,
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id'=>'tek-secondary-font-section-start',
            'type' => 'section',
            'title' => esc_html__('Secondary Custom Font', 'sway'),
            'indent' => true,
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id' => 'tek-secondary-ttf-font',
            'type' => 'media',
            'title' => esc_html__('Secondary .ttf File', 'sway'),
            'subtitle' => esc_html__('Upload secondary font .ttf file.', 'sway'),
            'readonly' => false,
            'preview' => false,
            'url' => true,
            'mode' => 'ttf',
            'library_filter' => 'ttf',
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id' => 'tek-secondary-woff-font',
            'type' => 'media',
            'title' => esc_html__('Secondary .woff File', 'sway'),
            'subtitle' => esc_html__('Upload secondary font .woff file.', 'sway'),
            'readonly' => false,
            'preview' => false,
            'url' => true,
            'mode' => 'woff',
            'library_filter' => 'woff',
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id'=>'tek-secondary-font-section-end',
            'type' => 'section',
            'indent' => false,
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id'=>'tek-custom-font-selector-section-start',
            'type' => 'section',
            'title' => esc_html__('Custom Font Selector', 'sway'),
            'indent' => true,
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id' => 'tek-body-custom-font',
            'type' => 'select',
            'title' => esc_html__('Body Typography', 'sway'),
            'subtitle' => esc_html__('Select custom font to be used for the body text.', 'sway'),
            'select2' => array('allowClear' => true, 'minimumResultsForSearch' => '-1'),
            'options'  => array(
              'primary-custom-font' => 'Primary Custom Font',
              'secondary-custom-font' => 'Secondary Custom Font'
            ),
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id' => 'tek-headings-custom-font',
            'type' => 'select',
            'title' => esc_html__('Headings Typography', 'sway'),
            'subtitle' => esc_html__('Select custom font to be used for the headings text.', 'sway'),
            'select2' => array('allowClear' => true, 'minimumResultsForSearch' => '-1'),
            'options'  => array(
              'primary-custom-font' => 'Primary Custom Font',
              'secondary-custom-font' => 'Secondary Custom Font'
            ),
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
        array(
            'id'=>'tek-custom-font-selector-section-end',
            'type' => 'section',
            'indent' => false,
            'required' => array('tek-custom-fonts-switch','equals', true),
        ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Text-Box',
      'title' => esc_html__('Responsive Fonts', 'sway'),
      'desc' => esc_html__('Overwrite the default typography ( font sizes and line heights ) on mobile & tablet', 'sway'),
      'subsection' => true,
      'fields' => array(
      array(
              'id' => 'tek-default-typo-mobile',
              'type' => 'typography',
              'title' => esc_html__('Body Typography', 'sway'),
              'subtitle' => esc_html__('Overwrite body typography on mobile & tablet ', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'text-transform' => false,
              'letter-spacing' => false,
              'font-style' => false,
              'google' => true,
              'font-family' => true,
              'font-weight' => false,
              'color' => false,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h1-heading-mobile',
              'type' => 'typography',
              'title' => esc_html__('H1 Heading', 'sway'),
              'subtitle' => esc_html__('Overwrite H1 typography on mobile & tablet ', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'text-transform' => false,
              'letter-spacing' => false,
              'font-style' => false,
              'google' => true,
              'font-family' => true,
              'font-weight' => false,
              'color' => false,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h2-heading-mobile',
              'type' => 'typography',
              'title' => esc_html__('H2 Heading', 'sway'),
              'subtitle' => esc_html__('Overwrite H2 typography on mobile & tablet ', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'text-transform' => false,
              'letter-spacing' => false,
              'font-style' => false,
              'google' => true,
              'font-family' => true,
              'font-weight' => false,
              'color' => false,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h3-heading-mobile',
              'type' => 'typography',
              'title' => esc_html__('H3 Heading', 'sway'),
              'subtitle' => esc_html__('Overwrite H3 typography on mobile & tablet ', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'text-transform' => false,
              'letter-spacing' => false,
              'font-style' => false,
              'google' => true,
              'font-family' => true,
              'font-weight' => false,
              'color' => false,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h4-heading-mobile',
              'type' => 'typography',
              'title' => esc_html__('H4 Heading', 'sway'),
              'subtitle' => esc_html__('Overwrite H4 typography on mobile & tablet ', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'text-transform' => false,
              'letter-spacing' => false,
              'font-style' => false,
              'google' => true,
              'font-family' => true,
              'font-weight' => false,
              'color' => false,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h5-heading-mobile',
              'type' => 'typography',
              'title' => esc_html__('H5 Heading', 'sway'),
              'subtitle' => esc_html__('Overwrite H5 typography on mobile & tablet ', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'text-transform' => false,
              'letter-spacing' => false,
              'font-style' => false,
              'google' => true,
              'font-family' => true,
              'font-weight' => false,
              'color' => false,
              'units' => 'px',
          ),
          array(
              'id' => 'tek-h6-heading-mobile',
              'type' => 'typography',
              'title' => esc_html__('H6 Heading', 'sway'),
              'subtitle' => esc_html__('Overwrite H6 typography on mobile & tablet ', 'sway'),
              'line-height' => true,
              'text-align' => false,
              'text-transform' => false,
              'letter-spacing' => false,
              'font-style' => false,
              'google' => true,
              'font-family' => true,
              'font-weight' => false,
              'color' => false,
              'units' => 'px',
          ),

      )
  ) );

  if (class_exists('WooCommerce')) {

    Redux::setSection( $opt_name, array(
        'icon' => 'iconsmind-Shopping-Bag',
        'title' => esc_html__('WooCommerce', 'sway'),
    ) );

    Redux::setSection( $opt_name, array(
        'icon' => 'iconsmind-Shop-4',
        'title' => esc_html__('Shop Page', 'sway'),
        'desc' => esc_html__('Edit general setting for the main shop page. Select the product catalog style, products to show per page and number of product columns.', 'sway'),
        'subsection' => true,
        'fields' => array(
            array(
                'id' => 'tek-woo-catalog-style',
                'type' => 'button_set',
                'title' => esc_html__('Catalog Style', 'sway'),
                'subtitle' => esc_html__('Select the product box template style', 'sway'),
                'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
                'options'  => array(
                    'woo-minimal-style' => 'Minimal',
                    'woo-detailed-style' => 'Detailed',
                ),
                'default' => 'woo-detailed-style'
            ),
            array(
                'id' => 'tek-woo-products-number',
                'type' => 'text',
                'title' => esc_html__('Products per Page', 'sway'),
                'subtitle' => esc_html__('Change the products number listed per page.', 'sway'),
                'default' => '9',
            ),
            array(
                'id' => 'tek-woo-shop-columns',
                'type' => 'button_set',
                'title' => esc_html__('Shop Layout', 'sway'),
                'subtitle' => esc_html__('Select the number of product columns', 'sway'),
                'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
                'options'  => array(
                    'woo-2-columns' => '2 Columns + Sidebar',
                    'woo-3-columns-sidebar' => '3 Columns + Sidebar',
                    'woo-3-columns' => '3 Columns',
                    'woo-4-columns' => '4 Columns',
                ),
                'default' => 'woo-2-columns'
            ),
            array(
                'id' => 'tek-woo-sidebar-position',
                'type' => 'button_set',
                'title' => esc_html__('Sidebar Position', 'sway'),
                'subtitle' => esc_html__('Select sidebar position', 'sway'),
                'options'  => array(
                    'woo-sidebar-left' => 'Left',
                    'woo-sidebar-right' => 'Right',
                ),
                'required' => array( 'tek-woo-shop-columns', 'equals', array( 'woo-2-columns', 'woo-3-columns-sidebar' ) ),
                'default' => 'woo-sidebar-right'
            ),
            array(
                'id' => 'tek-woo-mini-cart-view-text',
                'type' => 'text',
                'title' => esc_html__('View cart text', 'sway'),
                'subtitle' => esc_html__('Overwrite the "View cart" button text on mini cart widget.', 'sway'),
                'default' => ''
            ),
            array(
                'id' => 'tek-woo-mini-cart-checkout-text',
                'type' => 'text',
                'title' => esc_html__('Checkout text', 'sway'),
                'subtitle' => esc_html__('Overwrite the "Checkout" button text on mini cart widget.', 'sway'),
                'default' => ''
            ),
            array(
                'id' => 'tek-woo-mini-cart-empty-text',
                'type' => 'text',
                'title' => esc_html__('Empty cart text', 'sway'),
                'subtitle' => esc_html__('Overwrite the "Your cart is currently empty." text on mini cart widget.', 'sway'),
                'default' => ''
            ),

        )
    ) );

    Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Tag',
        'title' => esc_html__('Product Page', 'sway'),
        'desc' => esc_html__('Edit general settings for the single product page.', 'sway'),
        'subsection' => true,
        'fields' => array(
          array(
              'id' => 'tek-woo-single-transparent-nav',
              'type' => 'switch',
              'title' => esc_html__('Transparent Navbar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable transparent navigation on single product pages.', 'sway'),
              'default' => false
          ),
          array(
              'id' => 'tek-woo-single-header',
              'type' => 'switch',
              'title' => esc_html__('Product Title Bar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable title bar on single product pages.', 'sway'),
              'default' => '1',
              '1' => 'Yes',
              '0' => 'No',
          ),
          array(
              'id' => 'tek-woo-single-header-text-align',
              'type' => 'button_set',
              'title' => esc_html__('Title Bar Text Alignment', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'blog-title-left' => 'Left',
                  'blog-title-center' => 'Center',
              ),
              'required' => array('tek-woo-single-header','equals', '1'),
              'subtitle' => esc_html__('Select text alignment in the title bar area.', 'sway'),
              'default' => 'product-title-left'
          ),
          array(
              'id' => 'tek-woo-single-sidebar',
              'type' => 'switch',
              'title' => esc_html__('Product Sidebar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable sidebar on single product pages.', 'sway'),
              'default' => '1',
              '1' => 'Yes',
              '0' => 'No',
          ),
          array(
              'id' => 'tek-woo-single-sidebar-position',
              'type' => 'button_set',
              'title' => esc_html__('Sidebar Position', 'sway'),
              'subtitle' => esc_html__('Select sidebar position', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'woo-single-sidebar-left' => 'Left',
                  'woo-single-sidebar-right' => 'Right',
              ),
              'required' => array('tek-woo-single-sidebar','equals','1'),
              'default' => 'woo-single-sidebar-right'
          ),
          array(
              'id' => 'tek-woo-single-image-position',
              'type' => 'button_set',
              'title' => esc_html__('Featured Image Position', 'sway'),
              'subtitle' => esc_html__('Control the product image position.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options' => array(
                  'woo-image-left' => 'Left',
                  'woo-image-right' => 'Right',
              ),
              'default' => 'woo-image-left'
          ),
          array(
              'id' => 'tek-woo-single-gallery',
              'type' => 'button_set',
              'title' => esc_html__('Gallery Template', 'sway'),
              'subtitle' => esc_html__('Control the product image gallery layout.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options' => array(
                  'woo-gallery-thumbnails' => 'Thumbnails',
                  'woo-gallery-list' => 'List',
              ),
              'default' => 'woo-gallery-thumbnails'
          ),
          array(
              'id' => 'tek-woo-single-social-icons',
              'type' => 'switch',
              'title' => esc_html__('Social Sharing Buttons', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the social sharing buttons on single product pages.', 'sway'),
              'default' => true
          ),
        )
    ) );
  }

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Photos',
      'title' => esc_html__('Portfolio', 'sway'),
      'desc' => esc_html__('Edit the single portfolio page settings', 'sway'),
      'fields' => array(
        array(
            'id'=>'tek-portfolio-settings-section-start',
            'type' => 'section',
            'title' => esc_html__('General Settings', 'sway'),
            'indent' => true,
        ),
        array(
            'id' => 'tek-portfolio-cpt',
            'type' => 'switch',
            'title' => esc_html__('Enable Portfolio', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the portfolio custom post type. Refresh the page for changes to take effect.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-portfolio-slug',
            'type' => 'text',
            'title' => esc_html__('Portfolio Slug', 'sway'),
            'subtitle' => __('Overwrite the portfolio base slug: domain.com/<strong>portfolio</strong>/portfolio-item-slug', 'sway'),
            'desc' => __('<strong>Note:</strong> When you change this setting you need to <a href="https://www.swaytheme.com/documentation/knowledge-base/flush-rewrite-rules/" target="_blank">flush rewrite rules</a>.', 'sway'),
            'default' => '',
            'required' => array( 'tek-portfolio-cpt', 'equals', true ),
        ),
        array(
            'id'=>'tek-portfolio-settings-section-end',
            'type' => 'section',
            'indent' => false,
        ),
        array(
            'id'=>'tek-portfolio-single-page-settings-section-start',
            'type' => 'section',
            'title' => esc_html__('Portfolio Single Page Settings', 'sway'),
            'required' => array( 'tek-portfolio-cpt', 'equals', true ),
            'indent' => true,
        ),
        array(
            'id' => 'tek-portfolio-single-nav',
            'type' => 'switch',
            'title' => esc_html__('Previous/Next Pagination', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the previous/next portfolio pagination. Pagination section will be displayed below the content.', 'sway'),
            'required' => array( 'tek-portfolio-cpt', 'equals', true ),
            'default' => false,
        ),
        array(
            'id' => 'tek-portfolio-nav-prev-text',
            'type' => 'text',
            'title' => esc_html__('Navigation "Previous" Link Text', 'sway'),
            'subtitle' => esc_html__('Overwrite the "Previous" text on portfolio single page navigation.', 'sway'),
            'default' => '',
            'required' => array(
              'tek-portfolio-single-nav',
              'equals',
              true
            ),
        ),
        array(
            'id' => 'tek-portfolio-nav-next-text',
            'type' => 'text',
            'title' => esc_html__('Navigation "Next" Link Text', 'sway'),
            'subtitle' => esc_html__('Overwrite the "Next" text on portfolio single page navigation.', 'sway'),
            'default' => '',
            'required' => array(
              'tek-portfolio-single-nav',
              'equals',
              true
            ),
        ),
        array(
            'id' => 'tek-portfolio-related-posts',
            'type' => 'switch',
            'title' => esc_html__('Related Portfolio Items', 'sway'),
            'subtitle' => esc_html__('Enable/Disable related portfolio items on single portfolio pages.', 'sway'),
            'required' => array( 'tek-portfolio-cpt', 'equals', true ),
            'default' => true
        ),
        array(
            'id' => 'tek-portfolio-related-posts-title',
            'type' => 'text',
            'title' => esc_html__('Related Portfolio Section Title', 'sway'),
            'subtitle' => esc_html__('Edit the related portfolios section title.', 'sway'),
            'default' => 'Related projects',
            'required' => array(
              'tek-portfolio-related-posts',
              'equals',
              true
            ),
        ),
        array(
            'id' => 'tek-portfolio-related-posts-number',
            'type' => 'slider',
            'title' => esc_html__( 'Number of Related Portfolio Items', 'sway' ),
            'subtitle' => esc_html__( 'Select the number of related portfolio items.', 'sway' ),
            'default' => 3,
            'max' => 20,
            'required' => array(
              'tek-portfolio-related-posts',
              'equals',
              true
            ),
        ),
        array(
            'id' => 'tek-portfolio-related-posts-button-text',
            'type' => 'text',
            'title' => esc_html__('Related Portfolio Link Text', 'sway'),
            'subtitle' => esc_html__('Edit the related portfolio items button text. Default is set to "View project".', 'sway'),
            'default' => 'View project',
            'required' => array(
              'tek-portfolio-related-posts',
              'equals',
              true
            ),
        ),
        array(
            'id' => 'tek-portfolio-comments',
            'type' => 'switch',
            'title' => esc_html__('Comments Section', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the comments section below the content.', 'sway'),
            'required' => array( 'tek-portfolio-cpt', 'equals', true ),
            'default' => false
        ),
        array(
            'id'=>'tek-portfolio-single-page-settings-section-end',
            'type' => 'section',
            'required' => array( 'tek-portfolio-cpt', 'equals', true ),
            'indent' => false,
        ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Newspaper',
      'title' => esc_html__('Blog', 'sway'),
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Notepad',
      'title' => esc_html__('Blog Settings', 'sway'),
      'desc' => esc_html__('Edit blog posts page & archive general settings', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
              'id'=>'tek-blog-settings-section-start',
              'type' => 'section',
              'title' => esc_html__('General Settings', 'sway'),
              'indent' => true,
          ),
          array(
              'id' => 'tek-blog-transparent-nav',
              'type' => 'switch',
              'title' => esc_html__('Transparent Navbar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable transparent navigation on blog posts page.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-blog-header-template',
              'type' => 'button_set',
              'title' => esc_html__('Blog Header Template', 'sway'),
              'subtitle' => esc_html__('Select the blog header template style.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'blog-header-titlebar' => 'Title bar',
                  'blog-header-revslider' => 'Revolution slider',
              ),
              'default' => 'blog-header-titlebar'
          ),
          array(
              'id' => 'tek-blog-template',
              'type' => 'button_set',
              'title' => esc_html__('Blog Articles Template', 'sway'),
              'subtitle' => esc_html__('Select the blog articles template style.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'img-top-list' => 'List top image',
                  'img-left-list' => 'List left image',
                  'minimal-list' => 'List minimal',
                  'minimal-grid' => 'Grid minimal',
                  'detailed-grid' => 'Grid detailed',
              ),
              'default' => 'img-top-list'
          ),
          array(
              'id' => 'tek-blog-sidebar',
              'type' => 'switch',
              'title' => esc_html__('Display Sidebar', 'sway'),
              'subtitle' => esc_html__('Enable disable blog sidebar.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-blog-listing-sticky-sidebar',
              'type' => 'switch',
              'title' => esc_html__('Sticky Sidebar', 'sway'),
              'subtitle' => esc_html__('Enable sticky sidebar for blog posts page.', 'sway'),
              'default' => false,
              'required' => array(
                  'tek-blog-sidebar',
                  'equals',
                  true
              ),
          ),
          array(
              'id' => 'tek-blog-excerpt',
              'type' => 'text',
              'title' => esc_html__('Blog Post Excerpt', 'sway'),
              'subtitle' => esc_html__('Edit articles excerpt length on blog page.', 'sway'),
              'default' => '20'
          ),
          array(
              'id' => 'tek-blog-read-more-text',
              'type' => 'text',
              'title' => esc_html__('Read more text', 'sway'),
              'subtitle' => esc_html__('Overwrite "Read more" text on blog articles.', 'sway'),
              'desc' => esc_html__('This option overwrites the Read More text with the assigned blog page in "Settings > Reading" and blog archives, not the blog element.', 'sway'),
              'default' => ''
          ),
          array(
              'id'=>'tek-blog-settings-section-end',
              'type' => 'section',
              'indent' => false,
          ),
          array(
              'id'=>'tek-blog-title-section-start',
              'type' => 'section',
              'title' => esc_html__('Blog Header Title Bar', 'sway'),
              'indent' => true,
              'required' => array('tek-blog-header-template','equals','blog-header-titlebar'),
          ),
          array(
              'id' => 'tek-blog-title-switch',
              'type' => 'switch',
              'title' => esc_html__('Blog Page Title', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the page title of the assigned blog page.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-blog-subtitle',
              'type' => 'text',
              'title' => esc_html__('Blog Page Subtitle', 'sway'),
              'subtitle' => esc_html__('Add the subtitle text that displays in the page title bar of the assigned blog page.', 'sway'),
              'default' => 'This is where you can find the latest news and insights about Sway — new products, in-depth interviews and successfully finished projects. Never miss a beat.'
          ),
          array(
              'id' => 'tek-blog-header-text-align',
              'type' => 'button_set',
              'title' => esc_html__('Title Bar Text Alignment', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'blog-title-left' => 'Left',
                  'blog-title-center' => 'Center',
              ),
              'required' => array('tek-blog-title-switch','equals', true),
              'subtitle' => esc_html__('Select text alignment in the title bar area.', 'sway'),
              'default' => 'blog-title-center'
          ),
          array(
              'id' => 'tek-blog-titlebar-background',
              'type' => 'color',
              'transparent' => false,
              'title' => esc_html__('Title Bar Background Color', 'sway'),
              'default' => '',
              'subtitle' => esc_html__('Use this colorpicker to override the title bar default background color.', 'sway'),
              'validate' => 'color'
          ),
          array(
              'id' => 'tek-blog-text-color',
              'type' => 'color',
              'transparent' => false,
              'title' => esc_html__('Title Bar Text Color', 'sway'),
              'default' => '',
              'subtitle' => esc_html__('Use this colorpicker to override the title bar default text color.', 'sway'),
              'validate' => 'color'
          ),
          array(
              'id' => 'tek-blog-featured-background-size',
              'type' => 'button_set',
              'title' => esc_html__('Blog Header Background Image Size', 'sway'),
              'subtitle' => esc_html__('Controls the Blog Header image size. This option is used with the Blog Featured Image.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'auto' => 'Auto',
                  'contain' => 'Contain',
                  'cover' => 'Cover',
              ),
              'default' => 'auto'
          ),
          array(
              'id' => 'tek-blog-featured-background-position',
              'type' => 'button_set',
              'title' => esc_html__('Blog Header Background Image Position', 'sway'),
              'subtitle' => esc_html__('Controls the Blog Header image position. This option is used with the Blog Featured Image.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'center' => 'Center',
                  'top' => 'Top',
                  'right' => 'Right',
                  'bottom' => 'Bottom',
                  'left' => 'Left',
              ),
              'default' => 'bottom'
          ),
          array(
              'id'=>'tek-blog-title-section-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-blog-header-template','equals','blog-header-titlebar'),
          ),
          array(
              'id'=>'tek-blog-revslider-section-start',
              'type' => 'section',
              'title' => esc_html__('Blog Header Revolution Slider', 'sway'),
              'indent' => true,
              'required' => array('tek-blog-header-template','equals','blog-header-revslider'),
          ),
          array(
              'id' => 'tek-blog-header-slider-alias',
              'type' => 'text',
              'title' => esc_html__('Revolution Slider Alias Name', 'sway'),
              'required' => array('tek-blog-header-template','equals','blog-header-revslider'),
              'default' => ''
          ),
          array(
              'id'=>'tek-blog-revslider-section-end',
              'type' => 'section',
              'indent' => false,
              'required' => array('tek-blog-header-template','equals','blog-header-revslider'),
          ),
          array(
              'id'=>'tek-blog-subscribe-form-section-start',
              'type' => 'section',
              'title' => esc_html__('Blog Subscribe Form', 'sway'),
              'indent' => true,
          ),
          array(
              'id' => 'tek-blog-subscribe-section-switch',
              'type' => 'switch',
              'title' => esc_html__('Subscribe Section', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the subscribe form section. This form is displayed on blog listing and single blog posts in the footer area.', 'sway'),
              'default' => false
          ),
          array(
              'id' => 'tek-blog-subscribe-section-show',
              'type' => 'button_set',
              'title' => esc_html__('Subscribe Section Visibility', 'sway'),
              'subtitle' => esc_html__('Select on which pages to show the subscribe form.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'all-blog-pages' => 'All blog pages',
                  'archive-pages' => 'Blog archive pages',
                  'blog-single-pages' => 'Blog single pages',
              ),
              'required' => array('tek-blog-subscribe-section-switch','equals', true),
              'default' => 'all-blog-pages'
          ),
          array(
              'id' => 'tek-blog-subscribe-section-title',
              'type' => 'text',
              'title' => esc_html__('Subscribe Section Title', 'sway'),
              'subtitle' => esc_html__('Add the title for the subscribe section.', 'sway'),
              'required' => array('tek-blog-subscribe-section-switch','equals', true),
              'default' => 'Subscribe to our newsletter'
          ),
          array(
              'id' => 'tek-blog-subscribe-section-subtitle',
              'type' => 'editor',
              'title' => esc_html__('Subscribe Section Subtitle', 'sway'),
              'subtitle' => esc_html__('Add the subtitle for the subscribe section.', 'sway'),
              'default' => '',
              'args' => array(
                  'teeny' => true,
                  'textarea_rows' => 3,
                  'media_buttons' => false,
              ),
              'required' => array('tek-blog-subscribe-section-switch','equals', true),
          ),
          array(
              'id' => 'tek-blog-subscribe-section-form-id',
              'type' => 'select',
              'data' => 'posts',
              'args' => array( 'post_type' => 'wpcf7_contact_form', 'posts_per_page' => -1, ),
              'title' => esc_html__('Subscribe Section Form Title', 'sway'),
              'subtitle' => esc_html__('Select the Contact Form 7 to be used as a newsletter form.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'required' => array('tek-blog-subscribe-section-switch','equals', true),
          ),
          array(
              'id' => 'tek-blog-subscribe-section-bg-image',
              'type' => 'media',
              'readonly' => false,
              'url' => true,
              'title' => esc_html__('Subscribe Section Background Image', 'sway'),
              'subtitle' => esc_html__('Upload background image.', 'sway'),
              'required' => array('tek-blog-subscribe-section-switch','equals', true),
              'default' => '',
          ),
          array(
              'id'=>'tek-blog-subscribe-form-section-end',
              'type' => 'section',
              'indent' => false,
          ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Pen',
      'title' => esc_html__('Single Post', 'sway'),
      'desc' => esc_html__('Edit single blog posts general settings', 'sway'),
      'subsection' => true,
      'fields' => array(
        array(
            'id' => 'tek-single-post-template',
            'type' => 'button_set',
            'title' => esc_html__('Single Post Template', 'sway'),
            'subtitle' => esc_html__('Select the single post template style.', 'sway'),
            'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
            'options'  => array(
                'single-post-layout-one' => 'Classic',
                'single-post-layout-two' => 'Modern',
            ),
            'default' => 'single-post-layout-one'
        ),
        array(
            'id' => 'tek-blog-single-sidebar',
            'type' => 'switch',
            'title' => esc_html__('Display Sidebar', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the single post sidebar.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-blog-sticky-sidebar',
            'type' => 'switch',
            'title' => esc_html__('Sticky Sidebar', 'sway'),
            'subtitle' => esc_html__('Enable sticky sidebar for single blog posts.', 'sway'),
            'default' => true,
            'required' => array(
                'tek-blog-single-sidebar',
                'equals',
                true
            ),
        ),
        array(
          'id'       => 'tek-blog-social-sharing-buttons',
          'type'     => 'checkbox',
          'title'    => __('Social Sharing Buttons', 'sway'),
          'subtitle' => __('Select social sharing buttons visible on single post', 'sway'),
          'options'  => array(
              '1' => 'Facebook',
              '2' => 'Twitter',
              '3' => 'Pinterest',
              '4' => 'LinkedIn'
          ),
          'default' => array(
              '1' => '1',
              '2' => '1',
              '3' => '1',
              '4' => '1'
          ),
        ),
        array(
            'id' => 'tek-author-box',
            'type' => 'switch',
            'title' => esc_html__('Author Box', 'sway'),
            'subtitle' => esc_html__('Enable/Disable author box below post content.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-blog-single-nav',
            'type' => 'switch',
            'title' => esc_html__('Previous/Next Pagination', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the previous/next post pagination for single posts.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-blog-single-nav-prev-text',
            'type' => 'text',
            'title' => esc_html__('Navigation "Previous" Text', 'sway'),
            'subtitle' => esc_html__('Overwrite the "Previous" text on single blog post navigation.', 'sway'),
            'default' => '',
            'required' => array(
              'tek-blog-single-nav',
              'equals',
              true
            ),
        ),
        array(
            'id' => 'tek-blog-single-nav-next-text',
            'type' => 'text',
            'title' => esc_html__('Navigation "Next" Text', 'sway'),
            'subtitle' => esc_html__('Overwrite the "Next" text on single blog post navigation.', 'sway'),
            'default' => '',
            'required' => array(
              'tek-blog-single-nav',
              'equals',
              true
            ),
        ),
        array(
            'id' => 'tek-related-posts',
            'type' => 'switch',
            'title' => esc_html__('Related Posts', 'sway'),
            'subtitle' => esc_html__('Enable/Disable related posts on single post pages.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-related-posts-title',
            'type' => 'text',
            'title' => esc_html__('Related Posts Title', 'sway'),
            'default' => 'Related articles',
            'required' => array(
                      'tek-related-posts',
                      'equals',
                      true
                  ),
        ),
        array(
            'id' => 'tek-related-posts-number',
            'type' => 'slider',
            'title'    => esc_html__( 'Number of Related Posts', 'sway' ),
            'subtitle' => esc_html__( 'Controls the number of posts that display under related posts section.', 'sway' ),
            'default'  => 3,
            'max'      => 20,
            'required' => array(
                'tek-related-posts',
                'equals',
                true
            ),
          ),
          array(
              'id'=>'tek-blog-reading-bar-section-start',
              'type' => 'section',
              'title' => esc_html__('Reading Bar', 'sway'),
              'indent' => true,
          ),
          array(
              'id' => 'tek-blog-rebar',
              'type' => 'switch',
              'title' => esc_html__('Reading Bar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the reading progress bar. As you read the post or scroll the page, the progress bar is filled with color.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-blog-rebar-position',
              'type' => 'button_set',
              'title' => esc_html__('Reading Bar Position', 'sway'),
              'subtitle' => esc_html__('Select the reading bar position.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'position-top' => 'Top',
                  'position-bottom' => 'Bottom',
              ),
              'default' => 'position-top',
              'required' => array(
                'tek-blog-rebar',
                'equals',
                true
              ),
          ),
          array(
            'id' => 'tek-blog-rebar-color',
            'type' => 'color',
            'transparent' => false,
            'title' => esc_html__('Reading Bar Color', 'sway'),
            'default' => '#777AF2',
            'subtitle' => esc_html__('Select the background color to fill the progress bar.', 'sway'),
            'validate' => 'color',
            'required' => array(
              'tek-blog-rebar',
              'equals',
              true
            ),
          ),
          array(
              'id' => 'tek-blog-rebar-height',
              'type' => 'slider',
              'title' => esc_html__( 'Reading Bar Height', 'sway' ),
              'subtitle' => esc_html__( 'Select the height of the progress reading bar.', 'sway' ),
              'default' => 5,
              'max' => 10,
              'required' => array(
                'tek-blog-rebar',
                'equals',
                true
              ),
          ),
          array(
              'id'=>'tek-blog-reading-bar-section-end',
              'type' => 'section',
              'indent' => false,
          ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Bookmark',
      'title' => esc_html__('Blog Meta', 'sway'),
      'desc' => esc_html__('The settings available with this page control the main blog page, single blog post page and blog archive pages. These settings do not overwrite the Post Grid or the Masonry Grid element settings.', 'sway'),
      'subsection' => true,
      'fields' => array(
        array(
            'id' => 'tek-post-meta',
            'type' => 'switch',
            'title' => esc_html__('Post Meta', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the post meta on blog posts. You can also control individual meta settings below.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-post-meta-date',
            'type' => 'switch',
            'title' => esc_html__('Post Meta Date', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the post meta date.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-post-meta-author',
            'type' => 'switch',
            'title' => esc_html__('Post Meta Author', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the post meta author.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-post-meta-categories',
            'type' => 'switch',
            'title' => esc_html__('Post Meta Categories', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the post meta categories.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-post-meta-comments',
            'type' => 'switch',
            'title' => esc_html__('Post Meta Comments', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the post meta comments.', 'sway'),
            'default' => true
        ),
        array(
            'id' => 'tek-post-meta-tags',
            'type' => 'switch',
            'title' => esc_html__('Post Meta Tags', 'sway'),
            'subtitle' => esc_html__('Enable/Disable the post meta tags.', 'sway'),
            'default' => true
        ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Duplicate-Layer',
      'title' => esc_html__('Elements', 'sway'),
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Pencil-Ruler',
      'title' => esc_html__('General Settings', 'sway'),
      'desc' => esc_html__('Elements general settings that are applied site-wide.', 'sway'),
      'subsection' => true,
      'fields' => array(

          array(
              'id' => 'tek-global-radius',
              'type' => 'spinner',
              'title' => esc_html__('Border Radius', 'sway'),
              'subtitle' => esc_html__('Edit the border radius for all elements. Pixel value.', 'sway'),
              'min' => 0,
              'max' => 25,
              'default' => 5,
          ),

          array(
              'id' => 'tek-cards-border-radius',
              'type' => 'spinner',
              'title' => esc_html__('Cards Border Radius', 'sway'),
              'subtitle' => esc_html__('Edit the border radius for card elements. Pixel value.', 'sway'),
              'min' => 0,
              'max' => 25,
              'default' => 5,
          ),

      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-On-off',
      'title' => esc_html__('Button', 'sway'),
      'desc' => esc_html__('Buttons general settings', 'sway'),
      'subsection' => true,
      'fields' => array(
        array(
            'id' => 'tek-button-typo',
            'type' => 'typography',
            'title' => esc_html__('Button Typography', 'sway'),
            'subtitle' => esc_html__('Control the typography for all buttons.', 'sway'),
            'line-height' => true,
            'text-align' => false,
            'color' => true,
            'text-transform' => true,
            'letter-spacing' => true,
            'units' => 'px',
            'default' => array(
              'font-size' => '16px',
              'line-height' => '17px',
              'letter-spacing' => '',
            ),
        ),

        array(
            'id' => 'tek-btn-border',
            'type' => 'spinner',
            'title'   => esc_html__('Button Border Width', 'sway'),
            'subtitle' => esc_html__('Control the border width for buttons. Pixel value.', 'sway'),
            'min' => 0,
            'max' => 10,
            'default' => 1,
        ),

        array(
            'id' => 'tek-btn-radius',
            'type' => 'spinner',
            'title' => esc_html__('Button Border Radius', 'sway'),
            'subtitle' => esc_html__('Control the border radius for buttons. Pixel value.', 'sway'),
            'min' => 0,
            'max' => 100,
            'default' => 5,
        ),

        array(
            'id' => 'tek-btn-padding',
            'type' => 'spacing',
            'mode' => 'padding',
            'units' => array('em', 'px'),
            'title' => esc_html__('Button Box Padding', 'sway'),
            'subtitle' => esc_html__('Controls the top/right/bottom/left padding of the button element.', 'sway'),
        ),

        array(
            'id' => 'tek-btn-effect',
            'type' => 'button_set',
            'title' => esc_html__('Button Hover Effect', 'sway'),
            'subtitle' => esc_html__('Select the button hover effect.', 'sway'),
            'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
            'options'  => array(
                '' => 'Default',
                'btn-hover-1' => 'Shadow effect',
                'btn-hover-2' => 'Sweep to right',
            ),
            'default' => 'btn-hover-2'
        ),

        array(
            'id' => 'tek-btn-shadow',
            'type' => 'button_set',
            'title' => esc_html__('Button Shadow', 'sway'),
            'subtitle' => esc_html__('Select to enable shadow effect on buttons.', 'sway'),
            'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
            'options'  => array(
                'shadow-on' => 'On',
                'shadow-off' => 'Off',
            ),
            'default' => 'shadow-off'
        ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Envelope',
      'title' => esc_html__('Contact Form', 'sway'),
      'desc' => esc_html__('Forms general settings.', 'sway'),
      'subsection' => true,
      'fields' => array(
        array(
            'id' => 'tek-contact-form-typo',
            'type' => 'typography',
            'title' => esc_html__('Form Typography', 'sway'),
            'subtitle' => esc_html__('Control the typography for form fields.', 'sway'),
            'google' => true,
            'font-family' => true,
            'font-style' => true,
            'font-size' => true,
            'line-height' => false,
            'color' => true,
            'text-align' => false,
            'text-transform' => true,
            'all_styles' => false,
            'units' => 'px',
        ),
        array(
          'id' => 'tek-contact-form-bg-color',
          'type' => 'color',
          'transparent' => false,
          'title' => esc_html__('Form Background Color', 'sway'),
          'subtitle' => esc_html__('Controls the background color of form fields.', 'sway'),
          'default' => '',
          'validate' => 'color'
        ),
        array(
          'id' => 'tek-contact-form-placeholder-color',
          'type' => 'color',
          'transparent' => false,
          'title' => esc_html__('Form Placeholder Text Color', 'sway'),
          'subtitle' => esc_html__('Controls the placeholder text color of form fields.', 'sway'),
          'default' => '',
          'validate' => 'color'
        ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Speach-BubbleAsking',
      'title' => esc_html__('FAQ', 'sway'),
      'desc' => esc_html__('FAQ general settings.', 'sway'),
      'subsection' => true,
      'fields' => array(
        array(
          'id' => 'tek-faq-collapsible',
          'type' => 'switch',
          'title' => esc_html__('Auto collapse', 'sway'),
          'subtitle' => esc_html__('Auto collapse expanded FAQ when clicking another element of the same type. Only one item will remain expanded at any point.', 'sway'),
          'default' => false
        ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Repair',
      'title' => esc_html__('Utility Pages', 'sway'),
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-File-Search',
      'title' => esc_html__('Search Page', 'sway'),
      'desc' => esc_html__('Seach page general settings', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
              'id'=>'tek-search-page-section-start',
              'type' => 'section',
              'title' => esc_html__('Search Page General Settings', 'sway'),
              'indent' => true,
          ),
          array(
              'id' => 'tek-search-transparent-nav',
              'type' => 'switch',
              'title' => esc_html__('Transparent Navbar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable transparent navigation on search page', 'sway'),
              'default' => false
          ),
          array(
              'id' => 'tek-search-sidebar',
              'type' => 'switch',
              'title' => esc_html__('Display Sidebar', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the page sidebar.', 'sway'),
              'default' => true
          ),
          array(
              'id' => 'tek-search-sticky-sidebar',
              'type' => 'switch',
              'title' => esc_html__('Sticky Sidebar', 'sway'),
              'subtitle' => esc_html__('Enable/Disalbe sticky sidebar functionality.', 'sway'),
              'default' => true,
              'required' => array(
                  'tek-search-sidebar',
                  'equals',
                  true
              ),
          ),
          array(
              'id' => 'tek-search-title',
              'type' => 'text',
              'title' => esc_html__('Page title', 'sway'),
              'subtitle' => esc_html__('Overwrite the "Search results for" page title.', 'sway'),
              'default' => ''
          ),
          array(
              'id'=>'tek-search-page-section-end',
              'type' => 'section',
              'indent' => false,
          ),
          array(
              'id'=>'tek-search-form-section-start',
              'type' => 'section',
              'title' => esc_html__('Search Form Settings', 'sway'),
              'indent' => true,
          ),
          array(
              'id' => 'tek-search-form-content',
              'type' => 'button_set',
              'title' => esc_html__('Search results content', 'sway'),
              'subtitle' => esc_html__('Select the type of content to be displayed in search results.', 'sway'),
              'description' => esc_html__('Settings used for the form displayed in Topbar or Main Menu header area.', 'sway'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  'search-all' => 'All post types',
                  'post' => 'Posts',
                  'portfolio' => 'Portfolio',
                  'product' => 'Products',
              ),
              'default' => 'search-all',
          ),
          array(
              'id'=>'tek-search-form-section-end',
              'type' => 'section',
              'indent' => false,
          ),

      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Error-404Window',
      'title' => esc_html__('404 Page', 'sway'),
      'desc' => esc_html__('404 page general settings', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
              'id' => 'tek-404-title',
              'type' => 'text',
              'title' => esc_html__('Page Title', 'sway'),
              'subtitle' => esc_html__('Set the 404 page title.', 'sway'),
              'default' => '404 - Page Not Found'
          ),
          array(
              'id' => 'tek-404-subtitle',
              'type' => 'text',
              'title' => esc_html__('Page Subtitle', 'sway'),
              'subtitle' => esc_html__('Set the 404 page subtitle.', 'sway'),
              'default' => 'The page you are looking for does not exist.'
          ),
          array(
              'id' => 'tek-404-back',
              'type' => 'text',
              'title' => esc_html__('Back to Homepage Button Text', 'sway'),
              'subtitle' => esc_html__('Set the 404 back to homepage button text.', 'sway'),
              'default' => 'Back to homepage'
          ),
          array(
              'id' => 'tek-404-image',
              'type' => 'media',
              'readonly' => false,
              'url' => true,
              'title' => esc_html__('404 Image', 'sway'),
              'subtitle' => esc_html__('Upload custom image.', 'sway'),
          ),
      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Lock-2',
      'title' => esc_html__('Maintenance Page', 'sway'),
      'desc' => esc_html__('Maintenance mode will be activated only for users that are not logged in.', 'sway'),
      'subsection' => true,
      'fields' => array(
          array(
              'id' => 'tek-maintenance-mode',
              'type' => 'switch',
              'title' => esc_html__('Enable Maintenance Mode', 'sway'),
              'subtitle' => esc_html__('Enable/Disable maintenance mode.', 'sway'),
              'default' => false
          ),
          array(
              'id' => 'tek-maintenance-title',
              'type' => 'text',
              'title' => esc_html__('Page Title', 'sway'),
              'subtitle' => esc_html__('Edit maintenance page title ', 'sway'),
              'required' => array('tek-maintenance-mode','equals', true),
              'default' => 'Sway is in the works!'
          ),
          array(
              'id' => 'tek-maintenance-content',
              'type' => 'editor',
              'title' => esc_html__('Page Content', 'sway'),
              'subtitle' => esc_html__('Edit maintenance page content ', 'sway'),
              'required' => array('tek-maintenance-mode','equals', true),
              'default' => '',
              'args'   => array(
                'teeny'  => true,
                'textarea_rows' => 10,
                'media_buttons' => false,
              ),
          ),

          array(
              'id' => 'tek-maintenance-bg-image',
              'type' => 'media',
              'readonly' => false,
              'url' => true,
              'title' => esc_html__('Page Background Image', 'sway'),
              'subtitle' => esc_html__('Upload page background image.', 'sway'),
              'required' => array('tek-maintenance-mode','equals', true),
              'default' => '',
          ),

          array(
            'id' => 'tek-maintenance-text-color',
            'type' => 'color',
            'transparent' => false,
            'title' => esc_html__('Text Color', 'sway'),
            'subtitle' => esc_html__('Overwrite text color. If none selected, the default theme color will be used.', 'sway'),
            'required' => array('tek-maintenance-mode','equals', true),
            'default' => '',
            'validate' => 'color'
          ),

          array(
              'id' => 'tek-maintenance-countdown',
              'type' => 'switch',
              'title' => esc_html__('Enable Countdown', 'sway'),
              'subtitle' => esc_html__('Enable/Disable the countdown timer.', 'sway'),
              'required' => array('tek-maintenance-mode','equals', true),
              'default' => false
          ),
          array(
              'id' => 'tek-maintenance-count-day',
              'type' => 'text',
              'title' => esc_html__('End Day', 'sway'),
              'subtitle' => esc_html__('Enter day value. Eg. 05', 'sway'),
              'required' => array('tek-maintenance-countdown','equals', true),
              'default' => ''
          ),
          array(
              'id' => 'tek-maintenance-count-month',
              'type' => 'text',
              'title' => esc_html__('End Month', 'sway'),
              'subtitle' => esc_html__('Enter month value. Eg. 09', 'sway'),
              'required' => array('tek-maintenance-countdown','equals', true),
              'default' => ''
          ),
          array(
              'id' => 'tek-maintenance-count-year',
              'type' => 'text',
              'title' => esc_html__('End Year', 'sway'),
              'subtitle' => esc_html__('Enter year value. Eg. 2020', 'sway'),
              'required' => array('tek-maintenance-countdown','equals', true),
              'default' => ''
          ),
          array(
              'id' => 'tek-maintenance-subscribe',
              'type' => 'switch',
              'title' => esc_html__('Enable Contact Form', 'sway'),
              'subtitle' => esc_html__('Enable/Disable contact form on page.', 'sway'),
              'required' => array('tek-maintenance-mode','equals', true),
              'default' => false
          ),
          array(
              'id' => 'tek-maintenance-form-select',
              'type' => 'select',
              'title' => esc_html__('Contact Form Plugin', 'sway'),
              'required' => array('tek-maintenance-subscribe','equals',true),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'options'  => array(
                  '1' => 'Contact Form 7',
                  '2' => 'Ninja Forms',
                  '3' => 'Gravity Forms',
                  '4' => 'WP Forms',
                  '5' => 'Other',
              ),
              'default' => '1'
          ),
          array(
              'id' => 'tek-maintenance-contactf7-formid',
              'type' => 'select',
              'data' => 'posts',
              'args' => array( 'post_type' => 'wpcf7_contact_form', 'posts_per_page' => -1, ),
              'title' => esc_html__('Contact Form 7 Title', 'sway'),
              'required' => array('tek-maintenance-form-select','equals','1'),
              'select2' => array('allowClear' => false, 'minimumResultsForSearch' => '-1'),
              'default' => ''
          ),
          array(
              'id' => 'tek-maintenance-ninja-formid',
              'type' => 'text',
              'title' => esc_html__('Ninja Form ID', 'sway'),
              'required' => array('tek-maintenance-form-select','equals','2'),
              'default' => ''
          ),
          array(
              'id' => 'tek-maintenance-gravity-formid',
              'type' => 'text',
              'title' => esc_html__('Gravity Form ID', 'sway'),
              'required' => array('tek-maintenance-form-select','equals','3'),
              'default' => ''
          ),
          array(
              'id' => 'tek-maintenance-wp-formid',
              'type' => 'text',
              'title' => esc_html__('WP Form ID', 'sway'),
              'required' => array('tek-maintenance-form-select','equals','4'),
              'default' => ''
          ),
          array(
              'id' => 'tek-maintenance-other-form-shortcode',
              'type' => 'text',
              'title' => esc_html__('Form Shortcode', 'sway'),
              'subtitle' => esc_html__('Insert the shortcode for a custom contact form plugin.', 'sway'),
              'required' => array('tek-maintenance-form-select','equals','5'),
              'default' => ''
          ),

      )
  ) );

  Redux::setSection( $opt_name, array(
      'icon' => 'iconsmind-Coding',
      'title' => esc_html__('Custom CSS/JS', 'sway'),
      'fields' => array(
          array(
              'id' => 'tek-css',
              'type' => 'ace_editor',
              'title' => esc_html__('CSS', 'sway'),
              'subtitle' => esc_html__('Enter the custom CSS code in the side field. Do not include any tags or HTML in the field. Custom CSS added here will overwrite the theme CSS.', 'sway'),
              'mode' => 'css',
              'theme' => 'chrome',
          ),
          array(
                  'id' => 'tek-javascript',
                  'type' => 'ace_editor',
                  'title' => esc_html__( 'Javascript', 'sway' ),
                  'subtitle' => esc_html__( 'Enter the custom JavaScript code in the side field.', 'sway' ),
                  'mode' => 'html',
                  'theme' => 'chrome',
              ),
      )
  ) );
