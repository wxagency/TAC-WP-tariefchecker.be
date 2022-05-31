<?php
/**
 *
 * The template used to display tag archive pages
 * @since 1.0.0
 * @version 1.1.0
 *
 */
get_header(); ?>
<section id="page-header">
  <div class="container">
    <div class="row">
      <div class="col-md-12 md-padding">
        <h1 class="page-title"><?php printf( __( 'Tag Archives: %s', 'route' ), single_tag_title( '', false ) ); ?></h1>
        <?php
          $cs_term_description = term_description();
          if ( ! empty( $cs_term_description ) ) { printf( '<div class="header-content">%s</div>', $cs_term_description ); }
        ?>
        <?php echo cs_breadcrumb(); ?>
      </div>
    </div>
  </div>
</section><!-- /page-header -->

<?php get_template_part( 'templates/page', 'loop' ); ?>
<?php get_footer();