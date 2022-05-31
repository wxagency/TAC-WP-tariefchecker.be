<?php
// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

$content_to_display = $topbar_left_content_escaped = $topbar_right_content_escaped = $topbar_content_design = $topbar_left_empty = $topbar_right_empty = '';

if ( ! function_exists( 'sway_topbar_content' ) ) {
	function sway_topbar_content ( $topbar_section ) {
		$section_content  = '';
		$content_to_display = sway_get_option( $topbar_section );
		$social_items = sway_get_option( 'tek-social-profiles' );

		// Strip empty spaces from phone and email strings
		$business_phone = str_replace(' ', '', sway_get_option( 'tek-business-phone' ) );
		$secondary_business_phone = str_replace(' ', '', sway_get_option( 'tek-secondary-business-phone' ) );
		$business_email = str_replace(' ', '', sway_get_option( 'tek-business-email' ) );

		if ( 'contact-info' === $content_to_display ) {
      $section_content = '<div class="topbar-contact">';
      if ( '' != sway_get_option( 'tek-business-phone' ) ) {
          $section_content .= '<span class="topbar-phone"><a href="tel:'. esc_attr( $business_phone ) .'"><i class="sway-phone-topbar fas"></i><span>'. esc_html( sway_get_option( 'tek-business-phone' ) ) .'</span></a></span>';
      }
			if ( '' != sway_get_option( 'tek-secondary-business-phone' ) ) {
          $section_content .= '<span class="topbar-phone"><a href="tel:'. esc_attr( $secondary_business_phone ) .'"><i class="sway-phone-topbar fas"></i><span>'. esc_html( sway_get_option( 'tek-secondary-business-phone' ) ) .'</span></a></span>';
      }
      if ( '' != sway_get_option( 'tek-business-email' ) ) {
          $section_content .= '<span class="topbar-email"><a href="mailto:'. esc_attr( $business_email ) .'"><i class="sway-mail-topbar far"></i><span>'. esc_html( sway_get_option( 'tek-business-email' ) ) .'</span></a></span>';
      }
      if ( '' != sway_get_option( 'tek-business-opening-hours' ) ) {
          $section_content .= '<span class="topbar-opening-hours"><i class="sway-schedule-topbar far"></i><span>'. esc_html( sway_get_option( 'tek-business-opening-hours' ) ) .'</span></span>';
      }
      $section_content .= '</div>';
		} elseif ( 'social-links' === $content_to_display ) {
      $section_content = '<div class="topbar-socials">' . sway_social_icons( $echo = false ) . '</div>';
		} elseif ( 'navigation' === $content_to_display ) {
      $section_content = '<div class="topbar-menu">';
      if ( has_nav_menu( 'topbar-menu' ) ) {
          $section_content .= wp_nav_menu( array( 'theme_location' => 'topbar-menu', 'depth' => 1, 'container' => false, 'menu_class' => 'navbar-topbar', 'fallback_cb' => 'false', 'echo' => false ) );
      }
      $section_content .= '</div>';
		}

		return $section_content;
	}
}

if ( 'empty' != sway_get_option( 'tek-topbar-content-design' ) ) {
	$topbar_content_design = sway_get_option( 'tek-topbar-content-design' );
}

$topbar_left_content_escaped = sway_topbar_content( 'tek-topbar-left-content' );
$topbar_right_content_escaped = sway_topbar_content( 'tek-topbar-right-content' );

if ( sway_get_option( 'tek-topbar-left-content' ) == 'empty' ) {
	$topbar_left_empty = 'content-empty';
}
if ( sway_get_option( 'tek-topbar-right-content' ) == 'empty' ) {
	$topbar_right_empty = 'content-empty';
}
?>

<?php if ( sway_get_option( 'tek-topbar' ) ) : ?>
  <?php if ( 'empty' != sway_get_option( 'tek-topbar-left-content' ) || 'empty' != sway_get_option( 'tek-topbar-right-content' ) ) : ?>
	<div class="topbar <?php echo esc_attr($topbar_content_design); if ( sway_get_option( 'tek-topbar-mobile' ) ) echo ' visible-on-mobile';  ?>">
		<div class="container">
			<div class="topbar-left-content <?php echo esc_attr($topbar_left_empty); ?>">
				<?php
				// This variable ($topbar_left_content_escaped) has been safely escaped in the following file: sway/core/templates/header/content-topbar.php Lines: 10-44
				?>
				<?php echo "" . $topbar_left_content_escaped; ?>
			</div>
			<div class="topbar-right-content <?php echo esc_attr($topbar_right_empty); ?>">
				<?php
				// This variable ($topbar_right_content_escaped) has been safely escaped in the following file: sway/core/templates/header/content-topbar.php Lines: 10-44
				?>
				<?php echo "" . $topbar_right_content_escaped; ?>
			</div>
		</div>
	</div>
  <?php endif; ?>
<?php endif; ?>
