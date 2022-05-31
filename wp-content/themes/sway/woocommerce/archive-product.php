<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header();

$shop_pagination_design = sway_get_option( 'tek-woo-catalog-style' );
$shop_pagination_class = '';

if ( $shop_pagination_design == 'woo-detailed-style' ) {
	$shop_pagination_class = 'woo-detailed-pagination';
} elseif ( $shop_pagination_design == 'woo-minimal-style' ) {
	$shop_pagination_class = 'woo-minimal-pagination';
}

$shop_columns = $shop_sidebar = $shop_cols_class = $shop_sidebar_cols_class ='';
if ( '' == sway_get_option( 'tek-woo-shop-columns' ) ) {
	$shop_columns = 'woo-3-columns';
} else {
	$shop_columns = sway_get_option( 'tek-woo-shop-columns' );
}

if ( sway_get_option( 'tek-woo-sidebar-position' ) ) {
	$shop_sidebar = sway_get_option( 'tek-woo-sidebar-position' );
}

if ( $shop_columns == 'woo-2-columns' ) {
	$shop_cols_class = 'col-xs-12 col-sm-12 col-md-8 col-lg-8 shop-content-container '. $shop_columns;
	$shop_sidebar_cols_class = 'col-xs-12 col-sm-12 col-md-4 col-lg-4 shop-sidebar-container';
} elseif ( $shop_columns == 'woo-3-columns' ) {
	$shop_cols_class = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 shop-content-container '. $shop_columns;
} elseif ( $shop_columns == 'woo-3-columns-sidebar' ) {
	$shop_cols_class = 'col-xs-12 col-sm-12 col-md-9 col-lg-9 shop-content-container woo-3-columns';
	$shop_sidebar_cols_class = 'col-xs-12 col-sm-12 col-md-3 col-lg-3 shop-sidebar-container';
} elseif ( $shop_columns == 'woo-4-columns' ) {
	$shop_cols_class = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 shop-content-container '. $shop_columns;
}

?>

<section class="shop-content-area">
	<div class="container <?php echo esc_attr( $shop_pagination_class ); ?> <?php echo esc_attr( $shop_sidebar ); ?>">

		<?php if ( isset( $shop_columns ) ) : ?>
			<div class="<?php echo esc_attr( $shop_cols_class ); ?>">
		<?php endif; ?>
			<?php if ( woocommerce_product_loop() ) { ?>

				<div class="notices-wrapper-container">
					<?php do_action( 'keydesign_before_shop_loop' ); ?>
				</div>

				<div class="shop-before-loop">
					<?php do_action( 'woocommerce_before_shop_loop' ); ?>
				</div>

				<?php woocommerce_product_loop_start();

				if ( wc_get_loop_prop( 'total' ) ) {
					while ( have_posts() ) {
						the_post();

						/**
						 * Hook: woocommerce_shop_loop.
						 */
						do_action( 'woocommerce_shop_loop' );

						wc_get_template_part( 'content', 'product' );
					}
				}

				woocommerce_product_loop_end();

				/**
				 * Hook: woocommerce_after_shop_loop.
				 *
				 * @hooked woocommerce_pagination - 10
				 */
				do_action( 'woocommerce_after_shop_loop' );
			} else {
				do_action( 'woocommerce_no_products_found' );
			}
		?>
		</div>
		<?php if ( isset($shop_columns) && isset($shop_sidebar) ) : ?>
			<?php if ( in_array( $shop_columns, array( 'woo-2-columns', 'woo-3-columns-sidebar' ) ) ) : ?>
				<div class="<?php echo esc_attr( $shop_sidebar_cols_class ); ?>">
					<div class="woo-sidebar">
						<?php dynamic_sidebar('shop-sidebar'); ?>
					</div>
				</div>
			<?php endif; ?>
		<?php endif; ?>
	</div>
</section>
<?php get_footer();
