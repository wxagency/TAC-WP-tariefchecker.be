<?php  
defined('ABSPATH') or die("Cannot access pages directly."); 

?>

<style type="text/css">
.red_pag_button a{
	text-decoration: none;
	margin-right: 10px;
}
</style>

<?php
    global $wpdb;
    include( plugin_dir_path( __FILE__ ) . 'settings.php');

//form submits:


//add folder
if( isset($_POST["add_folder"]) ){

$addfolder_folder = esc_sql( base64_decode( $_POST["option_folder"] ) );
if($_POST["option_folder"] == "/"){
    $addfolder_folder = "/";
}

$addfolder_access = esc_sql( $_POST["option_access"] );
$addfolder_id = esc_sql( $_GET["id"] );

    
    $query = "SELECT * FROM `" . $table_name . "` WHERE `folder` = '$addfolder_folder' AND `type` = '$addfolder_id' ";
    $results = $wpdb->get_results($query);

    if( sizeof($results) > 0){

                $wpdb->update(
                    $table_name,
                    array(
                        'folder' => $addfolder_folder,
                        'type'   =>  $addfolder_id,
                        'access' =>  $addfolder_access  
                    ),
                    array( 'folder' => $addfolder_folder, 'type'   =>  $addfolder_id ),
                    array(
                        '%s',   
                        '%s',
                        '%s'
                    ),
                    array( '%s', '%s' )
                );


    }else{

                    $wpdb->insert(
                            $table_name,
                            array(
                                'folder' => $addfolder_folder,
                                'type'   =>  $addfolder_id,
                                'access' =>  $addfolder_access,
                                'meta'   => ''
                            ),
                            array(
                                '%s',
                                '%s',
                                '%s',
                                '%s'
                            )
                        );


    }//end of else


}
//end of add folder


//delete folder
if( isset($_GET["perform"]) ){

$delfolder_folder = esc_sql( base64_decode( $_GET["folder_delete"] ) );
$delfolder_id = esc_sql( $_GET["id"] );

    $query = "DELETE FROM `" . $table_name . "` WHERE `folder` = '$delfolder_folder' AND `type` = '$delfolder_id' ";
    $wpdb->query($query);

}
//end of delete folder




    $blogusers = get_users();

?>



<div id="fm_settings_wrapper">
<h2 class="section_title"> User's Access </h2><br>
<p style="border: 1px solid #ccc;padding: 10px;display: inline-block;background-color:#f5f5f5;">Use the shortcode: <code>[filemanager foldername="*"]</code> to show every user all their assigned folders.</p>
<br><br>

<div id="fm_users_table_wrapper">
<table class="widefat" id="fm_users_table">
<thead>
    <tr style="background-color:#F5F5F5;">
    	<th>User</th>
        <th>Role</th>
        <th>Folders</th>      
    </tr>
</thead>
<tfoot>
    <tr style="background-color:#F5F5F5;">
    	<th>User</th>
        <th>Role</th>
        <th>Folders</th>      

    </tr>
</tfoot>
<tbody>
    

    <?php foreach($blogusers as $key=>$value) { ?>
    <?php  
    	$usrdata = get_userdata( $value->ID );
    	
    ?>
     <tr>
     <td><?php echo $value->user_nicename ?></td>
     <td> <?php echo $usrdata->roles[0]; ?> </td>
     <td><a href="<?php echo admin_url("admin.php?page=red_fm_manager_users&action=view_folders&id=$value->ID"); ?>">Folders</a></td>

     </tr>

     <?php } ?>

   
</tbody>
</table>
</div>


<?php if( isset( $_GET["action"] ) ){ ?>
    <?php if($_GET["action"] == "view_folders"){ ?>
        <?php
             $id=0;
             $id= esc_sql( $_GET["id"] );

             $query = "SELECT * FROM `" . $table_name . "` WHERE `type` = '$id' ";

             $allow_default_folders = get_option("red_fm_create_default_folders");

             if($allow_default_folders == "0"){
                    $query = "SELECT * FROM `" . $table_name . "` WHERE `type` = '$id' AND `meta` <> 'red_fm_default' ";
             }

             $results = $wpdb->get_results($query);
 
            $usrdata = get_userdata( $id );
        
        ?>




<hr>

<br/>

<h3> <?php echo $usrdata->user_nicename ?>'s Folders:  </h3>

<table class="widefat">
<thead>
    <tr style="background-color:#F5F5F5;">
        <th>Folder</th>
        <th>Access</th>
        <th>Action</th>      
    </tr>
</thead>
<tfoot>
    <tr style="background-color:#F5F5F5;">
        <th>Folder</th>
        <th>Access</th>
        <th>Action</th> 
    </tr>
</tfoot>
<tbody>

    <?php foreach($results as $key=>$value){ ?>
    <?php  

        $fn = red_getFolderName( $value->folder, $directory_temp);

        if($value->folder == "/"){
               $fn = "/";
        }

    ?>
         <tr>
             <td><?php echo $fn; ?></td>
             <td> <?php echo red_defineAccess( $value->access ); ?> </td>
             <td><a href="<?php echo admin_url("admin.php?page=red_fm_manager_users&action=view_folders&id=$id&perform=delete&folder_delete=". base64_encode($value->folder) ); ?>">Delete</a></td>
         </tr>
     <?php } ?>

   
</tbody>
</table>

<br/>

<h3>Add/Edit Folder:</h3>
<form action="<?php echo admin_url("admin.php?page=red_fm_manager_users&action=view_folders&id=$id"); ?>" method="POST">
        
        <input type="hidden" name="add_folder" value="1">
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

    <input type="submit" class="button button-primary menu-save" value="Add Folder">

</form>


<small style="color:green;">Read/Upload will only let you read and upload files/folders, file editing/deleting is not allowed.</small>


    <?php } ?> <!-- if $_GET .. view folders -->

<?php } ?>    <!-- isset action -->


<style type="text/css">
    #fm_users_table_wrapper{
        padding: 0 5px 0 0;
    }

.dataTables_wrapper .dataTables_paginate .paginate_button {
    color: #2b9199 !important;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
}


#fm_settings_wrapper {
    background-color: #fff;
    padding: 10px 10px;
    margin-top: 20px;
    max-width: 1600px;
    margin-right: 10px;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
    border: 1px solid #ccc;
}


.dataTables_filter{
    margin-bottom: 10px;
}


.section_title{
    background-color: #333;
    display: inline-block;
    color: #fff;
    padding: 10px 10px 10px 10px;
    position: relative;
    left: -10px;
    top:-10px;
    margin-bottom: 0;
}


</style>

</div>