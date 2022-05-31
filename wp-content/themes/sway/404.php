<?php
/**
 * The template for displaying 404 pages (Not Found)
 * @package sway
 * by KeyDesign
 */

get_header(); ?>

<?php
	$error_page_image = sway_get_option( 'tek-404-image' );
?>

<section class="page-404">
	<div class="container">
	    <div class="row" >
				<?php if ( isset( $error_page_image['url'] ) && '' != $error_page_image['url'] ) : ?>
					<div class="error-page-image-wrapper">
						<img class="error-page-image" src="<?php echo esc_url( $error_page_image['url'] ); ?>" />
					</div>
				<?php endif; ?>
				<h1 class="section-heading"><?php echo ( sway_get_option( 'tek-404-title' ) ) ? esc_html( sway_get_option( 'tek-404-title' ) ) : _e( '404 - Page Not Found', 'sway' ); ?></h1>
        <h4 class="section-subheading"><?php echo ( sway_get_option( 'tek-404-subtitle' ) ) ? esc_html( sway_get_option( 'tek-404-subtitle' ) ) : _e( 'The page you are looking for does not exist.', 'sway' ); ?></h4>
				<a href="<?php echo esc_url(get_site_url()); ?>" class="tt_button tt_primary_button btn_primary_color hover_solid_secondary"><?php echo ( sway_get_option( 'tek-404-back' ) ) ? esc_html( sway_get_option( 'tek-404-back' ) ) : _e( 'Back to homepage', 'sway' ); ?></a>
	    </div>
    </div>
</section>

<?php get_footer(); ?>
