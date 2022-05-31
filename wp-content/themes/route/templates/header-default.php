<header id="masthead" role="banner">
  <div class="container">
    <div class="cs-inner">

      <?php 

      // echo cs_site_logo(); 

    ?><!-- /site-logo -->
      <div id="site-logo">
        
          
        <?php  
        if(ICL_LANGUAGE_CODE=="fr"){ ?>
          <a href="https://www.veriftarif.be/" class="cs-sticky-item" style="max-width:1366px;">
              <img class="cs-logo desktop1" src="https://www.veriftarif.be/wp-content/uploads/2017/09/veriftarif-comparer-les-fournisseurs-denergie-moins-cher-200x100.png" alt="veriftarif.be">
              <!-- <img class="cs-logo2x desktop" src="https://www.veriftarif.be/wp-content/uploads/2017/09/veriftarif-comparer-les-fournisseurs-denergie-moins-cher-200x100.png" alt="veriftarif.be"> -->


              <img class="cs-logo mobile1" src="https://www.veriftarif.be/wp-content/uploads/2017/09/veriftarif-mob.png" alt="veriftarif.be">
             <!--  <img class="cs-logo2x mobile" src="https://www.veriftarif.be/wp-content/uploads/2017/09/veriftarif-mob.png" alt="veriftarif.be"> -->
          </a>
        <?php }else{ ?>

          <a href="https://www.tariefchecker.be/" class="cs-sticky-item" style="max-width:1366px;">
              <img class="cs-logo desktop1" src="https://www.tariefchecker.be/wp-content/uploads/2021/09/Plan-de-travail-1-8.png" alt="Tariefchecker.be">
             <!--  <img class="cs-logo2x desktop" src="https://tariefchecker.be/wp-content/uploads/2017/09/tariefchecker-goedkoopste-energieleveranciers-vergelijken-200x100.png" alt="Tariefchecker.be"> -->

              <img class="cs-logo mobile1" src="https://www.tariefchecker.be/wp-content/uploads/2017/09/tarifchecker-mob.png" alt="Tariefchecker.be">
            <!--   <img class="cs-logo2x mobile" src="https://tariefchecker.be/wp-content/uploads/2017/09/tarifchecker-mob.png" alt="Tariefchecker.be"> -->
          </a>
        <?php } ?>
        
      </div>
      <?php echo cs_site_menu(); ?><!-- /site-nav -->
      <?php echo cs_mobile_icon(); ?><!-- /mobile-icon -->
    </div>
  </div>
  <div id="site-header-shadow"></div>
</header><!-- /header -->