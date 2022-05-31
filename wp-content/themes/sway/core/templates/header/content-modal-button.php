<?php

  /* Button style and color scheme */
  $btn_wrapper_class = $button_style_class = $button_color_class = $button_hover_class = '';

  if ( sway_get_option( 'tek-header-button-style' ) == 'solid-button') {
    $button_style_class .= 'tt_primary_button';
  } elseif ( sway_get_option( 'tek-header-button-style' ) == 'outline-button') {
    $button_style_class .= 'tt_secondary_button';
  } else {
    $button_style_class .= 'tt_primary_button';
  }

  if ( sway_get_option( 'tek-header-button-color' ) == 'primary-color') {
    $button_color_class .= 'btn_primary_color';
  } elseif ( sway_get_option( 'tek-header-button-color' ) == 'secondary-color') {
    $button_color_class .= 'btn_secondary_color';
  } else {
    $button_color_class .= 'btn_primary_color';
  }

  if ( sway_get_option( 'tek-header-button-hover-style' ) ) {
      $button_hover_class .= sway_get_option( 'tek-header-button-hover-style' );
  }

  $btn_wrapper_class = implode(' ', array('modal-menu-item', 'tt_button', $button_style_class, $button_color_class, $button_hover_class));
?>

<?php if ( sway_get_option( 'tek-modal-button' ) && sway_get_option( 'tek-header-button-action' ) == '1' ) : ?>
   <a class="<?php echo esc_attr($btn_wrapper_class); ?>" data-toggle="modal" data-target="#popup-modal"><?php echo esc_html( sway_get_option( 'tek-header-button-text' ) );?></a>
<?php elseif ( sway_get_option( 'tek-modal-button' ) &&  sway_get_option( 'tek-header-button-action' ) == '2' ) : ?>
  <?php if ( '' != sway_get_option( 'tek-scroll-id' ) ) : ?>
     <a class="<?php echo esc_attr($btn_wrapper_class); ?> scroll-section" href="<?php if( is_front_page()) { echo esc_attr( sway_get_option( 'tek-scroll-id' ) ); } else { echo esc_url( site_url()) . esc_attr( sway_get_option( 'tek-scroll-id' ) );} ?>"><?php echo esc_html( sway_get_option( 'tek-header-button-text' ) );?></a>
  <?php endif; ?>
<?php elseif ( sway_get_option( 'tek-modal-button' ) && ( sway_get_option( 'tek-header-button-action' ) == '3')) : ?>
  <?php if ( '' != sway_get_option( 'tek-button-new-page' ) ) : ?>
   <a class="<?php echo esc_attr($btn_wrapper_class); ?>" <?php echo ( sway_get_option( 'tek-button-target' ) == 'new-page') ? 'target="_blank"' : 'target="_self"'; ?> href="<?php echo esc_url( sway_get_option( 'tek-button-new-page' ) ); ?>"><?php echo esc_html( sway_get_option( 'tek-header-button-text' ) );?></a>
  <?php endif; ?>
<?php endif; ?>
