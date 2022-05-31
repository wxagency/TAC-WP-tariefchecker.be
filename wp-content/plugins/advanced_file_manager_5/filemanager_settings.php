<?php  
defined('ABSPATH') or die("Cannot access pages directly."); 
    global $wpdb;
    include 'settings.php';




	$langs = array(
					"en" 		=> "English",
					"de"		=> "German",
					"el"		=> "Greek",
					"ar"		=> "Arabic",
					"es"		=> "Spanish",
					"fa"		=> "Persian-Farsi",
					"bg"		=> "Bulgarian",
					"ca"		=> "Catalan",
					"da"		=> "Danish",
					"cs"		=> "Czech",
					"fr"		=> "French",
					"hu"		=> "Hungarian",
					"it"		=> "Italian",
					"jp"		=> "Japanese",
					"ko"		=> "Korean",
					"nl"		=> "Dutch",
					"no"		=> "Norwegian",
					"pl"		=> "Polish",
					"pt_BR"		=> "Brazilian Portuguese",
					"sk"		=> "Slovak",
					"sl"		=> "Slovenian",
					"sv"		=> "Swedish",
					"tr"		=> "Turkish",
					"vi"		=> "Vietnamese",
					"zh_CN"		=> "Simplified Chinese",
					"zh_TW"		=> "Traditional Chinese"
					);



	//form processing

	if( isset($_POST["action"]) ){
			if( $_POST["action"] == "save" ){

				$option_lang = $_POST["option_lang"];
				$option_view = $_POST["option_view"];
				$option_theme = $_POST["option_theme"];
				$option_sync = $_POST["option_sync"];
				$option_email = $_POST["option_email"];
				$option_email_user = $_POST["option_email_user"];
				$email_template = $_POST["email_template"];
				$email_template_user = $_POST["email_template_user"];
				$the_email = $_POST["the_email"];
				
				
				update_option( "red_fm_lang", $option_lang );
				update_option( "red_fm_view", $option_view );
				update_option( "red_fm_theme", $option_theme);
				update_option( "red_fm_media_sync", $option_sync );
				update_option( "red_fm_email", $option_email );
				update_option( "red_fm_email_user", $option_email_user );
				update_option( "red_fm_email_template", $email_template );
				update_option( "red_fm_user_email_template", $email_template_user );
				update_option( "red_fm_the_email", $the_email );


			}elseif( $_POST["action"] == "modify_defaults_permissions" ){//end if


					$modify_access = $_POST["option_access"];
					update_option( "red_fm_default_access", $modify_access );

                                $wpdb->update(
                                    $table_name,
                                    array(
                                    	
                                        'access' =>  $modify_access
                                    ),
                                    array( 'meta' => 'red_fm_default' ),
                                    array(
                                        '%s'
                                    ),
                                    array( '%s' )
                                );


			}elseif( $_POST["action"] == "modify_allow_default"  ){

					$post_allow_default = $_POST["option_allow_default"];
					update_option( "red_fm_create_default_folders", $post_allow_default);

			}elseif($_POST["action"] == "modify_folder_depth"){

					$depth_option = $_POST["option_folder_depth"];
					update_option("red_fm_folder_depth", $depth_option);

			}elseif($_POST["action"] == "modify_toolbar"){

					$toolbar_text = $_POST["toolbar_text"];
					update_option("red_fm_toolbar_text", $toolbar_text);

			}elseif($_POST["action"] == "modify_context"){

					$context_text = $_POST["context_text"];
					update_option("red_fm_context_text", $context_text);

			}elseif($_POST["action"] == "modify_url_secure"){

					$secure_url = $_POST["option_url_secure"];
					update_option("red_fm_secure_url", $secure_url);

			}elseif($_POST["action"] == "modify_window_height"){

					$win_height = $_POST["fm_window_height"];
					update_option("red_fm_window_height", $win_height);

			}elseif($_POST["action"] == "modify_log_email"){

				    $log_email = $_POST["email"];
				    update_option("red_log_email", $log_email);

			}elseif($_POST["action"] == "modify_debug_mode"){

					$debug_mode = $_POST["option_debug_mode"];
					update_option("red_fm_debug_mode", $debug_mode);

			}elseif($_POST["action"] == "modify_chunked_upload"){

					$red_fm_chunk_size = $_POST["red_fm_chunk_size"];
					if($red_fm_chunk_size == 0){
						$red_fm_chunk_size == -1;
					}
					update_option("red_fm_chunk_upload", $red_fm_chunk_size);

			}elseif($_POST["action"] == "modify_dblclick_action"){

					$option_dblclick = $_POST["option_dblclick"];
					update_option("red_fm_dblclick", $option_dblclick);

			}

			//


	}//end if


    $lang = "LANG";
    if( get_option( "red_fm_lang" ) ) {
    	$lang = get_option( "red_fm_lang" );
	}

    $dview = "icons";
    if( get_option( "red_fm_view" ) ) {
    	$dview = get_option( "red_fm_view" );
	}

	$fmtheme = "default";
	if( get_option("red_fm_theme") ) {
		$fmtheme = get_option("red_fm_theme");
	}


	//red_fm_media_sync
    $msync = "1";

	$msync = get_option( "red_fm_media_sync" );

	$upload_email = "1";
	$upload_email = get_option( "red_fm_email", "1" );

	$upload_email_user = "0";
	$upload_email_user = get_option( "red_fm_email_user", "0" );


	$email_temp = "A file has been uploaded by {username}, the file link is: 
{filename}




This email was sent from the {site_title} blog.";

	$email_temp_user = "A file has been uploaded by the admin, the file link is: 
{filename}




This email was sent from the {site_title} blog.";


	$email_template_string = get_option( "red_fm_email_template", $email_temp );

	//user email template string
	$email_template_string_user = get_option( "red_fm_user_email_template", $email_temp_user );

	$admin_email = get_option( 'admin_email' );
	$email_string = get_option("red_fm_the_email", $admin_email);

	
?>

<div id="fm_container" style="background-color:#fff; padding: 20px 30px; margin: 40px 20px;">
<style>
form table{
	background-color:#f9f9f9;
	color:#333;
	padding: 6px;
	margin-bottom: 20px;
}
table{
	width: 100%;
}
</style>
<H3 class="section_title">Filemanager Settings:</H3>
<form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
<table>
	<input type="hidden" name="action" value="save">
<tbody class="form-table">
	<tr>
		<td>Filemanager Language:</td>
		<td>
			    <select name="option_lang">

			    	<?php foreach($langs as $key=>$value){ ?>
			    		<?php 

			    			if($lang == $key){
			    				$sel = "selected";
			    			}else{
			    				$sel = "";
			    			}	
			    		?>
			    		<option value="<?php echo $key; ?>" <?php echo $sel; ?> ><?php echo $value; ?></option>
			    	<?php } ?>

			    </select>


		</td>
	</tr>

	<tr>
		<td>Default UI View:</td>

		<td>
		<select name="option_view">
			<option value="icons" <?php if($dview == "icons") echo "selected"; ?> >Icons</option>
			<option value="list" <?php if($dview == "list") echo "selected"; ?> >List</option>
		</select>
		
	</td>

	</tr>



	<tr>
		<td>Filemanager Theme:</td>

		<td>
		<select name="option_theme">
			<option value="default" <?php if($fmtheme == "default") echo "selected"; ?> >Default</option>
			<option value="metro" <?php if($fmtheme == "metro") echo "selected"; ?> >Metro</option>
			<option value="dark" <?php if($fmtheme == "dark") echo "selected"; ?> >Dark</option>
		</select>
		
	</td>

	</tr>


	<tr>
		<td>Sync With Media Manager:</td>

		<td>
		<select name="option_sync">
			<option value="1" <?php if($msync == "1") echo "selected"; ?> >Enable</option>
			<option value="0" <?php if($msync == "0") echo "selected"; ?> >Disable</option>
		</select>
		<small style="color:green">Allows uploaded images to synchronize with WordPress Media Manager</small>
	</td>

	</tr>

	<tr>
		<td><a id="link_admin_email_Settings" href="#">Admin Email Notification Settings &#9660;</a></td>
	</tr>

	<style type="text/css">
		#admin_email_settings1, #user_email_settings1{
			/*display: none;*/
			background-color:#fff;
		}
		#admin_email_settings2, #user_email_settings2{
			/*display: none;*/
			background-color:#fff;
		}
		#admin_email_settings3{
			/*display: none;*/
			background-color:#fff;
		}

		#link_admin_email_Settings{
			text-decoration: none;
		}
		#link_user_email_Settings{
			text-decoration: none;
		}

	</style>

	<script type="text/javascript">
		jQuery.noConflict();
		jQuery( document ).ready(function( $ ) {

			$("#admin_email_settings1, #user_email_settings1, #admin_email_settings2, #user_email_settings2, #admin_email_settings3").hide();

		    $('#link_admin_email_Settings').on('click', function(e){
		    	e.preventDefault();
		    	$('#admin_email_settings1').toggle();
		    	$('#admin_email_settings2').toggle();
		    	$('#admin_email_settings3').toggle();
		    });

		    $('#link_user_email_Settings').on('click', function(e){
		    	e.preventDefault();
		    	$('#user_email_settings1').toggle();
		    	$('#user_email_settings2').toggle();
		    });


		});
	</script>

	<tr id="admin_email_settings1">
		<td>Admin Upload Email Notification:</td>

		<td>
		<select name="option_email">
			<option value="1" <?php if($upload_email == "1") echo "selected"; ?> >Enable</option>
			<option value="0" <?php if($upload_email == "0") echo "selected"; ?> >Disable</option>
		</select>
		<small style="color:green">Send email notification to admin, each time a user uploads a file.</small>
	</td>

	</tr>

	<tr id="admin_email_settings2">
	<td style='vertical-align:top;'>Admin Email Template:</td>
		<td>
					<textarea name="email_template" id="" cols="100%" rows="10"><?php echo $email_template_string; ?></textarea><br/>
					<small style="color:green">You can use {username}, {filename} and {site_title}</small>
		</td>
	</tr>

	<tr id="admin_email_settings3">
	<td>Email:</td>
		<td>
					<input style="width: 100%;" type="text" value="<?php echo $email_string; ?>" name="the_email">
					<small style="color:green">The email address where you want the notifications to be sent.</small>
		</td>
	</tr>



	<tr>
		<td><a id="link_user_email_Settings" href="#">User Email Notification Settings &#9660;</a></td>
	</tr>



	<tr id="user_email_settings1">
		<td>User Upload Email Notification:</td>

		<td>
		<select name="option_email_user">
			<option value="1" <?php if($upload_email_user == "1") echo "selected"; ?> >Enable</option>
			<option value="0" <?php if($upload_email_user == "0") echo "selected"; ?> >Disable</option>
		</select>
		<small style="color:green">Send email notification each time the admin uploads a file to a user's default folder.</small>
	</td>

	</tr>


	<tr id="user_email_settings2">
	<td style='vertical-align:top;'>Users Email Template:</td>
		<td>
					<textarea name="email_template_user" id="" cols="100%" rows="10"><?php echo $email_template_string_user; ?></textarea><br/>
					<small style="color:green">You can use {username}, {filename} and {site_title}</small><br/>
					<small style="color:green">This email is sent to the user when admin uploads a file to their default folder.</small>
		</td>
	</tr>






	<tr>
		<td> <input type="submit" name="submit" value="Save" class="button button-primary menu-save"> </td>
	</tr>

</tbody>	


</form>





</table>

<br>
<hr>
<br/>

<h3>Modify Default Folders Permissions:</h3>




    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_defaults_permissions">
                <select name="option_access">
                	<?php  
                		$default_perm = get_option("red_fm_default_access");

                	?>

                    <option value="r" <?php if($default_perm == "r") echo "selected"; ?>>Read</option>
                    <option value="rw" <?php if($default_perm == "rw") echo "selected"; ?>>Read/Write</option>
                    <option value="ru" <?php if($default_perm == "ru") echo "selected"; ?>>Read/Upload</option>
                    <option value="rp" <?php if($default_perm == "rp") echo "selected"; ?>>Preview Files Only</option>


                </select>
             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">Sets Permissions For The Default Folders For All Users.</small>

<br><br>
<hr>


<h3>Allow Default Folders For Registered Users:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_allow_default">
                <select name="option_allow_default">
                	<?php  
                		$allow_default_folders = get_option("red_fm_create_default_folders");

                	?>

                    <option value="1" <?php if($allow_default_folders == "1") echo "selected"; ?>>Enable</option>
                    <option value="0" <?php if($allow_default_folders == "0") echo "selected"; ?>>Disable</option>



                </select>
             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">Filemanager Adds Folder For Each Registered User, You can Disable This Behavior Here.</small>

    <hr>

    <h3>Folder Depth:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_folder_depth">
                <select name="option_folder_depth">
                	<?php  
                		$folder_depth = get_option("red_fm_folder_depth");

                	?>

                    <option value="3" <?php if($folder_depth == "3") echo "selected"; ?>>3</option>
                    <option value="4" <?php if($folder_depth == "4") echo "selected"; ?>>4</option>
                    <option value="5" <?php if($folder_depth == "5") echo "selected"; ?>>5</option>
                    <option value="6" <?php if($folder_depth == "6") echo "selected"; ?>>6</option>
                    <option value="7" <?php if($folder_depth == "7") echo "selected"; ?>>7</option>


                </select>
             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">Set the depth of the folders from wordpress root directory in the dropdown menus. Higher values may slow down the page.</small>



    <hr>

 <h3>File Double-Click Action:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_dblclick_action">
                <select name="option_dblclick">
                	<?php  
                		$dblclick = get_option("red_fm_dblclick");

                	?>

                    <option value="quicklook" <?php if($dblclick == "quicklook") echo "selected"; ?>>Preview</option>
                    <option value="download" <?php if($dblclick == "download") echo "selected"; ?>>Download</option>


                </select>
             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">If preview is not available for the file type, it would download the file.</small>


<hr>



    <!-- Make url secure -->
    <h3>Secure Paths:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_url_secure">
                <select name="option_url_secure">
                	<?php  
                		$url_secure = get_option("red_fm_secure_url");

                	?>

                    <option value="0" <?php if($url_secure == "0") echo "selected"; ?>>Insecure</option>
                    <option value="1" <?php if($url_secure == "1") echo "selected"; ?>>Secure</option>


                </select>
             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">Secure paths will hide file urls. Thumbnails and Google Docs Viewer wont work with secure urls.</small>



<hr>


    <!-- Window height Settings -->
    <h3>Window Height:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_window_height">

                	<?php  
                		$fm_height = get_option("red_fm_window_height") == "" ? 600 : get_option("red_fm_window_height");
                	?>
             <input step="100" type="number" name="fm_window_height" value="<?php echo $fm_height; ?>">   	

             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">Change the window height of the filemanager</small>


<hr>




<hr>


    <!-- Chunked File Upload Settings -->
    <h3>Chunked File Upload:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_chunked_upload">

                	<?php  
                		$chunk_size = get_option("red_fm_chunk_upload", 0);
                		if($chunk_size == -1){
                			$chunk_size = 0;
                		}
                	?>
             <input step="1" min="0" type="number" name="red_fm_chunk_size" value="<?php echo $chunk_size; ?>">   	

             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">Chunked upload option will allow you to upload file larger than the upload size. Files are made into chunks before uploading.
    	<br/>Leave it to 0 to disable file chunks</small>


<hr>







<h3>Debug Mode:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_debug_mode">

                	<?php  
                		$debug_mode = get_option("red_fm_debug_mode") == "" ? 1 : get_option("red_fm_debug_mode");
                	?>

                <select name="option_debug_mode">
                    <option value="1" <?php if($debug_mode == "1") echo "selected"; ?>>Enable</option>
                    <option value="0" <?php if($debug_mode == "0") echo "selected"; ?>>Disable</option>
                </select>

             <input type="submit" name="submit" value="Change" class="button button-primary menu-save">   
    </form>

    <small style="color:green">Debug mode will show errors and hints</small>



    <hr>



    <h3>Filemanager Toolbar:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_toolbar">
<?php 

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
	
?>


<textarea name="toolbar_text" cols="60" rows='16'>
<?php echo  $toolbar_text; ?>
</textarea>
 			<br/><br/>
            <input type="submit" name="submit" value="Save" class="button button-primary menu-save">   
    </form>



<br/><br/>
<hr>
    <h3>Context Menu:</h3>

    <form action="<?php echo admin_url("admin.php?page=red_fm_settings"); ?>" method="POST">
            <input type="hidden" name="action" value="modify_context">
<?php 

	if( get_option("red_fm_context_text") ){
		$context_text = stripslashes( get_option("red_fm_context_text") );
	}else{
$context_text = 'navbar : ["open", "|", "duplicate", "|", "rm", "|", "info"], 
cwd : ["reload", "back", "|", "upload", "mkdir", "mkfile", "paste", "|", "info"], 
files : ["getfile", "|","open", "gview", "quicklook", "|", "download", "|", "duplicate", "|", "rm", "|", "edit", "rename", "resize", "|", "archive", "extract", "|", "info", "info2" ]';
	}
	
?>


<textarea name="context_text"  rows='6' style="width:100%">
<?php echo  $context_text; ?>
</textarea>
 			<br/><br/>
            <input type="submit" name="submit" value="Save" class="button button-primary menu-save">   
    </form>




</div>



<style type="text/css">
	
#fm_container {
	background-color: #fff;
	padding: 10px 30px;
	margin: 40px 20px;
	box-shadow: -1px -1px 9px rgba(0,0,0,0.1);
	border: 1px solid #ccc;
	max-width: 1000px;
}


.section_title{
	background-color: #333;
	display: inline-block;
	color: #fff;
	padding: 10px 10px 10px 10px;
	position: relative;
	left: -30px;
}

</style>