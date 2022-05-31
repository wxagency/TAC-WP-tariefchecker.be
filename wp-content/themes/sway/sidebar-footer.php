<?php
/**
 * Footer widget area template
 * @package sway
 * by KeyDesign
 */
?>

<?php
    $footer_active_widgets = is_active_sidebar( 'footer-first-widget-area' ) + is_active_sidebar( 'footer-second-widget-area' ) + is_active_sidebar( 'footer-third-widget-area' ) + is_active_sidebar( 'footer-fourth-widget-area' ) + is_active_sidebar( 'footer-fifth-widget-area' );

    $first_widget_column = sway_get_option( 'tek-footer-first-widget-switch' );
    $first_widget_width = sway_get_option( 'tek-footer-first-widget-width' );
    $first_widget_width_class = 'footer-widget-column col-xs-12 col-sm-12 col-md-'.$first_widget_width.' col-lg-'.$first_widget_width;
    $first_widget_text_align = sway_get_option( 'tek-footer-first-widget-text-align' );
    $first_widget_wrapper_class = implode(' ', array( 'first-widget-area', $first_widget_width_class, $first_widget_text_align ));

    $second_widget_column = sway_get_option( 'tek-footer-second-widget-switch' );
    $second_widget_width = sway_get_option( 'tek-footer-second-widget-width' );
    $second_widget_width_class = 'footer-widget-column col-xs-12 col-sm-12 col-md-'.$second_widget_width.' col-lg-'.$second_widget_width;
    $second_widget_text_align = sway_get_option( 'tek-footer-second-widget-text-align' );
    $second_widget_wrapper_class = implode(' ', array( 'second-widget-area', $second_widget_width_class, $second_widget_text_align ));

    $third_widget_column = sway_get_option( 'tek-footer-third-widget-switch' );
    $third_widget_width = sway_get_option( 'tek-footer-third-widget-width' );
    $third_widget_width_class = 'footer-widget-column col-xs-12 col-sm-12 col-md-'.$third_widget_width.' col-lg-'.$third_widget_width;
    $third_widget_text_align = sway_get_option( 'tek-footer-third-widget-text-align' );
    $third_widget_wrapper_class = implode(' ', array( 'third-widget-area', $third_widget_width_class, $third_widget_text_align ));

    $fourth_widget_column = sway_get_option( 'tek-footer-fourth-widget-switch' );
    $fourth_widget_width = sway_get_option( 'tek-footer-fourth-widget-width' );
    $fourth_widget_width_class = 'footer-widget-column col-xs-12 col-sm-12 col-md-'.$fourth_widget_width.' col-lg-'.$fourth_widget_width;
    $fourth_widget_text_align = sway_get_option( 'tek-footer-fourth-widget-text-align' );
    $fourth_widget_wrapper_class = implode(' ', array( 'fourth-widget-area', $fourth_widget_width_class, $fourth_widget_text_align ));

    $fifth_widget_column = sway_get_option( 'tek-footer-fifth-widget-switch' );
    $fifth_widget_width = sway_get_option( 'tek-footer-fifth-widget-width' );
    $fifth_widget_width_class = 'footer-widget-column col-xs-12 col-sm-12 col-md-'.$fifth_widget_width.' col-lg-'.$fifth_widget_width;
    $fifth_widget_text_align = sway_get_option( 'tek-footer-fifth-widget-text-align' );
    $fifth_widget_wrapper_class = implode(' ', array( 'fifth-widget-area', $fifth_widget_width_class, $fifth_widget_text_align ));

    $sixth_widget_column = sway_get_option( 'tek-footer-sixth-widget-switch' );
    $sixth_widget_width = sway_get_option( 'tek-footer-sixth-widget-width' );
    $sixth_widget_width_class = 'footer-widget-column col-xs-12 col-sm-12 col-md-'.$sixth_widget_width.' col-lg-'.$sixth_widget_width;
    $sixth_widget_text_align = sway_get_option( 'tek-footer-sixth-widget-text-align' );
    $sixth_widget_wrapper_class = implode(' ', array( 'sixth-widget-area', $sixth_widget_width_class, $sixth_widget_text_align ));

    if ( ! class_exists( 'ReduxFramework' ) ) {
      $first_widget_column = $second_widget_column = $third_widget_column = $fourth_widget_column = $fifth_widget_column = $sixth_widget_column = true;
    }
?>

<?php if ( $footer_active_widgets ) : ?>
    <?php if ( is_active_sidebar( 'footer-first-widget-area' ) && $first_widget_column ) : ?>
        <div class="<?php echo esc_attr( trim( $first_widget_wrapper_class ) ); ?>">
            <?php dynamic_sidebar( 'footer-first-widget-area' ); ?>
        </div>
    <?php endif;?>

    <?php if ( is_active_sidebar( 'footer-second-widget-area' ) && $second_widget_column ) :?>
        <div class="<?php echo esc_attr( trim( $second_widget_wrapper_class ) ); ?>">
            <?php dynamic_sidebar( 'footer-second-widget-area' ); ?>
        </div>
    <?php endif;?>

    <?php if ( is_active_sidebar( 'footer-third-widget-area' ) && $third_widget_column ) : ?>
      <div class="<?php echo esc_attr( trim( $third_widget_wrapper_class ) ); ?>">
          <?php dynamic_sidebar( 'footer-third-widget-area' ); ?>
      </div>
    <?php endif;?>

    <?php if ( is_active_sidebar( 'footer-fourth-widget-area' ) && $fourth_widget_column ) : ?>
      <div class="<?php echo esc_attr( trim( $fourth_widget_wrapper_class ) ); ?>">
          <?php dynamic_sidebar( 'footer-fourth-widget-area' ); ?>
      </div>
    <?php endif;?>

    <?php if ( is_active_sidebar( 'footer-fifth-widget-area' ) && $fifth_widget_column ) : ?>
      <div class="<?php echo esc_attr( trim( $fifth_widget_wrapper_class ) ); ?>">
          <?php dynamic_sidebar( 'footer-fifth-widget-area' ); ?>
      </div>
    <?php endif;?>

    <?php if ( is_active_sidebar( 'footer-sixth-widget-area' ) && $sixth_widget_column ) : ?>
      <div class="<?php echo esc_attr( trim( $sixth_widget_wrapper_class ) ); ?>">
          <?php dynamic_sidebar( 'footer-sixth-widget-area' ); ?>
      </div>
    <?php endif;?>
<?php endif;?>
