<?php
/*
Plugin Name: Advanced File Manager
Plugin URI: http://codecanyon.net/item/file-manager-plugin-for-wordpress/2640424
Description: Advanced WP File manager let you are your users access files and folders they have been assigned, it has features like Image and text editing, shared folders, group folder access, front-end and backend folders access, you can let the file manager be used by non-logged-in users too, you can make it work like a download manager for the frontend users and much more.
Version: 7.4.2
Author: RedHawk Studio
Author URI: http://jamalkhan.info/filemanager/

-----elfinder
Copyright (c) 2009-2012, Studio 42
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Studio 42 Ltd. nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL "STUDIO 42" BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


defined('ABSPATH') or die("Cannot access pages directly."); 



add_action('init', 'filemanager_connector5', 10);

function filemanager_connector5(){

	if(isset($_GET["red_fm_connect"])){
      
	    if( $_GET["red_fm_connect"] == "true" ){
	        include 'php/connector.php';
	    }
	}



  if(isset($_GET["red_fm_connect_zoho"])){
      if( $_GET["red_fm_connect_zoho"] == "true" ){
          include 'php/connector.minimal.php';
      }
  }



}


//plugin url
define('RED_FM_URL', plugin_dir_url( __FILE__ ));

$plugin_dir_path = dirname(__FILE__);


add_action('admin_menu', 'red_fm_menu');

function red_fm_menu() {


	add_menu_page('File Manager', 'File Manager', 'read', 'red_fm_manager', 'red_fm_main_page');

	//if admin, make a sub menu for settings
	if (is_admin() ) {
		 add_submenu_page( 'red_fm_manager', 'FM Users', 'Users', 'manage_options', 'red_fm_manager_users', 'red_fm_users_page' );
		 add_submenu_page('red_fm_manager', 'User Groups', 'User Groups', 'manage_options', 'red_fm_groups', 'red_fm_groups_page');
     	 add_submenu_page('red_fm_manager', 'Front-End Access', 'Front-End Access', 'manage_options', 'red_fm_front', 'red_fm_front_page');
	     add_submenu_page('red_fm_manager', 'Settings', 'Settings', 'manage_options', 'red_fm_settings', 'red_fm_settings_page');
  } 
	
}

function red_fm_main_page(){
	include "admin_page.php";
}

function red_fm_users_page(){
	include "admin_users_page.php";
}

function red_fm_view_page(){
	include "filemanager_view.php";
}

function red_fm_groups_page(){
	include "groups_settings.php";
}

function red_fm_front_page(){
  include "front_settings.php";
}



function red_fm_settings_page(){
  include "filemanager_settings.php";
}


//activation
register_activation_hook( __FILE__, 'red_fm_activate' );

function red_fm_activate() {
   global $wpdb;
   include "settings.php";

   update_option("red_fm_table_name", $table_name);
      
   $sql = "CREATE TABLE IF NOT EXISTS $table_name (
	  id mediumint(9) NOT NULL AUTO_INCREMENT,
	  folder VARCHAR(255) DEFAULT '' NOT NULL,
	  type VARCHAR(32) DEFAULT '' NOT NULL,
	  access VARCHAR(32) DEFAULT '' NOT NULL,
	  meta VARCHAR(255) DEFAULT '' NOT NULL,
	  UNIQUE KEY id (id)
	    );";

   require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
   dbDelta( $sql );



   if( !get_option( "red_fm_lang" ) ) {
        update_option( "red_fm_lang", "LANG" );
    }
 
   if( !get_option( "red_fm_view" ) ) {
        update_option( "red_fm_view", "icons" );
    }

   if( !get_option( "red_fm_media_sync" ) ) {
        update_option( "red_fm_media_sync", "1" );
    }

    if( !get_option("red_fm_default_access") ){
          update_option( "red_fm_default_access", 'r' );
    }

    if( !get_option("red_fm_create_default_folders") ){
          update_option( "red_fm_create_default_folders", '1');
    } 


    if( !get_option("red_fm_theme") ) {
          update_option("red_fm_theme", "default");
    }  

    if( !get_option("red_fm_secure_url") ) {
          update_option("red_fm_secure_url", "0");
    } 


    if( !get_option("red_fm_gdocs_window") ){
    	update_option("red_fm_gdocs_window", "popup");
    }

    if(!get_option("red_fm_default_folder")){
      $upload_dir = wp_upload_dir();
      $default_folder = str_replace("\\", "/", $upload_dir['basedir'].'/');
      update_option("red_fm_default_folder", $default_folder);
    }

    if( !get_option("red_fm_debug_mode") ){
      update_option("red_fm_debug_mode", "1");
    }

    if( !get_option("red_fm_chunk_upload") ){
      update_option("red_fm_chunk_upload", -1);
    }

    if( !get_option("red_fm_dblclick") ){
      update_option("red_fm_dblclick", "quicklook");
    }



//make folders for all users

    $default_perm = get_option("red_fm_default_access");
    $allow_default_folders = get_option("red_fm_create_default_folders");

$upload_dir = wp_upload_dir();
$users = get_users(array('order' => 'ASC'));

    //default folder has / at the end
    $default_folder = get_option("red_fm_default_folder");
    


if($allow_default_folders == 1){
      foreach ($users as $user){
          
          $newdir = $default_folder.$user->user_login.'/';
          // $newurl = str_replace("\\", "/", $upload_dir['baseurl'].'/'.$user->user_login.'/');
          
          //$stringthis = $newdir."~".$newurl;
          if(!is_dir ($newdir))
          {
              mkdir($newdir, 0777);
          }//end if

          $newdir = rtrim($newdir, "/");

        $query = "SELECT * FROM `" . $table_name . "` WHERE `folder` = '$newdir' AND `meta` = 'red_fm_default' ";
        $results = $wpdb->get_results($query);

        if( sizeof($results) == 0 ){


                          $wpdb->insert(
                                  $table_name,
                                  array(
                                          'folder' =>  $newdir,
                                          'type'   =>  $user->ID,
                                          'access' =>  $default_perm,
                                          'meta'   =>   'red_fm_default'
                                  ),
                                  array(
                                      '%s',
                                      '%s',
                                      '%s',
                                      '%s'
                                  )
                              );

        }//end else
              
      }//end of foreach
}//end of if


}//end of ffunction


function filemanager_frontcode( $atts ) {

  // Attributes
  extract( shortcode_atts(
    array(
      'foldername' => '',
      'groups' => '',
      'access' => '',
      'type'   => ''
    ), $atts )
  );

  //return $foldername . " " . $groups . " " . $access;
  
  return shortcode_display($foldername, $groups, $access, $type);

}//end of function
add_shortcode( 'filemanager', 'filemanager_frontcode' );


function shortcode_display($foldername, $groups, $access, $type){

      $red_front_end = 1;
      $defaults = 0;
      $access_all = 0;
      if($foldername == ''){
        $defaults = 1;
      }elseif(trim($foldername) == '*'){
          $access_all = 1;
      }
      include "filemanager_string.php";
      return $fm_string;
}




//users column


add_filter('manage_users_columns', 'red_fm_users_column');
add_filter('manage_users_custom_column', 'red_fm_users_custom', 10, 3);

function red_fm_users_column($columns) {
        $columns['red_fm_folder'] = '<span style="color:brown;">File Manager</span>';
        return $columns;

}

function red_fm_users_custom($empty='', $column_name, $id) {
  if( $column_name == 'red_fm_folder' ) {
    return "<a href='admin.php?page=red_fm_manager_users&offset=0&action=view_folders&id=" . $id . "' >Folders</a>";

      }
}

//new register users get folders

add_action('user_register', 'filemanager5_registration_save');

function filemanager5_registration_save($user_id) 
{

  $allow_default_folders = get_option("red_fm_create_default_folders");

  if($allow_default_folders == 0){
    return;
  }

    global $wpdb;
    include "settings.php";
    $upload_dir = wp_upload_dir();
    $user = get_userdata($user_id);


    //default folder has / at the end
    $default_folder = get_option("red_fm_default_folder");
    $newdir = $default_folder.$user->user_login.'/';

    // $newurl = str_replace("\\", "/", $upload_dir['baseurl'].'/'.$user->user_login.'/');
      $default_perm = get_option("red_fm_default_access");
    //$stringthis = $newdir."~".$newurl;
    
    if(!is_dir ($newdir))
    {
        mkdir($newdir, 0777);
    }


    $newdir = rtrim($newdir, "/");

  $query = "SELECT * FROM `" . $table_name . "` WHERE `folder` = '$newdir' AND `meta` = 'red_fm_default' ";
  $results = $wpdb->get_results($query);

        if( sizeof($results) == 0 ){


                          $wpdb->insert(
                                  $table_name,
                                  array(
                                          'folder' =>  $newdir,
                                          'type'   =>  $user->id,
                                          'access' =>  $default_perm,
                                          'meta'   =>   'red_fm_default'
                                  ),
                                  array(
                                      '%s',
                                      '%s',
                                      '%s',
                                      '%s'
                                  )
                              );

        }//end else
}



// access control shortcodes
function fm_access_shortcode( $atts, $content = null ){
  extract(shortcode_atts(array(
    'group' => '',
  ), $atts));

   $red_current_user = wp_get_current_user();
   $red_current_id = $red_current_user->ID;
   $red_fm_role = reset($red_current_user->roles);

   update_option("red_fm_debug", print_r($red_fm_role, true));


  if($red_fm_role == $group){ 
    return do_shortcode($content);
  }elseif($group == "logged-in" && is_user_logged_in()){
    return do_shortcode($content);
  }elseif($group == "not-logged-in" && !is_user_logged_in()){
    return do_shortcode($content);
  }else{
    return "";
  }


}
add_shortcode( 'fm_access', 'fm_access_shortcode' );





function fm_admin_assets_enqueue($hook) { 

    if ( 'file-manager_page_red_fm_manager_users' != $hook ) {
         return;
    }  

    wp_enqueue_style( 'datatables-css', plugins_url( '/css/datatables.min.css', __FILE__ ) );
    wp_enqueue_script( 'datatables-js', plugin_dir_url( __FILE__ ) . 'js/datatables.min.js', array( 'jquery' ), '1.0.0', true );  
}

add_action('admin_enqueue_scripts', 'fm_admin_assets_enqueue');



//chosen js enqueue
function fm_admin_assets_enqueue_2($hook) { 

    if ( 'file-manager_page_red_fm_manager_users' != $hook && 'file-manager_page_red_fm_groups' != $hook && 'file-manager_page_red_fm_front' != $hook) {
         return;
    } 


    wp_enqueue_style( 'chosen-css', plugins_url( '/css/chosen.min.css', __FILE__ ) );
    wp_enqueue_script( 'chosen-js', plugin_dir_url( __FILE__ ) . 'js/chosen.jquery.min.js', array( 'jquery' ), '1.0.0', true );  
    wp_enqueue_script( 'fmadmin-js', plugin_dir_url( __FILE__ ) . 'js/admin.js', array( 'jquery' ), '1.0.0', true );
}

add_action('admin_enqueue_scripts', 'fm_admin_assets_enqueue_2');





add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'fm_action_links' );

function fm_action_links( $links ) {
   $links[] = '<a href="http://jamalkhan.info/filemanager/guides/" target="_blank">Guides</a>';
   return $links;
}








//for debugging
function red_fm_admin_notice() {
    ?>
    <div class="notice notice-success is-dismissible">
        <p><?php echo get_option("red_fm_debug"); ?></p>
    </div>
    <?php
}
// add_action( 'admin_notices', 'red_fm_admin_notice' );







//example file move notification using filters
function fm_filemove_notify( $cmd, $result, $args, $elfinder, $volume ){

   $removed_list = array();
   $added_list = array();

   foreach ($result["removed"] as $key => $value) {

     $temp = str_replace("\\","/", $value["realpath"]);
     $removed_list[] = $temp;

     $hash = explode("_", $result["added"][$key]["hash"]);
     $added_list[] = base64_decode($hash[1]);

   }

   //find out if the file is upload inside a folder inside uploads folder
   preg_match("/\/uploads\/(.*).+\//", $removed_list[0], $output_array);
   $username = explode("/", $output_array[0]);
   $username = $username[2];

    $upload_email = "1";
    $upload_email = get_option( "red_fm_email", "1" );
    $admin_email = get_option( 'admin_email' );
    $upload_email_user = get_option( "red_fm_email_user", "0" );
    $current_user = wp_get_current_user();
    $current_user_name = $current_user->user_login;


    //if the file was moved (or cut > paste)
  if($cmd == "paste"){

    $email_temp = "Files have been moved by the user: {$current_user_name} from {$username}'s folder, Here are the list of the files:<br/><br/>";

    foreach ($removed_list as $key => $value) {
      $email_temp .= $value . "<br/>to<br/>" . $added_list[$key] . "<br/><br/>";
    }

    //user email when anyone uploads a file to that user's default folder
    if($upload_email_user == 1){

                $user = get_user_by( 'login', $username );
                // red_debug_log($username1);
                $this_email = $user->user_email;

                if($user){
                  wp_mail( $this_email, 'File Move Notification', $email_temp );
                }
                

    }//ends if


  }//end if

}

//uncomment below to try the hook
// add_action( 'red_fm_io', 'fm_filemove_notify', 10, 5 );






// Returns a file size limit in bytes based on the PHP upload_max_filesize
// and post_max_size
function redfm_file_upload_max_size() {
  static $max_size = -1;

  if ($max_size < 0) {
    // Start with post_max_size.
    $post_max_size = redfm_parse_size(ini_get('post_max_size'));
    if ($post_max_size > 0) {
      $max_size = $post_max_size;
    }

    // If upload_max_size is less, then reduce. Except if upload_max_size is
    // zero, which indicates no limit.
    $upload_max = redfm_parse_size(ini_get('upload_max_filesize'));
    if ($upload_max > 0 && $upload_max < $max_size) {
      $max_size = $upload_max;
    }
  }
  return $max_size;
}

function redfm_parse_size($size) {
  $unit = preg_replace('/[^bkmgtpezy]/i', '', $size); // Remove the non-unit characters from the size.
  $size = preg_replace('/[^0-9\.]/', '', $size); // Remove the non-numeric characters from the size.
  if ($unit) {
    // Find the position of the unit in the ordered string which is the power of magnitude to multiply a kilobyte by.
    return round($size * pow(1024, stripos('bkmgtpezy', $unit[0])));
  }
  else {
    return round($size);
  }
}

function redfm_formatSizeUnits($bytes){

        if ($bytes >= 1073741824)
        {
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        }
        elseif ($bytes >= 1048576)
        {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        }
        elseif ($bytes >= 1024)
        {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        }
        elseif ($bytes > 1)
        {
            $bytes = $bytes . ' bytes';
        }
        elseif ($bytes == 1)
        {
            $bytes = $bytes . ' byte';
        }
        else
        {
            $bytes = '0 bytes';
        }

        return $bytes;
}




//file upload callback hook
function redfm_upload_callback( $thol, $dstpath, $mime ) {
      

    global $wpdb;
    include_once('settings.php');
    
    $msync = get_option( "red_fm_media_sync" );

    //email notification
    $upload_email = "1";
    $upload_email = get_option( "red_fm_email", "1" ); //toggle: admin gets an email when user uploads a file
    $admin_email = get_option( 'admin_email' );
    $upload_email_user = get_option( "red_fm_email_user", "0" ); //toggle: user gets an email when admin uploads a file
    $email_string = get_option("red_fm_the_email", $admin_email);
    $current_user = wp_get_current_user();
    $current_user_name = $current_user->user_login;
    $username = $current_user_name;
    $default_folder = get_option("red_fm_default_folder"); //default folder path (ends with /)

    //email template
    $email_temp = "A file has been uploaded by {username}, file name is {filename}




This email was sent from the {site_title} blog.";
    
    $email_template_string = get_option( "red_fm_email_template", $email_temp );


    $email_template_string = str_replace("{username}", $current_user_name, $email_template_string);
    $email_template_string = str_replace("{filename}", $dstpath.'\\'.$thol['name'], $email_template_string);
    $email_template_string = str_replace("{site_title}", get_option('blogname'), $email_template_string);

    //email setup for users email notification
  $email_temp_user = "A file has been uploaded by the admin, the file link is: 
{filename}




This email was sent from the {site_title} blog.";

    $email_template_string_user = get_option( "red_fm_user_email_template", $email_temp_user );

    $email_template_string2 = str_replace("{username}", $current_user_name, $email_template_string_user );
    $email_template_string2 = str_replace("{filename}", $dstpath.'\\'.$thol['name'], $email_template_string2);
    $email_template_string2 = str_replace("{site_title}", get_option('blogname'), $email_template_string2);




    $complete_path = str_replace('\\', '/', $dstpath);



    if( $upload_email == 1 && is_user_logged_in() ){
      
      //is this is the default folder for the current user  
      if (strpos($complete_path, $default_folder.$username) !== false) {
        wp_mail( $email_string, 'File Upload Notification', $email_template_string);  
      }



    }

    //user email when admin uploads a file
    if($upload_email_user == 1 && current_user_can( 'manage_options' ) ){

      $diff = str_replace($default_folder,"", $complete_path . "/");
      
      $user_name = explode("/", $diff);
      $user_name = $user_name[0];


      if($user_name != ""){
        
        $user = get_user_by( 'login', $user_name ); 
        $this_email = $user->user_email;
        wp_mail( $this_email, 'File Upload Notification', $email_template_string2 );
      }
      
    }//ends outer if



    update_option("red_fm_debug", print_r($mime, true) );
    //media manager sync  
      if(strpos($mime, 'image') === 0){
        if($msync == "1"){
          upload_media_store($dstpath . DIRECTORY_SEPARATOR . $thol['name'], $thol['mime']);
        }
      }



    return $thol;
}
add_filter( 'red_fm_fileupload', 'redfm_upload_callback', 10, 3 );



function upload_media_store($filename, $mime)
{
  //error_reporting(1);
    require_once( ABSPATH . 'wp-admin/includes/image.php' );
  require_once( ABSPATH . 'wp-admin/includes/file.php' );
  require_once( ABSPATH . 'wp-admin/includes/media.php' );
    $filename = str_replace('\\', '/', $filename);
    $wp_filetype = wp_check_filetype($filename, null );
      $attachment = array(
         'guid'       => $filename , 
         'post_mime_type' => $wp_filetype['type'],
         'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $filename ) ),
         'post_content'   => '',
         'post_status'    => 'inherit',
         'post_date'        => date('Y-m-d H:i:s')
      );
      //hook to disable image risizes:
      add_filter( 'intermediate_image_sizes', 'red_empty_hook', 99 );

      $attach_id = wp_insert_attachment( $attachment, $filename, 0 );
      $attachment_data = wp_generate_attachment_metadata($attach_id, $filename);
  wp_update_attachment_metadata($attach_id, $attachment_data);

  //dont need the filter anymore
  remove_filter( 'intermediate_image_sizes', 'red_empty_hook', 99 );
      //$temp_data = wp_generate_attachment_metadata( $attach_id, $filename );
      //wp_update_attachment_metadata( 0, $temp_data );
      //wp_update_attachment_metadata( 0, $attachment );
}


function red_empty_hook(){
  $abc = array();
  return $abc;
}


function red_fm_get_image_id($image_url) {
    global $wpdb;
    $attachment = $wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE guid='%s';", $image_url )); 
    return $attachment[0]; 
}
