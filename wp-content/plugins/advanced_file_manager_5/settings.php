<?php  
// error_reporting(0);
defined('ABSPATH') or die("Cannot access pages directly."); 

$folder_depth = get_option("red_fm_folder_depth") ? get_option("red_fm_folder_depth") : 3;


define('FILE_LEVELS', $folder_depth);
define('PLUGIN_URL', plugins_url( '/', __FILE__ ) );

global $table_name;
$table_name = $wpdb->prefix . "red_file_manager";
define('FM_TABLE_NAME', $table_name);
$table_logs = $wpdb->prefix . "red_file_manager_logs";
define('FM_TABLE_LOG', $table_logs);


//$directory = get_home_path();
if(!defined('ABSPATH')){
    $directory = red_get_wp_path();
    $directory = str_replace('\\', '/', $directory);
}else{
    $directory = ABSPATH;
    $directory = str_replace('\\', '/', $directory);
}

if($directory == "//"){
    $directory = "/";
}

global $directory_temp;
$directory_temp = $directory;
//echo $directory;
$directory = rtrim($directory, "/");
$directory = rtrim($directory, "\\");

$levels = FILE_LEVELS;


function listdirs($dir, $init, $levels) {
    $init++;
    static $alldirs = array();
    $dirs = glob($dir . '/*', GLOB_ONLYDIR);


    if (count($dirs) > 0) {
        foreach ($dirs as $d) $alldirs[] = $d;
    }
    foreach ($dirs as $dir){
        if($init < $levels){
                listdirs($dir, $init, $levels);
        }
        
    }
   //print_r($alldirs);
    return $alldirs;
}


$directory_list = listdirs($directory, 0, $levels);

$directory_names = array();
//print_r($directory_list);

foreach($directory_list as $key => $value){
   //$directory_names[] =  ltrim($value, $directory);

    $prefix = $directory_temp;
    $str = $value;


    if (substr($str, 0, strlen($prefix)) == $prefix) {
        $directory_names[] = substr($str, strlen($prefix));
    } 

}

// added to allow root folder
$directory_names[] = "/";


function red_getFolderName($str, $prefix){
    return  substr($str, strlen($prefix));
}

function red_defineAccess($str){
    if($str == "r"){
        return "Read";
    }elseif($str == "rw"){
        return "Read/Write";
    }elseif($str == "ru"){
        return "Read/Upload";
    }elseif($str == "rp"){
        return "Preview Files Only";
    }
}



function red_get_wp_path()
{
    $base = dirname(__FILE__);
    $path = false;

    if (@file_exists(dirname(dirname($base))."/wp-config.php"))
    {
        $path = dirname(dirname($base))."/";
    }
    else
    if (@file_exists(dirname(dirname(dirname($base)))."/wp-config.php"))
    {
        $path = dirname(dirname(dirname($base)))."/";
    }
    else
    $path = false;

    if ($path != false)
    {
        $path = str_replace("\\", "/", $path);
    }
    return $path;
}



function red_debug_log($data){
    $file = 'log.txt';
    // Open the file to get existing content
    $current = file_get_contents($file);
    // Append a new person to the file
    $current .= "{$data}\n";
    // Write the contents back to the file
    file_put_contents($file, $current, FILE_APPEND | LOCK_EX);
}



function addLog($folder, $action, $old = ""){

    //if($_GET["log"] != "true") return;

    global $wpdb;
    
    $user = get_current_user_id();

      $wpdb->insert(
          FM_TABLE_LOG,
          array(
                  'folder' =>  $folder,
                  'old'   => $old,
                  'action' =>  $action,
                  'meta'   =>  $user
          ),
          array(
              '%s',
              '%s',
              '%s',
              '%s'
          )
      );
}


//only to be used outside the filemanager
function forceAddLog($folder, $action, $old = "", $user_id){

    global $wpdb;

    // update_option("jdebug", $user);

      $wpdb->insert(
          FM_TABLE_LOG,
          array(
                  'folder' =>  $folder,
                  'old'   => $old,
                  'action' =>  $action,
                  'meta'   =>  $user_id
          ),
          array(
              '%s',
              '%s',
              '%s',
              '%s'
          )
      );
}




?>