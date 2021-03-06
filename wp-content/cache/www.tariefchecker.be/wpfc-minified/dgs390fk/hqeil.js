(function (){
"use strict";
jQuery(function (){
jQuery('.' + wpml_xdomain_data.css_selector + ' a').on('click', function (event){
var originalUrl;
var currentUrl=window.location.href;
var targetUrl=jQuery(this).attr('href');
if('#'!==targetUrl&&currentUrl!==targetUrl){
event.preventDefault();
originalUrl=jQuery(this).attr('href');
originalUrl=originalUrl.replace(/&xdomain_data(=[^&]*)?(?=&|$)|xdomain_data(=[^&]*)?(&|$)/, '');
originalUrl=originalUrl.replace(/\?$/, '');
jQuery.ajax({
url:      wpml_xdomain_data.ajax_url,
type:     'post',
dataType: 'json',
data:     {
action:        'switching_language',
from_language: wpml_xdomain_data.current_language
},
success:  function (response){
var argsGlue;
var url;
var hash;
var urlSplit;
var xdomain;
var form;
if(response.data.xdomain_data){
if(response.success){
if('post'===response.data.method){
form=jQuery('<form method="post" action="' + originalUrl + '" >');
xdomain=jQuery('<input type="hidden" name="xdomain_data" value="' + response.data.xdomain_data + '">');
form.append(xdomain);
jQuery('body').append(form);
form.submit();
}else{
urlSplit=originalUrl.split('#');
hash='';
if(1 < urlSplit.length){
hash='#' + urlSplit[1];
}
url=urlSplit[0];
if(url.indexOf('?')===-1){argsGlue='?';}else{argsGlue='&';}
url=originalUrl + argsGlue + 'xdomain_data=' + response.data.xdomain_data + hash;
location.href=url;
}}else{
url=originalUrl;
location.href=url;
}}else{
location.href=originalUrl;
}},
error:    function (){
location.href=originalUrl;
}});
}});
});
}());