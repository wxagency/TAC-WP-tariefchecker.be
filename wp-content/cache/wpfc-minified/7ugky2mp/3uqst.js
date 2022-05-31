jQuery(function($){
$(".checkbox").click(function(){
$(this).toggleClass("checked");
});
$('.cbinput').change(function(){
var id=$(this).attr('id').split("gas_").pop().split("electricity_").pop();
var gas='#gas_'+id;
var ele='#electricity_'+id;
if($(gas).is(':checked')&&$(ele).is(':checked')){
$('#comparison_type').val('p');
}else if($(gas).is(':checked')){
$('#comparison_type').val('g');
}else if($(ele).is(':checked')){
$('#comparison_type').val('e');
}});
function setContainerHeigt(){
var i=1;
$('.plancontainer').each(function (){
var maxHeight=-1;
var elementHeights=$('.plancontainer').map(function(){
return $(this).height();
}).get();
var maxHeight=Math.max.apply(null, elementHeights);
console.log(elementHeights);
console.log(maxHeight);
$('.plancontainer').height(maxHeight);
i++;
});
};
var w=window.innerWidth;
if(w>550){
$(document).ready(setContainerHeigt());
/*$(window).resize(function(){
setContainerHeigt();
});*/
}});