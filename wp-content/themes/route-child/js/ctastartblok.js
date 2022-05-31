jQuery(function($) {

    $(".checkbox").click(function(){
      //event.preventDefault();
		  $(this).toggleClass("checked");
  });

  $('.cbinput').change(function() {
    var id = $(this).attr('id').split("gas_").pop().split("electricity_").pop();

    var gas = '#gas_'+id;
    var ele = '#electricity_'+id;

    //alert( $(gas).is(':checked') );

    if ( $(gas).is(':checked') && $(ele).is(':checked') ) {
      $('#comparison_type').val('p');
    }else if( $(gas).is(':checked') ){
      $('#comparison_type').val('g');
    }else if( $(ele).is(':checked') ){
      $('#comparison_type').val('e');
    }
  });

  // SET EQUAL HEIGTS
  function setContainerHeigt() {
      var i=1;
      $('.plancontainer').each(function () {
          var maxHeight = -1;
          // Get an array of all element heights
          var elementHeights = $('.plancontainer').map(function() {
            return $(this).height();
          }).get();

          // Math.max takes a variable number of arguments
          // `apply` is equivalent to passing each height as an argument
          var maxHeight = Math.max.apply(null, elementHeights);
          console.log(elementHeights);
          console.log(maxHeight);
          // Set each height to the max height
          $('.plancontainer').height(maxHeight);

          i++;
      });
  };

  var w = window.innerWidth;
  if(w>550){
    $(document).ready(setContainerHeigt());
    /*$( window ).resize(function() {
      setContainerHeigt();
    });*/
  }
});
