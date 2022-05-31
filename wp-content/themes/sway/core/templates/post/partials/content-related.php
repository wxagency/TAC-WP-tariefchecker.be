<?php
/**
 * The template for displaying Related posts for Blog posts
 */

	if(!( 'post' == get_post_type() )) {
		return false;
	}

	$carousel_class = '';

	$related_posts_number = sway_get_option( 'tek-related-posts-number' );

	if ( '' == $related_posts_number ) {
		$related_posts_number = 3;
	}

	$tags = wp_get_post_tags( $post->ID );
	if ( $tags ) {
		$tag_ids = array();
		foreach ( $tags as $single_tag ) $tag_ids[] = $single_tag->term_id;
		$args = array(
			'tag__in' => $tag_ids,
			'post__not_in' => array( $post->ID ),
			'posts_per_page' => $related_posts_number,
			'ignore_sticky_posts' => 1,
			'orderby' => 'date',
			'post__not_in' => array( $post->ID )
		);
	}

	$related_query = new WP_Query( $args );

	if( $related_query->found_posts == 0) {
		return false;
	}

	if ( $related_query->found_posts > 3 && $related_posts_number > 3 ) {
    $carousel_class = 'owlslider-related-posts';
  }

	if( $related_query->have_posts() ) : ?>
		<section class="related-posts">
		  <div class="container">
		    <?php if ( '' != sway_get_option( 'tek-related-posts-title' ) ) : ?>
		      <div class="related-title">
		        <h3><?php echo esc_html( sway_get_option( 'tek-related-posts-title' ) ); ?></h3>
		      </div>
		    <?php endif; ?>
		    <div class="related-content <?php echo esc_attr( $carousel_class ); ?>">
		      <?php
		      	while ( $related_query->have_posts() ) :
							$related_query->the_post();
		      		get_template_part('core/templates/post/blog', 'minimal-grid');
		      	endwhile;

		      	wp_reset_postdata();
		      ?>
		    </div>
		  </div>
		</section>
	<?php endif; ?>
