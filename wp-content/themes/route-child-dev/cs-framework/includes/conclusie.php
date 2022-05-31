<?php
/* Conclusie tabel */
add_action( 'vc_before_init', 'vc_conclusie' );
function vc_conclusie() {
    vc_map( array(
       "name" => __( "Conclusie", "conclusie" ),
       "description" => "",
       "base" => "conclusie",
       "class" => "",
       "category" => __( "Content", "conclusie"),
       'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
       'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
       "params" => ''
    ) );
}


    add_shortcode( 'conclusie', 'conclusie_func' );
    function conclusie_func( $atts, $content = null ) { // New function parameter $content is added!
       /*extract( shortcode_atts( array(
       ), $atts ) );*/

       $return = '<table align="left" border="1" cellpadding="0" cellspacing="0" summary="Samenvatting overzicht goedkoopste energieleveranciers Vlaanderen">
    <thead>
    <tr>
    <th scope="col">Type Product</th><th scope="col">
    <p>Goedkoopste energieleverancier<br />(klik om klant te worden)</p>
    </th>
    			<th scope="col">
    				Verschil met goedkoopste</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Allergoedkoopste gas + elektriciteitstarieven</td>
			<td>
        <a data-ps-attribute="href" target="_blank" data-ps-field="product_subscribe_url" data-ps-product="Goedkoopste" href="clkn/http/app.unbounce.com/variants/51886863/publish"><span data-ps-field="name" data-ps-product="Goedkoopste">GOEDKOOPSTE</span></a>
      </td>
			<td>Goedkoopste</td>
    </tr>
    <tr>
      <td>Goedkoopste "standaard" energietarief</td>
			<td>
				<a data-ps-attribute="href" target="_blank" data-ps-field="product_subscribe_url" data-ps-product="1jrvast" href="clkn/http/app.unbounce.com/variants/51886863/publish"><span data-ps-field="name" data-ps-product="1jrvast">GOEDKOOPSTE</span></a>
      </td>
			<td><span data-ps-field="$delta" data-ps-product="1jrvast">DELTA_STANDAARD</span></td>
    </tr>
    <tr>
      <td>Goedkoopste groene energieleverancier</td>
			<td>
				<a data-ps-attribute="href" target="_blank" data-ps-field="product_subscribe_url" data-ps-product="Groene" href="clkn/http/app.unbounce.com/variants/51886863/publish"><span data-ps-field="name" data-ps-product="Groene">GOEDKOOPSTE</span></a>
      </td>
			<td><span data-ps-field="$delta" data-ps-product="Groene">DELTA_GROENSTE</span></td>
    </tr>
    <tr>
      <td>Goedkoopste \'3 jaar vast\' elektriciteit + gasleverancier</td>
			<td>
				<a data-ps-attribute="href" target="_blank" data-ps-field="product_subscribe_url" data-ps-product="3jrvast" href="clkn/http/app.unbounce.com/variants/51886863/publish"><span data-ps-field="name" data-ps-product="3jrvast">GOEDKOOPSTE</span></a>
      </td>
			<td><span data-ps-field="$delta" data-ps-product="3jrvast">DELTA_3_JR_VAST</span></td>
    </tr>
    </tbody>
    </table>';

    return $return;
}
?>
