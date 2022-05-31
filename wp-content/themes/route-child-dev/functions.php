<?php
// REMOVE WP EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );


function wpb_disable_feed() {
wp_die( __('No feed available,please visit our <a href="'. get_bloginfo('url') .'">homepage</a>!') );
}

add_action('do_feed', 'wpb_disable_feed', 1);
add_action('do_feed_rdf', 'wpb_disable_feed', 1);
add_action('do_feed_rss', 'wpb_disable_feed', 1);
add_action('do_feed_rss2', 'wpb_disable_feed', 1);
add_action('do_feed_atom', 'wpb_disable_feed', 1);
add_action('do_feed_rss2_comments', 'wpb_disable_feed', 1);
add_action('do_feed_atom_comments', 'wpb_disable_feed', 1);


// ADD STYLES
function route_child_styles() {
	wp_enqueue_style( 'plan-css', get_stylesheet_directory_uri().'/plan.css', false );
  wp_enqueue_style('child-style',get_stylesheet_directory_uri().'/child-style.css',false);
}

// ADD SCRIPTS
function wpdocs_route_scripts() {

    if ( defined( 'ICL_LANGUAGE_CODE' ) ) {
    	switch (ICL_LANGUAGE_CODE) {
    		case 'fr':
    			wp_enqueue_script( 'google-tag-manager', '/wp-content/themes/route-child/js/google-tm-fr.js', array(), '1.0.0', false );
    			break;
    		default:
    			wp_enqueue_script( 'google-tag-manager', '/wp-content/themes/route-child/js/google-tm-nl.js', array(), '1.0.0', false );
    	}
    } else {
    	//Do something in the case WPML is not installed
    }

		//wp_enqueue_script( 'jquery-height', '/wp-content/themes/route-child/js/jquery.matchHeight.js', array(), '1.0.0', false );
		//wp_enqueue_script( 'dd-custom', '/wp-content/themes/route-child/js/custom.js', array(), '1.0.0', false );
}

add_action( 'wp_enqueue_scripts', 'route_child_styles' );
add_action( 'wp_enqueue_scripts', 'wpdocs_route_scripts' );

include_once('cs-framework/includes/functions.php');

/*
add_action( 'template_redirect', 'so16179138_template_redirect', 0 );
function so16179138_template_redirect()
{
    if( is_singular() )
    {
        global $post, $page;
        $num_pages = substr_count( $post->post_content, '<!--nextpage-->' ) + 1;
        if( $page > $num_pages ){
            include( get_template_directory() . '/404.php' );
            exit;
        }
    }
}
*/
//enqueues our external font awesome stylesheet
function enqueue_our_required_stylesheets(){
	wp_enqueue_style('font-awesome', 'https://kit.fontawesome.com/26ed6dea25.js'); 
}
add_action('wp_enqueue_scripts','enqueue_our_required_stylesheets');
