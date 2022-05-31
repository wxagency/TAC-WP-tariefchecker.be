<?php
/* Maandelijks Overzicht Leveranciers - Goedkoopste groene */
add_action( 'vc_before_init', 'vc_goedkoopste' );
function vc_goedkoopste() {

  $titel = get_field('titel');
  $btn = get_field('btn');
  $url = get_field('url');
  $urltxt = get_field('urltxt');
  $energietxt = get_field('energietxt');
  $energietag = get_field('energietag');

  $params = array(
    array(
        "type" => "textfield",
        "heading" => __( "Comparison Type", "content-box" ),
        "param_name" => "api_comparison_type",
        'value'       => '',
      ),
    array(
        "type" => "textfield",
        "heading" => __( "Locale", "content-box" ),
        "param_name" => "api_locale",
        'value'       => '',
      ),
    array(
        "type" => "textfield",
        "heading" => __( "Postal Code", "content-box" ),
        "param_name" => "api_postal_code",
        'value'       => '',
      ),
    array(
        "type" => "textfield",
        "heading" => __( "Usage Single", "content-box" ),
        "param_name" => "api_usage_single",
        'value'       => '',
      ),
    array(
        "type" => "textfield",
        "heading" => __( "Usage Gas", "content-box" ),
        "param_name" => "api_usage_gas",
        'value'       => '',
      ),
    array(
        "type" => "checkbox",
         "class" => "",
        "heading" => __( "Only Energy Cost", "content-box" ),
        "param_name" => "api_only_energy_cost",
        'value'    => array( 'Only Energy Cost' => '1' ),
        'std' => 'two',
      ),
    array(
        "type" => "checkbox",
         "class" => "",
        "heading" => __( "Promo Enable", "content-box" ),
        "param_name" => "api_promo",
        'value'    => array( 'Promo' => '1' ),
        'std' => 'two',
      ),
    
    array(
       "type" => "checkbox",
       "class" => "",
       "heading" => __( "Goedkoopste Groene", "content-box" ),
       "param_name" => "groene",
       'value'       => array( 'Goedkoopste Groene' => '1' ),
       'std' => 'two',
    ),
    array(
       "type" => "checkbox",
       "class" => "",
       "heading" => __( "1 Jaar Vast tarief", "content-box" ),
       "param_name" => "jrvast1",
       'value'       => array( '1 Jaar Vast tarief' => '1' ),
       'std' => 'two',
    ),
    array(
       "type" => "checkbox",
       "class" => "",
       "heading" => __( "3 Jaar Vast tarief", "content-box" ),
       "param_name" => "jrvast3",
       'value'       => array( '3 Jaar Vast tarief' => '1' ),
       'std' => 'two',
    ),
    array(
       "type" => "checkbox",
       "class" => "",
       "heading" => __( "Allergoedkoopste", "content-box" ),
       "param_name" => "allergoedkoopste",
       'value'       => array( 'Allergoedkoopste' => '1' ),
       'std' => 'two',
    ),
    /*array(
       "type" => "textfield",
       "class" => "",
       "heading" => __( "Titel", "content-box" ),
       "param_name" => "titel",
       'value'       => $titel,
       'std' => '',
    ),*/
    /*array(
       "type" => "vc_link",
       "class" => "",
       "heading" => __( "URL", "content-box" ),
       "param_name" => "url",
       'value'       => $url,
       'std' => '',
    ),
    array(
       "type" => "textfield",
       "class" => "",
       "heading" => __( "URL Tekst", "content-box" ),
       "param_name" => "urltxt",
       'value'       => $urltxt,
       'std' => '',
    ),*/
    array(
       "type" => "textfield",
       "class" => "",
       "heading" => __( "Button tekst", "content-box" ),
       "param_name" => "btn",
       'value'       => $btn,
       'std' => '',
    ),
    array(
       "type" => "textfield",
       "class" => "",
       "heading" => __( "Energievergelijker tekst", "content-box" ),
       "param_name" => "energietxt",
       'value'       => $energietxt,
       'std' => '',
    ),
    array(
       "type" => "textfield",
       "class" => "",
       "heading" => __( "Energievergelijker TAG", "content-box" ),
       "param_name" => "energietag",
       'value'       => $energietag,
       'std' => '',
    ),
    /*array(
       "type" => "checkbox",
       "class" => "",
       "heading" => __( "Tariefformules", "content-box" ),
       "param_name" => "description",
       'value'       => array('Display table descriptions?'   => '1' ),
       'std' => 'two',
    )*/
  );

   vc_map( array(
      "name" => __( "Goedkoopste Energieleveranciers", "TariefChecker" ),
      "description" => "",
      "base" => "goedkoopste",
      "class" => "",
      "category" => __( "Content", "TariefChecker"),
      'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
      'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
      "params" => $params
   ) );
}

add_shortcode( 'goedkoopste', 'goedkoopste_func' );
function goedkoopste_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
      'api_comparison_type' => '',
      'api_locale' => '',
      'api_postal_code' => '',
      'api_usage_single' => '',
      'api_usage_gas' => '',
      'api_only_energy_cost' => '',
      'api_promo' => '',
     'groene' => '',
     'jrvast1' => '',
     'jrvast3' => '',
     'allergoedkoopste' => '',
     //'titel' => '',
     'btn' => '',
     //'url' => '',
     //'urltxt' => '',
     'energietxt' => '',
     'energietag' => ''
   ), $atts ) );

if($_SERVER['REMOTE_ADDR']=="103.85.205.34"){
//print_r($atts);
//print_r($api_comparison_type);

}
   $href = vc_build_link($url);

   $return = '<div class="snip1214"><input type="hidden" value = "'.$api_comparison_type.'" id="api_comparison_type">
<input type="hidden" value = "'.$api_locale.'" id="api_locale">
<input type="hidden" value = "'.$api_postal_code.'" id="api_postal_code">
<input type="hidden" value = "'.$api_usage_single.'" id="api_usage_single">
<input type="hidden" value = "'.$api_usage_gas.'" id="api_usage_gas">
<input type="hidden" value = "'.$api_only_energy_cost.'" id="api_only_energy_cost">
<input type="hidden" value = "'.$api_promo.'" id="api_promo">

   ';

   if($groene):
         $return .= '<div class="plan">
           <div class="plancontainer borderright">
               <div class="plan-subtitle">Goedkoopste .<span class="green">Groene</span> Energieleverancier</div>
               <div class="plan-image lp-element lp-pom-text">
                 <img class="supplier_logo" data-ps-product="Groene" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" />
               </div>
               <div class="plan-productname"><span class="product_name" data-ps-product="Groene" data-ps-field="name">NAME</span></div>
               <div class="plan-features">
                  <span data-ps-field="$delta" data-ps-product="Groene">PRICE DIFFERENCE</span>/jaar duurder dan de goedkoopste leverancier.
               </div>

               <div class="plan-more"><a href="#goedkoopstegroeneinfo">'.__('More info', 'tariefchecker').'</a></div>
               <div class="plan-select"><a class="lp-element lp-pom-button bluebtn" data-ps-product="Groene" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">'.$btn.'</a></div>
               <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$energietag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$energietxt.'</a></div>
           </div>
         </div>';
    endif;

    if($jrvast1):
        $return .= '<div class="plan">';

        if(!$allergoedkoopste):
            $return .= '<div class="plancontainer borderright">';
        else:
            $return .= '<div class="plancontainer">';
        endif;

           $return .= '
               <div class="plan-subtitle">Goedkoopste 1 jaar Vast tarief</div>
               <div class="plan-image lp-element lp-pom-text">
                 <img class="supplier_logo" data-ps-product="1jrvast" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" />
               </div>
               <div class="plan-productname"><span class="product_name" data-ps-product="1jrvast" data-ps-field="name">NAME</span></div>
               <div class="plan-features">
                  <span data-ps-field="$delta" data-ps-product="1jrvast">PRICE DIFFERENCE</span>/jaar duurder dan de goedkoopste leverancier.
               </div>

               <div class="plan-more"><a href="#1jrvast">'.__('More info', 'tariefchecker').'</a></div>
               <div class="plan-select"><a class="lp-element lp-pom-button bluebtn" data-ps-product="1jrvast" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">'.$btn.'</a></div>
               <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$energietag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$energietxt.'</a></div>
           </div>
         </div>';
   endif;

   if($allergoedkoopste):
         $return .= '<div class="plan featured">
             <h3 class="plan-title">
               De goedkoopste
             </h3>
             <div class="plancontainer">
                 <div class="plan-subtitle">Allergoedkoopste Energieleverancier</div>
                 <div class="plan-image lp-element lp-pom-text">
                   <img class="supplier_logo" data-ps-product="Goedkoopste" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" />
                 </div>
                 <div class="plan-productname"><span class="product_name" data-ps-product="Goedkoopste" data-ps-field="name">NAME</span></div>
                 <div class="plan-features">
                    Nu met <span class="blue"><span data-ps-field="price_promo_year" data-ps-product="Goedkoopste">PRICE DIFFERENCE</span> korting</span> via <span class="blue">Tariefchecker.be</span>.
                 </div>

                 <div class="plan-more"><a href="#goedkoopste">'.__('More info', 'tariefchecker').'</a></div>
                 <div class="plan-select"><a class="lp-element lp-pom-button redbtn" data-ps-product="Goedkoopste" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">'.$btn.'</a></div>
                 <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$energietag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$energietxt.'</a></div>
             </div>
         </div>';
   endif;

   if($jrvast3):
         $return .= '<div class="plan">
           <div class="plancontainer">
             <div class="plan-subtitle">Goedkoopste 3 jaar Vast tarief</div>
             <div class="plan-image lp-element lp-pom-text">
               <img class="supplier_logo" data-ps-product="3jrvast" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" />
             </div>
             <div class="plan-productname"><span class="product_name" data-ps-product="3jrvast" data-ps-field="name">NAME</span></div>
             <div class="plan-features">
                <span data-ps-field="$delta" data-ps-product="3jrvast">PRICE DIFFERENCE</span>/jaar duurder dan de goedkoopste leverancier.
             </div>

             <div class="plan-more"><a href="#3jrvast">'.__('More info', 'tariefchecker').'</a></div>
             <div class="plan-select"><a class="lp-element lp-pom-button bluebtn" data-ps-product="3jrvast" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">'.$btn.'</a></div>
             <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$energietag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$energietxt.'</a></div>
           </div>
         </div>';
   endif;

   $return .= '</div>';


   /*$return = '<div class="lp-element lp-pom-box" id="lp-pom-box-122">
          <div id="lp-pom-box-122-color-overlay"></div>
          <div class="lp-element lp-pom-text" id="lp-pom-text-116">
          <h3>'.$titel.'</h3>
          </div>

          <div class="lp-element lp-pom-text">
            <img class="supplier_logo" data-ps-product="Groene" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" />
          </div>

          <!--<div class="lp-element lp-pom-text">
            <strong><span class="supplier_name" data-ps-product="Groene" data-ps-field="supplier_name">NAME</span></strong>
          </div>-->

          <div class="lp-element lp-pom-text">
            <h3><span class="product_name" data-ps-product="Groene" data-ps-field="name">NAME</span></h3>
          </div>

          <div class="lp-element lp-pom-text">
            <p><span data-ps-field="$delta" data-ps-product="Groene">PRICE DIFFERENCE</span>/jaar duurder dan de goedkoopste leverancier.</p>
          </div>

          <div class="lp-element lp-pom-text">
            <p><a href="#goedkoopstegroeneinfo">'.__('More info', 'tariefchecker').'</a></p>
          </div>

          <div class="lp-element lp-pom-text">
            <a class="lp-element lp-pom-button" data-ps-product="Groene" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">'.$btn.'</a>
          </div>

          <div class="lp-element lp-pom-text">
            <a class="lp-element lp-pom-button" id="'.$energietag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$energietxt.'</a>
          </div>
      </div>
      ';*/

      $script = '<script type="text/javascript">
    var s = new ProductSet.Selector(new ProductSet.Parameters({
      comparison_type: "pack",
      locale: "nl",
      postal_code: 2000,
      usage: {
        single: 3500,
          gas: 25000,
      },
      only_energy_cost: true,
      promo: true
    }));

    s.select(\'1jrvast\').by(\'pricing_type\', \'fixed\').and(\'contract_duration\', 1).
    decorate("price_period_end",ProductSet.Decorators.date).
    decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
    decorate("price_period_start",price_period).
    calculate("$delta", delta);

    selector.select(\'3jrvast\').by(\'pricing_type\', \'fixed\').and(\'contract_duration\', 3).
    decorate("price_period_end",ProductSet.Decorators.date).
    decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
    decorate("product_service_level",service_level).
    decorate("product_pricing_type",price_type).
    decorate("price_period_start",price_period).
    calculate("$delta", delta_3jrvast) ;

    s.select(\'Groene\').by(\'greenpeace_rating\', 0.65).and(\'green\',\'y\').
    decorate("price_period_end",ProductSet.Decorators.date).
    decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
    decorate("product_service_level",service_level).
    decorate("product_pricing_type",price_type).
    calculate("$delta", delta_Groene);

    s.bind();
</script>';

      return $return;
}
