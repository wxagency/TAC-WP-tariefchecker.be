<?php
/* TariefChecker */
wp_enqueue_script( 'tariefchecker-api', 'https://api.tariefchecker.be/products.js', array(), '1.0.0', false );
wp_enqueue_script( 'tariefchecker-js', '/wp-content/themes/route-child/cs-framework/includes/js/tariefchecker.js', array(), '1.0.0', false );



/* Startblok CTA START */
// Shortcode generator
if( function_exists('acf_add_options_page') ) {
  acf_add_options_page(array(
		'page_title' 	=> 'Tariefchecker',
		'menu_title'	=> 'Tariefchecker',
		'menu_slug' 	=> 'tariefchecker-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}

add_action( 'vc_before_init', 'vc_startblokcta' );
function vc_startblokcta() {
   vc_map( array(
      "name" => __( "CTA Startblok", "startblokcta" ),
      "base" => "startblokcta",
      "class" => "",
      "category" => __( "Content", "startblokcta"),
      'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
      'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
      "params" => array(
         array(
            "type" => "textfield",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Title", "square-box" ),
            "param_name" => "text",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "textfield",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Subtitle", "square-box" ),
            "param_name" => "subtitle",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "vc_link",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Link", "square-box" ),
            "param_name" => "link",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "textfield",
            "holder" => "span",
            "class" => "xib",
            "heading" => __( "Link Text", "content-box" ),
            "param_name" => "link_txt",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "dropdown",
            "class" => "",
            "heading" => __( "Text Align", "content-box" ),
            "param_name" => "align",
            "value" => array('left','center','right'),
         ),
         array(
            "type" => "colorpicker",
            "class" => "",
            "heading" => __( "Background color", "square-box" ),
            "param_name" => "color",
            "value" => '#FFF600', //Default Yellow color
         ),
         array(
            "type" => "attach_image",
            "class" => "",
            "heading" => __( "Background Image", "square-box" ),
            "param_name" => "bgimage",
            "value" => '',
         ),
         array(
            "type" => "colorpicker",
            "class" => "",
            "heading" => __( "Text Color", "content-box" ),
            "param_name" => "color_style",
            "value" => '#000000', // Default Black
         ),
      )
   ) );
}

add_shortcode( 'startblokcta', 'startblokcta_func' );
function startblokcta_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
     'text' => '',
     'subtitle' => '',
     'link' => '',
     'link_txt' => '',
     'align' => '',
     'color' => '',
     'bgimage' => '',
     'color_style'=> ''
   ), $atts ) );

   //$content = wpb_js_remove_wpautop($content, true); // fix unclosed/unwanted paragraph tags in $content

   $link = vc_build_link( $link, true );
   $url = $link['url'];

   $img = wp_get_attachment_image_src($bgimage, "large");
   $imgSrc = $img[0];

   /*if($imgSrc):
     $style='background:url('.$imgSrc.') no-repeat 50% 50%;  -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;';
     $overlay='';
     $box_style='nav_box';
   else:
     $style .= 'background-color:'.$color.';';
     $overlay = '<div class="xabfull bg_overlay">&nbsp;</div><div class="xabfull bg_overlay_top hide">&nbsp;</div>';
     $box_style='yellow_link';
   endif;*/

   $style .= 'background-color:'.$color.';';
   $overlay = '<div class="xabfull bg_overlay">&nbsp;</div><div class="xabfull bg_overlay_top hide">&nbsp;</div>';
   $box_style='yellow_link';

   if($color_style):
     $style .= 'color:'.$color_style.';';
   endif;

   $style .= 'text-align:'.$align.';';
   if($align != 0):
     $style .= 'text-align:'.$align.';';
   endif;

   if($text) $txt = '<h1 class="content_box_title">'.$text.'</h1>';
   if($subtitle) $subtitle='<p>'.$subtitle.'</p>';

   $return = '<div class="xb border_elision show_mobile">
            '.$txt.'
            '.$subtitle.'
            <a href="'.$url.'" class="xb boxed_link '.$box_style.'" style="'.$style.'">
  						<span class="xib">'.$link_txt.'</span>
  					</a>
				</div>';

   return $return;
}
/* Startblok CTA STOP */




/* CTA Block START */
add_action( 'vc_before_init', 'vc_cta' );
function vc_cta() {
   vc_map( array(
      "name" => __( "CTA Block", "cta" ),
      "base" => "cta",
      "class" => "",
      "category" => __( "Content", "cta"),
      'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
      'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
      "params" => array(
         array(
            "type" => "textfield",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Title", "square-box" ),
            "param_name" => "text",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "textfield",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Subtitle", "square-box" ),
            "param_name" => "subtitle",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "vc_link",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Link", "square-box" ),
            "param_name" => "link",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "textfield",
            "holder" => "span",
            "class" => "xib",
            "heading" => __( "Link Text", "content-box" ),
            "param_name" => "link_txt",
            "value" => __( "", "square-box" ),
         ),
         array(
            "type" => "dropdown",
            "class" => "",
            "heading" => __( "Text Align", "content-box" ),
            "param_name" => "align",
            "value" => array('left','center','right'),
         ),
         array(
            "type" => "colorpicker",
            "class" => "",
            "heading" => __( "Background color", "square-box" ),
            "param_name" => "color",
            "value" => '#FFF600', //Default Yellow color
         ),
         array(
            "type" => "attach_image",
            "class" => "",
            "heading" => __( "Background Image", "square-box" ),
            "param_name" => "bgimage",
            "value" => '',
         ),
         array(
            "type" => "colorpicker",
            "class" => "",
            "heading" => __( "Text Color", "content-box" ),
            "param_name" => "color_style",
            "value" => '#000000', // Default Black
         ),
      )
   ) );
}

add_shortcode( 'cta', 'cta_func' );
function cta_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
     'text' => '',
     'subtitle' => '',
     'link' => '',
     'link_txt' => '',
     'align' => '',
     'color' => '',
     'bgimage' => '',
     'color_style'=> ''
   ), $atts ) );

   //$content = wpb_js_remove_wpautop($content, true); // fix unclosed/unwanted paragraph tags in $content

   $link = vc_build_link( $link, true );
   $url = $link['url'];

   $img = wp_get_attachment_image_src($bgimage, "large");
   $imgSrc = $img[0];

   /*if($imgSrc):
     $style='background:url('.$imgSrc.') no-repeat 50% 50%;  -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;';
     $overlay='';
     $box_style='nav_box';
   else:
     $style .= 'background-color:'.$color.';';
     $overlay = '<div class="xabfull bg_overlay">&nbsp;</div><div class="xabfull bg_overlay_top hide">&nbsp;</div>';
     $box_style='yellow_link';
   endif;*/

   $style .= 'background-color:'.$color.';';
   $overlay = '<div class="xabfull bg_overlay">&nbsp;</div><div class="xabfull bg_overlay_top hide">&nbsp;</div>';
   $box_style='yellow_link';

   if($color_style):
     $style .= 'color:'.$color_style.';';
   endif;

   $style .= 'text-align:'.$align.';';
   if($align != 0):
     $style .= 'text-align:'.$align.';';
   endif;

   if($text) $txt = '<h1 class="content_box_title">'.$text.'</h1>';
   if($subtitle) $subtitle='<p>'.$subtitle.'</p>';

   $return = '<div class="xb border_elision show_mobile">
            '.$txt.'
            '.$subtitle.'
            <a href="'.$url.'" class="xb boxed_link '.$box_style.'" style="'.$style.'">
  						<span class="xib">'.$link_txt.'</span>
  					</a>
				</div>';

   return $return;
}
/* CTA STOP */
