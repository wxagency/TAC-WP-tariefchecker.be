<?php
/* Dynamische Tabel */
add_action( 'vc_before_init', 'vc_dyntabel' );
function vc_dyntabel() {

  $supplier = get_field('supplier');

  $params = array(
      array(
       "type" => "textfield",
       "class" => "",
       "heading" => __( "Supplier", "content-box" ),
       "param_name" => "supplier",
       'value'       => $supplier,
       'std' => 'two',
    ),
    array(
       "type" => "checkbox",
       "class" => "",
       "heading" => __( "Tariefformules", "content-box" ),
       "param_name" => "description",
       'value'       => array('Display table descriptions?'   => '1' ),
       'std' => 'two',
    )
  );

   vc_map( array(
      "name" => __( "Dynamische Tabel", "dyntab" ),
      "description" => "",
      "base" => "dyntab",
      "class" => "",
      "category" => __( "Content", "dyntab"),
      'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
      'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
      "params" => $params
   ) );
}

add_shortcode( 'dyntab', 'dyntab_func' );
function dyntab_func( $atts, $content = null ) { // New function parameter $content is added!
   extract( shortcode_atts( array(
     'supplier' => '',
     'description' => ''
   ), $atts ) );

   $supplierscript = strtolower($supplier);
   $content = '<div class="leveranciersfiche">';
   $content .= '<div class="overzicht"><div class="container"><div class="row show">
      <div class="col-md-6 col-sm-12">
       <h2 class="tariffs">'.__('Overzicht tariefformules').' '.$supplier.'</h2>
      </div>
      <div class="col-md-6 col-sm-12">
       <h2 class="tariffs align-right"><span class="chooser"><input id="pack" checked="checked" type="checkbox" /><label for="pack"> '.__('Inclusief gas vergelijken').'?</label></span></h2>
      </div>
      <div class="table-container">
      <table id="tariefformules" class="responsive-table TEST99999">
      <thead>
      <tr>
      <th scope="col">'.__('Naam').'</th>
      <th scope="col">'.__('Duurtijd').'</th>
      <th scope="col">'.__('Vast of variabel').'</th>
      <th scope="col">'.__('Groene energie').'</th>
      <th scope="col" class="hidemobile">'.__('Dienstverlening').'</th>
      <th scope="col">'.__('Klant worden').'</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td><span data-ps-field="supplier_name" data-ps-product="Cheapest">SUPPLIER NAME</span> - <span data-ps-field="product_name" data-ps-product="Cheapest">PRODUCT NAME</span></td>
      <td data-ps-field="Duurtijd" data-ps-product="Cheapest">???</td>
      <td data-ps-field="Vast of variabel" data-ps-product="Cheapest">???</td>
      <td data-ps-field="Groene energie" data-ps-product="Cheapest">???</td>
      <td data-ps-field="Dienstverlening" data-ps-product="Cheapest">???</td>
      <td data-ps-field="Klant worden" data-ps-product="Cheapest">???</td>
      </tr>
      </tbody>
      </table>
      </div>
      </div></div></div>';

if(ICL_LANGUAGE_CODE=="fr"){ 
  $apiurl = 'https://comparateurenergie.veriftarif.be/';
}else{
 $apiurl = 'https://energievergelijker.tariefchecker.be/';
}
      if($description):
        $content .= '<div class="detail"><div class="container"><div class="row show">
          <div class="col-sm-12"><h2>'.__('Details tariefformules').' '.$supplier.' <span id="pack_description">'.__('Gas en Elektriciteit').'</span></h2></div>
          <div id="tariefbeschrijvingen"></div>
        </div></div></div>';
      endif;

      $content .= '</div>';


      $script = '<script type="text/javascript">
      jQuery( document ).ready(function(){
        jQuery.getJSON("'.$apiurl.'query?supplier='.$supplierscript.'", function (products) {
          render(products.pack, "pack", "'.$supplierscript.'");
        });
      });';

      if($description):
        $script.='jQuery( document ).ready(function($) {
            jQuery( "#pack" ).on( "click", function() {
              var atLeastOneIsChecked = $("#pack:checkbox:checked").length > 0;
              if (atLeastOneIsChecked) {
                $.getJSON("'.$apiurl.'query?supplier='.$supplierscript.'", function (products) {
                  render(products.pack, "pack", "'.$supplierscript.'");
                  document.getElementById("pack_description").innerHTML = "'.__('Gas en Elektriciteit').'";
                });
              } else {
                $.getJSON("'.$apiurl.'query?supplier='.$supplierscript.'", function (products) {
                  render(products.electricity, "electricity", "'.$supplierscript.'");
                  document.getElementById("pack_description").innerHTML = "'.__('Elektriciteit').'";
                });
              }
            });
        });';
      endif;

      $script.='</script>';

      /*
      $script = '<script type="text/javascript">
      jQuery( document ).ready(function($) {

        var url = "http://energievergelijker.tariefchecker.be/query?supplier='.$supplierscript.'";

        var xhr = createCORSRequest("GET", url);
        if (!xhr) {
          alert("CORS not supported");
          return;
        }

        // Response handlers.
        xhr.onload = function() {
          var products = xhr.responseText;
          render(products.pack, "pack", "'.$supplierscript.'");

          //var title = getTitle(text);
          //alert("Response from CORS request to"  + url + ": " + title);
        };

        xhr.onerror = function() {
          alert("Woops, there was an error making the request.");
        };

        xhr.send();

      });
      </script>';
      */
      return $content.$script;

 }
