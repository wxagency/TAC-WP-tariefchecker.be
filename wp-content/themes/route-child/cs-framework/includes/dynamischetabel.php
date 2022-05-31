<?php
/* Dynamische Tabel */
add_action( 'vc_before_init', 'vc_dyntabel' );
function vc_dyntabel() {

  $supplier = get_field('supplier');
  $locale = 'nl';
  
if(ICL_LANGUAGE_CODE=="fr"){ 
  $apiurl = 'https://comparateurenergie.veriftarif.be/';
  $locale='fr';
}else{
 $apiurl = 'http://affiliates.tariefchecker.be/';
 $locale='nl';
}

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
       "type" => "textfield",
       "class" => "",
       "heading" => __( "Locale", "content-box" ),
       "param_name" => "locale",
       'value'       => $locale,
       'std' => 'nl',
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
       <h2 class="tariffs align-right"><span class="chooser"><input id="pack" value="pack" checked="checked" type="checkbox" /><label for="pack">'.__('Inclusief gas vergelijken').'?</label></span></h2>
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
      <tbody id="sup-data">
      
      </tbody>
      </table>
      </div>
      
      </div></div></div>
     
      ';


      if($description):
        $content .= '<div class="detail"><div class="container"><div class="row show">
          <div class="col-sm-12"><h2>'.__('Details tariefformules').' '.$supplier.' <span id="pack_description">'.__('Gas en Elektriciteits').'</span></h2></div>
          <div id="sup-details"></div>
        </div></div></div>';
      endif;

      $content .= '</div>';


    //   $script = '<script type="text/javascript">
    //   jQuery( document ).ready(function(){
    //     jQuery.getJSON("'.$apiurl.'query?supplier='.$supplierscript.'", function (products) {
    //       render(products.pack, "pack", "'.$supplierscript.'");
    //     });
    //   });';

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

        if(ICL_LANGUAGE_CODE=="fr"){ 

        $locale="fr";

        }else{

        $locale="nl";

        }
      
      $script='<script type="text/javascript">
      jQuery( document ).ready(function(){
       
            var ischecked= $("#pack").is(":checked");
        if(!ischecked){
        $("#pack_description").html("Elektriciteits");
             $.ajax({
            url: "https://api.tariefchecker.be/supplier",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"elec",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-data").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });
        }else{
        $("#pack_description").html("Gas en Elektriciteits");
            
          $.ajax({
            url: "https://api.tariefchecker.be/supplier",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"pack",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-data").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });  
            
        }
        
         
        if(!ischecked){
        
         $("#pack_description").html("Elektriciteits");
         $.ajax({
            url: "https://api.tariefchecker.be/supplier-details",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"elec",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-details").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });
        
        }else{
        $("#pack_description").html("Gas en Elektriciteits");
            
             $.ajax({
            url: "https://api.tariefchecker.be/supplier-details",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"pack",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-details").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });
            
        }
        
        
        $("#pack").change(function() {
         var ischecked= $(this).is(":checked");
        if(!ischecked){
        $("#pack_description").html("Elektriciteits");
             $.ajax({
            url: "https://api.tariefchecker.be/supplier",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"elec",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-data").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });
        }else{
        $("#pack_description").html("Gas en Elektriciteits");
            
          $.ajax({
            url: "https://api.tariefchecker.be/supplier",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"pack",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-data").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });  
            
        }
        });
        
        $("#pack").change(function() {
         var ischecked= $(this).is(":checked");
        if(!ischecked){
        $("#pack_description").html("Elektriciteits");
        
         $.ajax({
            url: "https://api.tariefchecker.be/supplier-details",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"elec",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-details").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });
        
        }else{
        
        $("#pack_description").html("Gas en Elektriciteits");
            
             $.ajax({
            url: "https://api.tariefchecker.be/supplier-details",
            type: "GET",
            data: {
            
            "supplier":"'.$supplier.'",
            "type":"pack",
            "locale":"'.$locale.'"
            },
            success: function(data) {
            
            $("#sup-details").html(data);
                   console.log(data);
            },
            error: function(e) {

                console.log(e.message);
            }
        });
            
        }
        });
        
        
        
      });';
      

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
