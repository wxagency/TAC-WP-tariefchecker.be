<?php
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	// Remove WooCommerce enqueued styles
	add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

	// Remove WooCommerce prettyPhoto
	if ( ! function_exists( 'sway_remove_woo_scripts' ) ) {
		function sway_remove_woo_scripts() {
		    wp_dequeue_style( 'woocommerce_prettyPhoto_css' );
		    wp_dequeue_script( 'prettyPhoto' );
		    wp_dequeue_script( 'prettyPhoto-init' );
		}
	}
	add_action( 'wp_enqueue_scripts', 'sway_remove_woo_scripts', 99 );

	

	if( ! function_exists( 'sway_remove_customizer' ) ) {
		function sway_remove_customizer($wp_customize) {
		  $wp_customize->remove_control('woocommerce_catalog_columns');
		}
	}
	add_action('customize_register', 'sway_remove_customizer', 20, 1);

	// Add categories in loop before price - visible with minimal shop layout
	if ( sway_get_option( 'tek-woo-catalog-style' ) == 'woo-minimal-style' ) {
		if( ! function_exists( 'sway_loop_categories' ) ) {
			function sway_loop_categories() {
				global $product;
				echo wc_get_product_category_list( $product->get_id(), ', ', '<div class="categories">', '</div>' );
			}
		}
		add_action ( 'woocommerce_after_shop_loop_item_title', 'sway_loop_categories', 7 );
	}

	if ( ! function_exists( 'sway_custom_sale_badge' ) ) {
		function sway_custom_sale_badge( $html, $post, $product ) {

		  if( $product->is_type('variable')){
		      $percentages = array();

		      // Get all variation prices
		      $prices = $product->get_variation_prices();

		      // Loop through variation prices
		      foreach( $prices['price'] as $key => $price ){
		          // Only on sale variations
		          if( $prices['regular_price'][$key] !== $price ){
		              // Calculate and set in the array the percentage for each variation on sale
		              $percentages[] = round( 100 - ( floatval($prices['sale_price'][$key]) / floatval($prices['regular_price'][$key]) * 100 ) );
		          }
		      }
		      // We keep the highest value
		      $percentage = max($percentages) . '%';

		  } elseif( $product->is_type('grouped') ){
		      $percentages = array();

		      // Get all variation prices
		      $children_ids = $product->get_children();

		      // Loop through variation prices
		      foreach( $children_ids as $child_id ){
		          $child_product = wc_get_product($child_id);

		          $regular_price = (float) $child_product->get_regular_price();
		          $sale_price    = (float) $child_product->get_sale_price();

		          if ( $sale_price != 0 || ! empty($sale_price) ) {
		              // Calculate and set in the array the percentage for each child on sale
		              $percentages[] = round(100 - ($sale_price / $regular_price * 100));
		          }
		      }
		      // We keep the highest value
		      $percentage = max($percentages) . '%';

		  } else {
		      $regular_price = (float) $product->get_regular_price();
		      $sale_price    = (float) $product->get_sale_price();

		      if ( $sale_price != 0 || ! empty($sale_price) ) {
		          $percentage    = round(100 - ($sale_price / $regular_price * 100)) . '%';
		      } else {
		          return $html;
		      }
		  }
		  return '<span class="onsale">' . esc_html__( 'Sale', 'sway' ) . ' ' . $percentage . '</span>';
		}
	}
	add_filter( 'woocommerce_sale_flash', 'sway_custom_sale_badge', 20, 3 );

	remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash', 10 );
	add_action( 'woocommerce_single_product_summary', 'woocommerce_show_product_sale_flash', 15 );

	// Single product share links
	if ( class_exists( 'KEYDESIGN_ADDON_CLASS' ) ) {
		if ( sway_get_option( 'tek-woo-single-social-icons' ) ) {
			add_action( 'woocommerce_share', 'kd_output_post_socials', 10 );
		}
	}

	// Add product template style to post class
	if ( ! function_exists( 'sway_woo_catalog_style' ) ) {
		function sway_woo_catalog_style( $classes ) {
			if (!is_admin()) {
				global $product;
				$product_id = wc_get_product();

		    if( $product_id && '' != sway_get_option( 'tek-woo-catalog-style' ) ) {
	        $classes[] = 'woo-detailed-style';
	    	} elseif ( $product_id ) {
		      $classes[] = sway_get_option( 'tek-woo-catalog-style' );
				}

	    	return $classes;
			}
		}
	}
	add_filter( 'wc_product_class', 'sway_woo_catalog_style' );

	// Add wrappers for product listing
	if ( ! function_exists( 'sway_woo_start_image_wrapper' ) ) {
		function sway_woo_start_image_wrapper() {
		   echo '<div class="woo-entry-image">';
		};
	}
	add_action( 'woocommerce_before_shop_loop_item_title', 'sway_woo_start_image_wrapper', 5 );

	if ( ! function_exists( 'sway_woo_end_image_wrapper' ) ) {
		function sway_woo_end_image_wrapper() {
		    echo '</div>';
		};
	}
	add_action( 'woocommerce_before_shop_loop_item_title', 'sway_woo_end_image_wrapper', 12 );

	// Move product link close
	remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5 );
	add_action ( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_link_close', 13 );

	if ( ! function_exists( 'sway_woo_start_entry_wrapper' ) ) {
		function sway_woo_start_entry_wrapper() {
		    echo '<div class="woo-entry-wrapper">';
		};
	}
	add_action( 'woocommerce_before_shop_loop_item_title', 'sway_woo_start_entry_wrapper', 14 );

	if ( ! function_exists( 'sway_woo_end_entry_wrapper' ) ) {
		function sway_woo_end_entry_wrapper() {
		    echo '</div>';
		};
	}
	add_action( 'woocommerce_after_shop_loop_item', 'sway_woo_end_entry_wrapper', 12 );

	// Add link on product title
	add_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_link_open', 5 );
	add_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_link_close', 15 );


	// Return 3 related products
	if ( ! function_exists( 'sway_woo_related_products' ) ) {
		function sway_woo_related_products( $args ) {
			$args['posts_per_page'] = 4;
			$args['columns'] = 4;
			return $args;
		}
	}
	add_filter( 'woocommerce_output_related_products_args', 'sway_woo_related_products' );

	// Return number of products in shop page
	if ( ! function_exists( 'sway_loop_shop_per_page' ) ) {
		function sway_loop_shop_per_page( $product_number ) {
	    $product_number = sway_get_option( 'tek-woo-products-number' );
		  return $product_number;
		}
	}
	add_filter( 'loop_shop_per_page', 'sway_loop_shop_per_page' );

	// Move position of notices wrapper outside woocommerce_before_shop_loop
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
	add_action ( 'keydesign_before_shop_loop', 'woocommerce_output_all_notices', 10 );

	// Move position of related and upsells products
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );

	add_action ( 'woocommerce_after_main_content', 'woocommerce_output_related_products', 2);
	add_action ( 'woocommerce_after_main_content', 'woocommerce_upsell_display', 5);

	// Move position of star rating on shop listing
	remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );
	add_action ( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 15 );

	// Remove decimals from price
	add_filter( 'woocommerce_price_trim_zeros', '__return_true' );

	// YITH Quick View
	add_action( 'template_redirect', 'sway_move_quick_view_button' );
	if ( ! function_exists( 'sway_move_quick_view_button' ) ) {
		function sway_move_quick_view_button() {
		   if ( class_exists( 'YITH_WCQV_Frontend' ) ) {
		   remove_action( 'woocommerce_after_shop_loop_item', array( YITH_WCQV_Frontend(), 'yith_add_quick_view_button' ), 15 );
			 add_action( 'woocommerce_after_shop_loop_item', array( YITH_WCQV_Frontend(), 'yith_add_quick_view_button' ), 10 );
			 remove_action( 'yith_wcwl_table_after_product_name', array( YITH_WCQV_Frontend(), 'add_quick_view_button_wishlist' ), 15 );
		   }
		}
	}

	// Move sale badge with Quick View modal window
	remove_action( 'yith_wcqv_product_image', 'woocommerce_show_product_sale_flash', 10 );
	add_action( 'yith_wcqv_product_summary', 'woocommerce_show_product_sale_flash', 17 );


	if ( ! function_exists( 'sway_enqueue_woocommerce' ) ) {
		function sway_enqueue_woocommerce() {
			wp_enqueue_style( 'keydesign-woocommerce', get_template_directory_uri() . '/core/assets/css/woocommerce.css', array(), null, 'all' );
			wp_register_script( 'keydesign-ajaxcart', get_template_directory_uri() . '/core/assets/js/woocommerce-keydesign.js', array() , null );

			wp_localize_script(
				'keydesign-ajaxcart',
				'keydesign_menucart_ajax',array('nonce' => wp_create_nonce('keydesign-ajaxcart'))
			);
			wp_enqueue_script( 'keydesign-ajaxcart' );
		}
	}
	add_action('wp_enqueue_scripts', 'sway_enqueue_woocommerce', 98 );

	if ( ! function_exists( 'sway_get_cart_items' ) ) {
		function sway_get_cart_items() {
			global $woocommerce;

			if ( is_object( $woocommerce ) && isset( $woocommerce->cart ) && method_exists( $woocommerce->cart, 'get_cart' ) ) {
				$articles = sizeof( $woocommerce->cart->get_cart() );
				$cart = $items_total = '';

				if (  $articles > 0 ) {
					$items_total = $woocommerce->cart->cart_contents_count;
					foreach ( $woocommerce->cart->get_cart() as $cart_item_key => $cart_item ) {
						$_product     = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
						$product_id   = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
						if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
							$product_name  = apply_filters( 'woocommerce_cart_item_name', $_product->get_title(), $cart_item, $cart_item_key );
							$thumbnail     = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
							$product_price = apply_filters( 'woocommerce_cart_item_price', $woocommerce->cart->get_product_price( $_product ), $cart_item, $cart_item_key );

							$cart .= '<li class="cart-item-list clearfix">';
							if ( ! $_product->is_visible() ) {
								$cart .= str_replace( array( 'http:', 'https:' ), '', $thumbnail );
							} else {
								$cart .= '<a class="cart-thumb" href="'.esc_url(get_permalink( $product_id )).'">
											'.str_replace( array( 'http:', 'https:' ), '', $thumbnail ) . '
										</a>';
							}

							$cart .= '<div class="cart-desc"><a class="cart-item" href="'.esc_url(get_permalink( $product_id )).'">' . $product_name . '</a>';
							$cart .= '<span class="product-quantity">'. apply_filters( 'woocommerce_widget_cart_item_quantity',  '<span class="quantity-container">' . sprintf( '%s &times; %s',$cart_item['quantity'] , '</span>' . $product_price ) , $cart_item, $cart_item_key ) . '</span>';
							$cart .= '</div>';
							$cart .= '</li>';
						}
					}

					$cart .= '<li class="subtotal"><span><strong>' . esc_html__('Subtotal:', 'sway') . '</strong> ' . $woocommerce->cart->get_cart_total() . '</span></li>';
					$cart .= '<li class="buttons clearfix">
								<a href="'.wc_get_cart_url().'" class="kd_cart_btn">' . apply_filters( 'sway_mini_cart_view_text', esc_html__("View cart", "sway") ) . '</a>
								<a href="'.wc_get_checkout_url().'" class="kd_checkout_btn">' . apply_filters( 'sway_mini_cart_checkout_text', esc_html__("Checkout", "sway") ) . '</a>
							  </li>';
				} else {
					$cart .= '<li><span class="empty-cart">' . apply_filters( 'sway_mini_cart_empty_text', esc_html__("Your cart is currently empty.", "sway") ) . '</span></li>';
				}
				return array('cart' => $cart, 'articles' => $items_total);
			}
		}
	}

	if ( ! function_exists( 'sway_woomenucart_ajax' ) ) {
		function sway_woomenucart_ajax() {
			$cart = sway_get_cart_items();
			echo json_encode($cart);
			die();
		}
	}
	add_action( 'wp_ajax_woomenucart_ajax', 'sway_woomenucart_ajax');
	add_action( 'wp_ajax_nopriv_woomenucart_ajax', 'sway_woomenucart_ajax' );

	add_action( 'wp_ajax_woomenucart_remove_ajax', 'sway_woomenucart_remove_ajax');
	add_action( 'wp_ajax_nopriv_woomenucart_remove_ajax', 'sway_woomenucart_remove_ajax' );
	if ( ! function_exists( 'sway_woomenucart_remove_ajax' ) ) {
		function sway_woomenucart_remove_ajax($return) {
			$cart = WC()->cart;
			$item_key = $_POST['item_key'] ? $_POST['item_key'] : 0;

			if($item_key){
				$cart->remove_cart_item( $item_key );
			}

			die();
		}
	}

	if ( ! function_exists( 'sway_add_cart_in_menu' ) ) {
		function sway_add_cart_in_menu() {
			global $woocommerce;
			$items_total = $woocommerce->cart->cart_contents_count;
			$get_cart_items = sway_get_cart_items();

			$cart_container = '<ul role="menu" class="drop-menu cart_list product_list_widget keydesign-cart-dropdown">'.((isset($get_cart_items['cart']) && $get_cart_items['cart'] !=='') ? $get_cart_items['cart'] : '<li><span class="empty-cart">' . apply_filters( 'sway_mini_cart_empty_text', esc_html__("Your cart is currently empty.", "sway") ) . '</span></li>').'</ul>';
			$cart_items = '<div class="keydesign-cart menu-item menu-item-has-children dropdown">
						      <a href="'.wc_get_cart_url().'" class="dropdown-toggle">
							  <span class="cart-icon-container">';
								if ( sway_get_option ( 'tek-woo-cart-icon-selector' ) == 'shopping-cart') {
									$cart_items .= '<i class="sway-shopping-cart-header"></i>';
								} elseif ( sway_get_option ( 'tek-woo-cart-icon-selector' ) == 'shopping-bag') {
									$cart_items .= '<i class="sway-shopping-bag-header"></i>';
								}
			$cart_items .= (( $items_total !== 0 ) ? '<span class="badge">'.$items_total.'</span>' : '<span class="badge" style="display: none;"></span>').'</span></a>'. $cart_container.'</div>';
			return $cart_items;
		}
	}
