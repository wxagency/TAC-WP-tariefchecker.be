<?php
/* CTA START */
add_action( 'vc_before_init', 'vc_cta' );
function vc_cta() {

  $startblokken=$sid=$title = array();

  if( have_rows('cta_events', 'option') ):
      while( have_rows('cta_events', 'option') ): the_row();
          $sid[] = get_sub_field('sid');
          $title[] = strip_tags(get_sub_field('sid').' - '.get_sub_field('titel'));
      endwhile;
  endif;

  $startblokken = array_combine($title, $sid);

  $params = array(
     "type" => "dropdown",
     "class" => "",
     "heading" => __( "CTA Blok", "content-box" ),
     "param_name" => "startblokid",
     'value'       => $startblokken,
     'std' => 'two',
  );

  $mascotte = array(
     "type" => "checkbox",
     "class" => "",
     "heading" => __( "Mascotte tonen?", "content-box" ),
     "param_name" => "mascotte",
     'value'       => 1,
     'std' => 'two',
  );

   vc_map( array(
      "name" => __( "CTA", "cta" ),
      "base" => "cta",
      "class" => "",
      "category" => __( "Content", "cta"),
      'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
      'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
      "params" => array(
         $params,
         $mascotte
      )
   ) );
}


add_shortcode( 'cta', 'cta_func' );
function cta_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
     'startblokid' => '',
     'mascotte' => 0
   ), $atts ) );

   $return=NULL;
   $i=rand();

   if($startblokid):
     if( have_rows('cta_events', 'option') ):
         while( have_rows('cta_events', 'option') ): the_row();
            if (get_sub_field('sid') === $startblokid) {
              $header = get_sub_field('header');
              $headerColor = 'color: '.get_sub_field('header_color').';';
              $headerShadowColor = 'text-shadow:0px 2px '.get_sub_field('header_shadow_color').';';
              $titel = get_sub_field('titel');
              $titelColor = 'color: '.get_sub_field('titel_color').';';
              $subtitel = get_sub_field('subtitel');
              $subtitelColor = 'color: '.get_sub_field('subtitel_color').';';
              $cta_tekst = get_sub_field('cta_tekst');
              $tag = get_sub_field('click-id');
              $url = get_sub_field('cta_url');
              $maxwidth = 'max-width:'.get_sub_field('maxwidth').'px;';

              $style = NULL;
              if($background = get_sub_field('background')) $style .= 'background: url('.$background.') no-repeat center center fixed;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;';
              if($backgroundcolor = get_sub_field('background_color')) $style .= 'background-color:'.$backgroundcolor.';';

              $return = '<section class="cs-section no-padding cs-section-cover-bg ctablok">
              <div class="titel" style="'.$headerColor.$headerShadowColor.'">'.$header.'</div>
              <div class="banner">';


              $return .= '<div class="bot_showdow" style="'.$maxwidth.'">
              <div class="botshadow">&nbsp;</div>
              <div class="start_now" style="'.$style.'">
                <div class="subtitel" style="'.$titelColor.'">'.$titel.'</div>
                <div class="subsubtitel" style="'.$subtitelColor.'">'.$subtitel.'</div>
                <div class="input medium"><a href="'.$url.'" id="'.$tag.'" class="gradient-button greendient redbtn">'.$cta_tekst.'</a></div>
              </div>';

              if($mascotte):
                $return .= '<div class="mascot1">&nbsp;</div>';
              endif;

              
              $return .= '<div class="botshadow">&nbsp;</div>
              </div>';

              /*$return .= '<h3>'.$subtitel.'</h3>';
              $return .= '<p>'.$cta_tekst.'</p>';
              $return .= '<p>Tag: '.$tag.'</p>';*/

              $return .= '</div></section>';
              //$return .= '<script src="/wp-content/themes/route-child/js/comparison_form.js"></script>';
              //$return .= '<script src="/wp-content/themes/route-child/js/ctastartblok.js"></script>';

            }
          endwhile;
      endif;
   endif;

   return $return;
}
/* Startblok CTA STOP */
