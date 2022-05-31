(function (){
var requirejs, require, define;
(function (undef){
var main, req, makeMap, handlers,
defined={},
waiting={},
config={},
defining={},
hasOwn=Object.prototype.hasOwnProperty,
aps=[].slice,
jsSuffixRegExp=/\.js$/;
function hasProp(obj, prop){
return hasOwn.call(obj, prop);
}
function normalize(name, baseName){
var nameParts, nameSegment, mapValue, foundMap, lastIndex,
foundI, foundStarMap, starI, i, j, part,
baseParts=baseName&&baseName.split("/"),
map=config.map,
starMap=(map&&map['*'])||{};
if(name&&name.charAt(0)==="."){
if(baseName){
name=name.split('/');
lastIndex=name.length - 1;
if(config.nodeIdCompat&&jsSuffixRegExp.test(name[lastIndex])){
name[lastIndex]=name[lastIndex].replace(jsSuffixRegExp, '');
}
name=baseParts.slice(0, baseParts.length - 1).concat(name);
for (i=0; i < name.length; i +=1){
part=name[i];
if(part==="."){
name.splice(i, 1);
i -=1;
}else if(part===".."){
if(i===1&&(name[2]==='..'||name[0]==='..')){
break;
}else if(i > 0){
name.splice(i - 1, 2);
i -=2;
}}
}
name=name.join("/");
}else if(name.indexOf('./')===0){
name=name.substring(2);
}}
if((baseParts||starMap)&&map){
nameParts=name.split('/');
for (i=nameParts.length; i > 0; i -=1){
nameSegment=nameParts.slice(0, i).join("/");
if(baseParts){
for (j=baseParts.length; j > 0; j -=1){
mapValue=map[baseParts.slice(0, j).join('/')];
if(mapValue){
mapValue=mapValue[nameSegment];
if(mapValue){
foundMap=mapValue;
foundI=i;
break;
}}
}}
if(foundMap){
break;
}
if(!foundStarMap&&starMap&&starMap[nameSegment]){
foundStarMap=starMap[nameSegment];
starI=i;
}}
if(!foundMap&&foundStarMap){
foundMap=foundStarMap;
foundI=starI;
}
if(foundMap){
nameParts.splice(0, foundI, foundMap);
name=nameParts.join('/');
}}
return name;
}
function makeRequire(relName, forceSync){
return function (){
var args=aps.call(arguments, 0);
if(typeof args[0]!=='string'&&args.length===1){
args.push(null);
}
return req.apply(undef, args.concat([relName, forceSync]));
};}
function makeNormalize(relName){
return function (name){
return normalize(name, relName);
};}
function makeLoad(depName){
return function (value){
defined[depName]=value;
};}
function callDep(name){
if(hasProp(waiting, name)){
var args=waiting[name];
delete waiting[name];
defining[name]=true;
main.apply(undef, args);
}
if(!hasProp(defined, name)&&!hasProp(defining, name)){
throw new Error('No ' + name);
}
return defined[name];
}
function splitPrefix(name){
var prefix,
index=name ? name.indexOf('!'):-1;
if(index > -1){
prefix=name.substring(0, index);
name=name.substring(index + 1, name.length);
}
return [prefix, name];
}
makeMap=function (name, relName){
var plugin,
parts=splitPrefix(name),
prefix=parts[0];
name=parts[1];
if(prefix){
prefix=normalize(prefix, relName);
plugin=callDep(prefix);
}
if(prefix){
if(plugin&&plugin.normalize){
name=plugin.normalize(name, makeNormalize(relName));
}else{
name=normalize(name, relName);
}}else{
name=normalize(name, relName);
parts=splitPrefix(name);
prefix=parts[0];
name=parts[1];
if(prefix){
plugin=callDep(prefix);
}}
return {
f: prefix ? prefix + '!' + name:name,
n: name,
pr: prefix,
p: plugin
};};
function makeConfig(name){
return function (){
return (config&&config.config&&config.config[name])||{};};
}
handlers={
require: function (name){
return makeRequire(name);
},
exports: function (name){
var e=defined[name];
if(typeof e!=='undefined'){
return e;
}else{
return (defined[name]={});
}},
module: function (name){
return {
id: name,
uri: '',
exports: defined[name],
config: makeConfig(name)
};}};
main=function (name, deps, callback, relName){
var cjsModule, depName, ret, map, i,
args=[],
callbackType=typeof callback,
usingExports;
relName=relName||name;
if(callbackType==='undefined'||callbackType==='function'){
deps = !deps.length&&callback.length ? ['require', 'exports', 'module']:deps;
for (i=0; i < deps.length; i +=1){
map=makeMap(deps[i], relName);
depName=map.f;
if(depName==="require"){
args[i]=handlers.require(name);
}else if(depName==="exports"){
args[i]=handlers.exports(name);
usingExports=true;
}else if(depName==="module"){
cjsModule=args[i]=handlers.module(name);
}else if(hasProp(defined, depName) ||
hasProp(waiting, depName) ||
hasProp(defining, depName)){
args[i]=callDep(depName);
}else if(map.p){
map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
args[i]=defined[depName];
}else{
throw new Error(name + ' missing ' + depName);
}}
ret=callback ? callback.apply(defined[name], args):undefined;
if(name){
if(cjsModule&&cjsModule.exports!==undef &&
cjsModule.exports!==defined[name]){
defined[name]=cjsModule.exports;
}else if(ret!==undef||!usingExports){
defined[name]=ret;
}}
}else if(name){
defined[name]=callback;
}};
requirejs=require=req=function (deps, callback, relName, forceSync, alt){
if(typeof deps==="string"){
if(handlers[deps]){
return handlers[deps](callback);
}
return callDep(makeMap(deps, callback).f);
}else if(!deps.splice){
config=deps;
if(config.deps){
req(config.deps, config.callback);
}
if(!callback){
return;
}
if(callback.splice){
deps=callback;
callback=relName;
relName=null;
}else{
deps=undef;
}}
callback=callback||function (){};
if(typeof relName==='function'){
relName=forceSync;
forceSync=alt;
}
if(forceSync){
main(undef, deps, callback, relName);
}else{
setTimeout(function (){
main(undef, deps, callback, relName);
}, 4);
}
return req;
};
req.config=function (cfg){
return req(cfg);
};
requirejs._defined=defined;
define=function (name, deps, callback){
if(typeof name!=='string'){
throw new Error('See almond README: incorrect module build, no module name');
}
if(!deps.splice){
callback=deps;
deps=[];
}
if(!hasProp(defined, name)&&!hasProp(waiting, name)){
waiting[name]=[name, deps, callback];
}};
define.amd={
jQuery: true
};}());
define("../lib/almond", function(){});
define('models/fieldErrorModel',[], function(){
var model=Backbone.Model.extend({
});
return model;
});
define('models/fieldErrorCollection',['models/fieldErrorModel'], function(errorModel){
var collection=Backbone.Collection.extend({
model: errorModel
});
return collection;
});
define('models/fieldModel',['models/fieldErrorCollection'], function(fieldErrorCollection){
var model=Backbone.Model.extend({
defaults: {
placeholder: '',
value: '',
label_pos: '',
classes: 'ninja-forms-field',
reRender: false,
mirror_field: false,
confirm_field: false,
clean: true,
disabled: '',
visible: true,
invalid: false
},
initialize: function(){
var type=this.get('type');
this.set('formID', this.collection.options.formModel.get('id'));
this.listenTo(nfRadio.channel('form-' + this.get('formID')), 'reset', this.resetModel);
this.bind('change', this.changeModel, this);
this.bind('change:value', this.changeValue, this);
this.set('errors', new fieldErrorCollection());
if(type==='listimage'){
this.get=this.listimageGet;
this.set=this.listimageSet;
}
nfRadio.channel('fields').trigger('init:model', this);
nfRadio.channel(this.get('type')).trigger('init:model', this);
nfRadio.channel('fields-' + this.get('type')).trigger('init:model', this);
if('undefined'!=typeof this.get('parentType')){
nfRadio.channel(this.get('parentType')).trigger('init:model', this);
}
this.listenTo(nfRadio.channel('form-' + this.get('formID')), 'loaded', this.formLoaded);
this.listenTo(nfRadio.channel('form-' + this.get('formID')), 'before:submit', this.beforeSubmit);
},
listimageGet: function(attr){
if(attr==='options'){
attr='image_options';
}
return Backbone.Model.prototype.get.call(this, attr);
},
listimageSet: function(attributes, options){
if('options'===attributes){
attributes='image_options';
}
return Backbone.Model.prototype.set.call(this, attributes, options);
},
changeModel: function(){
nfRadio.channel('field-' + this.get('id')).trigger('change:model', this);
nfRadio.channel(this.get('type')).trigger('change:model', this);
nfRadio.channel('fields').trigger('change:model', this);
},
changeValue: function(){
nfRadio.channel('field-' + this.get('id')).trigger('change:modelValue', this);
nfRadio.channel(this.get('type')).trigger('change:modelValue', this);
nfRadio.channel('fields').trigger('change:modelValue', this);
},
addWrapperClass: function(cl){
this.set('addWrapperClass', cl);
},
removeWrapperClass: function(cl){
this.set('removeWrapperClass', cl);
},
setInvalid: function(invalid){
this.set('invalid', invalid);
},
formLoaded: function(){
nfRadio.channel('fields').trigger('formLoaded', this);
nfRadio.channel('fields-' + this.get('type')).trigger('formLoaded', this);
},
beforeSubmit: function(formModel){
nfRadio.channel(this.get('type')).trigger('before:submit', this);
nfRadio.channel('fields').trigger('before:submit', this);
}});
return model;
});
define('models/fieldCollection',['models/fieldModel'], function(fieldModel){
var collection=Backbone.Collection.extend({
model: fieldModel,
comparator: 'order',
initialize: function(models, options){
this.options=options;
this.on('reset', function(fieldCollection){
nfRadio.channel('fields').trigger('reset:collection', fieldCollection);
}, this);
},
validateFields: function(){
_.each(this.models, function(fieldModel){
fieldModel.set('clean', false);
nfRadio.channel('submit').trigger('validate:field', fieldModel);
}, this);
},
showFields: function(){
this.invoke('set', { visible: true });
this.invoke(function(){
this.trigger('change:value', this);
});
},
hideFields: function(){
this.invoke('set', { visible: false });
this.invoke(function(){
this.trigger('change:value', this);
});
}});
return collection;
});
define('models/formErrorModel',[], function(){
var model=Backbone.Model.extend({
});
return model;
});
define('models/formErrorCollection',['models/formErrorModel'], function(errorModel){
var collection=Backbone.Collection.extend({
model: errorModel
});
return collection;
});
define('models/formModel',[
'models/fieldCollection',
'models/formErrorCollection'
], function(
FieldCollection,
ErrorCollection
){
var model=Backbone.Model.extend({
defaults: {
beforeForm: '',
afterForm: '',
beforeFields: '',
afterFields: '',
wrapper_class: '',
element_class: '',
hp: '',
fieldErrors: {},
extra: {}},
initialize: function(){
_.each(this.get('settings'), function(value, setting){
this.set(setting, value);
}, this);
this.set('loadedFields', this.get('fields'));
this.set('fields', new FieldCollection(this.get('fields'), { formModel: this }));
this.set('errors', new ErrorCollection());
nfRadio.channel('form').trigger('before:filterData', this);
var formContentData=this.get('formContentData');
if(! formContentData){
formContentData=this.get('fieldContentsData');
}
var formContentLoadFilters=nfRadio.channel('formContent').request('get:loadFilters');
var sortedArray=_.without(formContentLoadFilters, undefined);
var callback=_.first(sortedArray);
formContentData=callback(formContentData, this, this);
this.set('formContentData', formContentData);
nfRadio.channel('forms').trigger('init:model', this);
nfRadio.channel('form-' + this.get('id')).trigger('init:model', this);
nfRadio.channel('form-' + this.get('id')).reply('get:fieldByKey', this.getFieldByKey, this);
nfRadio.channel('form-' + this.get('id')).reply('add:error',    this.addError, this);
nfRadio.channel('form-' + this.get('id')).reply('remove:error', this.removeError, this);
nfRadio.channel('form-' + this.get('id')).reply('get:extra',    this.getExtra,    this);
nfRadio.channel('form-' + this.get('id')).reply('add:extra',    this.addExtra,    this);
nfRadio.channel('form-' + this.get('id')).reply('remove:extra', this.removeExtra, this);
nfRadio.channel('form-' + this.get('id')).reply('get:form', 	 this.getForm, 	   this);
nfRadio.channel('form').trigger('loaded', this);
nfRadio.channel('form').trigger('after:loaded', this);
nfRadio.channel('form-' + this.get('id')).trigger('loaded', 	 this);
},
getFieldByKey: function(key){
return this.get('fields').findWhere({ key: key });
},
addError: function(id, msg){
var errors=this.get('errors');
errors.add({ id: id, msg: msg });
nfRadio.channel('form-' + this.get('id')).trigger('add:error', this, id, msg);
},
removeError: function(id){
var errors=this.get('errors');
var errorModel=errors.get(id);
errors.remove(errorModel);
nfRadio.channel('form-' + this.get('id')).trigger('remove:error', this, id);
},
getExtra: function(key){
var extraData=this.get('extra');
if('undefined'==typeof key) return extraData;
return extraData[ key ];
},
addExtra: function(key, value){
var extraData=this.get('extra');
extraData[ key ]=value;
nfRadio.channel('form-' + this.get('id')).trigger('add:extra', this, key, value);
},
removeExtra: function(key){
var extraData=this.get('extra');
delete extraData[ key ];
nfRadio.channel('form-' + this.get('id')).trigger('remove:extra', this, key);
},
getForm: function(){
return this;
}});
return model;
});
define('models/formCollection',['models/formModel'], function(formModel){
var collection=Backbone.Collection.extend({
model: formModel
});
return collection;
});
define('controllers/formData',['models/formModel', 'models/formCollection', 'models/fieldCollection', 'models/formErrorCollection'], function(FormModel, FormCollection, FieldCollection, ErrorCollection){
var controller=Marionette.Object.extend({
initialize: function(){
var that=this;
this.collection=new FormCollection(nfForms);
nfRadio.channel('forms').trigger('loaded', this.collection);
nfRadio.channel('app').trigger('forms:loaded', this.collection);
nfRadio.channel('app').reply('get:form', this.getForm, this);
nfRadio.channel('app').reply('get:forms', this.getForms, this);
nfRadio.channel('fields').reply('get:field', this.getField, this);
},
getForm: function(id){
return this.collection.get(id);
},
getForms: function(){
return this.collection;
},
getField: function(id){
var model=false;
_.each(this.collection.models, function(form){
if(! model){
model=form.get('fields').get(id);
}});
if(typeof model=="undefined"){
model=nfRadio.channel("field-repeater").request('get:repeaterFieldById', id);
}
return model;
}});
return controller;
});
define('controllers/fieldError',['models/fieldErrorModel'], function(fieldErrorModel){
var controller=Marionette.Object.extend({
initialize: function(){
nfRadio.channel('fields').reply('add:error', this.addError);
nfRadio.channel('fields').reply('remove:error', this.removeError);
nfRadio.channel('fields').reply('get:error', this.getError);
},
addError: function(targetID, id, msg){
var model=nfRadio.channel('fields').request('get:field', targetID);
if('undefined'==typeof model) return;
var errors=model.get('errors');
errors.add({ 'id': id, 'msg':msg });
model.set('errors', errors);
model.trigger('change:errors', model);
model.set('clean', false);
nfRadio.channel('fields').trigger('add:error', model, id, msg);
},
removeError: function(targetID, id){
var model=nfRadio.channel('fields').request('get:field', targetID);
if('undefined'==typeof model) return;
var errors=model.get('errors');
var targetError=errors.get(id);
if('undefined'!=typeof targetError){
errors.remove(targetError);
model.set('errors', errors);
model.trigger('change:errors', model);
nfRadio.channel('fields').trigger('remove:error', model, id);
}},
getError: function(targetID, id){
var model=nfRadio.channel('fields').request('get:field', targetID);
var errors=model.get('errors');
var targetError=errors.get(id);
if('undefined'!=targetError){
return targetError;
}else{
return false;
}}
});
return controller;
});
define('controllers/changeField',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
nfRadio.channel('nfAdmin').reply('change:field', this.changeField);
this.listenTo(nfRadio.channel('fields'), 'blur:field', this.blurField);
},
changeField: function(el, model){
var value=nfRadio.channel(model.get('type')).request('before:updateField', el, model);
value=('undefined'!=typeof value) ? value:nfRadio.channel(model.get('parentType')).request('before:updateField', el, model);
value=('undefined'!=typeof value) ? value:jQuery(el).val();
model.set('isUpdated', false);
model.set('clean', false);
nfRadio.channel('field-' + model.get('id')).trigger('change:field', el, model);
nfRadio.channel(model.get('type')).trigger('change:field', el, model);
nfRadio.channel('fields').trigger('change:field', el, model);
nfRadio.channel('nfAdmin').request('update:field', model, value);
},
blurField: function(el, model){
model.set('clean', false);
}});
return controller;
});
define('controllers/changeEmail',[], function(){
var radioChannel=nfRadio.channel('email');
var emailReg=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var errorID='invalid-email';
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(radioChannel, 'change:modelValue', this.onChangeModelValue);
this.listenTo(radioChannel, 'keyup:field', this.emailKeyup);
this.listenTo(radioChannel, 'blur:field', this.onBlurField);
},
onChangeModelValue: function(model){
var value=model.get('value');
var fieldID=model.get('id');
this.emailChange(value, fieldID);
},
onBlurField: function(el, model){
var value=jQuery(el).val();
var fieldID=model.get('id');
this.emailChange(value, fieldID);
},
emailChange: function(value, fieldID){
if(0 < value.length){
if(emailReg.test(value)){
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
}else{
var fieldModel=nfRadio.channel('fields').request('get:field', fieldID);
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', fieldID, errorID, formModel.get('settings').changeEmailErrorMsg);
}}else{
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
}},
emailKeyup: function(el, model, keyCode){
if(9==keyCode){
return false;
}
var value=jQuery(el).val();
var fieldID=model.get('id');
if(0==value.length){
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
}else if(! emailReg.test(value)&&! model.get('clean')){
var fieldModel=nfRadio.channel('fields').request('get:field', fieldID);
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', fieldID, errorID, formModel.get('settings').changeEmailErrorMsg);
model.removeWrapperClass('nf-pass');
}else if(emailReg.test(value)){
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
model.addWrapperClass('nf-pass');
model.set('clean', false);
}}
});
return controller;
});
define('controllers/changeDate',[], function(){
var radioChannel=nfRadio.channel('date');
var errorID='invalid-date';
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(radioChannel, 'change:modelValue', this.onChangeModelValue);
this.listenTo(radioChannel, 'keyup:field', this.dateKeyup);
this.listenTo(radioChannel, 'blur:field', this.onBlurField);
},
onChangeModelValue: function(model){
this.dateChange(model);
},
onBlurField: function(el, model){
this.dateChange(model);
},
dateChange: function(model){
var fieldID=model.get('id');
var value=model.get('value');
var format=model.get('date_format');
if('default'===format){
format=nfi18n.dateFormat;
}
if(0 < value.length){
if(moment(value, format).isValid()){
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
}else{
var fieldModel=nfRadio.channel('fields').request('get:field', fieldID);
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', fieldID, errorID, formModel.get('settings').changeDateErrorMsg);
}}else{
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
}},
dateKeyup: function(el, model, keyCode){
if(9==keyCode){
return false;
}
var value=jQuery(el).val();
var fieldID=model.get('id');
var format=model.get('date_format');
if('default'===format){
format=nfi18n.dateFormat;
}
if(0==value.length){
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
}
else if(! moment(value, format).isValid()&&! model.get('clean')){
var fieldModel=nfRadio.channel('fields').request('get:field', fieldID);
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', fieldID, errorID, formModel.get('settings').changeDateErrorMsg);
model.removeWrapperClass('nf-pass');
}
else if(moment(value, format).isValid()){
nfRadio.channel('fields').request('remove:error', fieldID, errorID);
model.addWrapperClass('nf-pass');
model.set('clean', false);
}}
});
return controller;
});
define('controllers/fieldCheckbox',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('checkbox'), 'init:model', this.registerRenderClasses);
nfRadio.channel('checkbox').reply('validate:required', this.validateRequired);
nfRadio.channel('checkbox').reply('validate:modelData', this.validateModelData);
nfRadio.channel('checkbox').reply('before:updateField', this.beforeUpdateField, this);
nfRadio.channel('checkbox').reply('get:calcValue', this.getCalcValue, this);
},
beforeUpdateField: function(el, model){
var checked=jQuery(el).prop('checked');
if(checked){
var value=1;
jQuery(el).addClass('nf-checked');
jQuery(el).closest('.field-wrap').find('label[for="' + jQuery(el).prop('id') + '"]').addClass('nf-checked-label');
}else{
var value=0;
jQuery(el).removeClass('nf-checked');
jQuery(el).closest('.field-wrap').find('label[for="' + jQuery(el).prop('id') + '"]').removeClass('nf-checked-label');
}
return value;
},
validateRequired: function(el, model){
return el[0].checked;
},
validateModelData: function(model){
return model.get('value')!=0;
},
getCalcValue: function(fieldModel){
if(1==fieldModel.get('value')){
calcValue=fieldModel.get('checked_calc_value');
}else{
calcValue=fieldModel.get('unchecked_calc_value');
}
return calcValue;
},
registerRenderClasses: function(model){
if('checked'==model.get('default_value')){
model.set('value', 1);
}else{
model.set('value', 0);
}
model.set('customClasses', this.customClasses);
model.set('customLabelClasses', this.customLabelClasses);
model.set('maybeChecked', this.maybeChecked);
},
customClasses: function(classes){
if(1==this.value||(this.clean&&'undefined'!=typeof this.default_value&&'checked'==this.default_value)){
classes +=' nf-checked';
}else{
classes.replace('nf-checked', '');
}
return classes;
},
customLabelClasses: function(classes){
if(1==this.value||(this.clean&&'undefined'!=typeof this.default_value&&'checked'==this.default_value)){
classes +=' nf-checked-label';
}else{
classes.replace('nf-checked-label', '');
}
return classes;
},
maybeChecked: function(){
if(1==this.value||(this.clean&&'undefined'!=typeof this.default_value&&'checked'==this.default_value)){
return ' checked';
}else{
return '';
}}
});
return controller;
});
define('controllers/fieldCheckboxList',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('listcheckbox'), 'init:model', this.register);
this.listenTo(nfRadio.channel('terms'), 'init:model', this.register);
nfRadio.channel('listcheckbox').reply('before:updateField', this.beforeUpdateField, this);
nfRadio.channel('terms').reply('before:updateField', this.beforeUpdateField, this);
nfRadio.channel('listcheckbox').reply('get:calcValue', this.getCalcValue, this);
nfRadio.channel('terms').reply('get:calcValue', this.getCalcValue, this);
},
register: function(model){
model.set('renderOptions', this.renderOptions);
model.set('renderOtherText', this.renderOtherText);
model.set('selected', []);
if(0!=model.get('options').length){
var selected=_.filter(model.get('options'), function(opt){ return 1==opt.selected });
selected=_.map(selected, function(opt){ return opt.value });
}
var savedVal=model.get('value');
if('undefined'!==typeof savedVal&&Array.isArray(savedVal)){
model.set('value', savedVal);
}else if('undefined'!=typeof selected){
model.set('value', selected);
}},
renderOptions: function(){
var html='';
if(''==this.value||(Array.isArray(this.value)&&0 < this.value.length)
|| 0 < this.value.length){
var valueFound=true;
}else{
var valueFound=false;
}
_.each(this.options, function(option, index){
if(Array.isArray(this.value)){
if(Array.isArray(this.value[ 0 ])&&-1!==_.indexOf(this.value[ 0 ], option.value)){
valueFound=true;
}
else if(_.indexOf(this.value, option.value)){
valueFound=true;
}}
if(option.value==this.value){
valueFound=true;
}
if('undefined'==typeof option.visible){
option.visible=true;
}
option.fieldID=this.id;
option.classes=this.classes;
option.index=index;
var selected=false;
if(Array.isArray(this.value)&&0 < this.value.length){
if(-1!==_.indexOf(this.value[ 0 ].split(','), option.value)
|| -1!==_.indexOf(this.value, option.value)){
selected=true;
}}else if(! _.isArray(this.value)&&option.value==this.value){
selected=true;
}else if(( 1==option.selected&&this.clean)&&'undefined'===typeof this.value){
selected=true;
}
option.selected=selected;
option.isSelected=selected;
option.required=this.required;
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listcheckbox-option');
html +=template(option);
}, this);
if(1==this.show_other){
if('nf-other'==this.value){
valueFound=false;
}
var data={
fieldID: this.id,
classes: this.classes,
currentValue: this.value,
renderOtherText: this.renderOtherText,
valueFound: valueFound
};
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listcheckbox-other');
html +=template(data);
}
return html;
},
renderOtherText: function(){
if('nf-other'==this.currentValue||! this.valueFound){
if('nf-other'==this.currentValue){
this.currentValue='';
}
var data={
fieldID: this.fieldID,
classes: this.classes,
currentValue: this.currentValue
};
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listcheckbox-other-text');
return template(data);
}},
getCalcValue: function(fieldModel){
var calc_value=0;
var options=fieldModel.get('options');
if(0!=options.length){
_.each(fieldModel.get('value'), function(val){
var tmp_opt=_.find(options, function(opt){ return opt.value==val });
calc_value=Number(calc_value) + Number(tmp_opt.calc);
});
}
return calc_value;
},
beforeUpdateField: function(el, model){
var selected=model.get('value')||[];
if(typeof selected=='string') selected=[ selected ];
var value=jQuery(el).val();
var checked=jQuery(el).prop('checked');
if(checked){
selected.push(value);
jQuery(el).addClass('nf-checked');
jQuery(el).parent().find('label[for="' + jQuery(el).prop('id') + '"]').addClass('nf-checked-label');
}else{
jQuery(el).removeClass('nf-checked');
jQuery(el).parent().find('label[for="' + jQuery(el).prop('id') + '"]').removeClass('nf-checked-label');
var i=selected.indexOf(value);
if(-1!=i){
selected.splice(i, 1);
}else if(Array.isArray(selected)){
var optionArray=selected[0].split(',');
var valueIndex=optionArray.indexOf(value);
if(-1!==valueIndex){
optionArray.splice(valueIndex, 1);
}
selected=optionArray.join(',');
}}
return _.clone(selected);
}});
return controller;
});
define('controllers/fieldImageList',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('listimage'), 'init:model', this.register);
nfRadio.channel('listimage').reply('before:updateField', this.beforeUpdateField, this);
nfRadio.channel('listimage').reply('get:calcValue', this.getCalcValue, this);
},
register: function(model){
model.set('renderOptions', this.renderOptions);
model.set('renderOtherText', this.renderOtherText);
model.set('selected', []);
if(0!=model.get('image_options').length){
var selected=_.filter(model.get('image_options'), function(opt){ return 1==opt.selected });
selected=_.map(selected, function(opt){ return opt.value });
}
var savedVal=model.get('value');
if('undefined'!==typeof savedVal&&Array.isArray(savedVal)){
model.set('value', savedVal);
}else if('undefined'!=typeof selected){
model.set('value', selected);
}},
renderOptions: function(){
var html='';
if(''==this.value||(Array.isArray(this.value)&&0 < this.value.length)
|| 0 < this.value.length){
var valueFound=true;
}else{
var valueFound=false;
}
if(this.allow_multi_select===1){
this.old_classname='list-checkbox';
this.image_type='checkbox';
}else{
this.image_type='radio';
}
if(this.list_orientation==='horizontal'){
this.flex_direction='row';
}else{
this.flex_direction='column';
}
var that=this;
var num_columns=parseInt(this.num_columns)||1;
var current_column=1;
var current_row=1;
_.each(this.image_options, function(image, index){
if(!this.show_option_labels){
image.label='';
}
if(Array.isArray(this.value)){
if(Array.isArray(this.value[ 0 ])&&-1!==_.indexOf(this.value[ 0 ], image.value)){
valueFound=true;
}
else if(_.indexOf(this.value, image.value)){
valueFound=true;
}}
if(image.value==this.value){
valueFound=true;
}
if('undefined'==typeof image.visible){
image.visible=true;
}
if(that.list_orientation==='horizontal'&&current_column <=num_columns){
image.styles="margin:auto;grid-column: " + current_column + "; grid-row=" + current_row;
if(current_column===num_columns){
current_column=1;
current_row +=1;
}else{
current_column +=1;
}}
image.image_type=that.image_type;
image.fieldID=this.id;
image.classes=this.classes;
image.index=index;
var selected=false;
if(Array.isArray(this.value)&&0 < this.value.length){
if(-1!==_.indexOf(this.value[ 0 ].split(','), image.value)
|| -1!==_.indexOf(this.value, image.value)){
selected=true;
}}else if(! _.isArray(this.value)&&image.value==this.value){
selected=true;
}else if(( 1==image.selected&&this.clean)&&('undefined'===typeof this.value||''===this.value)){
selected=true;
}
image.selected=selected;
image.isSelected=selected;
image.required=this.required;
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listimage-option');
html +=template(image);
}, this);
if(1==this.show_other){
if('nf-other'==this.value){
valueFound=false;
}
var data={
fieldID: this.id,
classes: this.classes,
value: this.value,
currentValue: this.value,
renderOtherText: this.renderOtherText,
valueFound: valueFound
};
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listimage-other');
html +=template(data);
}
return html;
},
renderOtherText: function(){
if('nf-other'==this.currentValue||! this.valueFound){
if('nf-other'==this.currentValue){
this.currentValue='';
}
var data={
fieldID: this.fieldID,
classes: this.classes,
currentValue: this.currentValue
};
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listimage-other-text');
return template(data);
}},
getCalcValue: function(fieldModel){
var calc_value=0;
var options=fieldModel.get('options');
if(0!=options.length){
if(1==parseInt(fieldModel.get('allow_multi_select'))){
_.each(fieldModel.get('value'), function(val){
var tmp_opt=_.find(options, function(opt){ return opt.value==val });
calc_value +=Number(tmp_opt.calc);
});
}else{
var selected=_.find(options, function(opt){ return fieldModel.get('value')==opt.value });
if('undefined'!==typeof selected){
calc_value=selected.calc;
}}
}
return calc_value;
},
beforeUpdateField: function(el, model){
if(model.get('allow_multi_select')!==1){
var selected=jQuery(el).val();
var options=model.get('image_options');
_.each(options, function(option, index){
if(option.value===selected){
option.isSelected=true;
option.selected=true;
}else{
option.isSelected=false;
option.selected=false;
}
if(!option.isSelected){
option.selected=false;
jQuery("#nf-field-" + option.fieldID + "-" + index).removeClass('nf-checked');
jQuery("#nf-label-field-" + option.fieldID + "-" + index).removeClass('nf-checked-label');
}else{
jQuery("#nf-field-" + option.fieldID + "-" + index).addClass('nf-checked');
jQuery("#nf-label-field-" + option.fieldID + "-" + index).addClass('nf-checked-label');
}});
}else{
var selected=model.get('value')||[];
if(typeof selected=='string') selected=[ selected ];
var value=jQuery(el).val();
var checked=jQuery(el).prop('checked');
if(checked){
selected.push(value);
jQuery(el).addClass('nf-checked');
jQuery(el).parent().find('label[for="' + jQuery(el).prop('id') + '"]').addClass('nf-checked-label');
}else{
jQuery(el).removeClass('nf-checked');
jQuery(el).parent().find('label[for="' + jQuery(el).prop('id') + '"]').removeClass('nf-checked-label');
var i=selected.indexOf(value);
if(-1!=i){
selected.splice(i, 1);
}else if(Array.isArray(selected)){
var optionArray=selected[0].split(',');
var valueIndex=optionArray.indexOf(value);
if(-1!==valueIndex){
optionArray.splice(valueIndex, 1);
}
selected=optionArray.join(',');
}}
}
return _.clone(selected);
}});
return controller;
});
define('controllers/fieldRadio',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('listradio'), 'change:modelValue', this.changeModelValue);
this.listenTo(nfRadio.channel('listradio'), 'init:model', this.register);
nfRadio.channel('listradio').reply('get:calcValue', this.getCalcValue, this);
this.listenTo(nfRadio.channel('listradio'), 'change:field', this.updateCheckedClass, this);
},
register: function(model){
model.set('renderOptions', this.renderOptions);
model.set('renderOtherText', this.renderOtherText);
if(0!=model.get('options').length){
var selected=_.find(model.get('options'), function(opt){ return 1==opt.selected });
if('undefined'!=typeof selected){
model.set('value', selected.value);
}}
},
changeModelValue: function(model){
if(1==model.get('show_other')){
model.trigger('reRender');
}},
renderOptions: function(){
var html='';
if(''==this.value){
var valueFound=true;
}else{
var valueFound=false;
}
_.each(this.options, function(option, index){
if(option.value==this.value){
valueFound=true;
}
if('undefined'==typeof option.visible){
option.visible=true;
}
option.selected=false;
option.fieldID=this.id;
option.classes=this.classes;
option.currentValue=this.value;
option.index=index;
option.required=this.required;
if(this.clean&&1==this.selected){
option.selected=true;
}else if(this.value==option.value){
option.selected=true;
}else{
option.selected=false;
}
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listradio-option');
html +=template(option);
}, this);
if(1==this.show_other){
if('nf-other'==this.value){
valueFound=false;
}
var data={
fieldID: this.id,
classes: this.classes,
currentValue: this.value,
renderOtherText: this.renderOtherText,
valueFound: valueFound
};
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listradio-other');
html +=template(data);
}
return html;
},
renderOtherText: function(){
if('nf-other'==this.currentValue||! this.valueFound){
if('nf-other'==this.currentValue){
this.currentValue='';
}
var data={
fieldID: this.fieldID,
classes: this.classes,
currentValue: this.currentValue
};
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listradio-other-text');
return template(data);
}},
getCalcValue: function(fieldModel){
var calc_value=0;
if(0!=fieldModel.get('options').length){
var selected=_.find(fieldModel.get('options'), function(opt){ return fieldModel.get('value')==opt.value });
if('undefined'!==typeof selected){
calc_value=selected.calc;
}}
return calc_value;
},
updateCheckedClass: function(el, model){
jQuery('[name="' + jQuery(el).attr('name') + '"]').removeClass('nf-checked');
jQuery(el).closest('ul').find('label').removeClass('nf-checked-label');
jQuery(el).addClass('nf-checked');
jQuery(el).closest('li').find('label[for="' + jQuery(el).prop('id') + '"]').addClass('nf-checked-label');
}});
return controller;
});
define('controllers/fieldNumber',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('number'), 'init:model', this.maybeMinDefault);
this.listenTo(nfRadio.channel('number'), 'keyup:field', this.validateMinMax);
},
maybeMinDefault: function(model){
if(''==model.get('value')&&''==model.get('placeholder')){
var min=model.get('num_min');
model.set('placeholder', min);
}},
validateMinMax: function(el, model){
var $el=jQuery(el);
var value=parseFloat($el.val());
var min=$el.attr('min');
var max=$el.attr('max');
var step=parseFloat($el.attr('step'));
if(min&&value < min){
var fieldModel=nfRadio.channel('fields').request('get:field', model.get('id'));
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', model.get('id'), 'number-min', formModel.get('settings').fieldNumberNumMinError);
}else{
nfRadio.channel('fields').request('remove:error', model.get('id'), 'number-min');
}
if(max&&value > max){
var fieldModel=nfRadio.channel('fields').request('get:field', model.get('id'));
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', model.get('id'), 'number-max', formModel.get('settings').fieldNumberNumMaxError);
}else{
nfRadio.channel('fields').request('remove:error', model.get('id'), 'number-max');
}
var testValue=Math.round(parseFloat(value) * 1000000000);
var testStep=Math.round(parseFloat(step) * 1000000000);
if(value&&0!==testValue % testStep){
var fieldModel=nfRadio.channel('fields').request('get:field', model.get('id'));
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', model.get('id'), 'number-step', formModel.get('settings').fieldNumberIncrementBy + step);
}else{
nfRadio.channel('fields').request('remove:error', model.get('id'), 'number-step');
}}
});
return controller;
});
define('controllers/mirrorField',[], function(){
var radioChannel=nfRadio.channel('fields');
var controller=Marionette.Object.extend({
listeningModel: '',
initialize: function(){
this.listenTo(radioChannel, 'init:model', this.registerMirror);
},
registerMirror: function(model){
if(model.get('mirror_field')){
this.listeningModel=model;
var targetID=model.get('mirror_field');
this.listenTo(nfRadio.channel('field-' + targetID), 'change:modelValue', this.changeValue);
}},
changeValue: function(targetModel){
this.listeningModel.set('value', targetModel.get('value'));
this.listeningModel.trigger('reRender');
}});
return controller;
});
define('controllers/confirmField',[], function(){
var radioChannel=nfRadio.channel('fields');
var errorID='confirm-mismatch';
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(radioChannel, 'init:model', this.registerConfirm);
this.listenTo(radioChannel, 'keyup:field', this.confirmKeyup);
},
registerConfirm: function(confirmModel){
if(! confirmModel.get('confirm_field')) return;
this.listenTo(nfRadio.channel('form'), 'loaded', function(formModal){
this.registerConfirmListeners(confirmModel);
});
},
registerConfirmListeners: function(confirmModel){
var targetModel=nfRadio.channel('form-' + confirmModel.get('formID')).request('get:fieldByKey', confirmModel.get('confirm_field'));
if('undefined'==typeof targetModel) return;
targetModel.set('confirm_with', confirmModel.get('id'));
this.listenTo(nfRadio.channel('field-' + targetModel.get('id')), 'change:modelValue', this.changeValue);
this.listenTo(nfRadio.channel('field-' + confirmModel.get('id')), 'change:modelValue', this.changeValue);
},
changeValue: function(model){
if('undefined'==typeof model.get('confirm_with')){
var confirmModel=model;
var targetModel=nfRadio.channel('form-' + model.get('formID')).request('get:fieldByKey', confirmModel.get('confirm_field'));
}else{
var targetModel=model;
var confirmModel=radioChannel.request('get:field', targetModel.get('confirm_with'));
}
var targetID=targetModel.get('id');
var confirmID=confirmModel.get('id');
if(''==confirmModel.get('value')||confirmModel.get('value')==targetModel.get('value')){
nfRadio.channel('fields').request('remove:error', confirmID, errorID);
}else{
var fieldModel=nfRadio.channel('fields').request('get:field', confirmID);
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', confirmID, errorID, formModel.get('settings').confirmFieldErrorMsg);
}},
confirmKeyup: function(el, model, keyCode){
var currentValue=jQuery(el).val();
if(model.get('confirm_field')){
var confirmModel=model;
var confirmID=model.get('id');
var targetModel=nfRadio.channel('form-' + model.get('formID')).request('get:fieldByKey', confirmModel.get('confirm_field'));
var compareValue=targetModel.get('value');
var confirmValue=currentValue;
}else if(model.get('confirm_with')){
var confirmModel=nfRadio.channel('fields').request('get:field', model.get('confirm_with'));
var confirmID=confirmModel.get('id');
var confirmValue=confirmModel.get('value');
var compareValue=confirmValue;
}
if('undefined'!==typeof confirmModel){
if(''==confirmValue){
nfRadio.channel('fields').request('remove:error', confirmID, errorID);
}else if(currentValue==compareValue){
nfRadio.channel('fields').request('remove:error', confirmID, errorID);
}else{
var fieldModel=nfRadio.channel('fields').request('get:field', confirmID);
var formModel=nfRadio.channel('app').request('get:form',  fieldModel.get('formID'));
nfRadio.channel('fields').request('add:error', confirmID, errorID, formModel.get('settings').confirmFieldErrorMsg);
}}
}});
return controller;
});
define('controllers/updateFieldModel',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
nfRadio.channel('nfAdmin').reply('update:field', this.updateField);
},
updateField: function(model, value){
if(! model.get('isUpdated')){
model.set('value', value);
model.set('isUpdated', true);
if(_.isArray(value)){
model.trigger('change:value', model);
}}
}});
return controller;
});
define('controllers/submitButton',['controllers/submitButton'], function(submitButton){
var controller=Marionette.Object.extend({
bound: {},
initialize: function(){
this.listenTo(nfRadio.channel('submit'), 'init:model', this.registerHandlers);
},
registerHandlers: function(fieldModel){
if('undefined'!=typeof this.bound[ fieldModel.get('id') ]){
return false;
}
this.listenTo(nfRadio.channel('field-' + fieldModel.get('id')), 'click:field', this.click, this);
fieldModel.listenTo(nfRadio.channel('form-' + fieldModel.get('formID')), 'before:submit', this.beforeSubmit, fieldModel);
fieldModel.listenTo(nfRadio.channel('form-' + fieldModel.get('formID')), 'submit:failed', this.resetLabel, fieldModel);
fieldModel.listenTo(nfRadio.channel('form-' + fieldModel.get('formID')), 'submit:response', this.resetLabel, fieldModel);
fieldModel.listenTo(nfRadio.channel('form-' + fieldModel.get('formID')), 'enable:submit', this.maybeEnable, fieldModel);
fieldModel.listenTo(nfRadio.channel('form-' + fieldModel.get('formID')), 'disable:submit', this.maybeDisable, fieldModel);
fieldModel.listenTo(nfRadio.channel('form-' + fieldModel.get('formID')), 'processingLabel', this.processingLabel, fieldModel);
fieldModel.listenTo(nfRadio.channel('fields'), 'add:error', this.maybeDisable, fieldModel);
fieldModel.listenTo(nfRadio.channel('fields'), 'remove:error', this.maybeEnable, fieldModel);
this.bound[ fieldModel.get('id') ]=true;
},
click: function(e, fieldModel){
var formModel=nfRadio.channel('app').request('get:form', fieldModel.get('formID'));
nfRadio.channel('form-' + fieldModel.get('formID')).request('submit', formModel);
},
beforeSubmit: function(){
this.set('disabled', true);
nfRadio.channel('form-' + this.get('formID')).trigger('processingLabel', this);
},
maybeDisable: function(fieldModel){
if('undefined'!=typeof fieldModel&&fieldModel.get('formID')!=this.get('formID')) return;
this.set('disabled', true);
this.trigger('reRender');
},
maybeEnable: function(fieldModel){
if('undefined'!=typeof fieldModel&&fieldModel.get('formID')!=this.get('formID')){
return false;
}
var formModel=nfRadio.channel('app').request('get:form', this.get('formID'));
if(0==_.size(formModel.get('fieldErrors'))){
this.set('disabled', false);
this.trigger('reRender');
}},
processingLabel: function(){
if(this.get('label')==this.get('processing_label')) return false;
this.set('oldLabel', this.get('label'));
this.set('label', this.get('processing_label'));
this.trigger('reRender');
},
resetLabel: function(response){
if('undefined'!=typeof response.errors &&
'undefined'!=typeof response.errors.nonce &&
_.size(response.errors.nonce) > 0){
if('undefined'!=typeof response.errors.nonce.new_nonce&&'undefined'!=typeof response.errors.nonce.nonce_ts){
return;
}}
if('undefined'!=typeof this.get('oldLabel')){
this.set('label', this.get('oldLabel'));
}
this.set('disabled', false);
this.trigger('reRender');
}});
return controller;
});
define('controllers/submitDebug',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('forms'), 'submit:response', this.submitDebug);
},
submitDebug: function(response, textStatus, jqXHR, formID){
if('undefined'==typeof response.debug) return;
if('undefined'!=typeof response.debug.form){
var debugMessages=document.createElement('span');
_.each(response.debug.form, function (message, index){
var messageText=document.createTextNode(message);
debugMessages.appendChild(messageText);
debugMessages.appendChild(document.createElement('br')
);
});
jQuery('.nf-debug-msg').html(debugMessages);
}
if('undefined'!=typeof response.debug.console){
var style='';
console.log('%c%s', style, 'NINJA SUPPORT');
_.each(response.debug.console, function (message, index){
console.log(message);
});
console.log('%c%s', style, 'END NINJA SUPPORT');
}}
});
return controller;
});
define('controllers/getFormErrors',[], function(){
var radioChannel=nfRadio.channel('fields');
var controller=Marionette.Object.extend({
initialize: function(model){
nfRadio.channel('form').reply('get:errors', this.getFormErrors);
},
getFormErrors: function(formID){
var formModel=nfRadio.channel('app').request('get:form', formID);
var errors=false;
if(formModel){
if(0!==formModel.get('errors').length){
_.each(formModel.get('errors').models, function(error){
errors=errors||{};
errors[ error.get('id') ]=error.get('msg');
});
}
_.each(formModel.get('fields').models, function(field){
if(field.get('type')!='submit'&&field.get('errors').length > 0){
errors=errors||{};
errors[ field.get('id') ]=field.get('errors');
}});
}
return errors;
},
});
return controller;
});
define('controllers/validateRequired',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('fields'), 'blur:field', this.validateRequired);
this.listenTo(nfRadio.channel('fields'), 'change:field', this.validateRequired);
this.listenTo(nfRadio.channel('fields'), 'keyup:field', this.validateKeyup);
this.listenTo(nfRadio.channel('fields'), 'change:modelValue', this.validateModelData);
this.listenTo(nfRadio.channel('submit'), 'validate:field', this.validateModelData);
},
validateKeyup: function(el, model, keyCode){
if(1!=model.get('required')){
return false;
}
if(! model.get('clean')){
this.validateRequired(el, model);
}},
validateRequired: function(el, model){
if(1!=model.get('required')||! model.get('visible')){
return false;
}
var currentValue=jQuery(el).val();
var customReqValidation=nfRadio.channel(model.get('type')).request('validate:required', el, model);
var defaultReqValidation=true;
var maskPlaceholder=model.get('mask');
if(maskPlaceholder){
maskPlaceholder=maskPlaceholder.replace(/9/g, '_');
maskPlaceholder=maskPlaceholder.replace(/a/g, '_');
maskPlaceholder=maskPlaceholder.replace(/\*/g, '_');
}
if(maskPlaceholder&&currentValue===maskPlaceholder){
if(0 < model.get('errors').length){
defaultReqValidation=false;
}}
if(! jQuery.trim(currentValue)){
defaultReqValidation=false;
}
if('undefined'!==typeof customReqValidation){
var valid=customReqValidation;
}else{
var valid=defaultReqValidation;
}
this.maybeError(valid, model);
},
validateModelData: function(model){
if(1!=model.get('required')||! model.get('visible')||model.get('clean')){
return false;
}
if(model.get('errors').get('required-error')){
return false;
}
currentValue=model.get('value');
var defaultReqValidation=true;
if(! jQuery.trim(currentValue)){
defaultReqValidation=false;
}
var customReqValidation=nfRadio.channel(model.get('type')).request('validate:modelData', model);
if('undefined'!==typeof customReqValidation){
var valid=customReqValidation;
}else{
var valid=defaultReqValidation;
}
this.maybeError(valid, model);
},
maybeError: function(valid, model){
if(! valid){
var formModel=nfRadio.channel('form-' + model.get('formID')).request('get:form');
if('undefined'!=typeof formModel){
nfRadio.channel('fields').request('add:error', model.get('id'), 'required-error', formModel.get('settings').validateRequiredField);
}}else{
nfRadio.channel('fields').request('remove:error', model.get('id'), 'required-error');
}}
});
return controller;
});
define('controllers/submitError',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('forms'), 'submit:response', this.submitErrors);
},
submitErrors: function(response, textStatus, jqXHR, formID){
if(_.size(response.errors.nonce) > 0){
if('undefined'!=typeof response.errors.nonce.new_nonce&&'undefined'!=typeof response.errors.nonce.nonce_ts){
nfFrontEnd.ajaxNonce=response.errors.nonce.new_nonce;
nfFrontEnd.nonce_ts=response.errors.nonce.nonce_ts;
var formModel=nfRadio.channel('app').request('get:form', formID);
nfRadio.channel('form-' + formID).request('submit', formModel);
}}
if(_.size(response.errors.fields) > 0){
_.each(response.errors.fields, function(data, fieldID){
if(typeof(data)==='object'){
nfRadio.channel('fields').request('add:error', fieldID, data.slug, data.message);
}else{
nfRadio.channel('fields').request('add:error', fieldID, 'required-error', data);
}});
}
if(_.size(response.errors.form) > 0){
_.each(response.errors.form, function(msg, errorID){
nfRadio.channel('form-' + formID).request('remove:error', errorID);
nfRadio.channel('form-' + formID).request('add:error', errorID, msg);
});
}
if('undefined'!=typeof response.errors.last){
if('undefined'!=typeof response.errors.last.message){
var style='background: rgba(255, 207, 115, .5); color: #FFA700; display: block;';
console.log('%c NINJA FORMS SUPPORT: SERVER ERROR', style);
console.log(response.errors.last.message);
console.log('%c END SERVER ERROR MESSAGE', style);
}}
jQuery('#nf-form-' + formID + '-cont .nf-field-container').show();
}});
return controller;
});
define('controllers/actionRedirect',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('forms'), 'submit:response', this.actionRedirect);
},
actionRedirect: function(response){
if('undefined'!=typeof response.data.halt&&'undefined'!=typeof response.data.halt.redirect&&''!=response.data.halt.redirect){
window.location=response.data.halt.redirect;
}
if(_.size(response.errors)==0&&'undefined'!=typeof response.data.actions){
if('undefined'!=typeof response.data.actions.redirect&&''!=response.data.actions.redirect){
window.location=response.data.actions.redirect;
}}
}});
return controller;
});
define('controllers/actionSuccess',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('forms'), 'submit:response', this.actionSubmit);
},
actionSubmit: function(response){
if(_.size(response.errors)==0&&'undefined'!=typeof response.data.actions){
if('undefined'!=typeof response.data.actions.success_message&&''!=response.data.actions.success_message){
var form_id=response.data.form_id;
var success_message=jQuery('#nf-form-' + form_id + '-cont .nf-response-msg');
success_message.html(response.data.actions.success_message).show();
var top_of_success_message=success_message.offset().top;
var bottom_of_success_message=success_message.offset().top + success_message.outerHeight();
var bottom_of_screen=jQuery(window).scrollTop() + jQuery(window).height();
var top_of_screen=jQuery(window).scrollTop();
var the_element_is_visible=((bottom_of_screen > bottom_of_success_message)&&(top_of_screen < top_of_success_message));
if(!the_element_is_visible){
jQuery('html, body').animate({
scrollTop:(success_message.offset().top - 50)
}, 300);
}}
}}
});
return controller;
});
define('controllers/fieldSelect',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('fields'), 'init:model', function(model){
if('list'==model.get('parentType')) this.register(model);
}, this);
nfRadio.channel('listselect').reply('get:calcValue', this.getCalcValue, this);
nfRadio.channel('listmultiselect').reply('get:calcValue', this.getCalcValue, this);
},
register: function(model){
model.set('renderOptions', this.renderOptions);
model.set('renderOtherAttributes', this.renderOtherAttributes);
if(0!=model.get('options').length){
var savedVal=model.get('value');
if('listmultiselect'==model.get('type')){
var selected=_.filter(model.get('options'), function(opt){ return 1==opt.selected });
selected=_.map(selected, function(opt){ return opt.value });
var value=selected;
}else if('listradio'!==model.get('type')){
var selected=_.find(model.get('options'), function(opt){ return 1==opt.selected });
if('undefined'==typeof selected){
selected=_.first(model.get('options'));
}
if('undefined'!=typeof selected
&& 'undefined'!=typeof selected.value){
var value=selected.value;
}else if('undefined'!=typeof selected){
var value=selected.label;
}}
if('undefined'!==typeof savedVal&&''!==savedVal
&& Array.isArray(savedVal)){
model.set('value', savedVal);
}else if('undefined'!=typeof selected){
model.set('value', value);
}}
},
renderOptions: function(){
var html='';
_.each(this.options, function(option){
if(_.isArray(this.value)){
if('listmultiselect'===this.type&&0 < this.value.length &&
-1!=_.indexOf(this.value[ 0 ].split(','), option.value)){
var selected=true;
}else if(-1!=_.indexOf(this.value, option.value)){
var selected=true;
}}else if(! _.isArray(this.value)&&option.value==this.value){
var selected=true;
}else if(( 1==option.selected&&this.clean)
&& 'undefined'===typeof this.value){
var selected=true;
}else{
var selected=false;
}
if('undefined'==typeof option.visible){
option.visible=true;
}
option.selected=selected;
option.fieldID=this.id;
option.classes=this.classes;
option.currentValue=this.value;
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-listselect-option');
html +=template(option);
}, this);
return html;
},
renderOtherAttributes: function(){
var otherAttributes='';
if('listmultiselect'==this.type){
otherAttributes=otherAttributes + ' multiple';
var multiSize=this.multi_size||5;
otherAttributes=otherAttributes + ' size="' + multiSize + '"';
}
return otherAttributes;
},
getCalcValue: function(fieldModel){
var calc_value=0;
var options=fieldModel.get('options');
if(0!=options.length){
if('listmultiselect'==fieldModel.get('type')){
_.each(fieldModel.get('value'), function(val){
var tmp_opt=_.find(options, function(opt){ return opt.value==val });
calc_value +=Number(tmp_opt.calc);
});
}else{
var selected=_.find(options, function(opt){ return fieldModel.get('value')==opt.value });
if('undefined'==typeof selected){
selected=fieldModel.get('options')[0];
}
calc_value=selected.calc;
}}
return calc_value;
}});
return controller;
});
define('controllers/coreSubmitResponse',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('forms'), 'submit:response', this.actionSubmit);
},
actionSubmit: function(response){
var formModel=nfRadio.channel('app').request('get:form', response.data.form_id);
if(0!=_.size(response.errors)){
return false;
}
if(1==response.data.settings.clear_complete){
formModel.get('fields').reset(formModel.get('loadedFields'));
if(1!=response.data.settings.hide_complete){
nfRadio.channel('captcha').trigger('reset');
}}
if(1==response.data.settings.hide_complete){
formModel.trigger('hide');
}}
});
return controller;
});
define('controllers/fieldProduct',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('product'), 'init:model', this.register);
nfRadio.channel('product').reply('get:calcValue', this.getCalcValue, this);
},
register: function(model){
model.set('renderProductQuantity', this.renderProductQuantity);
model.set('renderProduct', this.renderProduct);
model.set('renderOptions', this.renderOptions);
},
renderProduct: function(){
switch(this.product_type){
case 'user':
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-textbox');
return template(this);
break;
case 'hidden':
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-hidden');
return template(this);
break;
case 'dropdown':
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-product-dropdown');
return template(this);
break;
default:
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-product-single');
return template(this);
}},
renderProductQuantity: function(){
if(1==this.product_use_quantity){
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-product-quantity');
return template(this);
}},
renderOptions: function(){
var that=this;
var html='';
_.each(this.options, function(option){
if(1==option.selected){
var selected=true;
}else{
var selected=false;
}
option.selected=selected;
option.fieldID=that.id;
option.classes=that.classes;
option.currentValue=that.value;
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-product-' + that.product_type + '-option');
html +=template(option);
});
return html;
},
getCalcValue: function(fieldModel){
var product_price=fieldModel.get('product_price');
var product_quantity=fieldModel.get('value');
return product_price * product_quantity;
}});
return controller;
});
define('controllers/fieldTotal',[], function(){
var controller=Marionette.Object.extend({
totalModel: {},
productTotals: {},
initialize: function(){
this.listenTo(nfRadio.channel('total'), 'init:model', this.register);
this.listenTo(nfRadio.channel('shipping'), 'init:model', this.registerShipping);
},
register: function(totalModel){
this.totalModel=totalModel;
var formID=totalModel.get('formID');
this.listenTo(nfRadio.channel('form-' + formID), 'loaded', this.onFormLoaded);
this.listenTo(nfRadio.channel('product'), 'change:modelValue', this.onChangeProduct);
this.listenTo(nfRadio.channel('quantity'), 'change:modelValue', this.onChangeQuantity);
},
registerShipping: function(shippingModel){
this.shippingCost=shippingModel.get('shipping_cost');
},
onFormLoaded: function(formModel){
var fieldModels=formModel.get('fields').models;
var productFields={};
var quantityFields={};
for(var model in fieldModels){
var field=fieldModels[ model ];
var fieldID=field.get('id');
if('product'==field.get('type')){
productFields[ fieldID ]=field;
}else if('quantity'==field.get('type')){
var productID=field.get('product_assignment');
quantityFields[ productID ]=field;
}}
for(var productID in productFields){
var product=productFields[ productID ];
var productPrice=Number(product.get('product_price'));
if(quantityFields[ productID ]){
productPrice *=quantityFields[ productID ].get('value');
}else if(1==product.get('product_use_quantity')){
productPrice *=product.get('value');
}
this.productTotals[ productID ]=productPrice;
}
this.updateTotal();
},
onChangeProduct: function(model){
var productID=model.get('id');
var productPrice=Number(model.get('product_price'));
var productQuantity=Number(model.get('value'));
var newTotal=productQuantity * productPrice;
this.productTotals[ productID ]=newTotal;
this.updateTotal();
},
onChangeQuantity: function(model){
var productID=model.get('product_assignment');
var productField=nfRadio.channel('fields').request('get:field', productID);
var productPrice=Number(productField.get('product_price'));
var quantity=Number(model.get('value'));
var newTotal=quantity * productPrice;
this.productTotals[ productID ]=newTotal;
this.updateTotal();
},
updateTotal: function(){
var newTotal=0;
for(var product in this.productTotals){
newTotal +=Number(this.productTotals[ product ]);
}
if(newTotal&&this.shippingCost){
newTotal +=Number(this.shippingCost);
}
this.totalModel.set('value', newTotal.toFixed(2));
this.totalModel.trigger('reRender');
}});
return controller;
});
define('controllers/fieldQuantity',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('quantity'), 'init:model', this.registerQuantity);
},
registerQuantity: function(model){
var productID=model.get('product_assignment');
var product=nfRadio.channel('fields').request('get:field', productID);
if(product){
product.set('product_use_quantity', 0);
}},
});
return controller;
});
define('models/calcModel',[], function(){
var model=Backbone.Model.extend({
initialize: function(){
this.set('formID', this.collection.options.formModel.get('id'));
this.set('fields', {});
nfRadio.channel('calc').trigger('init:model', this);
this.on('change:value', this.changeValue, this);
},
changeField: function(fieldModel){
nfRadio.channel('calc').trigger('change:field', this, fieldModel);
},
changeCalc: function(targetCalcModel){
nfRadio.channel('calc').trigger('change:calc', this, targetCalcModel);
},
changeValue: function(){
nfRadio.channel('calc').trigger('change:value', this);
}});
return model;
});
define('models/calcCollection',['models/calcModel'], function(CalcModel){
var collection=Backbone.Collection.extend({
model: CalcModel,
comparator: 'order',
initialize: function(models, options){
this.options=options;
_.each(models, function(model){
if('undefined'==typeof model.dec) return;
if(''===model.dec.toString().trim()) model.dec=2;
model.dec=parseInt(model.dec);
});
nfRadio.channel('form-' + options.formModel.get('id')).reply('get:calc', this.getCalc, this);
},
getCalc: function(key){
return this.findWhere({ name: key });
}});
return collection;
});
define('controllers/calculations',['models/calcCollection'], function(CalcCollection){
var controller=Marionette.Object.extend({
initialize: function(){
this.calcs={};
this.displayFields={};
this.listenTo(nfRadio.channel('form'), 'loaded', this.registerCalcs);
this.listenTo(nfRadio.channel('fields'), 'reset:collection', this.resetCalcs);
this.listenTo(nfRadio.channel('calc'), 'change:field', this.changeField);
this.listenTo(nfRadio.channel('calc'), 'change:calc', this.changeCalc);
var that=this;
_.each(nfFrontEnd.use_merge_tags.calculations, function(fieldType){
that.listenTo(nfRadio.channel('fields-' + fieldType), 'init:model', that.initDisplayField);
});
this.listenTo(nfRadio.channel('calc'), 'change:value', this.updateDisplayFields);
this.init={};},
resetCalcs: function(fieldCollection){
if('undefined'!=typeof(fieldCollection.options.formModel)){
this.registerCalcs(fieldCollection.options.formModel);
}},
registerCalcs: function(formModel){
var calcCollection=new CalcCollection(formModel.get('settings').calculations, { formModel: formModel });
this.calcs[ formModel.get('id') ]=calcCollection;
var that=this;
_.each(calcCollection.models, function(calcModel){
that.init[ calcModel.get('name') ]=true;
that.setupCalc(calcModel);
});
},
setupCalc: function(calcModel){
var that=this;
var eq=calcModel.get('eq');
var eqValues=eq;
var calcName=calcModel.get('name');
var fields=eq.match(new RegExp(/{field:(.*?)}/g));
if(fields){
fields=fields.map(function(field){
var key=field.replace(':calc}', '').replace('}', '').replace('{field:', '');
fieldModel=nfRadio.channel('form-' + calcModel.get('formID')).request('get:fieldByKey', key);
if('undefined'==typeof fieldModel) return;
fieldModel.set('clean', false);
fieldModel.on('change:value', calcModel.changeField, calcModel);
var calcValue=that.getCalcValue(fieldModel);
that.updateCalcFields(calcModel, key, calcValue);
eqValues=that.replaceKey('field', key, calcValue, eqValues);
});
}
var calcs=eq.match(new RegExp(/{calc:(.*?)}/g));
if(calcs){
calcs=calcs.map(function(calc){
var name=calc.replace('}', '').replace('{calc:', '');
var targetCalcModel=calcModel.collection.findWhere({ name: name });
if('undefined'==typeof targetCalcModel) return;
targetCalcModel.on('change:value', calcModel.changeCalc, calcModel);
var calcValue=targetCalcModel.get('value');
eqValues=that.replaceKey('calc', name, calcValue, eqValues);
});
}
eqValues=eqValues.replace(/{([a-zA-Z0-9]|:|_|-)*}/g, 0);
eqValues=eqValues.replace(/\r?\n|\r/g, '');
try {
this.debug('Calculation Decoder ' + eqValues + ' -> ' + this.localeDecodeEquation(eqValues) + ' (Setup)');
calcModel.set('value', Number(mexp.eval(this.localeDecodeEquation(eqValues))).toFixed(calcModel.get('dec')));
} catch(e){
console.log(e);
}
if(calcModel.get('value')==='NaN') calcModel.set('value', '0');
},
updateCalcFields: function(calcModel, key, calcValue){
var fields=calcModel.get('fields');
fields[ key ]=calcValue;
calcModel.set('fields', fields);
},
getCalcValue: function(fieldModel){
var value=nfRadio.channel(fieldModel.get('type')).request('get:calcValue', fieldModel);
var localeConverter=new nfLocaleConverter(nfi18n.siteLocale, nfi18n.thousands_sep, nfi18n.decimal_point);
var calcValue=value||fieldModel.get('value');
var machineNumber=localeConverter.numberDecoder(calcValue);
var formattedNumber=localeConverter.numberEncoder(calcValue);
if('undefined'!==typeof machineNumber&&jQuery.isNumeric(machineNumber)){
value=formattedNumber;
}else{
value=0;
}
if(! fieldModel.get('visible')){
value=0;
}
return value;
},
replaceKey: function(type, key, calcValue, eq){
eq=eq||calcModel.get('eq');
tag='{' + type + ':' + key + '}';
var reTag=new RegExp(tag, 'g');
calcTag='{' + type + ':' + key + ':calc}';
var reCalcTag=new RegExp(calcTag, 'g');
eq=eq.replace(reTag, calcValue);
eq=eq.replace(reCalcTag, calcValue);
return eq;
},
replaceAllKeys: function(calcModel){
var eq=calcModel.get('eq');
var that=this;
_.each(calcModel.get('fields'), function(value, key){
eq=that.replaceKey('field', key, value, eq);
});
var calcs=eq.match(new RegExp(/{calc:(.*?)}/g));
if(calcs){
_.each(calcs, function(calc){
var name=calc.replace('}', '').replace('{calc:', '');
var targetCalcModel=calcModel.collection.findWhere({ name: name });
if('undefined'==typeof targetCalcModel) return;
var re=new RegExp(calc, 'g');
eq=eq.replace(re, targetCalcModel.get('value'));
});
}
return eq;
},
changeField: function(calcModel, fieldModel){
var key=fieldModel.get('key');
var value=this.getCalcValue(fieldModel);
this.updateCalcFields(calcModel, key, value);
var eqValues=this.replaceAllKeys(calcModel);
eqValues=eqValues.replace(/{([a-zA-Z0-9]|:|_|-)*}/g, '0');
eqValues=eqValues.replace(/\r?\n|\r/g, '');
try {
this.debug('Calculation Decoder ' + eqValues + ' -> ' + this.localeDecodeEquation(eqValues) + ' (Change Field)');
calcModel.set('value', Number(mexp.eval(this.localeDecodeEquation(eqValues))).toFixed(calcModel.get('dec')));
} catch(e){
if(this.debug())console.log(e);
}
if(calcModel.get('value')==='NaN') calcModel.set('value', '0');
},
initDisplayField: function(fieldModel){
if(! fieldModel.get('default')||'string'!=typeof fieldModel.get('default')) return;
var calcs=fieldModel.get('default').match(new RegExp(/{calc:(.*?)}/g));
if(calcs){
_.each(calcs, function(calcName){
calcName=calcName.replace('{calc:', '').replace('}', '').replace(':2', '');
this.displayFields[ calcName ]=this.displayFields[ calcName ]||[];
this.displayFields[ calcName ].push(fieldModel);
}, this);
}},
updateDisplayFields: function(calcModel){
var that=this;
if('undefined'!=typeof this.displayFields[ calcModel.get('name') ]){
_.each(this.displayFields[ calcModel.get('name') ], function(fieldModel){
var value='';
if("html"===fieldModel.get('type')){
value=fieldModel.get('value');
}else{
value=fieldModel.get('default');
}
var spans=value.match(new RegExp(/<span data-key="calc:(.*?)<\/span>/g));
_.each(spans, function(spanVar){
var tmpCalcTag="{" + spanVar.replace("<span" +
" data-key=\"", "").replace(/">(.*?)<\/span>/, "") + "}";
value=value.replace(spanVar, tmpCalcTag);
});
var calcs=value.match(new RegExp(/{calc:(.*?)}/g));
_.each(calcs, function(calc){
var name=calc.replace('}', '').replace('{calc:', '').replace(':2', '');
var calcModel=that.calcs[ fieldModel.get('formID') ].findWhere({ name: name });
var re=new RegExp(calc, 'g');
var calcValue=calcModel.get('value') ;
if('undefined'!=typeof(calcValue)){
calcValue=that.applyLocaleFormatting(calcValue, calcModel);
}
if("html"===fieldModel.get('type')){
value=value.replace(re, "<span data-key=\"calc:" + name + "\">"
+ calcValue + "</span>");
}else{
value=calcValue;
}});
fieldModel.set('value', value);
if(! that.init[ calcModel.get('name') ]){
fieldModel.trigger('reRender');
}
that.init[ calcModel.get('name') ]=false;
});
}},
getCalc: function(name, formID){
return this.calcs[ formID ].findWhere({ name: name });
},
changeCalc: function(calcModel, targetCalcModel){
var eqValues=this.replaceAllKeys(calcModel);
eqValues=eqValues.replace('[', '').replace(']', '');
eqValues=eqValues.replace(/\r?\n|\r/g, '');
try {
this.debug('Calculation Decoder ' + eqValues + ' -> ' + this.localeDecodeEquation(eqValues) + ' (Change Calc)');
calcModel.set('value', Number(mexp.eval(this.localeDecodeEquation(eqValues))).toFixed(calcModel.get('dec')));
} catch(e){
console.log(e);
}
if(calcModel.get('value')==='NaN') calcModel.set('value', '0');
},
applyLocaleFormatting: function(number, calcModel){
var localeConverter=new nfLocaleConverter(nfi18n.siteLocale, nfi18n.thousands_sep, nfi18n.decimal_point);
var formattedNumber=localeConverter.numberEncoder(number, calcModel.get('dec'));
return formattedNumber;
},
localeDecodeEquation: function(eq){
var result='';
var expression='';
var pattern=/[0-9.,]/;
var localeConverter=new nfLocaleConverter(nfi18n.siteLocale, nfi18n.thousands_sep, nfi18n.decimal_point);
eq=eq.replace(/\s/g, '');
eq=eq.replace(/&nbsp;/g, '');
var characters=eq.split('');
characters.forEach(function(character){
if(pattern.test(character)){
expression=expression + character;
}else{
if(0 < expression.length){
result=result + localeConverter.numberDecoder(expression);
expression='';
}
result=result + character;
}});
if(0 < expression.length){
result=result + localeConverter.numberDecoder(expression);
}
return result;
},
debug: function(message){
if(window.nfCalculationsDebug||false) console.log(message);
}});
return controller;
});
define('controllers/dateBackwardsCompat',[], function(){
var controller=Marionette.Object.extend({
initialize: function (){
this.listenTo(Backbone.Radio.channel('pikaday-bc'), 'init', this.dateBackwardsCompat);
},
dateBackwardsCompat: function(dateObject, fieldModel){
dateObject.pikaday={};
dateObject.pikaday._o={};
nfRadio.channel('pikaday').trigger('init', dateObject, fieldModel);
if(typeof dateObject.pikaday._o.disableDayFn!=='undefined'){
dateObject.set('disable', [ dateObject.pikaday._o.disableDayFn ]);
}
if(typeof dateObject.pikaday._o.i18n!=='undefined'||typeof dateObject.pikaday._o.firstDay!=='undefined'){
let locale=dateObject.config.locale;
if(typeof dateObject.pikaday._o.firstDay!=='undefined'){
locale.firstDayOfWeek=dateObject.pikaday._o.firstDay;
}
if(typeof dateObject.pikaday._o.i18n!=='undefined'){
if(typeof dateObject.pikaday._o.i18n.weekdays!=='undefined'){
locale.weekdays.longhand=dateObject.pikaday._o.i18n.weekdays;
}
if(typeof dateObject.pikaday._o.i18n.weekdaysShort!=='undefined'){
locale.weekdays.shorthand=dateObject.pikaday._o.i18n.weekdaysShort;
}
if(typeof dateObject.pikaday._o.i18n.months!=='undefined'){
jQuery('.flatpickr-monthDropdown-months > option').each(function(){
this.text=dateObject.pikaday._o.i18n.months[ this.value ];
});
}}
dateObject.set('locale', locale);
}
if(Object.keys(dateObject.pikaday._o).length > 0){
console.log("%cDeprecated Ninja Forms Pikaday custom code detected.", "color: Red; font-size: large");
console.log("You are using deprecated Ninja Forms Pikaday custom code. Support for this custom code will be removed in a future version of Ninja Forms. Please contact Ninja Forms support for more details.");
}}
});
return controller;
});
define('controllers/fieldDate',[], function(){
var controller=Marionette.Object.extend({
initialize: function (){
this.listenTo(nfRadio.channel('date'), 'render:view', this.initDatepicker);
},
initDatepicker: function(view){
var dateFormat=view.model.get('date_format');
if(''==dateFormat||'default'==dateFormat){
dateFormat=this.convertDateFormat(nfi18n.dateFormat);
}
var el=jQuery(view.el).find('.nf-element')[0];
var dateSettings={
classes: jQuery(el).attr("class"),
placeholder: view.model.get('placeholder'),
parseDate: function (datestr, format){
return moment(datestr, format, true).toDate();
},
formatDate: function (date, format, locale){
return moment(date).format(format);
},
dateFormat: dateFormat,
altFormat: dateFormat,
altInput: true,
ariaDateFormat: dateFormat,
mode: "single",
disableMobile: "true",
locale: {
months: {
shorthand: nfi18n.monthsShort,
longhand: nfi18n.months
},
weekdays: {
shorthand: nfi18n.weekdaysShort,
longhand: nfi18n.weekdays
},
firstDayOfWeek: nfi18n.startOfWeek,
}};
var dateObject=flatpickr(el, dateSettings);
if(1==view.model.get('date_default')){
dateObject.setDate(moment().format(dateFormat));
}
nfRadio.channel('pikaday-bc').trigger('init', dateObject, view.model);
nfRadio.channel('flatpickr').trigger('init', dateObject, view.model);
},
getYearRange: function(fieldModel){
var yearRange=10;
var yearRangeStart=fieldModel.get('year_range_start');
var yearRangeEnd=fieldModel.get('year_range_end');
if(yearRangeStart&&yearRangeEnd){
return [ yearRangeStart, yearRangeEnd ];
}else if(yearRangeStart){
yearRangeEnd=yearRangeStart + yearRange;
return [ yearRangeStart, yearRangeEnd ];
}else if(yearRangeEnd){
yearRangeStart=yearRangeEnd - yearRange;
return [ yearRangeStart, yearRangeEnd ];
}
return yearRange;
},
getMinDate: function(fieldModel){
var minDate=null;
var yearRangeStart=fieldModel.get('year_range_start');
if(yearRangeStart){
return new Date(yearRangeStart, 0, 1);
}
return minDate;
},
getMaxDate: function(fieldModel){
var maxDate=null;
var yearRangeEnd=fieldModel.get('year_range_end');
if(yearRangeEnd){
return new Date(yearRangeEnd, 11, 31);
}
return maxDate;
},
convertDateFormat: function(dateFormat){
dateFormat=dateFormat.replace('D', 'ddd');
dateFormat=dateFormat.replace('d', 'DD');
dateFormat=dateFormat.replace('l', 'dddd');
dateFormat=dateFormat.replace('j', 'D');
dateFormat=dateFormat.replace('N', '');
dateFormat=dateFormat.replace('S', '');
dateFormat=dateFormat.replace('w', 'd');
dateFormat=dateFormat.replace('z', '');
dateFormat=dateFormat.replace('W', 'W');
dateFormat=dateFormat.replace('M', 'MMM'); // "M" before "F" or "m" to avoid overriding.
dateFormat=dateFormat.replace('F', 'MMMM');
dateFormat=dateFormat.replace('m', 'MM');
dateFormat=dateFormat.replace('n', 'M');
dateFormat=dateFormat.replace('t', '');
dateFormat=dateFormat.replace('L', '');
dateFormat=dateFormat.replace('o', 'YYYY');
dateFormat=dateFormat.replace('Y', 'YYYY');
dateFormat=dateFormat.replace('y', 'YY');
dateFormat=dateFormat.replace('a', '');
dateFormat=dateFormat.replace('A', '');
dateFormat=dateFormat.replace('B', '');
dateFormat=dateFormat.replace('g', '');
dateFormat=dateFormat.replace('G', '');
dateFormat=dateFormat.replace('h', '');
dateFormat=dateFormat.replace('H', '');
dateFormat=dateFormat.replace('i', '');
dateFormat=dateFormat.replace('s', '');
dateFormat=dateFormat.replace('u', '');
dateFormat=dateFormat.replace('v', '');
dateFormat=dateFormat.replace('e', '');
dateFormat=dateFormat.replace('I', '');
dateFormat=dateFormat.replace('O', '');
dateFormat=dateFormat.replace('P', '');
dateFormat=dateFormat.replace('T', '');
dateFormat=dateFormat.replace('Z', '');
dateFormat=dateFormat.replace('c', '');
dateFormat=dateFormat.replace('r', '');
dateFormat=dateFormat.replace('u', '');
return dateFormat;
}});
return controller;
});
define('controllers/fieldRecaptcha',[], function(){
var controller=Marionette.Object.extend({
initialize: function (){
this.listenTo(nfRadio.channel('recaptcha'), 'init:model',      this.initRecaptcha);
this.listenTo(nfRadio.channel('forms'),     'submit:response', this.resetRecaptcha);
},
initRecaptcha: function(model){
nfRadio.channel('recaptcha').reply('update:response', this.updateResponse, this, model.id);
},
updateResponse: function(response, fieldID){
var model=nfRadio.channel('fields').request('get:field', fieldID);
model.set('value', response);
nfRadio.channel('fields').request('remove:error', model.get('id'), 'required-error');
},
resetRecaptcha: function(){
var recaptchaID=0;
jQuery('.g-recaptcha').each(function(){
try {
grecaptcha.reset(recaptchaID);
} catch(e){
console.log('Notice: Error trying to reset grecaptcha.');
}
recaptchaID++;
});
}});
return controller;
});
define('controllers/fieldHTML',[], function(){
var controller=Marionette.Object.extend({
htmlFields: [],
trackedMergeTags: [],
initialize: function (){
this.listenTo(Backbone.Radio.channel('fields-html'), 'init:model', this.setupFieldMergeTagTracking);
},
setupFieldMergeTagTracking: function(fieldModel){
this.htmlFields.push(fieldModel);
var formID=fieldModel.get('formID');
this.listenTo(nfRadio.channel('form-' + formID), 'init:model', function(formModel){
var mergeTags=fieldModel.get('default').match(new RegExp(/{field:(.*?)}/g));
if(! mergeTags) return;
_.each(mergeTags, function(mergeTag){
var fieldKey=mergeTag.replace('{field:', '').replace('}', '');
var fieldModel=formModel.get('fields').findWhere({ key: fieldKey });
if('undefined'==typeof fieldModel) return;
this.trackedMergeTags.push(fieldModel);
this.listenTo(nfRadio.channel('field-' + fieldModel.get('id')), 'change:modelValue', this.updateFieldMergeTags);
}, this);
this.updateFieldMergeTags();
}, this);
},
updateFieldMergeTags: function(fieldModel){
_.each(this.htmlFields, function(htmlFieldModel){
var value=htmlFieldModel.get('value');
_.each(this.trackedMergeTags, function(fieldModel){
var spans=value.match(new RegExp(/<span data-key="field:(.*?)<\/span>/g));
_.each(spans, function(spanVar){
if(-1 < spanVar.indexOf("data-key=\"field:" + fieldModel.get('key'))){
value=value.replace(spanVar, "{field:" + fieldModel.get('key') + "}");
}});
var mergeTag='{field:' + fieldModel.get('key') + '}';
value=value.replace(mergeTag, "<span data-key=\"field:"
+ fieldModel.get('key') + "\">"
+ fieldModel.get('value') + "</span>");
}, this) ;
htmlFieldModel.set('value', value);
htmlFieldModel.trigger('reRender');
}, this);
}});
return controller;
});
define('controllers/helpText',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('form'), 'render:view', this.initHelpText);
nfRadio.channel('form').reply('init:help', this.initHelpText);
},
initHelpText: function(view){
jQuery(view.el).find('.nf-help').each(function(){
var jBox=jQuery(this).jBox('Tooltip', {
theme: 'TooltipBorder',
content: jQuery(this).data('text')
});
});
}});
return controller;
});
define('controllers/fieldTextbox',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
nfRadio.channel('textbox').reply('get:calcValue', this.getCalcValue, this);
},
getCalcValue: function(fieldModel){
if('currency'==fieldModel.get('mask')){
var form=nfRadio.channel('app').request('get:form', fieldModel.get('formID'));
var currencySymbol=('undefined'!==typeof form) ? form.get('currencySymbol'):'';
var currencySymbolDecoded=jQuery('<textarea />').html(currencySymbol).text();
return fieldModel.get('value').replace(currencySymbolDecoded, '');
}
return fieldModel.get('value');
},
});
return controller;
});
define('controllers/fieldTextareaRTE',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('textarea'), 'render:view', this.initTextareaRTEs);
this.listenTo(nfRadio.channel('textarea'), 'click:extra', this.clickExtra);
this.meta_image_frame;
this.currentContext={};
if('undefined'==typeof jQuery.summernote) return;
jQuery.summernote.options.icons={
'align': 'dashicons dashicons-editor-alignleft',
'alignCenter': 'dashicons dashicons-editor-aligncenter',
'alignJustify': 'dashicons dashicons-editor-justify',
'alignLeft': 'dashicons dashicons-editor-alignleft',
'alignRight': 'dashicons dashicons-editor-alignright',
'indent': 'dashicons dashicons-editor-indent',
'outdent': 'dashicons dashicons-editor-outdent',
'bold': 'dashicons dashicons-editor-bold',
'caret': 'dashicons dashicons-arrow-down',
'close': 'dashicons dashicons-dismiss',
'code': 'dashicons dashicons-editor-code',
'eraser': 'dashicons dashicons-editor-removeformatting',
'italic': 'dashicons dashicons-editor-italic',
'link': 'dashicons dashicons-admin-links',
'unlink': 'dashicons dashicons-editor-unlink',
'magic': 'dashicons dashicons-editor-paragraph',
'minus': 'dashicons dashicons-minus',
'orderedlist': 'dashicons dashicons-editor-ol',
'redo': 'dashicons dashicons-redo',
'square': 'dashicons fa-square',
'table': 'dashicons dashicons-editor-table',
'underline': 'dashicons dashicons-editor-underline',
'undo': 'dashicons dashicons-undo',
'unorderedlist': 'dashicons dashicons-editor-ul',
};},
initTextareaRTEs: function(view){
if(1!=view.model.get('textarea_rte')){
return false;
}
var that=this;
var linkButton=function(context){
return that.linkButton(context);
}
var mediaButton=function(context){
return that.mediaButton(context);
}
var toolbar=[
[ 'paragraphStyle', ['style'] ],
[ 'fontStyle', [ 'bold', 'italic', 'underline','clear' ] ],
[ 'lists', [ 'ul', 'ol' ] ],
[ 'paragraph', [ 'paragraph' ] ],
[ 'customGroup', [ 'linkButton', 'unlink' ] ],
[ 'table', [ 'table' ] ],
[ 'actions', [ 'undo', 'redo' ] ],
];
if(1==view.model.get('textarea_media')&&0!=userSettings.uid){
toolbar.push([ 'tools', [ 'mediaButton' ] ]);
}
jQuery(view.el).find('.nf-element').summernote({
toolbar: toolbar,
buttons: {
linkButton: linkButton,
mediaButton: mediaButton
},
height: 150,
codemirror: {
theme: 'monokai',
lineNumbers: true
},
prettifyHtml: true,
callbacks: {
onChange: function(e){
view.model.set('value', jQuery(this).summernote('code'));
}}
});
var linkMenu=jQuery(view.el).find('.link-button').next('.dropdown-menu').find('button');
linkMenu.replaceWith(function (){
return jQuery('<div/>', {
class: jQuery(linkMenu).attr('class'),
html: this.innerHTML
});
});
},
linkButton: function(context){
var that=this;
var ui=jQuery.summernote.ui;
var linkButton=nfRadio.channel('app').request('get:template',  '#tmpl-nf-rte-link-button');
var linkDropdown=nfRadio.channel('app').request('get:template',  '#tmpl-nf-rte-link-dropdown');
return ui.buttonGroup([
ui.button({
className: 'dropdown-toggle link-button',
contents: linkButton({}),
tooltip: nfi18n.fieldTextareaRTEInsertLink,
click: function(e){
that.clickLinkButton(e, context);
},
data: {
toggle: 'dropdown'
}}),
ui.dropdown([
ui.buttonGroup({
children: [
ui.button({
contents: linkDropdown({}),
tooltip: ''
}),
]
})
])
]).render();
},
mediaButton: function(context){
var that=this;
var ui=jQuery.summernote.ui;
var mediaButton=nfRadio.channel('app').request('get:template',  '#tmpl-nf-rte-media-button');
return ui.button({
className: 'dropdown-toggle',
contents: mediaButton({}),
tooltip: nfi18n.fieldTextareaRTEInsertMedia,
click: function(e){
that.openMediaManager(e, context);
}}).render();
},
openMediaManager: function(e, context){
context.invoke('editor.saveRange');
if(this.meta_image_frame){
this.meta_image_frame.open();
return;
}
this.meta_image_frame=wp.media.frames.meta_image_frame=wp.media({
title: nfi18n.fieldTextareaRTESelectAFile,
button: { text:  'insert' }});
var that=this;
this.meta_image_frame.on('select', function(){
var media_attachment=that.meta_image_frame.state().get('selection').first().toJSON();
that.insertMedia(media_attachment, context);
});
this.meta_image_frame.open();
},
clickLinkButton: function(e, context){
var range=context.invoke('editor.createRange');
context.invoke('editor.saveRange');
var text=range.toString()
this.currentContext=context;
jQuery(e.target).closest('.note-customGroup > .note-btn-group').on ('hide.bs.dropdown', function(e){
return false;
});
jQuery(e.target).closest('.note-customGroup > .note-btn-group').on ('shown.bs.dropdown', function(e){
jQuery(e.target).parent().parent().find('.link-text').val(text);
jQuery(e.target).parent().parent().find('.link-url').focus();
});
},
clickExtra: function(e){
var textEl=jQuery(e.target).parent().find('.link-text');
var urlEl=jQuery(e.target).parent().find('.link-url');
var isNewWindowEl=jQuery(e.target).parent().find('.link-new-window');
this.currentContext.invoke('editor.restoreRange');
if(jQuery(e.target).hasClass('insert-link')){
var text=textEl.val();
var url=urlEl.val();
var isNewWindow=(isNewWindowEl.prop('checked')) ? true: false;
if(0!=text.length&&0!=url.length){
this.currentContext.invoke('editor.createLink', { text:text, url: url, isNewWindow: isNewWindow });
}}
textEl.val('');
urlEl.val('');
isNewWindowEl.prop('checked', false);
jQuery(e.target).closest('div.note-btn-group.open').removeClass('open');
},
insertMedia: function(media, context){
context.invoke('editor.restoreRange');
if('image'==media.type){
context.invoke('editor.insertImage', media.url);
}else{
context.invoke('editor.createLink', { text: media.filename, url: media.url });
}}
});
return controller;
});
define('controllers/fieldStarRating',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('starrating'), 'init:model', this.register);
this.listenTo(nfRadio.channel('starrating'), 'render:view', this.initRating);
},
register: function(model){
model.set('renderRatings', this.renderRatings);
},
initRating: function(view){
jQuery(view.el).find('.starrating').rating();
},
renderRatings: function(){
var html=document.createElement('span');
for (var i=0; i <=this.number_of_stars - 1; i++){
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-starrating-star');
var num=i + 1;
var checked='';
if(this.value==num){
checked='checked';
}
var htmlFragment=template({ id: this.id, classes: this.classes, num: num, checked: checked, required: this.required });
html.appendChild(document.createRange().createContextualFragment(htmlFragment)
);
}
return html.innerHTML;
}});
return controller;
});
define('controllers/fieldTerms',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('terms'), 'init:model', this.register);
},
register: function(model){
this.listenTo(nfRadio.channel('field-' + model.get('id')), 'click:extra', this.clickExtra);
this.listenTo(nfRadio.channel('field-' + model.get('id')), 'keyup:field', this.keyUpExtra);
},
clickExtra: function(e, model){
var el=jQuery(e.currentTarget);
var value=el.parent().find('.extra-value').val();
this.addOption(model, value);
},
keyUpExtra: function(el, model, keyCode){
if(13!=keyCode) return;
this.addOption(model, el.val());
},
addOption: function(model, value){
if(! value) return;
var options=model.get('options');
var new_option={
label: value,
value: value,
selected: 0,
};
options.push(new_option);
var selected=model.get('value');
selected.push(value);
model.trigger('reRender');
}});
return controller;
});
define('controllers/formContentFilters',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.viewFilters=[];
this.loadFilters=[];
nfRadio.channel('formContent').reply('add:viewFilter', this.addViewFilter, this);
nfRadio.channel('formContent').reply('add:loadFilter', this.addLoadFilter, this);
nfRadio.channel('formContent').reply('get:viewFilters', this.getViewFilters, this);
nfRadio.channel('formContent').reply('get:loadFilters', this.getLoadFilters, this);
nfRadio.channel('fieldContents').reply('add:viewFilter', this.addViewFilter, this);
nfRadio.channel('fieldContents').reply('add:loadFilter', this.addLoadFilter, this);
nfRadio.channel('fieldContents').reply('get:viewFilters', this.getViewFilters, this);
nfRadio.channel('fieldContents').reply('get:loadFilters', this.getLoadFilters, this);
},
addViewFilter: function(callback, priority){
this.viewFilters[ priority ]=callback;
},
getViewFilters: function(){
return this.viewFilters;
},
addLoadFilter: function(callback, priority){
this.loadFilters[ priority ]=callback;
},
getLoadFilters: function(){
return this.loadFilters;
}});
return controller;
});
define('views/fieldItem',[], function(){
var view=Marionette.ItemView.extend({
tagName: 'div',
initialize: function(){
this.listenTo(this.model, 'reRender', this.render, this);
this.listenTo(this.model, 'change:addWrapperClass', this.addWrapperClass, this);
this.listenTo(this.model, 'change:removeWrapperClass', this.removeWrapperClass, this);
this.listenTo(this.model, 'change:invalid', this.toggleAriaInvalid, this);
this.template='#tmpl-nf-field-' + this.model.get('wrap_template');
},
test: function(model){
console.log('firing from trigger 1');
},
addWrapperClass: function(){
var cl=this.model.get('addWrapperClass');
if(''!=cl){
jQuery(this.el).addClass(cl);
this.model.set('addWrapperClass', '');
}},
removeWrapperClass: function(){
var cl=this.model.get('removeWrapperClass');
if(''!=cl){
jQuery(this.el).removeClass(cl);
this.model.set('removeWrapperClass', '');
}},
toggleAriaInvalid: function(){
var invalid=this.model.get('invalid');
jQuery('[aria-invalid]', this.el).attr('aria-invalid', JSON.stringify(invalid));
},
onRender: function(){
this.$el=this.$el.children();
this.$el.unwrap();
this.setElement(this.$el);
if('undefined'!=typeof this.model.get('mask')&&''!=jQuery.trim(this.model.get('mask'))){
if('custom'==this.model.get('mask')){
var mask=this.model.get('custom_mask');
}else{
var mask=this.model.get('mask');
}
Number.isInteger=Number.isInteger||function(value){ return typeof value==="number"&&isFinite(value)&&Math.floor(value)===value; };
if(Number.isInteger(mask)){
mask=mask.toString();
}
if('currency'==mask){
var form=nfRadio.channel('app').request('get:form', this.model.get('formID'));
var thousands_sep=form.get('thousands_sep');
if('&nbsp;'==thousands_sep){
thousands_sep=' ';
}
var currencySymbol=jQuery('<div/>').html(form.get('currencySymbol')).text();
thousands_sep=jQuery('<div/>').html(thousands_sep).text();
var decimal_point=jQuery('<div/>').html(form.get('decimal_point')).text();
var autoNumericOptions={
digitGroupSeparator:thousands_sep,
decimalCharacter:decimal_point,
currencySymbol:currencySymbol
};
var autoN_el=jQuery(jQuery(this.el).find('.nf-element')[ 0 ]);
new AutoNumeric(jQuery(this.el).find('.nf-element')[ 0 ], autoNumericOptions);
var context=this;
autoN_el.on('change', function(e){
context.model.set('value', e.target.value);
})
}else{
jQuery(this.el).find('.nf-element').mask(mask);
}}
nfRadio.channel(this.model.get('type')).trigger('render:view', this);
nfRadio.channel('fields').trigger('render:view', this);
},
templateHelpers: function (){
var that=this;
return {
renderElement: function(){
var tmpl=_.find(this.element_templates, function(tmpl){
if(0 < jQuery('#tmpl-nf-field-' + tmpl).length){
return true;
}});
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-' + tmpl);
return template(this);
},
renderLabel: function(){
var template=nfRadio.channel('app').request('get:template',  '#tmpl-nf-field-label');
return template(this);
},
renderLabelClasses: function (){
var classes='';
if('undefined'!=typeof this.customLabelClasses){
classes=this.customLabelClasses(classes);
}
return classes;
},
renderPlaceholder: function(){
var placeholder=this.placeholder;
if('undefined'!=typeof this.customPlaceholder){
placeholder=this.customPlaceholder(placeholder);
}
if(''!=jQuery.trim(placeholder)){
return 'placeholder="' + placeholder + '"';
}else{
return '';
}},
renderWrapClass: function(){
var wrapClass='field-wrap ' + this.type + '-wrap';
if(this.type!==this.parentType){
wrapClass=wrapClass + ' ' + this.parentType + '-wrap';
}
if('undefined'!=typeof this.old_classname&&0 < jQuery.trim(this.old_classname).length){
wrapClass +=' ' + this.old_classname + '-wrap';
}
if('undefined'!=typeof customWrapClass){
wrapClass=customWrapClass(wrapClass);
}
return wrapClass;
},
renderClasses: function(){
var classes=this.classes;
if(this.error){
classes +=' nf-error';
}else{
classes=classes.replace('nf-error', '');
}
if('undefined'!=typeof this.element_class&&0 < jQuery.trim(this.element_class).length){
classes +=' ' + this.element_class;
}
if('undefined'!=typeof this.customClasses){
classes=this.customClasses(classes);
}
return classes;
},
maybeDisabled: function(){
if(1==this.disable_input){
return 'disabled';
}else{
return '';
}},
maybeRequired: function(){
if(1==this.required){
return 'required';
}else{
return '';
}},
maybeDisableAutocomplete: function(){
if(1==this.disable_browser_autocomplete){
return 'autocomplete="off"';
}else{
return '';
}},
maybeInputLimit: function(){
if('characters'==this.input_limit_type&&''!=jQuery.trim(this.input_limit)){
return 'maxlength="' + this.input_limit + '"';
}else{
return '';
}},
getHelpText: function(){
return('undefined'!=typeof this.help_text) ? this.help_text:'';
},
maybeRenderHelp: function(){
var check_text_par=document.createElement('p');
check_text_par.innerHTML=this.help_text;
var shouldRenderHelpText=false;
if(0!=jQuery.trim(jQuery(check_text_par).text()).length
|| 0 < jQuery(check_text_par).find('img').length){
shouldRenderHelpText=true;
}
if('undefined'!=typeof this.help_text&&shouldRenderHelpText){
var icon=document.createElement('span');
icon.classList.add('fa', 'fa-info-circle', 'nf-help');
icon.setAttribute('data-text', this.getHelpText());
return icon.outerHTML;
}else{
return '';
}},
renderDescText: function(){
if('undefined'==typeof this.desc_text){
return '';
}
var text=document.createElement('p');
text.innerHTML=this.desc_text;
if(0==jQuery.trim(text.innerText).length) return '';
var check, checkText;
checkText=document.createTextNode(this.desc_text);
check=document.createElement('p');
check.appendChild(checkText);
if(0!=jQuery.trim(jQuery(check).text()).length){
var descriptionText, fieldDescription;
descriptionText=document.createRange().createContextualFragment(this.desc_text);
fieldDescription=document.createElement('div');
fieldDescription.classList.add('nf-field-description');
fieldDescription.appendChild(descriptionText);
return fieldDescription.outerHTML;
}else{
return '';
}},
renderNumberDefault: function(){
if(this.clean){
if(this.default){
return this.default;
}
else if(! this.placeholder){
return this.value;
}else{
return '';
}}else{
return this.value;
}},
renderCurrencyFormatting: function(number){
var replacedDecimal=number.toString().replace('.', '||');
var replacedThousands=replacedDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, nfi18n.thousands_sep);
var formattedNumber=replacedThousands.replace('||', nfi18n.decimal_point);
var form=nfRadio.channel('app').request('get:form', that.model.get('formID'));
var currency_symbol=form.get('settings').currency_symbol;
return currency_symbol + formattedNumber;
}};},
events: {
'change .nf-element': 'fieldChange',
'keyup .nf-element': 'fieldKeyup',
'click .nf-element': 'fieldClick',
'click .extra': 'extraClick',
'blur .nf-element': 'fieldBlur'
},
fieldChange: function(e){
var el=jQuery(e.currentTarget);
var response=nfRadio.channel('nfAdmin').request('change:field', el, this.model);
},
fieldKeyup: function(e){
var el=jQuery(e.currentTarget);
var keyCode=e.keyCode;
nfRadio.channel('field-' + this.model.get('id')).trigger('keyup:field', el, this.model, keyCode);
nfRadio.channel(this.model.get('type')).trigger('keyup:field', el, this.model, keyCode);
nfRadio.channel('fields').trigger('keyup:field', el, this.model, keyCode);
},
fieldClick: function(e){
var el=jQuery(e.currentTarget);
nfRadio.channel('field-' + this.model.get('id')).trigger('click:field', el, this.model);
nfRadio.channel(this.model.get('type')).trigger('click:field', el, this.model);
nfRadio.channel('fields').trigger('click:field', el, this.model);
},
extraClick: function(e){
nfRadio.channel('field-' + this.model.get('id')).trigger('click:extra', e, this.model);
nfRadio.channel(this.model.get('type')).trigger('click:extra', e, this.model);
nfRadio.channel('fields').trigger('click:extra', e, this.model);
},
fieldBlur: function(e){
var el=jQuery(e.currentTarget);
nfRadio.channel('field-' + this.model.get('id')).trigger('blur:field', el, this.model);
nfRadio.channel(this.model.get('type')).trigger('blur:field', el, this.model);
nfRadio.channel('fields').trigger('blur:field', el, this.model);
},
onAttach: function(){
nfRadio.channel(this.model.get('type')).trigger('attach:view', this);
}});
return view;
});
define('views/beforeField',[], function(){
var view=Marionette.ItemView.extend({
tagName: 'nf-section',
template: '#tmpl-nf-field-before'
});
return view;
});
define('views/fieldErrorItem',[], function(){
var view=Marionette.ItemView.extend({
tagName: 'nf-section',
template: '#tmpl-nf-field-error',
onRender: function(){
this.$el=this.$el.children();
this.$el.unwrap();
this.setElement(this.$el);
},
});
return view;
});
define('views/fieldErrorCollection',['views/fieldErrorItem'], function(fieldErrorItem){
var view=Marionette.CollectionView.extend({
tagName: "nf-errors",
childView: fieldErrorItem,
initialize: function(options){
this.fieldModel=options.fieldModel;
},
onRender: function(){
if(0==this.fieldModel.get('errors').models.length){
this.fieldModel.removeWrapperClass('nf-error');
this.fieldModel.removeWrapperClass('nf-fail');
this.fieldModel.addWrapperClass('nf-pass');
this.fieldModel.setInvalid(false);
}else{
this.fieldModel.removeWrapperClass('nf-pass');
this.fieldModel.addWrapperClass('nf-fail');
this.fieldModel.addWrapperClass('nf-error');
this.fieldModel.setInvalid(true);
}}
});
return view;
});
define('views/inputLimit',[], function(){
var view=Marionette.ItemView.extend({
tagName: 'nf-section',
template: '#tmpl-nf-field-input-limit',
initialize: function(){
this.listenTo(nfRadio.channel('field-' + this.model.get('id')), 'keyup:field', this.updateCount);
this.count=this.model.get('input_limit');
this.render();
},
updateCount: function(el, model){
var value=jQuery(el).val();
var regex=/\s+/gi;
var words=value.trim().replace(regex, ' ').split(' ');
var wordCount=words.length;
var charCount=value.length;
if('characters'==this.model.get('input_limit_type')
|| 'char'==this.model.get('input_limit_type')){
jQuery(el).attr('maxlength', this.model.get('input_limit'));
this.count=this.model.get('input_limit') - charCount;
}else{
this.count=this.model.get('input_limit') - wordCount;
var limit=this.model.get('input_limit');
if(wordCount > limit){
jQuery(el).val(words.slice(0, limit).join(' '));
}}
this.render();
},
templateHelpers: function(){
var that=this;
return {
currentCount: function(){
return that.count;
}}
}});
return view;
});
define('views/afterField',['views/fieldErrorCollection', 'views/inputLimit'], function(fieldErrorCollection, InputLimitView){
var view=Marionette.ItemView.extend({
tagName: 'nf-section',
template: '#tmpl-nf-field-after',
initialize: function(){
this.model.on('change:errors', this.changeError, this);
},
onRender: function(){
var errorEl=jQuery(this.el).children('.nf-error-wrap');
this.errorCollectionView=new fieldErrorCollection({ el: errorEl, collection: this.model.get('errors'), fieldModel: this.model });
if(0 < this.model.get('errors').length){
this.errorCollectionView.render();
}
if('undefined'!=typeof this.model.get('input_limit')&&''!=jQuery.trim(this.model.get('input_limit'))){
var inputLimitEl=jQuery(this.el).children('.nf-input-limit');
this.inputLimitView=new InputLimitView({ el: inputLimitEl, model: this.model });
}},
changeError: function(){
this.errorCollectionView.render();
},
});
return view;
});
define('views/fieldRepeaterFieldLayout',['views/fieldItem', 'views/beforeField', 'views/afterField'], function(fieldItem, beforeField, afterField){
var view=Marionette.LayoutView.extend({
tagName: 'nf-field',
regions: {
beforeField: '.nf-before-field',
field: '.nf-field',
afterField: '.nf-after-field',
},
initialize: function(){
this.listenTo(this.model, 'change:visible', this.render, this);
},
getTemplate: function(){
if(this.model.get('visible')){
return '#tmpl-nf-field-layout';
}else{
return '#tmpl-nf-empty';
}},
onRender: function(){
if(this.model.get('visible')){
this.beforeField.show(new beforeField({ model: this.model }));
this.field.show(new fieldItem({ model: this.model }));
this.afterField.show(new afterField({ model: this.model }));
}},
templateHelpers: function(){
return {
renderContainerClass: function(){
var containerClass=' label-' + this.label_pos + ' ';
if('undefined'!=typeof this.desc_pos){
containerClass +='desc-' + this.desc_pos + ' ';
}
if('undefined'!=typeof this.container_class&&0 < jQuery.trim(this.container_class).length){
containerClass +=this.container_class + ' ';
}
if(this.type!==this.parentType){
containerClass +=' ' + this.parentType + '-container';
}
return containerClass;
}}
}});
return view;
});
define('views/fieldRepeaterFieldCollection',['views/fieldRepeaterFieldLayout'], function(fieldLayout){
var view=Marionette.CollectionView.extend({
tagName: 'nf-fields-wrap',
childView: fieldLayout,
});
return view;
});
define('views/fieldRepeaterSetLayout',[ 'views/fieldRepeaterFieldCollection' ], function(fieldCollection){
var view=Marionette.LayoutView.extend({
tagName: 'fieldset',
template: '#tmpl-nf-field-repeater-set',
regions: {
fields: '.nf-repeater-fieldset',
},
onRender: function(){
this.fields.show(new fieldCollection({ collection: this.model.get('fields') }));
},
events: {
'click .nf-remove-fieldset': 'removeSet',
},
removeSet: function(){
nfRadio.channel("field-repeater").trigger('remove:fieldset',  this.model)
}});
return view;
});
define('views/fieldRepeaterSetCollection',['views/fieldRepeaterSetLayout'], function(repeaterSetLayout){
var view=Marionette.CollectionView.extend({
tagName: 'div',
childView: repeaterSetLayout,
});
return view;
});
define('views/fieldRepeaterLayout',[ 'views/fieldRepeaterSetCollection' ], function(repeaterSetCollection){
var view=Marionette.LayoutView.extend({
tagName: 'div',
template: '#tmpl-nf-field-repeater',
regions: {
sets: '.nf-repeater-fieldsets',
},
initialize: function(){
this.collection=this.model.get('sets');
nfRadio.channel('field-repeater').on('rerender:fieldsets', this.render, this);
this.listenTo(nfRadio.channel('form-' + this.model.get('formID')), 'before:submit', this.beforeSubmit);
},
onRender: function(){
this.sets.show(new repeaterSetCollection({ collection: this.collection }));
},
events: {
'click .nf-add-fieldset': 'addSet'
},
addSet: function(e){
nfRadio.channel('field-repeater').trigger('add:fieldset', e);
},
beforeSubmit: function(){
this.collection.beforeSubmit(this.model.get('sets'));
}});
return view;
});
define('views/fieldLayout',['views/fieldItem', 'views/beforeField', 'views/afterField', 'views/fieldRepeaterLayout'], function(fieldItem, beforeField, afterField, repeaterFieldLayout){
var view=Marionette.LayoutView.extend({
tagName: 'nf-field',
regions: {
beforeField: '.nf-before-field',
field: '.nf-field',
afterField: '.nf-after-field',
},
initialize: function(){
this.listenTo(this.model, 'change:visible', this.render, this);
},
getTemplate: function(){
if(this.model.get('visible')){
return '#tmpl-nf-field-layout';
}else{
return '#tmpl-nf-empty';
}},
onRender: function(){
if(this.model.get('visible')){
this.beforeField.show(new beforeField({ model: this.model }));
if('repeater'==this.model.get('type')){
this.field.show(new repeaterFieldLayout({ model: this.model }));
}else{
this.field.show(new fieldItem({ model: this.model }));
}
this.afterField.show(new afterField({ model: this.model }));
}},
templateHelpers: function(){
return {
renderContainerClass: function(){
var containerClass=' label-' + this.label_pos + ' ';
if('undefined'!=typeof this.desc_pos){
containerClass +='desc-' + this.desc_pos + ' ';
}
if('undefined'!=typeof this.container_class&&0 < jQuery.trim(this.container_class).length){
containerClass +=this.container_class + ' ';
}
if(this.type!==this.parentType){
containerClass +=' ' + this.parentType + '-container';
}
return containerClass;
}}
}});
return view;
});
define('controllers/loadViews',['views/fieldItem', 'views/fieldLayout'], function(fieldItemView, fieldLayoutView){
var controller=Marionette.Object.extend({
initialize: function(){
nfRadio.channel('views').reply('get:fieldItem', this.getFieldItem);
nfRadio.channel('views').reply('get:fieldLayout', this.getFieldLayout);
},
getFieldItem: function(model){
return fieldItemView;
},
getFieldLayout: function(){
return fieldLayoutView;
}});
return controller;
});
define('controllers/formErrors',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('fields'), 'add:error', this.addError);
this.listenTo(nfRadio.channel('fields'), 'remove:error', this.removeError);
nfRadio.channel('form').reply('get:errors', this.getFormErrors);
},
addError: function(fieldModel, errorID, errorMsg){
var formModel=nfRadio.channel('app').request('get:form', fieldModel.get('formID'));
if('undefined'==typeof formModel.get('fieldErrors')[ fieldModel.get('id') ]){
formModel.get('fieldErrors')[ fieldModel.get('id') ]={};}
formModel.get('fieldErrors')[ fieldModel.get('id') ][ errorID ]=errorMsg;
nfRadio.channel('form-' + fieldModel.get('formID')).request('add:error', 'field-errors', formModel.get('settings').formErrorsCorrectErrors);
},
removeError: function(fieldModel, errorID){
var formModel=nfRadio.channel('app').request('get:form', fieldModel.get('formID'));
formModel.get('fieldErrors')[ fieldModel.get('id') ]=_.omit(formModel.get('fieldErrors')[ fieldModel.get('id') ], errorID);
if(0==_.size(formModel.get('fieldErrors')[ fieldModel.get('id') ])){
delete formModel.get('fieldErrors')[ fieldModel.get('id') ];
}
if(0==_.size(formModel.get('fieldErrors'))){
nfRadio.channel('form-' + fieldModel.get('formID')).request('remove:error', 'field-errors');
}},
getFormErrors: function(formID){
var formModel=nfRadio.channel('app').request('get:form', formID);
var errors=false;
if(formModel){
if(0!==formModel.get('errors').length){
_.each(formModel.get('errors').models, function(error){
errors=errors||{};
errors[ error.get('id') ]=error.get('msg');
});
}}
return errors;
}});
return controller;
});
define('controllers/submit',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('forms'), 'init:model', this.registerSubmitHandler);
},
registerSubmitHandler: function(formModel){
nfRadio.channel('form-' + formModel.get('id')).reply('submit', this.submit);
},
submit: function(formModel){
nfRadio.channel('forms').trigger('before:submit', formModel);
nfRadio.channel('form-' + formModel.get('id')).trigger('before:submit', formModel);
var validate=nfRadio.channel('forms').request('maybe:validate', formModel);
if(false!==validate){
_.each(formModel.get('fields').models, function(fieldModel){
fieldModel.set('clean', false);
});
formModel.get('formContentData').validateFields();
}
var submit=nfRadio.channel('form-' + formModel.get('id')).request('maybe:submit', formModel);
if(false==submit){
nfRadio.channel('forms').trigger('submit:cancel', formModel);
nfRadio.channel('form-' + formModel.get('id')).trigger('submit:cancel', formModel);
return;
}
if(false!==validate){
var blockingFormErrors=_.filter(formModel.get('errors').models, function(error){
if('invalid_email'==error.get('id')||'email_not_sent'==error.get('id')) return false;
return true;
});
if(0!=_.size(blockingFormErrors)){
nfRadio.channel('forms').trigger('submit:failed', formModel);
nfRadio.channel('form-' + formModel.get('id')).trigger('submit:failed', formModel);
return false;
}}
nfRadio.channel('forms').trigger('after:submitValidation', formModel);
nfRadio.channel('form-' + formModel.get('id')).trigger('after:submitValidation', formModel);
var formID=formModel.get('id');
var fields={};
_.each(formModel.get('fields').models, function(field){
var fieldDataDefaults={ value:field.get('value'), id:field.get('id') };
fields[ field.get('id') ]=nfRadio.channel(field.get('type')).request('get:submitData', fieldDataDefaults, field)||fieldDataDefaults;;
});
var extra=formModel.get('extra');
var settings=formModel.get('settings');
delete settings.formContentData;
var formData=JSON.stringify({ id: formID, fields: fields, settings: settings, extra: extra });
var data={
'action': 'nf_ajax_submit',
'security': nfFrontEnd.ajaxNonce,
'nonce_ts': nfFrontEnd.nonce_ts,
'formData': formData
}
var that=this;
jQuery.ajax({
url: nfFrontEnd.adminAjax,
type: 'POST',
data: data,
cache: false,
success: function(data, textStatus, jqXHR){
try {
var response=data;
nfRadio.channel('forms').trigger('submit:response', response, textStatus, jqXHR, formModel.get('id'));
nfRadio.channel('form-' + formModel.get('id')).trigger('submit:response', response, textStatus, jqXHR);
jQuery(document).trigger('nfFormSubmitResponse', { response: response, id: formModel.get('id') });
} catch(e){
console.log(e);
console.log('Parse Error');
console.log(e);
}},
error: function(jqXHR, textStatus, errorThrown){
console.log('ERRORS: ' + errorThrown);
console.log(jqXHR);
try {
var response=jQuery.parseJSON(jqXHR.responseText);
nfRadio.channel('forms').trigger('submit:response', response, textStatus, jqXHR, formModel.get('id'));
nfRadio.channel('form-' + formModel.get('id')).trigger('submit:response', response, textStatus, jqXHR);
} catch(e){
console.log('Parse Error');
}
nfRadio.channel('forms').trigger('submit:response', 'error', textStatus, jqXHR, errorThrown);
}});
}});
return controller;
});
define('views/fieldCollection',['views/fieldLayout'], function(fieldLayout){
var view=Marionette.CollectionView.extend({
tagName: 'nf-fields-wrap',
childView: fieldLayout
});
return view;
});
define('controllers/defaultFilters',[ 'views/fieldCollection', 'models/fieldCollection' ], function(FieldCollectionView, FieldCollection){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('form'), 'before:filterData', this.registerDefaultDataFilter);
},
registerDefaultDataFilter: function(formModel){
nfRadio.channel('formContent').request('add:loadFilter', this.defaultFormContentLoad, 10, this);
nfRadio.channel('formContent').request('add:viewFilter', this.defaultFormContentView, 10, this);
},
defaultFormContentLoad: function(formContentData, formModel, context){
var fieldCollection=formModel.get('fields');
var formContentLoadFilters=nfRadio.channel('formContent').request('get:loadFilters');
var sortedArray=_.without(formContentLoadFilters, undefined);
if(1==sortedArray.length||'undefined'==typeof formContentData||true===formContentData instanceof Backbone.Collection) return formModel.get('fields');
var fieldModels=_.map(formContentData, function(key){
return formModel.get('fields').findWhere({ key: key });
}, this);
var currentFieldCollection=new FieldCollection(fieldModels);
fieldCollection.on('reset', function(collection){
var resetFields=[];
currentFieldCollection.each(function(fieldModel){
if('submit'!=fieldModel.get('type')){
resetFields.push(collection.findWhere({ key: fieldModel.get('key') }));
}else{
resetFields.push(fieldModel);
}});
currentFieldCollection.options={ formModel: formModel };
currentFieldCollection.reset(resetFields);
});
return currentFieldCollection;
},
defaultFormContentView: function(){
return FieldCollectionView;
}});
return controller;
});
define('controllers/uniqueFieldError',[], function(){
var controller=Marionette.Object.extend({
initialize: function(){
this.listenTo(nfRadio.channel('fields'), 'change:modelValue', this.removeError);
this.listenTo(nfRadio.channel('fields'), 'keyup:field', this.removeError);
this.listenTo(nfRadio.channel('fields'), 'blur:field', this.removeError);
},
removeError: function(el, model){
model=model||el;
nfRadio.channel('fields').request('remove:error', model.get('id'), 'unique_field');
},
});
return controller;
});
define('models/fieldRepeaterSetModel',[], function(){
var model=Backbone.Model.extend({
initialize: function(fieldsets, options){
this.repeaterFieldModel=options.repeaterFieldModel;
this.set('label', this.repeaterFieldModel.get('label'));
nfRadio.channel("field-repeater").reply('reset:repeaterFieldsets', this.resetRepeaterFieldsets, this);
nfRadio.channel("field-repeater").reply('get:repeaterFieldsets', this.getRepeaterFieldsets, this);
nfRadio.channel("field-repeater").reply('get:repeaterFields', this.getRepeaterFields, this);
nfRadio.channel("field-repeater").reply('get:repeaterFieldById', this.getRepeaterFieldById, this);
},
resetRepeaterFieldsets: function(models){
this.collection={};
this.collection.models=models;
},
getRepeaterFieldsets: function(){
return this.collection.models;
},
getRepeaterFields: function(){
let fieldsets=this.getRepeaterFieldsets();
if(fieldsets.length <=0) return;
let fields=[];
_.each(fieldsets, function(fieldset){
const inFields=fieldset.get('fields');
_.each(inFields.models, function(field){
fields.push(field);
});
});
return fields;
},
getRepeaterFieldById: function(id){
let fields=this.getRepeaterFields();
if(fields.length <=0) return;
let model;
_.each(fields, function(field){
if(field.id===id){
model=field;
}});
return model;
}});
return model;
});
define('models/fieldRepeaterSetCollection',['models/fieldRepeaterSetModel', 'models/fieldCollection' ], function(repeaterSetModel, fieldCollection){
var collection=Backbone.Collection.extend({
model: repeaterSetModel,
initialize: function(models, options){
this.options=options;
nfRadio.channel("field-repeater").on('sort:fieldsets', this.sortIDs, this);
nfRadio.channel("field-repeater").on('remove:fieldset', this.removeSet, this);
nfRadio.channel("field-repeater").on('add:fieldset', this.addSet, this);
},
addSet: function(e){
const repeaterFieldID=jQuery(e.target).prev(".nf-repeater").data("field-id");
const repeaterFieldModel=this.options.repeaterFieldModel.id===repeaterFieldID ? this.options.repeaterFieldModel:undefined;
if(repeaterFieldModel!==undefined){
let fields=new fieldCollection(this.options.templateFields, { formModel: this.options.formModel, repeaterFieldModel: repeaterFieldModel });
this.add({ fields: fields }, {repeaterFieldModel: repeaterFieldModel });
this.sortIDs();
}},
removeSet: function(fieldset){
this.remove(fieldset);
this.sortIDs();
},
sortIDs: function(){
nfRadio.channel("field-repeater").request('reset:repeaterFieldsets', this.models);
_.each(this.models, function(fieldset, modelIndex){
let fields=fieldset.get('fields');
fieldset.set('index', modelIndex + 1);
_.each(fields.models, function(field){
cutEl=String(field.id).split('_')[0];
field.set("id", cutEl + "_" + modelIndex);
});
});
nfRadio.channel('field-repeater').trigger('rerender:fieldsets');
},
beforeSubmit: function(sets){
let fieldsetCollection=sets.models;
if(fieldsetCollection.length > 0){
let repeaterFieldValue={};
_.each(fieldsetCollection, function(fieldset){
let fields=fieldset.get('fields');
_.each(fields.models, function(field){
let value=field.get('value');
let id=field.get('id');
repeaterFieldValue[id]={
"value": value,
"id": id
}});
});
nfRadio.channel('nfAdmin').request('update:field', this.options.repeaterFieldModel, repeaterFieldValue);
}},
});
return collection;
});
define('controllers/fieldRepeater',[ 'models/fieldRepeaterSetCollection', 'models/fieldCollection' ], function(repeaterSetCollection, fieldCollection){
var controller=Marionette.Object.extend({
initialize: function (){
this.listenTo(nfRadio.channel('repeater'), 'init:model', this.initRepeater);
},
initRepeater: function(model){
if('undefined'==typeof model.collection.options.formModel){
return false;
}
let fields=new fieldCollection(model.get('fields'), { formModel: model.collection.options.formModel },);
model.set('sets', new repeaterSetCollection([ { fields: fields } ], { templateFields: model.get('fields'), formModel: model.collection.options.formModel, repeaterFieldModel: model }));
},
});
return controller;
});
define(
'controllers/loadControllers',[
'controllers/formData',
'controllers/fieldError',
'controllers/changeField',
'controllers/changeEmail',
'controllers/changeDate',
'controllers/fieldCheckbox',
'controllers/fieldCheckboxList',
'controllers/fieldImageList',
'controllers/fieldRadio',
'controllers/fieldNumber',
'controllers/mirrorField',
'controllers/confirmField',
'controllers/updateFieldModel',
'controllers/submitButton',
'controllers/submitDebug',
'controllers/getFormErrors',
'controllers/validateRequired',
'controllers/submitError',
'controllers/actionRedirect',
'controllers/actionSuccess',
'controllers/fieldSelect',
'controllers/coreSubmitResponse',
'controllers/fieldProduct',
'controllers/fieldTotal',
'controllers/fieldQuantity',
'controllers/calculations',
'controllers/dateBackwardsCompat',
'controllers/fieldDate',
'controllers/fieldRecaptcha',
'controllers/fieldHTML',
'controllers/helpText',
'controllers/fieldTextbox',
'controllers/fieldTextareaRTE',
'controllers/fieldStarRating',
'controllers/fieldTerms',
'controllers/formContentFilters',
'controllers/loadViews',
'controllers/formErrors',
'controllers/submit',
'controllers/defaultFilters',
'controllers/uniqueFieldError',
'controllers/fieldRepeater',
],
function(
FormData,
FieldError,
ChangeField,
ChangeEmail,
ChangeDate,
FieldCheckbox,
FieldCheckboxList,
FieldImageList,
FieldRadio,
FieldNumber,
MirrorField,
ConfirmField,
UpdateFieldModel,
SubmitButton,
SubmitDebug,
GetFormErrors,
ValidateRequired,
SubmitError,
ActionRedirect,
ActionSuccess,
FieldSelect,
CoreSubmitResponse,
FieldProduct,
FieldTotal,
FieldQuantity,
Calculations,
DateBackwardsCompat,
FieldDate,
FieldRecaptcha,
FieldHTML,
HelpText,
FieldTextbox,
FieldTextareaRTE,
FieldStarRating,
FieldTerms,
FormContentFilters,
LoadViews,
FormErrors,
Submit,
DefaultFilters,
UniqueFieldError,
FieldRepeater,
){
var controller=Marionette.Object.extend({
initialize: function(){
new LoadViews();
new FormErrors();
new Submit();
new FieldCheckbox();
new FieldCheckboxList();
new FieldImageList();
new FieldRadio();
new FieldNumber();
new FieldSelect();
new FieldProduct();
new FieldTotal();
new FieldQuantity();
new FieldRecaptcha();
new FieldHTML();
new HelpText();
new FieldTextbox();
new FieldTextareaRTE();
new FieldStarRating();
new FieldTerms();
new FormContentFilters();
new UniqueFieldError();
new FieldRepeater();
new FieldError();
new ChangeField();
new ChangeEmail();
new ChangeDate();
new MirrorField();
new ConfirmField();
new UpdateFieldModel();
new SubmitButton();
new SubmitDebug();
new GetFormErrors();
new ValidateRequired();
new SubmitError();
new ActionRedirect();
new ActionSuccess();
new CoreSubmitResponse();
new Calculations();
new DefaultFilters();
new DateBackwardsCompat();
new FieldDate();
new FormData();
}});
return controller;
});
define('views/beforeForm',[], function(){
var view=Marionette.ItemView.extend({
tagName: "nf-section",
template: "#tmpl-nf-before-form",
});
return view;
});
define('views/formErrorItem',[], function(){
var view=Marionette.ItemView.extend({
tagName: 'nf-section',
template: '#tmpl-nf-form-error',
onRender: function(){
},
});
return view;
});
define('views/formErrorCollection',['views/formErrorItem'], function(formErrorItem){
var view=Marionette.CollectionView.extend({
tagName: "nf-errors",
childView: formErrorItem
});
return view;
});
define('views/honeyPot',[], function(){
var view=Marionette.ItemView.extend({
tagName: 'nf-section',
template: '#tmpl-nf-form-hp',
events: {
'keyup .nf-field-hp': 'maybeError',
'change .nf-field-hp': 'maybeError'
},
maybeError: function(e){
if(0==jQuery(e.target).val().length){
nfRadio.channel('form-' + this.model.get('id')).request('remove:error', 'honeyPot');
}else{
var formModel=nfRadio.channel('app').request('get:form',  this.model.get('id'));
nfRadio.channel('form-' + this.model.get('id')).request('add:error', 'honeyPot', formModel.get('settings').honeypotHoneypotError);
}}
});
return view;
});
define('views/afterFormContent',['views/formErrorCollection', 'views/honeyPot'], function(FormErrors, HoneyPot){
var view=Marionette.LayoutView.extend({
tagName: "nf-section",
template: "#tmpl-nf-after-fields",
regions: {
errors: ".nf-form-errors",
hp: ".nf-form-hp"
},
onShow: function(){
this.errors.show(new FormErrors({ collection: this.model.get('errors') }));
this.hp.show(new HoneyPot({ model: this.model }));
}});
return view;
});
define('views/beforeFormContent',[], function(){
var view=Marionette.ItemView.extend({
tagName: "nf-section",
template: "#tmpl-nf-before-fields",
templateHelpers: function (){
return {
renderFieldsMarkedRequired: function(){
var requiredFields=this.fields.filter({ required: 1 });
return(requiredFields.length) ? this.fieldsMarkedRequired:'';
},
};},
});
return view;
});
define('views/formLayout',[ 'views/afterFormContent', 'views/beforeFormContent', 'models/fieldCollection' ], function(AfterFormContent, BeforeFormContent, FieldCollection){
var view=Marionette.LayoutView.extend({
tagName: "nf-section",
template: "#tmpl-nf-form-layout",
regions: {
beforeFormContent: ".nf-before-form-content",
formContent: ".nf-form-content",
afterFormContent: ".nf-after-form-content"
},
initialize: function(){
nfRadio.channel('form-' + this.model.get('id')).reply('get:el', this.getEl, this);
this.listenTo(this.model, 'hide', this.hide);
},
onRender: function(){
this.$el=this.$el.children();
this.$el.unwrap();
this.setElement(this.$el);
},
onShow: function(){
this.beforeFormContent.show(new BeforeFormContent({ model: this.model }));
var formContentData=this.model.get('formContentData');
var formContentViewFilters=nfRadio.channel('formContent').request('get:viewFilters');
var sortedArray=_.without(formContentViewFilters, undefined);
var callback=_.first(sortedArray);
formContentView=callback();
var options={
data: formContentData,
formModel: this.model
};
if(false!==formContentData instanceof Backbone.Collection){
options.collection=formContentData;
}else if(false!==formContentData instanceof Backbone.Model){
options.model=formContentData;
}
this.formContent.show(new formContentView(options));
this.afterFormContent.show(new AfterFormContent({ model: this.model }));
},
getEl: function(){
return this.el;
},
templateHelpers: function (){
return {
renderClasses: function(){
return '';
}};},
hide: function(){
jQuery(this.el).hide();
}});
return view;
});
define('views/afterForm',[], function(){
var view=Marionette.ItemView.extend({
tagName: "nf-section",
template: "#tmpl-nf-after-form",
});
return view;
});
define('views/mainLayout',['views/beforeForm', 'views/formLayout', 'views/afterForm'], function(BeforeForm, FormLayout, AfterForm){
var view=Marionette.LayoutView.extend({
template: '#tmpl-nf-layout',
regions: {
responseMsg: '.nf-response-msg',
beforeForm: '.nf-before-form',
formLayout: '.nf-form-layout',
afterForm: '.nf-after-form'
},
initialize: function(){
this.$el=jQuery('#nf-form-' + this.model.id + '-cont');
this.el='#nf-form-' + this.model.id + '-cont';
this.render();
this.beforeForm.show(new BeforeForm({ model: this.model }));
this.formLayout.show(new FormLayout({ model: this.model, fieldCollection: this.options.fieldCollection }));
this.afterForm.show(new AfterForm({ model: this.model }));
this.listenTo(this.model, 'hide', this.hide);
},
hide: function(){
jQuery(this.el).find('.nf-form-title').hide();
}});
return view;
});
var nfLocaleConverter=function(newLocale, thousands_sep, decimal_sep){
if('undefined'!==typeof newLocale&&0 < newLocale.length){
this.locale=newLocale.split('_').join('-');
}else{
this.locale='en-US';
}
this.thousands_sep=thousands_sep||',';
this.decimal_sep=decimal_sep||'.';
this.uniqueElememts=function(value, index, self){
return self.indexOf(value)===index;
}
this.numberDecoder=function(num){
num=num.toString();
var formatted='';
var negative=false;
if('-'===num.charAt(0)){
negative=true;
num=num.replace('-', '');
}
num=num.replace(/\s/g, '');
num=num.replace(/&nbsp;/g, '');
var myArr=num.split('');
var separators=myArr.filter(function(el){
return !el.match(/[0-9]/);
});
var final_separators=separators.filter(this.uniqueElememts);
switch(final_separators.length){
case 0:
formatted=num;
break;
case 1:
var replacer='';
if(1==separators.length){
separator=separators.pop();
var sides=num.split(separator);
var last=sides.pop();
if(3==last.length&&separator==this.thousands_sep){
replacer='';
}else{
replacer='.';
}}else{
separator=final_separators.pop();
}
formatted=num.split(separator).join(replacer);
break;
case 2:
var find_one=final_separators[0];
var re_one;
if('.'===find_one){
re_one=new RegExp('[.]', 'g');
}else{
re_one=new RegExp(find_one, 'g');
}
formatted=num.replace(re_one, '');
var find_two=final_separators[1];
var re_two;
if('.'===find_two){
re_two=new RegExp('[.]', 'g');
}else{
re_two=new RegExp(find_two, 'g');
}
formatted=formatted.replace(re_two, '.');
break;
default:
return 'NaN';
}
if(negative){
formatted='-' + formatted;
}
this.debug('Number Decoder ' + num + ' -> ' + formatted);
return formatted;
}
this.numberEncoder=function(num, percision){
num=this.numberDecoder(num);
return Intl.NumberFormat(this.locale, { minimumFractionDigits: percision, maximumFractionDigits: percision }).format(num);
}
this.debug=function(message){
if(window.nfLocaleConverterDebug||false) console.log(message);
}}
define("../nfLocaleConverter", function(){});
(function(jQuery){
var originalVal=jQuery.fn.val;
jQuery.fn.val=function(){
var prev;
if(arguments.length > 0){
prev=originalVal.apply(this,[]);
}
var result=originalVal.apply(this, arguments);
if(arguments.length > 0&&prev!=originalVal.apply(this, [])&&jQuery(this).hasClass('nf-element')){
jQuery(this).change();
}
return result;
};})(jQuery);
jQuery(document).ready(function($){
require([ 'models/formCollection', 'models/formModel', 'models/fieldCollection', 'controllers/loadControllers', 'views/mainLayout', '../nfLocaleConverter'], function(formCollection, FormModel, FieldCollection, LoadControllers, mainLayout){
if('undefined'==typeof nfForms){
jQuery('.nf-form-cont').empty();
return;
}
var NinjaForms=Marionette.Application.extend({
forms: {},
initialize: function(options){
var that=this;
Marionette.Renderer.render=function(template, data){
var template=that.template(template);
return template(data);
};
this.urlParameters=_.object(_.compact(_.map(location.search.slice(1).split('&'), function(item){  if(item) return item.split('='); })));
if('undefined'!=typeof this.urlParameters.nf_resume){
this.listenTo(nfRadio.channel('form-' + this.urlParameters.nf_resume), 'loaded', this.restart);
}
nfRadio.channel('app').reply('locale:decodeNumber', this.decodeNumber);
nfRadio.channel('app').reply('locale:encodeNumber',this.encodeNumber);
var loadControllers=new LoadControllers();
nfRadio.channel('app').trigger('after:loadControllers');
nfRadio.channel('app').reply('get:template', this.template);			},
onStart: function(){
var formCollection=nfRadio.channel('app').request('get:forms');
_.each(formCollection.models, function(form, index){
var layoutView=new mainLayout({ model: form, fieldCollection: form.get('fields') });
nfRadio.channel('form').trigger('render:view', layoutView);
jQuery(document).trigger('nfFormReady', layoutView);
});
},
restart: function(formModel){
if('undefined'!=typeof this.urlParameters.nf_resume){
var data={
'action': 'nf_ajax_submit',
'security': nfFrontEnd.ajaxNonce,
'nf_resume': this.urlParameters
};
nfRadio.channel('form-' + formModel.get('id')).trigger('disable:submit');
nfRadio.channel('form-' + formModel.get('id')).trigger('processingLabel');
this.listenTo(nfRadio.channel('form'), 'render:view', function(){
jQuery('#nf-form-' + formModel.get('id') + '-cont .nf-field-container:not(.submit-container)').hide();
});
jQuery.ajax({
url: nfFrontEnd.adminAjax,
type: 'POST',
data: data,
cache: false,
success: function(data, textStatus, jqXHR){
try {
var response=data;
nfRadio.channel('forms').trigger('submit:response', response, textStatus, jqXHR, formModel.get('id'));
nfRadio.channel('form-' + formModel.get('id')).trigger('submit:response', response, textStatus, jqXHR);
} catch(e){
console.log('Parse Error');
}},
error: function(jqXHR, textStatus, errorThrown){
console.log('ERRORS: ' + textStatus);
nfRadio.channel('forms').trigger('submit:response', 'error', textStatus, jqXHR, errorThrown);
}});
}},
template: function(template){
return _.template($(template).html(),  {
evaluate:    /<#([\s\S]+?)#>/g,
interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
escape:      /\{\{([^\}]+?)\}\}(?!\})/g,
variable:    'data'
});
},
encodeNumber: function(num){
var localeConverter=new nfLocaleConverter(nfi18n.siteLocale, nfi18n.thousands_sep, nfi18n.decimal_point);
return localeConverter.numberEncoder(num);
},
decodeNumber: function(num){
var localeConverter=new nfLocaleConverter(nfi18n.siteLocale, nfi18n.thousands_sep, nfi18n.decimal_point);
return localeConverter.numberDecoder(num);
}});
var ninjaForms=new NinjaForms();
ninjaForms.start();
});
});
define("main", function(){});
}());