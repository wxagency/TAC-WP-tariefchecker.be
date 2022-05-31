<?php
add_action( 'vc_before_init', 'vc_detail_goedkoopste' );
add_action( 'vc_before_init', 'vc_goedkoopstegroene' );
add_action( 'vc_before_init', 'vc_goedkoopste1jaar' );
add_action( 'vc_before_init', 'vc_goedkoopste3jaar' );

function vc_detail_goedkoopste() {
    $params = array(
      array(
         "type" => "checkbox",
         "class" => "",
         "heading" => __( "Blue background?", "content-box" ),
         "param_name" => "blue",
         'value'       => array( 'Yes' => '1' ),
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Title", "content-box" ),
         "param_name" => "title",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Subtitle", "content-box" ),
         "param_name" => "subtitle",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textarea",
         "class" => "",
         "heading" => __( "Category description", "content-box" ),
         "param_name" => "description",
         'value'       => '',
         'std' => '',
         'description' => 'Use {{API_DATA}} to get dynamic content',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Start jouw vergelijking tekst", "content-box" ),
        "param_name" => "vergelijktxt",
        'value'       => '',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Vergelijking tag", "content-box" ),
        "param_name" => "tag",
        'value'       => '',
      ),
    );
    vc_map( array(
       "name" => __( "Details Goedkoopste", "TariefChecker" ),
       "description" => "",
       "base" => "detail_goedkoopste",
       "class" => "",
       "category" => __( "Content", "TariefChecker"),
       'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
       'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
       "params" => $params
    ) );
}

function vc_goedkoopstegroene() {
    $params = array(
      array(
         "type" => "checkbox",
         "class" => "",
         "heading" => __( "Blue background?", "content-box" ),
         "param_name" => "blue",
         'value'       => array( 'Yes' => '1' ),
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Title", "content-box" ),
         "param_name" => "title",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Subtitle", "content-box" ),
         "param_name" => "subtitle",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textarea",
         "class" => "",
         "heading" => __( "Category description", "content-box" ),
         "param_name" => "description",
         'value'       => '',
         'std' => '',
         'description' => 'Use {{API_DATA}} to get dynamic content',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Start jouw vergelijking tekst", "content-box" ),
        "param_name" => "vergelijktxt",
        'value'       => '',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Vergelijking tag", "content-box" ),
        "param_name" => "tag",
        'value'       => '',
      ),
    );
    vc_map( array(
       "name" => __( "Details Goedkoopste Groene", "TariefChecker" ),
       "description" => "",
       "base" => "goedkoopgroen",
       "class" => "",
       "category" => __( "Content", "TariefChecker"),
       'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
       'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
       "params" => $params
    ) );
}

function vc_goedkoopste1jaar() {
    $params = array(
      array(
         "type" => "checkbox",
         "class" => "",
         "heading" => __( "Blue background?", "content-box" ),
         "param_name" => "blue",
         'value'       => array( 'Yes' => '1' ),
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Title", "content-box" ),
         "param_name" => "title",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Subtitle", "content-box" ),
         "param_name" => "subtitle",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textarea",
         "class" => "",
         "heading" => __( "Category description", "content-box" ),
         "param_name" => "description",
         'value'       => '',
         'std' => '',
         'description' => 'Use {{API_DATA}} to get dynamic content',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Start jouw vergelijking tekst", "content-box" ),
        "param_name" => "vergelijktxt",
        'value'       => '',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Vergelijking tag", "content-box" ),
        "param_name" => "tag",
        'value'       => '',
      ),
    );
    vc_map( array(
       "name" => __( "Details Goedkoopste Normaal (1 Jaar)", "TariefChecker" ),
       "description" => "",
       "base" => "goedkoopnormal",
       "class" => "",
       "category" => __( "Content", "TariefChecker"),
       'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
       'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
       "params" => $params
    ) );
}

function vc_goedkoopste3jaar() {
    $params = array(
      array(
         "type" => "checkbox",
         "class" => "",
         "heading" => __( "Blue background?", "content-box" ),
         "param_name" => "blue",
         'value'       => array( 'Yes' => '1' ),
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Title", "content-box" ),
         "param_name" => "title",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textfield",
         "class" => "",
         "heading" => __( "Subtitle", "content-box" ),
         "param_name" => "subtitle",
         'value'       => '',
         'std' => '',
      ),
      array(
         "type" => "textarea",
         "class" => "",
         "heading" => __( "Category description", "content-box" ),
         "param_name" => "description",
         'value'       => '',
         'std' => '',
         'description' => 'Use {{API_DATA}} to get dynamic content',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Start jouw vergelijking tekst", "content-box" ),
        "param_name" => "vergelijktxt",
        'value'       => '',
      ),
      array(
        "type" => "textfield",
        "heading" => __( "Vergelijking tag", "content-box" ),
        "param_name" => "tag",
        'value'       => '',
      ),
    );
    vc_map( array(
       "name" => __( "Details Goedkoopste 3 Jaar", "TariefChecker" ),
       "description" => "",
       "base" => "goedkoop3jr",
       "class" => "",
       "category" => __( "Content", "TariefChecker"),
       'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
       'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
       "params" => $params
    ) );
}


// DETAIL GOEDKOOPSTE
add_shortcode( 'detail_goedkoopste', 'detail_goedkoopste_func' );
function detail_goedkoopste_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
    'blue' => '',
    'title' => '',
    'subtitle' => '',
    'description' => '',
    'vergelijktxt' => '',
    'tag' => ''
   ), $atts ) );

   $containerclass = null;
   if($blue) $containerclass = 'bluebg';

   $search = array('{{','}}');
   $replace = array('<span data-ps-field="','" data-ps-product="Goedkoopste">%%%</span>');

   $title = str_replace($search, $replace, $title);
   $subtitle = str_replace($search, $replace, $subtitle);
   $description = str_replace($search, $replace, $description);

   $return = '<div id="goedkoopste" class="anchor"></div><div class="detailblok container-fluid '.$containerclass.'">';
   $return .= '<div class="container">';
   $return .= '<h2>'.$title.'</h2>';
   $return .= '<p><strong>'.$subtitle.'</strong></p>
              <p>'.$description.'</p>';
   $return .= '<div class="col-md-3 col-sm-12 align-bottom">
     <img data-ps-product="Goedkoopste" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" class="center supplier_logo" />
     <div class="plan-select"><a class="lp-element lp-pom-button redbtn small" data-ps-product="Goedkoopste" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">Word klant</a></div>
   </div>';
   $return .= '<div class="col-md-9 col-sm-12">
     <div class="blue semibold"><span data-ps-field="name" data-ps-product="Goedkoopste">PRODUCT NAME</span> in het kort:</div>
     <ul>
      <li><span data-ps-field="product_contract_duration" data-ps-product="Goedkoopste">CONTRACTDUUR</span> jaar</li>
      <li><span data-ps-field="product_pricing_type" data-ps-product="Goedkoopste">PRIJS TYPE</span></li>
      <li><span class="Goedkoopste product_service_level">SERVICE LEVEL</span></li>
      <li class="blue"><strong>Korting van <span data-ps-field="price_promo_year" data-ps-product="Goedkoopste">PRICE DIFFERENCE</span></strong></li>
     </ul>
     <div class="condition">Enkel geldig voor nieuwe klanten die zich <strong><span class="blue">via Tariefchecker</span></strong> registreren <strong>v&oacute;&oacute;r '.date('t').'/'.date('m').'/'.date('Y').'</strong></div>
     <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$tag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$vergelijktxt.'</a></div>
   </div>';
   $return .= '</div>';
   $return .= '</div>';

   return $return;
}

// DETAIL GOEDKOOP GROEN
add_shortcode( 'goedkoopgroen', 'goedkoopgroen_func' );
function goedkoopgroen_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
    'blue' => '',
    'title' => '',
    'subtitle' => '',
    'description' => '',
    'vergelijktxt' => '',
    'tag' => ''
   ), $atts ) );

   $containerclass = null;
   if($blue) $containerclass = 'bluebg';

   $search = array('{{','}}');
   $replace = array('<span data-ps-field="','" data-ps-product="Groene">%%%</span>');

   $title = str_replace($search, $replace, $title);
   $subtitle = str_replace($search, $replace, $subtitle);
   $description = str_replace($search, $replace, $description);

   $return = '<div id="goedkoopstegroeneinfo" class="anchor"></div><div class="detailblok container-fluid '.$containerclass.'">';
   $return .= '<div class="container">';
   $return .= '<h2>'.$title.'</h2>';
   $return .= '<p><strong>'.$subtitle.'</strong></p>
              <p>'.$description.'</p>';
   $return .= '<div class="col-md-3 col-sm-12">
     <img data-ps-product="Groene" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" class="center supplier_logo" />
     <div class="plan-select"><a class="lp-element lp-pom-button redbtn small" data-ps-product="Groene" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">Word klant</a></div>
   </div>';
   $return .= '<div class="col-md-9 col-sm-12">
     <div class="blue semibold"><span data-ps-field="name" data-ps-product="Groene">PRODUCT NAME</span> in het kort:</div>
     <ul>
      <li><span data-ps-field="product_contract_duration" data-ps-product="Groene">CONTRACTDUUR</span> jaar</li>
      <li><span data-ps-field="product_pricing_type" data-ps-product="Groene">PRIJS TYPE</span></li>
      <li><span class="Groene product_service_level">SERVICE LEVEL</span></li>
      <li class="blue"><strong>Korting van <span data-ps-field="price_promo_year" data-ps-product="Groene">PRICE DIFFERENCE</span></strong></li>
     </ul>
     <div class="condition">Enkel geldig voor nieuwe klanten die zich <strong><span class="blue">via Tariefchecker</span></strong> registreren <strong>v&oacute;&oacute;r '.date('t').'/'.date('m').'/'.date('Y').'</strong></div>
     <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$tag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$vergelijktxt.'</a></div>
   </div>';
   $return .= '</div>';
   $return .= '</div>';

   return $return;
}


// DETAIL GOEDKOOP NORMAAL
add_shortcode( 'goedkoopnormal', 'goedkoopnormal_func' );
function goedkoopnormal_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
    'blue' => '',
    'title' => '',
    'subtitle' => '',
    'description' => '',
    'vergelijktxt' => '',
    'tag' => ''
   ), $atts ) );

   $containerclass = null;
   if($blue) $containerclass = 'bluebg';

   $search = array('{{','}}');
   $replace = array('<span data-ps-field="','" data-ps-product="1jrvast">%%%</span>');

   $title = str_replace($search, $replace, $title);
   $subtitle = str_replace($search, $replace, $subtitle);
   $description = str_replace($search, $replace, $description);

   $return = '<div id="1jrvast" class="anchor"></div><div class="detailblok container-fluid '.$containerclass.'">';
   $return .= '<div class="container">';
   $return .= '<h2>'.$title.'</h2>';
   $return .= '<p><strong>'.$subtitle.'</strong></p>
              <p>'.$description.'</p>';
   $return .= '<div class="col-md-3 col-sm-12">
     <img data-ps-product="1jrvast" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" class="center supplier_logo" />
     <div class="plan-select"><a class="lp-element lp-pom-button redbtn small" data-ps-product="1jrvast" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">Word klant</a></div>
   </div>';
   $return .= '<div class="col-md-9 col-sm-12">
     <div class="blue semibold"><span data-ps-field="name" data-ps-product="1jrvast">PRODUCT NAME</span> in het kort:</div>
     <ul>
      <li><span data-ps-field="product_contract_duration" data-ps-product="1jrvast">CONTRACTDUUR</span> jaar</li>
      <li><span data-ps-field="product_pricing_type" data-ps-product="1jrvast">PRIJS TYPE</span></li>
      <li><span class="1jrvast product_service_level">SERVICE LEVEL</span></li>
      <li class="blue"><strong>Korting van <span data-ps-field="price_promo_year" data-ps-product="1jrvast">PRICE DIFFERENCE</span></strong></li>
     </ul>
     <div class="condition">Enkel geldig voor nieuwe klanten die zich <strong><span class="blue">via Tariefchecker</span></strong> registreren <strong>v&oacute;&oacute;r '.date('t').'/'.date('m').'/'.date('Y').'</strong></div>
     <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$tag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$vergelijktxt.'</a></div>
   </div>';
   $return .= '</div>';
   $return .= '</div>';

   return $return;
}


// DETAIL GOEDKOOP 3 JAAR
add_shortcode( 'goedkoop3jr', 'goedkoop3jr_func' );
function goedkoop3jr_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
    'blue' => '',
    'title' => '',
    'subtitle' => '',
    'description' => '',
    'vergelijktxt' => '',
    'tag' => ''
   ), $atts ) );

   $containerclass = null;
   if($blue) $containerclass = 'bluebg';

   $search = array('{{','}}');
   $replace = array('<span data-ps-field="','" data-ps-product="3jrvast">%%%</span>');

   $title = str_replace($search, $replace, $title);
   $subtitle = str_replace($search, $replace, $subtitle);
   $description = str_replace($search, $replace, $description);

   $return = '<div id="3jrvast" class="anchor"></div><div class="detailblok container-fluid '.$containerclass.'">';
   $return .= '<div class="container">';
   $return .= '<h2>'.$title.'</h2>';
   $return .= '<p><strong>'.$subtitle.'</strong></p>
              <p>'.$description.'</p>';
   $return .= '<div class="col-md-3 col-sm-12">
     <img data-ps-product="3jrvast" data-ps-field="supplier_logo" data-ps-attribute="src" src="#" class="center supplier_logo" />
     <div class="plan-select"><a class="lp-element lp-pom-button redbtn small" data-ps-product="3jrvast" data-ps-field="product_subscribe_url" data-ps-attribute="href" href="#" target="_blank">Word klant</a></div>
   </div>';
   $return .= '<div class="col-md-9 col-sm-12">
     <div class="blue semibold"><span data-ps-field="name" data-ps-product="3jrvast">PRODUCT NAME</span> in het kort:</div>
     <ul>
      <li><span data-ps-field="product_contract_duration" data-ps-product="3jrvast">CONTRACTDUUR</span> jaar</li>
      <li><span data-ps-field="product_pricing_type" data-ps-product="3jrvast">PRIJS TYPE</span></li>
      <li><span class="3jrvast product_service_level">SERVICE LEVEL</span></li>
      <li class="blue"><strong>Korting van <span data-ps-field="price_promo_year" data-ps-product="3jrvast">PRICE DIFFERENCE</span></strong></li>
     </ul>
     <div class="condition">Enkel geldig voor nieuwe klanten die zich <strong><span class="blue">via Tariefchecker</span></strong> registreren <strong>v&oacute;&oacute;r '.date('t').'/'.date('m').'/'.date('Y').'</strong></div>
     <div class="plan-calculate"><a class="lp-element lp-pom-button" id="'.$tag.'" href="http://energievergelijker.tariefchecker.be" target="_blank">'.$vergelijktxt.'</a></div>
   </div>';
   $return .= '</div>';
   $return .= '</div>';

   return $return;
}
?>
