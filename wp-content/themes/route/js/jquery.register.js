// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {
  'use strict';

  var ROUTE = window.ROUTE || {};

  var $cs_body, $cs_html, $cs_main, $cs_masthead, $cs_window, $cs_document,
      cs_is_device, cs_is_sticky, cs_is_transparent, cs_is_small, cs_has_admin_bar,
      cs_is_blank, cs_no_mobile_anim, cs_sticky_height, cs_admin_bar_height, cs_header_height, cs_header_top;

  ROUTE.staticVariables = function() {

    $cs_html            = $('html');
    $cs_body            = $('body');
    $cs_masthead        = $('#masthead');
    $cs_main            = $('#main');
    $cs_window          = $(window);
    $cs_document        = $(document);

    cs_is_device        = ( navigator.userAgent.toLowerCase().match(/(android|webos|blackberry|ipod|iphone|ipad|opera mini|iemobile|windows phone|windows mobile)/) ) ? true : false;
    cs_is_sticky        = ( parseInt( cs_ajax.sticky ) ) ? true : false;
    cs_is_transparent   = ( $cs_body.hasClass('cs-header-transparent') ) ? true : false;
    cs_is_blank         = ( $cs_body.hasClass('cs-blank') ) ? true : false;
    cs_has_admin_bar    = ( $cs_body.hasClass('admin-bar') ) ? true : false;
    cs_no_mobile_anim   = ( $cs_body.hasClass('cs-no-mobile-animations') ) ? true : false;
    cs_sticky_height    = ( parseInt( cs_ajax.header ) ) ? parseInt( cs_ajax.header ) : 50;
    cs_admin_bar_height = ( cs_has_admin_bar ) ? 32 : 0;
    cs_header_height    = ( $cs_masthead ) ? $cs_masthead.outerHeight() : 0;
    cs_header_top       = ( $cs_masthead && $cs_masthead.offset() ) ? $cs_masthead.offset().top : 0;

  };

  ROUTE.dynamicVariables = function() {
    cs_is_small = ( window.innerWidth < parseInt( cs_ajax.viewport ) ) ? true : false;
  };

  ROUTE.stickyHeader = function() {

    if( cs_is_sticky && !cs_is_device && !cs_is_transparent && !cs_is_blank ) {

      var _header_top = ( cs_has_admin_bar ) ? parseInt( cs_header_top-cs_admin_bar_height ) : cs_header_top,
          _header_height,
          _scroll_top;

      $cs_window.scroll(function() {

        if( !cs_is_small ) {

          _header_height  = cs_header_height;
          _scroll_top     = $(this).scrollTop();

          if( _scroll_top > _header_top ) {
            $cs_masthead.trigger('close-modals').addClass('is-sticky');
            $cs_main.css('padding-top', _header_height);
          } else {
            $cs_masthead.removeClass('is-sticky');
            $cs_main.removeAttr('style');
          }

          if( _scroll_top > ( _header_height + _header_top ) ) {
            $cs_masthead.addClass('is-compact');
          } else {
            $cs_masthead.removeClass('is-compact');
          }

        }

      });

    }

  };

  ROUTE.transparentHeader = function() {

    if( cs_is_sticky && cs_is_transparent ) {

      var $logo           = $('#site-logo'),
          $logo1x         = $logo.find('.cs-logo'),
          $logo2x         = $logo.find('.cs-logo2x'),
          $logo1x_src     = $logo1x.attr('src'),
          $logo2x_src     = $logo2x.attr('src'),
          $logo1x_alt     = $logo1x.data('alternative') || $logo1x_src,
          $logo2x_alt     = $logo2x.data('alternative') || $logo2x_src,
          $page_header    = $('#page-header'),
          $container      = $page_header.find('.container'),
          _header_height,
          _scroll_top;

      $cs_masthead.addClass('is-sticky');

      $cs_window.scroll(function() {

        if( !cs_is_small ) {

          _header_height  = parseInt( $page_header.outerHeight() / 2 );
          _scroll_top     = $(this).scrollTop();

          $container.css( 'opacity', 1-(_scroll_top/_header_height) );

          if( _scroll_top > 0 ) {

            $cs_body.removeClass('is-transparent');
            $cs_masthead.addClass('is-sticky is-compact');

            $logo1x.attr( 'src', $logo1x_alt );
            $logo2x.attr( 'src', $logo2x_alt );

          } else {

            $cs_body.addClass('is-transparent');
            $cs_masthead.removeClass('is-compact');

            $logo1x.attr( 'src', $logo1x_src );
            $logo2x.attr( 'src', $logo2x_src );

          }

        } else {

          $logo1x.attr( 'src', $logo1x_src );
          $logo2x.attr( 'src', $logo2x_src );

        }

      });
    }

  };

  ROUTE.fixSticky = function() {

    if( cs_is_sticky && cs_is_small ) {

      $cs_masthead.removeClass( 'is-sticky is-compact' );
      $cs_main.removeAttr('style');

      if( cs_is_transparent ) {
        $cs_body.addClass( 'is-transparent cs-is-small' );
        $cs_window.scroll();
      }

    } else {

      $cs_body.removeClass( 'cs-is-small' );

      if( cs_is_transparent ) {
        $cs_window.scroll();
      }

    }

  };

  ROUTE.mainNavigation = function(){
    $('.main-navigation').superfish({
      delay: 200,
      animation: {
        opacity: 'show',
      },
      speed: 'fast',
      speedOut: 'fast',
      cssArrows: false,
    });
  };

  ROUTE.mobileNavigation = function(){

    $('#cs-mobile-icon').on('click', function( e ){

      e.preventDefault();
      $(this).toggleClass('cs-collapse');
      $('#navigation-mobile').slideToggle(500, 'easeInOutExpo');

    });

    $('#navigation-mobile li:has(ul) > .cs-dropdown-plus').on('click', function( e ){

      e.preventDefault();

      $(this).toggleClass('cs-times');
      $(this).parent().find('> ul').slideToggle(500, 'easeInOutExpo');

    });

    $('#navigation-mobile li:has(ul) > a').on('click', function( e ){

      if ( $(this).attr('href') === '#' ) {

        e.preventDefault();

        var $parent = $(this).parent();

        $parent.find('> .cs-dropdown-plus').toggleClass('cs-times');
        $parent.find('> ul').slideToggle(500, 'easeInOutExpo');

      }

    });

  };

  ROUTE.topModals = function(){

    $('.cs-top-modal-hover').each(function() {

      var $this    = $(this),
          $content = $this.find('.cs-modal-content-hover');

      $this.mouseover(function() {
        $content.stop().fadeIn('fast');
      }).mouseout(function() {
        $content.stop().fadeOut('fast');
      });

    });

    $('.cs-top-modal').each(function() {

      var $this    = $(this),
          $open    = $this.find('.cs-open-modal'),
          $content = $this.find('.cs-modal-content');

      $open.on('click', function( e ) {

        e.preventDefault();
        e.stopPropagation();

        if( $content.hasClass('cs-opened') ) {
          $content.removeClass('cs-opened').fadeOut('fast');
        } else {
          $content.trigger('close-modals').addClass('cs-opened').fadeIn('fast');
          $content.find('input').focus();
        }

      });

      $content.on('click', function ( event ) {

        if (event.stopPropagation) {
          event.stopPropagation();
        } else if ( window.event ) {
          window.event.cancelBubble = true;
        }

      });

    });

    $(document.body).on('click close-modals', function () {
      $('.cs-modal-content').removeClass('cs-opened').fadeOut('fast');
    });

  };

  ROUTE.animationElements = function(){

    if( cs_no_mobile_anim && cs_is_device ) {
      return;
    }

    $('.cs-animation').waypoint( function () {
      var $this     = $(this),
          _delay    = $this.data('delay'),
          _duration = $this.data('duration');

      if( _delay ){
        $this.css( 'animation-delay', _delay + 's' );
      }

      if( _duration ){
        $this.css( 'animation-duration', _duration + 's' );
      }

      $this.addClass('cs-start-animation');

    }, {
      offset: '95%',
      triggerOnce: true
    });

  };

  ROUTE.parallaxSection = function(){

    if( !cs_is_device ) {
      $('section.parallax').each( function() {
        var $this = $(this),
            speedFactor = $this.data('parallax-speed') || 0.4;
        $this.parallax( '50%', speedFactor );
      });
    }

  };

  ROUTE.heightSection = function(){
    $('.cs-full-height').each(function(){

      var $this     = $(this),
          winHeight = $cs_window.outerHeight(),
          elHeight  = $this.outerHeight(),
          maxHeight = parseInt( $this.data( 'full-height-rate' ) ) || 100;

      $this.css( 'min-height', ( maxHeight * winHeight ) / 100 );

    });
  };

  ROUTE.videoSection = function(){

    $('.video-section-wrap').each(function(){

      var $this   = $(this),
          $video  = $this.find('video');

      if( !$video.length ) { return; }

      var $wrap   = $this.find('.video-wrap'),
          _outW   = $this.outerWidth(),
          _outH   = $this.outerHeight();

      $wrap.css({ width: _outW, height: _outH });

      $video.mediaelementplayer();

      if ( cs_is_device ) {
        $wrap.remove();
      }

    });

  };

  ROUTE.videoSectionResize = function(){

    $('.video-section-wrap').each(function(){

      var $this   = $(this),
          $video  = $this.find('video, iframe');

      if( !$video.length ) { return; }

      var $wrap   = $this.find('.video-wrap'),
          _orgW   = 1280,
          _orgH   = 720,
          _outW   = $this.outerWidth(),
          _outH   = $this.outerHeight(),
          _radio  = _orgW / _orgH;

      if( _orgH < _outH ) {
        _orgH     = _outH;
        _orgW     = Math.ceil( _orgH * _radio );
      }

      if( _orgW < _outW ) {
        _orgW     = _outW;
        _orgH     = Math.ceil( _orgW / _radio );
      }

      var _left   = ( _outW <  _orgW ) ? Math.ceil( ( _outW - _orgW ) / 2 ) : 0,
          _top    = Math.ceil( ( _outH - _orgH ) / 2 );

      $wrap.css({ width: _outW, height: _outH });
      $video.css({ width: _orgW, height: _orgH, marginLeft: _left, marginTop: _top }).addClass('cs-video-loaded');

    });

  };

  ROUTE.videoOnLoad = function(){

    $('.video-onload').each(function(){

      var $this    = $(this),
          $data    = $this.data(),
          $poster  = ( $data.poster ) ? ' poster="'+ $data.poster +'"' : '',
          videoStr = '';

      videoStr = '<video width="1920" height="1080" autoplay muted loop'+ $poster +'>';

      if( $data.mp4 ) {  videoStr += '<source type="video/mp4" src="'+ $data.mp4 +'"></source>';   }
      if( $data.ogv ) {  videoStr += '<source type="video/ogv" src="'+ $data.ogv +'"></source>';   }
      if( $data.webm ){  videoStr += '<source type="video/webm" src="'+ $data.webm +'"></source>'; }

      videoStr += '</video>';

      $(videoStr).insertAfter($this);

      $this.remove();

      ROUTE.videoSection();
      ROUTE.videoSectionResize();

    });

  };

  ROUTE.isotopeInitalize = function() {

    $('.isotope-container').each( function(){
      var $this         = $(this),
          $iso          = $this.find('.isotope-loop'),
          $iso_loader   = $this.find('.isotope-loading'),
          $iso_wrapper  = $this.find('.isotope-wrapper'),
          $iso_filter   = $this.find('.isotope-filter a'),
          $iso_item     = $this.find('.isotope-item');

      $iso_loader.show();
      $iso.imagesLoaded( function() {

        setTimeout( function() {

          $iso_loader.hide();
          $iso_wrapper.addClass('isotope-loaded');
          $iso_item.waypoint( function () {
            $(this).addClass( 'in' );
          },{
            offset: "95%",
            triggerOnce: false
          });

        }, 300 );

        ROUTE.portfolioWidthHeightFix( $iso_item );

        $iso.isotope({
          animationEngine: 'best-available',
          layoutMode: $iso.data('layout') || 'masonry',
        });

        $cs_window.on('debouncedresize', function() {

          setTimeout( function(){
            ROUTE.portfolioWidthHeightFix( $iso_item );
            $iso.isotope('reLayout');
            $cs_window.resize();
          }, 300 );

        });

      });

      $iso_filter.on('click', function( e ){
        e.preventDefault();

        $(this).addClass('active').siblings().removeClass('active');
        $iso_item.addClass( 'in' );

        var selector = $(this).attr('data-filter');
        $iso.isotope({ filter: selector });
      });

      $('blockquote.twitter-tweet', $iso).bind("csEventResize", function(){
        $iso.isotope('reLayout');
      });

    });

  };

  ROUTE.ajaxPagination = function() {

    $('.ajax-load-more').each(function() {

      var $this       = $(this),
          $container  = $this.parent().parent().find('.isotope-loop'),
          token       = $this.data('token'),
          settings    = window['cs_load_more_'+token],
          is_isotope  = parseInt( settings.isotope ),
          paging      = 1,
          flood       = false,
          ajax_data;

      $this.bind('click', function() {

        if( flood === false ) {
          paging++;
          flood = true;

          // set ajax data
          ajax_data = $.extend({}, { action: "ajax-pagination", paged: paging }, settings );

          $.ajax({
            type: "POST",
            url: cs_ajax.ajaxurl,
            data: ajax_data,
            dataType: "html",
            beforeSend: function() {
              $this.addClass('more-loading');
            },
            success: function( html ) {

              var content = $( html ).css('opacity', 0);

              if( is_isotope ) {
                $container.append( content );
              } else {
                $(content).insertBefore( $this.parent() );
              }

              $container.imagesLoaded( function() {

                if ( $.jqexists( 'mediaelementplayer' ) ) {
                  $('video, audio').mediaelementplayer();
                }

                if ( is_isotope ) {

                  $container.isotope('appended', content);
                  $container.isotope('reLayout');

                  $('blockquote.twitter-tweet').bind("csEventResize", function(){
                    $container.isotope('reLayout');
                  });

                  ROUTE.portfolioWidthHeightFix( $container );

                } else {

                  content.animate({'opacity': 1}, 250, 'easeInOutExpo');
                  ROUTE.portfolioWidthHeightFix( $container );

                }

                // load button affecting after images loaded
                $this.removeClass('more-loading');
                if( parseInt( settings.max_pages ) == paging ){ $this.hide(); }

              });

              flood = false;

            }
          });

        }

        return false;
      });

    });

  };

  ROUTE.ajaxPortfolio = function(){

    $('.portfolio-model-ajax').each( function() {
      var $this       = $(this),
          $loader     = $this.find('.cs-loader'),
          $container  = $this.find('.ajax-portfolio-container'),
          $content    = $this.find('.ajax-content'),
          _current    = 0;

      $this.on('click', '.item-ajax-load', function( e ) {
        e.preventDefault();

        var $project      = $(this),
            _project_id   = $project.data('post-id'),
            _scrollTop    = parseInt( $this.offset().top ) - 130;

        // protected for same project load
        if( _current == _project_id ) { return; }

        // check if project-opened
        if( $container.hasClass( 'project-opened' ) ) {
          $container.removeClass('project-opened');
        }

        $.ajax({
          type: "POST",
          url: cs_ajax.ajaxurl,
          data: {
            action: 'ajax-portfolio',
            id: _project_id
          },
          dataType: "html",
          beforeSend: function() {
            $loader.show();
            $('body,html').animate( { scrollTop: _scrollTop }, 500, 'easeInOutExpo' );
          },
          success: function( html ) {

            var _obj = $content.html( html );
            _obj.imagesLoaded( function() {
              $loader.hide();
              $container.addClass( 'project-opened' );
              _current = _project_id;
            });

            if ( $.jqexists( 'mediaelementplayer' ) ) {
              $('video, audio').mediaelementplayer();
            }

            $content.trigger('ajax-portfolio-loaded');

          }
        });

      });

      $this.on('click', '.ajax-close', function( e ) {
        e.preventDefault();
        $container.removeAttr( 'data-post-id' ).removeClass('project-opened');
        setTimeout( function(){ $content.html(''); }, 1000);
        _current = 0;
      });

    });

  };

  ROUTE.portfolioWidthHeightFix = function( container ) {

    $('.portfolio-item-info', container).each( function() {
      var $this     = $(this),
          $elem     = $this.find('.portfolio-item-hover'),
          el_width  = $this.outerWidth( true ),
          el_height = $this.outerHeight( true );
      $elem.css({"height": el_height, "width": el_width});
    });

  };

  ROUTE.postLove = function(){

    $cs_body.on('click', '.entry-love-it', function( e ) {
      e.preventDefault();

      var $this     = $(this),
          $count    = $this.find('.love-count'),
          _post_id  = $this.data('post-id');

      if( $this.hasClass('entry-loved') ) {
        alert( cs_ajax.loved );
        return false;
      } else {
        $count.text( parseInt( $count.text() ) + 1 );
        $this.addClass( 'entry-loved' );
      }

      $.ajax({
        type: 'POST',
        url: cs_ajax.ajaxurl,
        data: ( { action: 'post-love', id: _post_id, love_it_nonce: cs_ajax.nonce } ),
      });

    });

  };

  ROUTE.onePage = function() {

    var _offset  = ( !cs_is_small && cs_has_admin_bar ) ? cs_admin_bar_height : 0;

    $('.cs-start').each( function() {
      $(this).on('click', function( e ) {
        e.preventDefault();
        var _target = $(this).data('target') || 'page';
        $.scrollTo( '#'+_target , 1000, { offset:-_offset, easing:'easeInOutExpo' });
      });
    });

    $('.cs-scrollto').each( function() {
      $(this).on('click', function( e ) {
        e.preventDefault();
        $.scrollTo( $(this).attr('href') , 1000, { offset:-_offset, easing:'easeInOutExpo' });
      });
    });

    if( $cs_body.hasClass('page-template-page-one-page') ) {

      var _header_height    = parseInt( cs_header_height + cs_header_top ),
          $navigation       = $('#site-nav, #navigation-mobile, #cs-fixed-nav'),
          $fixed_nav        = $('#cs-fixed-nav'),
          _waypoint_offset  = _header_height,
          page_ids          = $.makeArray(),
          header_before     = $.exists( '#header-before' ),
          count             = 0;

      $fixed_nav.css('margin-top', - Math.floor( $fixed_nav.outerHeight( true ) / 2 ) );

      $('#site-logo a').on('click', function( e ) {
        e.preventDefault();
        $.scrollTo( 0, 1000, { easing:'easeInOutExpo', onAfter:function(){
          window.location.hash = '';
        }});
      });

      $navigation.localScroll({
        target: 'body',
        queue: true,
        duration: 1000,
        hash: true,
        easing: 'easeInOutExpo',
        onBefore:function( e, anchor, $target ) {

          if( cs_is_small ) {
            this.offset = 0;
          } else if( $(anchor).offset().top > _header_height || header_before ) {
            this.offset = -( cs_sticky_height + cs_admin_bar_height );
          } else {
            this.offset = -_header_height;
          }

          _waypoint_offset = -this.offset;

        },
      });

      $('.cs-section').each( function() {

        $(this).waypoint( function ( direction ) {

          var $this         = $(this),
              $id           = $this.attr('id');

          if( direction == 'down' ) {
            count++;
            page_ids[count] = $id;
          } else {
            count--;
          }

          $navigation.find('li').removeClass('current-menu-item');
          $navigation.find('a[href="#'+ page_ids[count] +'"]').parent().addClass('current-menu-item');

        }, {
          offset: ( _waypoint_offset + 100 )
        });

      });

    }

  };

  ROUTE.smoothLink = function() {

    $('.cs-smooth-link').each( function() {
      $(this).on('click', function( e ) {

        e.preventDefault();

        var $this   = $(this),
            $target = $($this.attr('href'));

        if( $target ) {
          var sticky_height = ( cs_is_sticky ) ? cs_sticky_height : 0;
          var top = sticky_height + cs_admin_bar_height;
          $.scrollTo( $target, 1000, { offset: -top, easing: 'easeInOutExpo' });
        }

      });
    });

  };

  ROUTE.smoothScrollLink = function() {

    $('.cs-scroll-link').each( function() {
      $(this).on('click', function( e ) {

        e.preventDefault();

        var $this    = $(this),
            $classes = $this.attr('class').split(' '),
            $target  = $('.'+$classes[$classes.length-1].replace('cs-scroll-target-', ''));

        if( $target ) {
          var sticky_height = ( cs_is_sticky ) ? cs_sticky_height : 0;
          var top = sticky_height + cs_admin_bar_height;
          $.scrollTo( $target, 1000, { offset: -top, easing: 'easeInOutExpo' });
        }

      });
    });

  };

  ROUTE.goTop = function() {

    $('#cs-top').each( function() {

      var $this = $(this),
          innerHeight = parseInt( $cs_window.innerHeight() / 2 );

      $this.on('click', function( e ) {
        e.preventDefault();
        $.scrollTo( 0 , 1000, { easing:'easeInOutExpo' });
      });

      // window scroll
      $cs_window.scroll( function() {
        if( $cs_window.scrollTop() > innerHeight ) {
          $this.addClass('in');
        } else {
          $this.removeClass('in');
        }
      });

    });

    $('.cs-scroll').each( function() {
      $(this).on('click', function( e ) {
        e.preventDefault();
        var target = $(this).data('target') || 'page';
        $.scrollTo( '#'+target , 1000, { easing:'easeInOutExpo' });
      });
    });

  };

  ROUTE.fancybox = function() {

    $('.gallery-fancybox a, .fancybox-thumb').fancybox({
      beforeLoad: function() {
        if( !this.title.length ) {
          this.title = this.element.find('img').attr('alt');
        }
      },
      arrows: true,
      padding: 7,
      helpers: {
        media: {},
        buttons: {},
        thumbs:{
          width: 60,
          height: 50,
          source: function( item ) {

            var href, thumb;

            thumb = $(item.element).data('thumbnail');

            if ( item.element ) {
              href = $(item.element).find('img').attr('src');
            }

            if ( !href && item.type === 'image' && item.href ) {
              href = item.href;
            }

            if( thumb ) {
              href = thumb;
            }

            return href;

          }
        }
      }
    });

    $('.fancybox').fancybox({
      beforeLoad: function() {
        if( !this.title.length ) {
          this.title = this.element.find('img').attr('alt');
        }
      },
      padding: 7,
      helpers: {
        media: {}
      }
    });

  };

  ROUTE.csTab = function() {
    $(document).on('click.bs.tab.data-api', '.bs-tab-nav a', function (e) {
      e.preventDefault();
      $(this).tab('show');
      $(document).trigger('gmap-resize');
      $(document).trigger('debouncedresize');
    });
  };

  ROUTE.csAccordion = function() {

    $('.cs-accordions').each(function() {

      var $this = $(this),
          $wrap = $this.find('.cs-accordion');

      $wrap.each( function() {

        var $accordion  = $(this),
            $content    = $accordion.find('.cs-accordion-content');

        $accordion.on('click', '.cs-accordion-title:not(.selected)', function( e ) {
          e.preventDefault();

          $wrap.find('.cs-accordion-title').removeClass('selected');
          $(this).addClass('selected');

          $this.find('.cs-accordion-content:visible').slideUp(250, 'easeInOutExpo');
          $content.slideDown(250, 'easeInOutExpo');
          $(document).trigger('gmap-resize');

        });

      });

    });

  };

  ROUTE.csToggle = function() {

    $('.cs-toggle').each(function() {

      var $this     = $(this),
          $content  = $this.find('.cs-toggle-content');

      $this.on('click', '.cs-toggle-title', function( e ) {
        e.preventDefault();
        $content.slideToggle(250, 'easeInOutExpo');
        $(this).toggleClass('selected');
        $(document).trigger('gmap-resize');
      });

    });

  };

  ROUTE.csAlert = function() {

    $('.cs-alert-dismissable').each(function() {
      var $this = $(this);
      $this.on('click', '.cs-alert-close', function( e ) {
        e.preventDefault();
        $this.slideUp(250, 'easeInOutExpo');
      });
    });

  };

  ROUTE.csProgressBar = function() {

    $('.cs-progress').each(function() {

      var $this       = $(this),
          $bar        = $this.find('.cs-progress-bar'),
          $number     = $this.find('.cs-progress-number span'),
          _type       = $bar.data('type'),
          _group      = $bar.data('group'),
          _percentage = parseInt( $bar.data('percentage') ),
          _data;

      if( _type == 'horizontal' ) {
        _data   = { width: _percentage + '%', countNum: _percentage };
      } else {
        _data   = { height: _percentage + '%', countNum: _percentage };
      }

      if ( _group && _type == 'vertical' ) {

      } else if( _group ) {
        _data   = { width: '100%', countNum: _percentage };
      }

      $this.waypoint( function () {

        $bar.animate(_data, {
          duration: 1500,
          easing:'easeInOutExpo',
          step: function() {
            if( this.countNum === undefined ) {
              this.countNum = 0;
            }
            $number.text( Math.round( this.countNum ) );
          },
          complete: function() {
            $number.text( this.countNum );
          }
        });

      }, {
        offset: '100%',
        triggerOnce: false
      });

    });

  };

  ROUTE.csPieChart = function() {

    $('.cs-piechart').each( function() {

      var $this     = $(this),
          $counter  = $this.find('.cs-piecount');

      $this.waypoint( function () {

        $this.easyPieChart({
          barColor: '#555',
          trackColor: '#f1f1f1',
          scaleColor: '#fff',
          scaleLength: 0,
          lineCap: 'round',
          lineWidth: 2,
          size: 120,
          rotate: 0,
          animate: {
            duration: 1300,
            enabled: true
          },
          onStart: function(from, to) {
            $counter.countUp({
              useEasing: false
            });
          },
        });

      }, {
        offset: '100%',
        triggerOnce: false
      });

    });

  };

  ROUTE.csProgressIcon = function() {

    $('.cs-progress-icon').each( function() {

      var $this     = $(this),
          $icon     = $this.find('.count'),
          _count    = parseInt( $this.data('count') ),
          _duration = parseInt( $this.data('duration') ) || 50,
          _color    = $this.data('active-color') || false;

      $this.waypoint( function () {

        $icon.each( function( i ) {

          if( i < _count ) {
            setTimeout( function() {

              if( _color ) {
                $($icon[i]).css({'color': _color});
              } else {
                $($icon[i]).addClass('active');
              }

            }, (i + 1) * _duration);
          }

        });

      }, {
        offset: '100%',
        triggerOnce: false
      });

    });

  };

  ROUTE.csCount = function() {

    $('.cs-count').waypoint( function () {
      $(this).countUp();
    }, {
      offset: '100%',
      triggerOnce: true
    });

  };

  ROUTE.csTestimonial = function() {

    if( $.jqexists('royalSlider') ) {

      $('.testimonialSlider').royalSlider({
        autoHeight: true,
        arrowsNav: false,
        fadeinLoadedSlide: true,
        controlNavigation: 'bullets',
        imageScaleMode: 'none',
        imageAlignCenter: false,
        loop: true,
        loopRewind: true,
        usePreloader: false,
        transitionSpeed: 1000,
        easeInOut: 'easeInOutExpo',
        easeOut: 'easeInOutExpo',
        autoPlay: {
          enabled: true,
          pauseOnHover: true,
          delay: 5000, // 5sec
        }
      });

    }

  };


  ROUTE.csFaq = function() {

    $('.cs-faq').each(function() {

      var $faq          = $(this),
          $faq_filter   = $faq.find('.cs-faq-filter a'),
          $faq_iso      = $faq.find('.cs-faq-isotope');

      $faq_iso.isotope({
        containerClass: '',
        hiddenClass: 'cs-faq-hidden',
        animationEngine: 'best-available',
        itemClass: 'cs-faq-item',
        transformsEnabled: false,
        resizesContainer: false,
        hiddenStyle: {},
        visibleStyle: {},
        containerStyle: {},
      });

      $faq_filter.on('click', function( e ) {

        e.preventDefault();

        var $filter = $(this);

        $filter.addClass('active').siblings().removeClass('active');
        $faq_iso.isotope({ filter: $filter.attr('data-filter') });

      });

    });

  };

  ROUTE.csGmap = function() {

    $('.cs-gmap').each( function() {
      var $this = $(this),
          token = $this.data('token'),
          gmap  = window[token];

      var marker;
      var map;
      var infowindow;
      var iterator = 0;
      var mapLocation = new google.maps.LatLng( parseFloat( gmap.lat ), parseFloat( gmap.lng ) );
      var mapOptions = {
        center: mapLocation,
        zoom: parseInt( gmap.zoom ),
        zoomControl: parseInt( gmap.zoom_control ),
        mapTypeId: gmap.mapTypeId || 'roadmap',
        scrollwheel: gmap.scrollwheel || true,
        panControl: true,
        mapTypeControl: true,
        streetViewControl: true,
      };

      map = new google.maps.Map(document.getElementById( token ), mapOptions);

      if( gmap.markers !== undefined && gmap.markers.length ) {

        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
          for (var i = 0; i < gmap.markers.length; i++) {
            setTimeout(addMarker, i * 500);
          }
        });
      } else if( gmap.markers === undefined && gmap.icon ) {

        new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng( parseFloat( gmap.lat ), parseFloat( gmap.lng ) ),
          animation: google.maps.Animation.DROP,
          icon: gmap.icon,
        });

      }

      function addMarker() {

        marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng( parseFloat( gmap.markers[iterator].lat ), parseFloat( gmap.markers[iterator].lng ) ),
          animation: google.maps.Animation.DROP,
          icon: gmap.icon,
        });

        infowindow = new google.maps.InfoWindow({
          maxWidth: 300
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            map.setCenter(marker.getPosition());
            infowindow.setContent( gmap.markers[i].content );
            infowindow.open(map, marker);
          };
        })(marker, iterator));

        iterator++;

      }

      google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      });

      $(document).bind('gmap-resize', function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      });

    });

  };

  ROUTE.bsModal = function() {

    $('.bs-modal').each( function() {

      var $modal = $(this);
      $( $modal.data('selector') ).on( 'click', function( e ) {
        e.preventDefault();
        $modal.modal();
      });

    });

    function adjustModalMaxHeightAndPosition() {
      $('.modal-center').each(function() {

        var $this = $(this);

        if( $this.hasClass('in') === false ) {
          $this.show();
        }

        var contentHeight = $cs_window.height() - 60;
        var headerHeight  = $this.find('.modal-header').outerHeight() || 2;
        var footerHeight  = $this.find('.modal-footer').outerHeight() || 2;

        $this.find('.modal-content').css({
          'max-height': function () {
            return contentHeight;
          }
        });

        $this.find('.modal-body').css({
          'max-height': function () {
            return contentHeight - ( headerHeight + footerHeight );
          }
        });

        $this.find('.modal-dialog').addClass('modal-dialog-center').css({
          'margin-top': function () {
            return -($(this).outerHeight() / 2);
          },
          'margin-left': function () {
            return -($(this).outerWidth() / 2);
          }
        });

        if( $this.hasClass('in') === false ) {
          $this.hide();
        }

      });
    }

    if ($cs_window.height() >= 320){
      $cs_window.resize(adjustModalMaxHeightAndPosition).trigger("resize");
    }
  };

  ROUTE.bsToolTip = function(){

    $('[data-toggle=tooltip]').tooltip();

    $('.cs-tooltip-trigger').each( function(){

      var $this = $(this);

      $( $this.data('selector') ).tooltip({
        title: $this.html(),
        placement: $this.data('placement'),
        trigger: $this.data('trigger'),
        html: true,
        container: 'body',
      });

    });

  };

  ROUTE.bsPopover = function(){

    $('[data-toggle=popover]').popover();

    $('.cs-popover-trigger').each( function(){

      var $this = $(this);

      $( $this.data('selector') ).popover({
        placement: $this.data('placement'),
        trigger: $this.data('trigger'),
        title: $this.data('title'),
        content: $this.html(),
        html: true,
        container: 'body',
      });

    });

  };

  ROUTE.smoothScroll = function(){

    if( parseInt( cs_ajax.no_smoothscroll ) ) {
      SmoothScroll.destroy();
    }

  };

  ROUTE.youtubePlayer = function(){

    var $videos = $('.cs-youtube-video');

    var defaults = {
        autoplay: 1,
        loop: 1,
        muted: 1,
        playerVars: {
          controls: 0,
          showinfo: 0,
          branding: 0,
          rel: 0,
          autohide: 1,
          modestbranding: 1,
          iv_load_policy: 3
        },
        events: null
      };

    var YTQueue = [];

    var loadYouTubeIframeAPI = false;

    if( $videos.length > 0 && !loadYouTubeIframeAPI ) {

      $.getScript('//www.youtube.com/iframe_api', function( data, textStatus, jqxhr ) {
        if( textStatus === 'success' ) {
          window.onYouTubeIframeAPIReady = function(){
            for(var key in YTQueue){
              if(YTQueue.hasOwnProperty(key)){
                var fnc = YTQueue[key];
                if (typeof fnc == "function"){
                  fnc();
                }
              }
            }
          };
        }
      });

      loadYouTubeIframeAPI = true;

    }

    $videos.each( function() {

      var base = this;

      base.$this = $(this);

      defaults.events = {
        onReady: function( event ) {

          if ( base.options.autoplay ) {
            event.target.playVideo();
          }

          if ( base.options.muted ) {
            event.target.mute();
          }

        },
        onStateChange: function( event ) {

          if( event.data === YT.PlayerState.ENDED && base.options.loop ) {
            base.player.seekTo(base.options.start);
          }

        }
      };

      base.options = $.extend({}, defaults, base.$this.data());

      base.checkEndTime = function() {

        var stateInterval = setInterval( function() {
          if( base.player.getCurrentTime() >= base.options.end ) {
            if ( base.options.start && base.options.loop ) {
              base.player.seekTo(base.options.start);
            } else {
              base.player.stopVideo();
              clearInterval( stateInterval );
            }
          }
        }, 100);

      };

      base.YTPlayer = function() {
        base.player = new YT.Player( base, base.options );
      };

      // initize
      if ( typeof YT === 'undefined' || ( YT.hasOwnProperty('loaded') && !YT.loaded ) ) {
        YTQueue.push( function() {
          base.YTPlayer();
        });
      } else {
        base.YTPlayer();
      }

    });

  };

  $(document).ready( function(){

    ROUTE.staticVariables();
    ROUTE.dynamicVariables();
    ROUTE.stickyHeader();
    ROUTE.transparentHeader();
    ROUTE.mainNavigation();
    ROUTE.mobileNavigation();
    ROUTE.topModals();
    ROUTE.animationElements();
    ROUTE.parallaxSection();
    ROUTE.videoSection();
    ROUTE.heightSection();
    ROUTE.videoSectionResize();
    ROUTE.isotopeInitalize();
    ROUTE.ajaxPagination();
    ROUTE.ajaxPortfolio();
    ROUTE.postLove();
    ROUTE.smoothLink();
    ROUTE.smoothScrollLink();
    ROUTE.goTop();
    ROUTE.fancybox();
    ROUTE.csTab();
    ROUTE.csAccordion();
    ROUTE.csToggle();
    ROUTE.csAlert();
    ROUTE.csProgressBar();
    ROUTE.csPieChart();
    ROUTE.csProgressIcon();
    ROUTE.csCount();
    ROUTE.csTestimonial();
    ROUTE.csFaq();
    ROUTE.bsModal();
    ROUTE.bsToolTip();
    ROUTE.bsPopover();
    ROUTE.smoothScroll();
    ROUTE.onePage();
    ROUTE.youtubePlayer();

  });

  $(window).resize( function(){

    ROUTE.staticVariables();
    ROUTE.dynamicVariables();
    ROUTE.fixSticky();
    ROUTE.heightSection();
    ROUTE.videoSectionResize();

  });

  $(window).scroll( function(){
    // do stuff
  });

  $(window).load( function(){
    ROUTE.csGmap();
    ROUTE.videoOnLoad();
  });

})( jQuery, window, document );