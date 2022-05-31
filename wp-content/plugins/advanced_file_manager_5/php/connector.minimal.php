<?php

error_reporting(0); // Set E_ALL for debuging

//defined('ABSPATH') or die("Cannot access pages directly."); 



require_once( dirname( dirname(__FILE__) ) . DIRECTORY_SEPARATOR . 'settings.php');


$zohokey = get_option("red_zoho_key");
define('ELFINDER_ZOHO_OFFICE_APIKEY', $zohokey);



include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'editors'.DIRECTORY_SEPARATOR.'editor.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'editors'.DIRECTORY_SEPARATOR.'ZohoOffice'.DIRECTORY_SEPARATOR.'editor.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderConnector.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinder.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeDriver.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeLocalFileSystem.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeTrash.class.php';


 $root_path = base64_decode( $_GET["full_file_path"] );
  update_option("red_fm_debug", $root_path);

//$root_path = "/home/jamalk5/public_html/docs/wp-content/uploads";

$opts = array(
	'roots' => array(
		array(
			'driver'        => 'LocalFileSystem',   // driver for accessing file system (REQUIRED)
			'path'          => $root_path,         // path to files (REQUIRED)
		)
	)
);



// run elFinder

$connector = new elFinderConnector(new elFinder($opts));
$connector->run();
exit();