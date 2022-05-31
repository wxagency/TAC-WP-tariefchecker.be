<?php
/**
 *
 * The template for displaying 404 pages (not found page).
 * @since 1.0.0
 * @version 1.1.0
 *
 */
get_header(); ?>
<section class="main-content md-padding">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <article id="post-404" class="post-not-found cs-error-404">
          <div class="entry-content text-center">

            <h1 class="cs-404"><?php _e( '404', 'route'); ?></h1>
            <h2 class="cs-not-found"><?php _e( 'Not Found!', 'route'); ?></h2>

            <hr />

            <p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'route' ); ?></p>

            <?php get_search_form(); ?>

            <hr />
            
            <a href="javascript:history.go(-1)" class="<?php echo cs_get_button_class(); ?>"><?php _e( 'Return Back', 'route' ); ?></a>

          </div><!-- /entry-content -->
        </article><!-- /article -->
      </div>
    </div>
  </div>
</section><!-- /section -->
<?php get_footer();