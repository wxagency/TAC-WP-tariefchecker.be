<?php 

defined('ABSPATH') or die("Cannot access pages directly."); 
    

    global $wpdb;
    include( plugin_dir_path( __FILE__ ) . 'settings.php');
	global $wp_roles;
    // print_r($wp_roles);
    $red_roles = $wp_roles->get_names();
    $red_roles2 = $wp_roles->roles;
    $view = "0";


     $red_users_args = array('role'=>'Administrator');
     $red_admins = get_users( $red_users_args );


//actions processing


         //delete entry 
         if( isset($_GET["del"]) ){
                $del_id = $_GET["id"];
                $query = "DELETE FROM `" . $table_name . "` WHERE `id` = '$del_id' ";
               
                $wpdb->query($query);

         }   



        if( isset($_POST["action"]) ){
                $post_role = base64_decode( sanitize_text_field( $_POST["option_role"] ) );
                $post_folder = base64_decode( sanitize_text_field( $_POST["option_folder"] ) );
                $post_access = sanitize_text_field( $_POST["option_access"] );

                $addfolder_folder = esc_sql( base64_decode( $_POST["option_folder"] ) );
                if($_POST["option_folder"] == "/"){
                    $addfolder_folder = "/";
                }

                //check if already exists
                $query = "SELECT * FROM `" . $table_name . "` WHERE `folder` = '$addfolder_folder' AND `type` = 'red_front_end' AND `meta` = '$post_role' ";
                $results = $wpdb->get_results($query);
                if( sizeof($results) > 0 ){

                                $wpdb->update(
                                    $table_name,
                                    array(
                                        'folder' =>  $addfolder_folder,
                                        'type'   =>  'red_front_end',
                                        'access' =>  $post_access,
                                        'meta'   =>   $post_role 
                                    ),
                                    array( 'folder' => $addfolder_folder, 'type'   =>  'red_front_end', 'meta' => $post_role ),
                                    array(
                                        '%s',   
                                        '%s',
                                        '%s',
                                        '%s'
                                    ),
                                    array( '%s' )
                                );

                }else{//end if


                    $wpdb->insert(
                            $table_name,
                            array(
                                    'folder' =>  $addfolder_folder,
                                    'type'   =>  'red_front_end',
                                    'access' =>  $post_access,
                                    'meta'   =>   $post_role 
                            ),
                            array(
                                '%s',
                                '%s',
                                '%s',
                                '%s'
                            )
                        );

                }//end else

        }//end if
    
?>


<div id="frontend_settings_wrapper">
<h2 class="section_title">Front-End Access</h2>
<table class="widefat">
<thead>
    <tr style="background-color:#F5F5F5;">
        <th>Group</th>
        <th>Folder</th>  
        <th>Shortcode</th>  
        <th>Actions</th>
    </tr>
</thead>
<tfoot>
    <tr style="background-color:#F5F5F5;">
        <th>Group</th>
        <th>Folders</th>  
        <th>Shortcode</th>     
       <th>Actions</th>
    </tr>
</tfoot>
<tbody>


<tr>
    <td>Logged in</td>
    <td>Default User Folders</td>
    <td><code>[filemanager]</code></td>
    <td>...</td>
</tr>

<tr>
    <td>Logged in</td>
    <td>All folders assigned to the users</td>
    <td><code>[filemanager foldername="*"]</code></td>
    <td>...</td>
</tr>


    <?php  
        $query = "SELECT * FROM `" . $table_name . "` WHERE `type` = 'red_front_end' ";
        $results2 = $wpdb->get_results($query);


    ?>
   

    <?php foreach($results2 as $key=>$value) { ?>
     <tr>
<?php  
        $fn = red_getFolderName( $value->folder, $directory_temp);

        if($value->folder == "/"){
               $fn = "/";
        }

?>

     <td><?php echo $value->meta; ?></td>
     <td><?php echo $fn; ?></td>
     <td><code>[filemanager foldername="<?php echo $fn; ?>" groups="<?php echo $value->meta; ?>" access="<?php echo $value->access; ?>"]</code></td>
     <td> <a href="<?php echo admin_url("admin.php?page=red_fm_front") . "&del=delete&id=" . $value->id; ?>">Delete</a> </td>   
     </tr>

     <?php } ?>

   
</tbody>
</table>

<hr>

<h4>Add Shortcode</h4>

<form action="<?php echo admin_url("admin.php?page=red_fm_front"); ?>" method="POST">
<input type="hidden" name="action" value="add_shortcode">

    <select name="option_role">
            <option value="<?php echo base64_encode("Everyone"); ?>"> Everyone </option>
        <?php foreach($red_roles2 as $key=>$value) { ?>
            
            <option value="<?php echo base64_encode($key); ?>"> <?php echo $value["name"]; ?> </option>
            
        <?php } ?>
    </select>

    <select name="option_folder" id="fm_option_folder">

        <?php foreach($directory_names as $key=>$value){ ?>

            <?php if($value != "/"){ ?>
                <option value="<?php echo base64_encode($directory_list[$key]); ?>"><?php echo $value; ?></option>  
            <?php }else{ ?>
                <option value="<?php echo "/"; ?>"><?php echo $value; ?></option> 
            <?php } ?>

        <?php } ?>

    </select>

    <select name="option_access">
        <option value="r">Read</option>
        <option value="rw">Read/Write</option>
        <option value="ru">Read/Upload</option>
        <option value="rp">Preview Files Only</option>
    </select>

<input type="submit" class="button button-primary menu-save" value="Add Shortcode">
<br/>
<small style="color:green;">Read/Upload will only let you read and upload files/folders, file editing/deleting is not allowed.</small>
<br/>
</form>
    <br/>
    <small style="color:green">"Everyone" settings will allow non-logged-in users too.</small>

<hr>
<br/>


    <H4>Default Folders Access For Logged-in Users:</H4>
    <code>  [filemanager] </code><br/>
    <small style="color:green">Default Folders Are The Ones Automatically Assigned To Each Registered User.</small>

<br><br>
<hr>

    <h4>Access All Folder Assigned To The Logged-in User:</h4>
    <code>[filemanager foldername="*"]</code><br/>
    <small style="color:green">This Shortcode Will Allow The Logged-in Users To See All Their Folders.</small>



</div>

<style type="text/css">
    #frontend_settings_wrapper {
        background-color: #fff;
        padding: 10px 10px;
        margin-top: 20px;
        max-width: 1600px;
        margin-right: 10px;
        box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
        border: 1px solid #ccc;
    }

.section_title {
    background-color: #333;
    display: inline-block;
    color: #fff;
    padding: 10px 10px 10px 10px;
    position: relative;
    left: -10px;
}

</style>


