<?php

// Register the required plugins for this theme.
add_action('tgmpa_register', 'sway_register_plugins');

if ( ! function_exists( 'sway_register_plugins' ) ) {
	function sway_register_plugins() {
		$plugins = array(
			array(
				'name' => esc_html__('Redux Framework', 'sway'),
				'slug' => 'redux-framework',
				'required' => true,
			),
			array(
				'name' => esc_html__('WPBakery Page Builder', 'sway'),
				'slug' => 'js_composer',
				'source' => SWAY_THEME_DIR . 'core/plugins/js_composer.zip',
				'required' => true,
				'version' => '6.7',
				'force_activation' => false,
				'force_deactivation' => false,
			),
			array(
				'name' => esc_html__('KeyDesign Addon', 'sway'),
				'slug' => 'keydesign-addon',
				'source' => 'http://www.swaytheme.com/external/keydesign-addon.zip',
				'required' => true,
				'version' => '4.4',
				'force_activation' => false,
				'force_deactivation' => false,
				'external_url' => 'http://www.swaytheme.com/external/keydesign-addon.zip',
			),
			array(
				'name' => esc_html__('Slider Revolution', 'sway'),
				'slug' => 'revslider',
				'source' => SWAY_THEME_DIR . 'core/plugins/revslider.zip',
				'required' => false,
				'version' => '6.5.8',
				'force_activation' => false,
				'force_deactivation' => false,
			),
			array(
		    'name' => esc_html__('Envato Market', 'sway'),
		    'slug' => 'envato-market',
		    'source' => 'https://envato.github.io/wp-envato-market/dist/envato-market.zip',
		    'required' => false,
		    'force_activation' => false,
		    'force_deactivation' => false,
		    'external_url' => 'https://envato.com/market-plugin/',
	    ),
			array(
				'name' => esc_html__('WooCommerce', 'sway'),
				'slug' => 'woocommerce',
				'required' => false,
			),
			array(
				'name' => esc_html__('Contact Form 7', 'sway'),
				'slug' => 'contact-form-7',
				'required' => true,
			),
			array(
				'name' => esc_html__('Breadcrumb NavXT', 'sway'),
				'slug' => 'breadcrumb-navxt',
				'required' => false,
			),
		);

		$config = array(
			'id' => 'sway',
			'default_path' => '',
			'menu' => 'install-required-plugins',
			'has_notices' => true,
			'dismissable' => true,
			'is_automatic' => false,
			'message' => '',
			'strings' => array(
				'page_title' => esc_html__('Install Required Plugins', 'sway'),
				'menu_title' => esc_html__('Plugins', 'sway'),
				'installing' => esc_html__('Installing Plugin: %s', 'sway'),
				'oops' => esc_html__('Something went wrong with the plugin API.', 'sway') ,
				'notice_can_install_required' => _n_noop('This theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'sway'),
				'notice_can_install_recommended' => _n_noop('This theme recommends the following plugin: %1$s.', 'This theme recommends the following plugins: %1$s.', 'sway'),
				'notice_cannot_install' => _n_noop('Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'sway'),
				'notice_can_activate_required' => _n_noop('The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'sway'),
				'notice_can_activate_recommended' => _n_noop('The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'sway'),
				'notice_cannot_activate' => _n_noop('Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'sway'),
				'notice_ask_to_update' => _n_noop('The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'sway'),
				'notice_cannot_update' => _n_noop('Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'sway'),
				'install_link' => _n_noop('Begin installing plugin', 'Begin installing plugins', 'sway'),
				'activate_link' => _n_noop('Activate installed plugin', 'Activate installed plugins', 'sway'),
				'return' => esc_html__('Return to Required Plugins Installer', 'sway') ,
				'plugin_activated' => esc_html__('Plugin activated successfully.', 'sway') ,
				'complete' => esc_html__('All plugins installed and activated successfully. %s', 'sway'),
				'nag_type' => 'updated'
			)
		);
		tgmpa($plugins, $config);
		}
	}
