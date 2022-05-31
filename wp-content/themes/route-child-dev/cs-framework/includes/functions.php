<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<?php
/**
 * Proper way to enqueue scripts and styles.
 */
function wpdocs_theme_name_scripts() {
    /* TariefChecker */
    wp_enqueue_script( 'tariefchecker-api', 'https://tariefchecker.be/products.js', array(), '5.0.0', false );

    
    if(ICL_LANGUAGE_CODE == 'fr'):
      wp_enqueue_script( 'tariefchecker-js', '/wp-content/themes/route-child/js/tariefchecker_fr.js', array(), '1.0.9', true );
    else:
      wp_enqueue_script( 'tariefchecker-js', '/wp-content/themes/route-child/js/tariefchecker.js', array(), '1.0.0', true );
    endif;


    /* CTA STARTBLOK */
//    wp_enqueue_script( 'comparison_form', '/wp-content/themes/route-child/js/comparison_form.js', array(), '1.0.0', false );
    wp_enqueue_script( 'ctastartblok', '/wp-content/themes/route-child/js/ctastartblok.js', array(), '4.0.0', true );


    wp_enqueue_script( 'pack', '/wp-content/themes/route-child/js/pack.js', array(), '18.0.0', true );
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
