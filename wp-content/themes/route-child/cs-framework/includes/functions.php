<?php 

/**
 * Proper way to enqueue scripts and styles.
 */
function wpdocs_theme_name_scripts() {
    /* TariefChecker */
    /*wp_enqueue_script( 'tariefchecker-api', 'https://code.jquery.com/jquery-3.4.1.min.js', array(), '12.0.0', false );*/
  //  wp_enqueue_script( 'tariefchecker-jquery', 'https://code.jquery.com/jquery-3.4.1.min.js', array(), '1.0.0', true );
   

    
    if(ICL_LANGUAGE_CODE == 'fr'):
      wp_enqueue_script( 'tariefchecker-api', 'https://www.tariefchecker.be/products.js', array(), '12.0.16', true );
      wp_enqueue_script( 'tariefchecker-js', '/wp-content/themes/route-child/js/tariefchecker_fr.js', array(), '2.0.10', true );
    else:
      wp_enqueue_script( 'tariefchecker-api', 'https://www.veriftarif.be/products.js', array(), '12.0.17', true );
      wp_enqueue_script( 'tariefchecker-js', '/wp-content/themes/route-child/js/tariefchecker.js', array(), '2.0.0', true );
    endif;


    /* CTA STARTBLOK */
//    wp_enqueue_script( 'comparison_form', '/wp-content/themes/route-child/js/comparison_form.js', array(), '1.0.0', false );
    wp_enqueue_script( 'ctastartblok', '/wp-content/themes/route-child/js/ctastartblok.js', array(), '5.0.7', true );


    wp_enqueue_script( 'pack', '/wp-content/themes/route-child/js/pack.js', array(), '19.0.1', true );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );


// ACF OPTIONS PAGE
if( function_exists('acf_add_options_page') ) {
  acf_add_options_page(array(
		'page_title' 	=> 'Startblokken',
		'menu_title'	=> 'Startblok',
		'menu_slug' 	=> 'tariefchecker-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
  acf_add_options_page(array(
		'page_title' 	=> 'CTA',
		'menu_title'	=> 'CTA',
		'menu_slug' 	=> 'tariefchecker-cta-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}


include_once('cta-start.php');
include_once('cta.php');
include_once('dynamischetabel.php');
include_once('goedkoopste.php');
include_once('detail_energieleveranciers.php');
include_once('conclusie.php');
