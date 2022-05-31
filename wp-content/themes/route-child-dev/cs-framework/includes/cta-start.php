<?php
/* Startblok CTA START */
add_action( 'vc_before_init', 'vc_startblokcta' );
function vc_startblokcta() {

  $startblokken=$sid=$title = array();

  if( have_rows('cta_startblok', 'option') ):
      while( have_rows('cta_startblok', 'option') ): the_row();
          $sid[] = get_sub_field('sid');
          $title[] = strip_tags(get_sub_field('sid').' - '.get_sub_field('titel'));
      endwhile;
  endif;

  $startblokken = array_combine($title, $sid);

  $params = array(
     "type" => "dropdown",
     "class" => "",
     "heading" => __( "Text Align", "content-box" ),
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
      "name" => __( "Startblok", "startblokcta" ),
      "base" => "startblokcta",
      "class" => "",
      "category" => __( "Content", "startblokcta"),
      'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
      'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
      "params" => array(
         $params,
         $mascotte
      )
   ) );
}


add_shortcode( 'startblokcta', 'startblokcta_func' );
function startblokcta_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
     'startblokid' => '',
     'mascotte' => 0
   ), $atts ) );

   $return=NULL;
   $i=rand();

   if($startblokid):
     if( have_rows('cta_startblok', 'option') ):
         while( have_rows('cta_startblok', 'option') ): the_row();
            if (get_sub_field('sid') === $startblokid) {
              $header = get_sub_field('header');
              $headerColor = 'color: '.get_sub_field('header_color').';';
              $headerShadowColor = 'text-shadow:0px 2px '.get_sub_field('header_shadow_color').';';
              $titel = get_sub_field('titel');
              $titelColor = 'color: '.get_sub_field('titel_color').';';
              $titelSize = 'font-size: '.get_sub_field('titel_size').'px;';
              $subtitel = get_sub_field('subtitel');
              $subtitelColor = 'color: '.get_sub_field('subtitel_color').';border-color: '.get_sub_field('subtitel_color').';';
              $cta_tekst = get_sub_field('cta_tekst');
              $tag = get_sub_field('click-id');
              $maxwidth = 'max-width:'.get_sub_field('maxwidth').'px;';

              $sectionclass = 'ctastartblok';
              $ctafootercol_left='col-sm-7 col-xs-12';
              $ctafootercol_right='col-sm-5 col-xs-12';
              if(get_sub_field('maxwidth')<660):
                $sectionclass = 'ctastartblok small';
                $ctafootercol_left='col-sm-12';
                $ctafootercol_right='col-sm-12';
              endif;

              $style = NULL;
              if($background = get_sub_field('background')) $style .= 'background: url('.$background.') no-repeat center center fixed;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;';
              if($backgroundcolor = get_sub_field('background_color')) $style .= 'background-color:'.$backgroundcolor.';';
              if($bordercolor = get_sub_field('border_color')) $style .= 'border-color:'.$bordercolor.';';

              $return = '<section class="cs-section no-padding cs-section-cover-bg '.$sectionclass.'"><div class="banner">';

              if($header)
                $return .= '<div class="titel" style="'.$headerColor.$headerShadowColor.'">'.$header.'</div>';

              $return .= '<div class="bot_showdow" style="'.$maxwidth.'">
              <div class="botshadow">&nbsp;</div>
              <div class="start_now" style="'.$style.'">
              <div class="subtitel" style="'.$titelColor.' '.$titelSize.'">'.$titel.'</div>';
if(ICL_LANGUAGE_CODE=="fr"){ 
                      $return .= '<form action="https://comparateurenergie.veriftarif.be/referral_form" method="POST" target="_blank">';
  }else{
          $return .= '<form action="https://energievergelijker.tariefchecker.be/referral_form" method="POST" target="_blank">';
  } 

             $return .= '<input type="hidden" id="language" name="language" class="hidden" value="'.ICL_LANGUAGE_CODE.'">


            <input type="hidden" id="comparison_type" name="comparison_type" class="hidden test8888" value="p">

               <div class="row producttypeswrap">
                  <div class="'.$ctafootercol_left.' producttypes">
                      <span class="checkboxli input prepend"><label for="gas_'.$i.'" class="alt-checkbox fontawesome-ok medium outline-unchecked checked checkbox" href="#">&nbsp;</label><input checked="checked" id="gas_'.$i.'" class="cbinput" name="product_type[]" type="checkbox" value="gas"> <span>';
if(ICL_LANGUAGE_CODE=="fr"){ 
                      $return .= 'Gaz';
  }else{
          $return .= 'Gas';
  }                

                      $return .= '</span></span>
                      <span class="checkboxli input"><label for="electricity_'.$i.'" class="alt-checkbox fontawesome-ok medium outline-unchecked checked checkbox" href="#">&nbsp;</label><input checked="checked" id="electricity_'.$i.'" class="cbinput" name="product_type[]" type="checkbox" value="electricity"> <span>';
if(ICL_LANGUAGE_CODE=="fr"){ 
                      $return .= 'Electricité';
  }else{
          $return .= 'Elektriciteit';
  }                

                      $return .= '</span></span>
                      <div class="clear"></div>
                  </div>
                  <div class="'.$ctafootercol_right.'">
                      <div class="input medium postcode">';
                    if(ICL_LANGUAGE_CODE=="fr"){ 
                                          $return .= '<input autocomplete="off" autofocus="autofocus" data-bind="value: location.postal_code, valueUpdate: \'keyup\'" id="postal_code" name="postal_code" placeholder="Code Postal" type="text">';
                      }else{
                              $return .= '<input autocomplete="off" autofocus="autofocus" data-bind="value: location.postal_code, valueUpdate: \'keyup\'" id="postal_code" name="postal_code" placeholder="Postcode" type="text">';
                      }                

                      $return .= '
                      </div>
                  </div>
                </div>

                <div class="row ctafooter">

                  <div class="'.$ctafootercol_left.' txt" style="'.$subtitelColor.'">
                    '.$subtitel.'
                  </div>
                  <div class="'.$ctafootercol_right.'">
                    <div class="input medium"><input class="gradient-button greendient" name="commit" title="START NU >>" type="submit" value="'.$cta_tekst.'" id="'.$tag.'" /></div>
                  </div>
                  <div class="'.$ctafootercol_left.' txt mobile" style="'.$subtitelColor.'">
                    '.$subtitel.'
                  </div>
                </div>
              </form>
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
