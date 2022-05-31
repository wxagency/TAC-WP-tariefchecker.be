<?php
$extra = "";
global $wpdb;
include_once("settings.php");
//frontend
$front_id = 0;

$lang = "LANG";
if( get_option( "red_fm_lang" ) ) {
	$lang = get_option( "red_fm_lang" );
}

$fmtheme = "default";
if( get_option("red_fm_theme") ) {
	$fmtheme = get_option("red_fm_theme");
}

$dblclick = "quicklook";
if( get_option("red_fm_dblclick") ){
  $dblclick = get_option("red_fm_dblclick");
}



$theme_link = "theme.css";
if($fmtheme == "metro"){
	$theme_link = "windows-10/css/theme.css";
}

if($fmtheme == "dark"){
	$theme_link = "material/theme.css";
}





if( get_option("red_fm_toolbar_text") ){
	$toolbar_text = stripslashes( get_option("red_fm_toolbar_text") );
}else{
	$toolbar_text = '["back", "forward"],
					 ["reload"],
			        ["home", "up"],
			        ["mkdir", "mkfile", "upload"],
			        ["open", "download", "getfile"],
			        ["info"],
			        ["quicklook"],
			        ["copy", "cut", "paste"],
			        ["rm"],
			        ["duplicate", "rename", "edit", "resize"],
			        ["extract", "archive"],
			        ["search"],
			        ["view"],
			        ["help"]';
}


	if( get_option("red_fm_context_text") ){
		$context_text = stripslashes( get_option("red_fm_context_text") );
	}else{
			$context_text = 'navbar : ["open", "|", "duplicate", "|", "rm", "|", "info"], 
			cwd : ["reload", "back", "|", "upload", "mkdir", "mkfile", "paste", "|", "info"], 
			files : ["getfile", "|","open", "quicklook", "|", "download", "|", "duplicate", "|", "rm", "|", "edit", "rename", "resize", "|", "archive", "extract", "|", "info", "info2" ]';
	}


//WPML Check, overrides the built-in language switcher, 
//comment these 3 lines if you dont want this behavior
if ( function_exists('icl_object_id') ) {
     	$lang = ICL_LANGUAGE_CODE;
}
//ends wpml language switcher


//switches icons layout(icon or list)
$dview = "icons";
if( get_option( "red_fm_view" ) ) {
    $dview = get_option( "red_fm_view");
}

$fm_height = get_option("red_fm_window_height") == "" ? 600 : get_option("red_fm_window_height");


if(!isset($defaults)){
	$defaults = 0;
}

if(!isset($access_all)){
	$access_all = 0;
}

if(isset($red_front_end)){
	


global $directory_temp;
global $table_name;
$foldername =  $directory_temp . $foldername;

$query = "SELECT * FROM `" . $table_name . "` WHERE `folder` = '$foldername' AND `meta` = '$groups' AND `access` = '$access' ";
$results = $wpdb->get_results($query);



foreach($results as $key=>$value) {
		$front_id = $value->id;
}

$extra = "&front=user&fid=" . $front_id . "&defaults=" . $defaults. "&access_all=0";

if($access_all == 1){
	$extra = "&front=user&fid=" . $front_id . "&defaults=" . $defaults . "&access_all=1";
}




}//end if


$debug_mode = get_option("red_fm_debug_mode");


if ( is_admin() && $debug_mode == "8") {

	$chunk_size = get_option("red_fm_chunk_upload");

	echo "<div id='fm_container' style='background-color:#fff; padding: 20px 30px; margin: 20px 0px;'>";
	$size = redfm_file_upload_max_size();
	echo "<b>Max Upload Size:</b> " . redfm_formatSizeUnits($size) . " </br>";
	echo "<b>Number of Chunks: </b>: " . $chunk_size . "</br>";
	echo "</div>";
}

$fm_after_html = "";
//filter for content after filemanager window
$fm_after_html = apply_filters('red_fm_after_window', $fm_after_html);

$blogi = site_url() . "/?red_fm_connect=true" . $extra;
$fm_string = '
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>elFinder 2.0</title>
		<link rel="stylesheet" type="text/css" href="'.PLUGIN_URL.'css/jquery-ui.css">
		<script src="'.PLUGIN_URL.'js/jquery.min.js"></script>
		<script src="'.PLUGIN_URL.'js/jquery-ui.min.js"></script>
		<link rel="stylesheet" type="text/css" media="screen" href="'.PLUGIN_URL.'css/elfinder.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="'.PLUGIN_URL.'css/'.$theme_link.'">
		<script type="text/javascript" src="'.PLUGIN_URL.'js/elfinder.full.js"></script>
		<script type="text/javascript" src="'.PLUGIN_URL.'js/extras/editors.default.js"></script>
		<script type="text/javascript" src="'.PLUGIN_URL.'js/i18n/elfinder.'.$lang.'.js"></script>
		<script type="text/javascript" charset="utf-8"> 
			 var jq = jQuery.noConflict(true);
				
					jq(document).ready(function() { 

						var elf = jq("#elfinder").elfinder({ 
							url : "'.$blogi.'",
							 lang: "'.$lang.'",
							 height: '.$fm_height.',

							  handlers : {
							    dblclick : function(event, elfinderInstance) {
							      event.preventDefault();
							      elf.exec("getfile")
							        .done(function() { elf.exec("'.$dblclick.'"); })
							        .fail(function() { elf.exec("open"); });
							    }
							  },


							commandsOptions : {
								edit : {
										extraOptions : {
															// set API key to enable Creative Cloud image editor
															// see https://console.adobe.io/
															creativeCloudApiKey : "",
															// browsing manager URL for CKEditor, TinyMCE
															// uses self location with the empty value
															managerUrl : ""
														}
										},
									quicklook: {
											sharecadMimes : ["image/vnd.dwg", "image/vnd.dxf", "model/vnd.dwf", "application/vnd.hp-hpgl", "application/plt", "application/step", "model/iges", "application/vnd.ms-pki.stl", "application/sat", "image/cgm", "application/x-msmetafile"],
											
											// to enable preview with Google Docs Viewer
											googleDocsMimes : ["application/pdf", "image/tiff", "application/vnd.ms-office", "application/msword", "application/vnd.ms-word", "application/vnd.ms-excel", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/postscript", "application/rtf"],
											
											// to enable preview with Microsoft Office Online Viewer
											// these MIME types override "googleDocsMimes"
											officeOnlineMimes : ["application/msword", "application/vnd.ms-word", "application/vnd.ms-excel", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.oasis.opendocument.text", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.presentation"],
											width    : 850,
											height   : 600,

									}
							},

							  defaultView: "'.$dview.'",
							  ui: ["toolbar", "tree", "path", "stat"],
							   contextmenu : { 
												'.$context_text.'
								   },
								   uiOptions : {
											    toolbar : [
											    	'.$toolbar_text.'
											    ]
											}
							   }).elfinder("instance"); 
					}); 


		</script>
	</head>
	<body>

		<!-- Element where elFinder will be created (REQUIRED) -->
		<div style="height:5px;"></div>
		<div id="elfinder"></div>
		'.$fm_after_html.'
		<div style="height:5px;"></div>
	</body>
</html>
<style type="text/css">
	.elfinder-overlay{display: none !important;}
.elfinder .elfinder-button-search-menu {
	background-color: #fff !important;
}

/* css issue resolve with the7 theme */
#main #elfinder .ui-widget-content {
    clear: none;
}	

.elfinder .elfinder-button-search {
    width: 115px;
}

.elfinder-button-search input[type=text] {
    font-size: 12px;
    font-weight: 400;
}


.elfinder-dialog-error{
	visibility: hidden;
}


</style>
';


//debug messages

//if generated shortcode, then check if it will work for current user
$error_string = "";


//if this shortcode is not for "everyone" and user is not logged in 
if($access_all == 0 && $defaults == 0 && $groups != "Everyone"){

 if(!is_user_logged_in()){
 	if($debug_mode == "1"){
 		$fm_string = "This shortcode is for <b>{$groups}</b> only";
 	}else{
 		$fm_string = "";
 	}
 }

}

//if current shortcode is * and user is not logged in
if($access_all == 1){
	if(!is_user_logged_in()){
	 	if($debug_mode == "1"){
	 		$fm_string = "This shortcode is for <b>logged-in</b> users only";
	 	}else{
	 		$fm_string = "";
	 	}
	}
}

//see if group is not for everyone and user is in the wrong user role
if($groups != "Everyone"){
 $red_current_user = wp_get_current_user();
 $red_current_id = $red_current_user->ID;
 $red_fm_role = reset($red_current_user->roles);

 if(!is_user_logged_in()){

 	if($debug_mode == "1"){
	 	$fm_string = "This shortcode is for <b>logged-in</b> users only";
	 }else{
	 	$fm_string = "";
	 }

 }elseif($groups != "" && $groups != $red_fm_role){
 	if($debug_mode == "1"){
	 	$fm_string = "This shortcode is for <b>{$groups}</b> only";
	 }else{
	 	$fm_string = "";
	 }
 }

}



?>