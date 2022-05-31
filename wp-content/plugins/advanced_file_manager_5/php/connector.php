<?php
defined('ABSPATH') or die("Cannot access pages directly."); 
error_reporting(0); // Set E_ALL for debuging
//error_reporting(E_ALL | E_STRICT); // Set E_ALL for debuging

ini_set('max_file_uploads', '50');   // allow uploading up to 50 files at once
ini_set("upload_max_filesize","9G");

// needed for case insensitive search to work, due to broken UTF-8 support in PHP
ini_set('mbstring.internal_encoding', 'UTF-8');
ini_set('mbstring.func_overload', 2);

if (function_exists('date_default_timezone_set')) {
	date_default_timezone_set('Europe/Moscow');
}

$chunk_size = get_option("red_fm_chunk_upload", -1);

if($chunk_size == 0){
	$chunk_size = -1; //-1 disables chunking
}


$secure_url = "0";
if( get_option("red_fm_secure_url") ) {
	$secure_url = get_option("red_fm_secure_url");
}




$front_access = 0;
if(isset($_GET["front"])){
	$front_access = 1;
}	


	global $wpdb;
	require_once( dirname( dirname(__FILE__) ) . DIRECTORY_SEPARATOR . 'settings.php');


//logged in and non-logged in users
if(is_user_logged_in()){


 $red_current_user = wp_get_current_user();
 $red_current_id = $red_current_user->ID;
  $red_fm_role = reset($red_current_user->roles);
  $allow_default_folders = get_option("red_fm_create_default_folders");



//defaults and access_all comes from shortcode

  $defaults = 0;
if(isset($_GET["defaults"])){
	$defaults = $_GET["defaults"];
}

$access_all = 0;
if(isset($access_all)){
	$access_all = $_GET["access_all"];
}


 if($front_access == 0){

	   $query = "SELECT * FROM `" . $table_name . "` WHERE `type` = '$red_current_id' OR `type` = '$red_fm_role' ";

	   if($allow_default_folders == 0){
	   		$query = "SELECT * FROM `" . $table_name . "` WHERE (`type` = '$red_current_id' OR `type` = '$red_fm_role') AND `meta` <> 'red_fm_default'  ";
	   }

	   $results = $wpdb->get_results($query);

  }else{
  		$fid = $_GET["fid"];

  		if($defaults == 0){
  	   		$query = "SELECT * FROM `" . $table_name . "` WHERE (`id` = '$fid') AND  ( `meta` = 'Everyone' OR `meta` = '$red_fm_role' )  ";
	   }else{

	   		$query = "SELECT * FROM `" . $table_name . "` WHERE `type` = '$red_current_id' AND `meta` = 'red_fm_default'  ";
	   		if($allow_default_folders == '0'){
	   				$query = "";
	   		}	
	   }

	   if($access_all == 1){
	   		$query = "SELECT * FROM `" . $table_name . "` WHERE `type` = '$red_current_id' OR `type` = '$red_fm_role' ";
	   		if($allow_default_folders == 0){
	   			$query = "SELECT * FROM `" . $table_name . "` WHERE (`type` = '$red_current_id' OR `type` = '$red_fm_role') AND `meta` <> 'red_fm_default' ";
	   		}

	   }	
	 
	   $results = $wpdb->get_results($query);
  }



}else{//not logged in

		$fid = $_GET["fid"];
		
		 $red_fm_role = "Everyone";
		 $query = "SELECT * FROM `" . $table_name . "` WHERE `meta` = '$red_fm_role' AND `id` = '$fid' ";
		 $results = $wpdb->get_results($query);

}



//plugin is activated
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

if ( is_plugin_active( 'filemanager_zoho_office/main.php' ) ) {

	$zohokey = get_option("red_zoho_key");
	define('ELFINDER_ZOHO_OFFICE_APIKEY', $zohokey);
	include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'editors'.DIRECTORY_SEPARATOR.'editor.php';
	include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'editors'.DIRECTORY_SEPARATOR.'ZohoOffice'.DIRECTORY_SEPARATOR.'editor.php';
	
}

include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderConnector.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinder.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeDriver.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeLocalFileSystem.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeTrash.class.php';


$disabled = array();

		$read = true;
		$write = false;
		$locked = false;


		$opts =	array (
							'bind' => array(
							        'mkdir mkfile rename duplicate upload rm paste archive extract put search editor resize file' => 'fm_io_callback'
							),
					  );



if(sizeof($results) == 0){
	// update_option("red_fm_debug", print_r("0", true));
	$opts["roots"][] = array();
}

foreach ($results as $key => $value) {
	
	if($value->access == "r"){
		$read = true;
		$write = false;
		$locked = false;
		$disabled = array("rm", "rename");

	}elseif($value->access == "rw"){
		$read = true;
		$write = true;
		$locked = true;
		$disabled = array("");

	}elseif($value->access == 'ru'){
		$read = true;
		$write = true;
		$locked = false;
		$disabled = array("rm", "rename", "duplicate", "put", "paste", "archive", "extract", "resize", "mkfile");	
	
	}elseif($value->access == 'rp'){
		$read = true;
		$write = true;
		$locked = false;
		$disabled = array("download", "rm", "rename", "duplicate", "put", "paste", "archive", "extract", "resize", "mkfile", "upload", "mkdir", "cut", "copy", "open");	
	
	}




	$this_url = site_url() ."/". red_getFolderName( $value->folder, $directory_temp);

	if($value->folder == "/"){
		$this_url = site_url();
		$value->folder = $directory_temp;
	}

	

	if($secure_url == "1"){
		$this_url = false;	
	}

		// $opts = array();
		//init opts array and add a callback for i/o



	$opts["roots"][] = array(
							
									'driver' 				=> 'LocalFileSystem',
									'path'   				=> $value->folder,
									'URL'    				=> $this_url,
									"uploadMaxConn"   		=> $chunk_size,  
									'mimeDetect' 			=> 'internal',
									'dispInlineRegex'       => '^(?:image|application/(?:vnd\.)?(?:ms(?:-office|word|-excel|-powerpoint)|openxmlformats-officedocument)|text/plain$)',
									'uploadAllow' 			=> array('all'),
									'uploadOrder'			=> array( 'allow', 'deny' ),
								    'defaults'    			 => array( 
														        'read'   => $read,
														        'write'  => $write,
														        'rm'     => $write
														        
														    	),
								    'disabled'				=> $disabled,


					                'attributes' 			=> array(                
																   array(
																			 'pattern' => '/.tmb/',
																			 'read' => false,
																			 'write' => false,
																			 'hidden' => true,
																			 'locked' => false
																			),
																	array(
													          			   'pattern' => '/.quarantine/',
													         				'read' => false,
													         				'write' => false,
													         				'hidden' => true,
													         				'locked' => false
													    				)


																)

									

						);
}//end of foreach



// I/O hook, usage:  add_action( 'red_fm_io', 'my_callback', 10, 5 );
function fm_io_callback($cmd, $result, $args, $elfinder, $volume){
	do_action( 'red_fm_io', $cmd, $result, $args, $elfinder, $volume);
}



//change opts as you please, second arg is root dir of this volume
$opts = apply_filters('red_fm_opts', $opts, $directory);


//header('Access-Control-Allow-Origin: *');
$connector = new elFinderConnector(new elFinder($opts));
$connector->run();

exit();

