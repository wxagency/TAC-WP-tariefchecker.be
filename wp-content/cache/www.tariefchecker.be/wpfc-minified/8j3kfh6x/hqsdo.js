!function(c,d){"use strict";var e=!1,n=!1;if(d.querySelector)if(c.addEventListener)e=!0;if(c.wp=c.wp||{},!c.wp.receiveEmbedMessage)if(c.wp.receiveEmbedMessage=function(e){var t=e.data;if(t)if(t.secret||t.message||t.value)if(!/[^a-zA-Z0-9]/.test(t.secret)){for(var r,a,i,s=d.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),n=d.querySelectorAll('blockquote[data-secret="'+t.secret+'"]'),o=0;o<n.length;o++)n[o].style.display="none";for(o=0;o<s.length;o++)if(r=s[o],e.source===r.contentWindow){if(r.removeAttribute("style"),"height"===t.message){if(1e3<(i=parseInt(t.value,10)))i=1e3;else if(~~i<200)i=200;r.height=i}if("link"===t.message)if(a=d.createElement("a"),i=d.createElement("a"),a.href=r.getAttribute("src"),i.href=t.value,i.host===a.host)if(d.activeElement===r)c.top.location.href=t.value}}},e)c.addEventListener("message",c.wp.receiveEmbedMessage,!1),d.addEventListener("DOMContentLoaded",t,!1),c.addEventListener("load",t,!1);function t(){if(!n){n=!0;for(var e,t,r=-1!==navigator.appVersion.indexOf("MSIE 10"),a=!!navigator.userAgent.match(/Trident.*rv:11\./),i=d.querySelectorAll("iframe.wp-embedded-content"),s=0;s<i.length;s++){if(!(e=i[s]).getAttribute("data-secret"))t=Math.random().toString(36).substr(2,10),e.src+="#?secret="+t,e.setAttribute("data-secret",t);if(r||a)(t=e.cloneNode(!0)).removeAttribute("security"),e.parentNode.replaceChild(t,e)}}}}(window,document);
(function(){function t(){}var n=this,r=n._,e=Array.prototype,o=Object.prototype,u=Function.prototype,i=e.push,c=e.slice,l=o.toString,a=o.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=Object.create,v=function(n){return n instanceof v?n:this instanceof v?void(this._wrapped=n):new v(n)};"undefined"!=typeof exports?(exports="undefined"!=typeof module&&module.exports?module.exports=v:exports)._=v:n._=v,v.VERSION="1.8.3";var y=function(u,i,n){if(void 0===i)return u;switch(null==n?3:n){case 1:return function(n){return u.call(i,n)};case 2:return function(n,t){return u.call(i,n,t)};case 3:return function(n,t,r){return u.call(i,n,t,r)};case 4:return function(n,t,r,e){return u.call(i,n,t,r,e)}}return function(){return u.apply(i,arguments)}},d=function(n,t,r){return null==n?v.identity:v.isFunction(n)?y(n,t,r):v.isObject(n)?v.matcher(n):v.property(n)};v.iteratee=function(n,t){return d(n,t,1/0)};function g(n){return v.isObject(n)?h?h(n):(t.prototype=n,n=new t,t.prototype=null,n):{}}var m=function(c,f){return function(n){var t=arguments.length;if(t<2||null==n)return n;for(var r=1;r<t;r++)for(var e=arguments[r],u=c(e),i=u.length,o=0;o<i;o++){var a=u[o];f&&void 0!==n[a]||(n[a]=e[a])}return n}},b=function(t){return function(n){return null==n?void 0:n[t]}},x=Math.pow(2,53)-1,_=b("length"),j=function(n){n=_(n);return"number"==typeof n&&0<=n&&n<=x};function w(a){return function(n,t,r,e){t=y(t,e,4);var u=!j(n)&&v.keys(n),i=(u||n).length,o=0<a?0:i-1;return arguments.length<3&&(r=n[u?u[o]:o],o+=a),function(n,t,r,e,u,i){for(;0<=u&&u<i;u+=a){var o=e?e[u]:u;r=t(r,n[o],o,n)}return r}(n,t,r,u,o,i)}}v.each=v.forEach=function(n,t,r){if(t=y(t,r),j(n))for(u=0,i=n.length;u<i;u++)t(n[u],u,n);else for(var e=v.keys(n),u=0,i=e.length;u<i;u++)t(n[e[u]],e[u],n);return n},v.map=v.collect=function(n,t,r){t=d(t,r);for(var e=!j(n)&&v.keys(n),u=(e||n).length,i=Array(u),o=0;o<u;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},v.reduce=v.foldl=v.inject=w(1),v.reduceRight=v.foldr=w(-1),v.find=v.detect=function(n,t,r){r=j(n)?v.findIndex(n,t,r):v.findKey(n,t,r);if(void 0!==r&&-1!==r)return n[r]},v.filter=v.select=function(n,e,t){var u=[];return e=d(e,t),v.each(n,function(n,t,r){e(n,t,r)&&u.push(n)}),u},v.reject=function(n,t,r){return v.filter(n,v.negate(d(t)),r)},v.every=v.all=function(n,t,r){t=d(t,r);for(var e=!j(n)&&v.keys(n),u=(e||n).length,i=0;i<u;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},v.some=v.any=function(n,t,r){t=d(t,r);for(var e=!j(n)&&v.keys(n),u=(e||n).length,i=0;i<u;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},v.contains=v.includes=v.include=function(n,t,r,e){return j(n)||(n=v.values(n)),"number"==typeof r&&!e||(r=0),0<=v.indexOf(n,t,r)},v.invoke=function(n,r){var e=c.call(arguments,2),u=v.isFunction(r);return v.map(n,function(n){var t=u?r:n[r];return null==t?t:t.apply(n,e)})},v.pluck=function(n,t){return v.map(n,v.property(t))},v.where=function(n,t){return v.filter(n,v.matcher(t))},v.findWhere=function(n,t){return v.find(n,v.matcher(t))},v.max=function(n,e,t){var r,u,i=-1/0,o=-1/0;if(null==e&&null!=n)for(var a=0,c=(n=j(n)?n:v.values(n)).length;a<c;a++)r=n[a],i<r&&(i=r);else e=d(e,t),v.each(n,function(n,t,r){u=e(n,t,r),(o<u||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},v.min=function(n,e,t){var r,u,i=1/0,o=1/0;if(null==e&&null!=n)for(var a=0,c=(n=j(n)?n:v.values(n)).length;a<c;a++)(r=n[a])<i&&(i=r);else e=d(e,t),v.each(n,function(n,t,r){((u=e(n,t,r))<o||u===1/0&&i===1/0)&&(i=n,o=u)});return i},v.shuffle=function(n){for(var t,r=j(n)?n:v.values(n),e=r.length,u=Array(e),i=0;i<e;i++)(t=v.random(0,i))!==i&&(u[i]=u[t]),u[t]=r[i];return u},v.sample=function(n,t,r){return null==t||r?(n=!j(n)?v.values(n):n)[v.random(n.length-1)]:v.shuffle(n).slice(0,Math.max(0,t))},v.sortBy=function(n,e,t){return e=d(e,t),v.pluck(v.map(n,function(n,t,r){return{value:n,index:t,criteria:e(n,t,r)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(e<r||void 0===r)return 1;if(r<e||void 0===e)return-1}return n.index-t.index}),"value")};u=function(i){return function(r,e,n){var u={};return e=d(e,n),v.each(r,function(n,t){t=e(n,t,r);i(u,n,t)}),u}};v.groupBy=u(function(n,t,r){v.has(n,r)?n[r].push(t):n[r]=[t]}),v.indexBy=u(function(n,t,r){n[r]=t}),v.countBy=u(function(n,t,r){v.has(n,r)?n[r]++:n[r]=1}),v.toArray=function(n){return n?v.isArray(n)?c.call(n):j(n)?v.map(n,v.identity):v.values(n):[]},v.size=function(n){return null==n?0:(j(n)?n:v.keys(n)).length},v.partition=function(n,e,t){e=d(e,t);var u=[],i=[];return v.each(n,function(n,t,r){(e(n,t,r)?u:i).push(n)}),[u,i]},v.first=v.head=v.take=function(n,t,r){if(null!=n)return null==t||r?n[0]:v.initial(n,n.length-t)},v.initial=function(n,t,r){return c.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},v.last=function(n,t,r){if(null!=n)return null==t||r?n[n.length-1]:v.rest(n,Math.max(0,n.length-t))},v.rest=v.tail=v.drop=function(n,t,r){return c.call(n,null==t||r?1:t)},v.compact=function(n){return v.filter(n,v.identity)};var A=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=_(n);o<a;o++){var c=n[o];if(j(c)&&(v.isArray(c)||v.isArguments(c))){var f=0,l=(c=!t?A(c,t,r):c).length;for(u.length+=l;f<l;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};function O(i){return function(n,t,r){t=d(t,r);for(var e=_(n),u=0<i?0:e-1;0<=u&&u<e;u+=i)if(t(n[u],u,n))return u;return-1}}function k(i,o,a){return function(n,t,r){var e=0,u=_(n);if("number"==typeof r)0<i?e=0<=r?r:Math.max(r+u,e):u=0<=r?Math.min(r+1,u):r+u+1;else if(a&&r&&u)return n[r=a(n,t)]===t?r:-1;if(t!=t)return 0<=(r=o(c.call(n,e,u),v.isNaN))?r+e:-1;for(r=0<i?e:u-1;0<=r&&r<u;r+=i)if(n[r]===t)return r;return-1}}v.flatten=function(n,t){return A(n,t,!1)},v.without=function(n){return v.difference(n,c.call(arguments,1))},v.uniq=v.unique=function(n,t,r,e){v.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=d(r,e));for(var u=[],i=[],o=0,a=_(n);o<a;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?v.contains(i,f)||(i.push(f),u.push(c)):v.contains(u,c)||u.push(c)}return u},v.union=function(){return v.uniq(A(arguments,!0,!0))},v.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=_(n);e<u;e++){var i=n[e];if(!v.contains(t,i)){for(var o=1;o<r&&v.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},v.difference=function(n){var t=A(arguments,!0,!0,1);return v.filter(n,function(n){return!v.contains(t,n)})},v.zip=function(){return v.unzip(arguments)},v.unzip=function(n){for(var t=n&&v.max(n,_).length||0,r=Array(t),e=0;e<t;e++)r[e]=v.pluck(n,e);return r},v.object=function(n,t){for(var r={},e=0,u=_(n);e<u;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},v.findIndex=O(1),v.findLastIndex=O(-1),v.sortedIndex=function(n,t,r,e){for(var u=(r=d(r,e,1))(t),i=0,o=_(n);i<o;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},v.indexOf=k(1,v.findIndex,v.sortedIndex),v.lastIndexOf=k(-1,v.findLastIndex),v.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;i<e;i++,n+=r)u[i]=n;return u};function F(n,t,r,e,u){return e instanceof t?(r=g(n.prototype),u=n.apply(r,u),v.isObject(u)?u:r):n.apply(r,u)}v.bind=function(n,t){if(p&&n.bind===p)return p.apply(n,c.call(arguments,1));if(!v.isFunction(n))throw new TypeError("Bind must be called on a function");var r=c.call(arguments,2),e=function(){return F(n,e,t,this,r.concat(c.call(arguments)))};return e},v.partial=function(u){var i=c.call(arguments,1),o=function(){for(var n=0,t=i.length,r=Array(t),e=0;e<t;e++)r[e]=i[e]===v?arguments[n++]:i[e];for(;n<arguments.length;)r.push(arguments[n++]);return F(u,o,this,this,r)};return o},v.bindAll=function(n){var t,r,e=arguments.length;if(e<=1)throw new Error("bindAll must be passed function names");for(t=1;t<e;t++)n[r=arguments[t]]=v.bind(n[r],n);return n},v.memoize=function(e,u){var i=function(n){var t=i.cache,r=""+(u?u.apply(this,arguments):n);return v.has(t,r)||(t[r]=e.apply(this,arguments)),t[r]};return i.cache={},i},v.delay=function(n,t){var r=c.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},v.defer=v.partial(v.delay,v,1),v.throttle=function(r,e,u){var i,o,a,c=null,f=0;u=u||{};function l(){f=!1===u.leading?0:v.now(),c=null,a=r.apply(i,o),c||(i=o=null)}return function(){var n=v.now();f||!1!==u.leading||(f=n);var t=e-(n-f);return i=this,o=arguments,t<=0||e<t?(c&&(clearTimeout(c),c=null),f=n,a=r.apply(i,o),c||(i=o=null)):c||!1===u.trailing||(c=setTimeout(l,t)),a}},v.debounce=function(t,r,e){var u,i,o,a,c,f=function(){var n=v.now()-a;n<r&&0<=n?u=setTimeout(f,r-n):(u=null,e||(c=t.apply(o,i),u||(o=i=null)))};return function(){o=this,i=arguments,a=v.now();var n=e&&!u;return u=u||setTimeout(f,r),n&&(c=t.apply(o,i),o=i=null),c}},v.wrap=function(n,t){return v.partial(t,n)},v.negate=function(n){return function(){return!n.apply(this,arguments)}},v.compose=function(){var r=arguments,e=r.length-1;return function(){for(var n=e,t=r[e].apply(this,arguments);n--;)t=r[n].call(this,t);return t}},v.after=function(n,t){return function(){if(--n<1)return t.apply(this,arguments)}},v.before=function(n,t){var r;return function(){return 0<--n&&(r=t.apply(this,arguments)),n<=1&&(t=null),r}},v.once=v.partial(v.before,2);var S=!{toString:null}.propertyIsEnumerable("toString"),E=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];function M(n,t){var r=E.length,e=n.constructor,u=v.isFunction(e)&&e.prototype||o,i="constructor";for(v.has(n,i)&&!v.contains(t,i)&&t.push(i);r--;)(i=E[r])in n&&n[i]!==u[i]&&!v.contains(t,i)&&t.push(i)}v.keys=function(n){if(!v.isObject(n))return[];if(s)return s(n);var t,r=[];for(t in n)v.has(n,t)&&r.push(t);return S&&M(n,r),r},v.allKeys=function(n){if(!v.isObject(n))return[];var t,r=[];for(t in n)r.push(t);return S&&M(n,r),r},v.values=function(n){for(var t=v.keys(n),r=t.length,e=Array(r),u=0;u<r;u++)e[u]=n[t[u]];return e},v.mapObject=function(n,t,r){t=d(t,r);for(var e,u=v.keys(n),i=u.length,o={},a=0;a<i;a++)o[e=u[a]]=t(n[e],e,n);return o},v.pairs=function(n){for(var t=v.keys(n),r=t.length,e=Array(r),u=0;u<r;u++)e[u]=[t[u],n[t[u]]];return e},v.invert=function(n){for(var t={},r=v.keys(n),e=0,u=r.length;e<u;e++)t[n[r[e]]]=r[e];return t},v.functions=v.methods=function(n){var t,r=[];for(t in n)v.isFunction(n[t])&&r.push(t);return r.sort()},v.extend=m(v.allKeys),v.extendOwn=v.assign=m(v.keys),v.findKey=function(n,t,r){t=d(t,r);for(var e,u=v.keys(n),i=0,o=u.length;i<o;i++)if(t(n[e=u[i]],e,n))return e},v.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;v.isFunction(t)?(u=v.allKeys(o),e=y(t,r)):(u=A(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;a<c;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},v.omit=function(n,t,r){var e;return t=v.isFunction(t)?v.negate(t):(e=v.map(A(arguments,!1,!1,1),String),function(n,t){return!v.contains(e,t)}),v.pick(n,t,r)},v.defaults=m(v.allKeys,!0),v.create=function(n,t){n=g(n);return t&&v.extendOwn(n,t),n},v.clone=function(n){return v.isObject(n)?v.isArray(n)?n.slice():v.extend({},n):n},v.tap=function(n,t){return t(n),n},v.isMatch=function(n,t){var r=v.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;i<e;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var I=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof v&&(n=n._wrapped),t instanceof v&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!=+n?+t!=+t:0==+n?1/+n==1/t:+n==+t;case"[object Date]":case"[object Boolean]":return+n==+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,u=t.constructor;if(o!==u&&!(v.isFunction(o)&&o instanceof o&&v.isFunction(u)&&u instanceof u)&&"constructor"in n&&"constructor"in t)return!1}e=e||[];for(var a=(r=r||[]).length;a--;)if(r[a]===n)return e[a]===t;if(r.push(n),e.push(t),i){if((a=n.length)!==t.length)return!1;for(;a--;)if(!I(n[a],t[a],r,e))return!1}else{var c,f=v.keys(n),a=f.length;if(v.keys(t).length!==a)return!1;for(;a--;)if(c=f[a],!v.has(t,c)||!I(n[c],t[c],r,e))return!1}return r.pop(),e.pop(),!0};v.isEqual=function(n,t){return I(n,t)},v.isEmpty=function(n){return null==n||(j(n)&&(v.isArray(n)||v.isString(n)||v.isArguments(n))?0===n.length:0===v.keys(n).length)},v.isElement=function(n){return!(!n||1!==n.nodeType)},v.isArray=f||function(n){return"[object Array]"===l.call(n)},v.isObject=function(n){var t=typeof n;return"function"==t||"object"==t&&!!n},v.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(t){v["is"+t]=function(n){return l.call(n)==="[object "+t+"]"}}),v.isArguments(arguments)||(v.isArguments=function(n){return v.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(v.isFunction=function(n){return"function"==typeof n||!1}),v.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},v.isNaN=function(n){return v.isNumber(n)&&n!==+n},v.isBoolean=function(n){return!0===n||!1===n||"[object Boolean]"===l.call(n)},v.isNull=function(n){return null===n},v.isUndefined=function(n){return void 0===n},v.has=function(n,t){return null!=n&&a.call(n,t)},v.noConflict=function(){return n._=r,this},v.identity=function(n){return n},v.constant=function(n){return function(){return n}},v.noop=function(){},v.property=b,v.propertyOf=function(t){return null==t?function(){}:function(n){return t[n]}},v.matcher=v.matches=function(t){return t=v.extendOwn({},t),function(n){return v.isMatch(n,t)}},v.times=function(n,t,r){var e=Array(Math.max(0,n));t=y(t,r,1);for(var u=0;u<n;u++)e[u]=t(u);return e},v.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},v.now=Date.now||function(){return(new Date).getTime()};m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},f=v.invert(m),b=function(t){function r(n){return t[n]}var n="(?:"+v.keys(t).join("|")+")",e=RegExp(n),u=RegExp(n,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,r):n}};v.escape=b(m),v.unescape=b(f),v.result=function(n,t,r){t=null==n?void 0:n[t];return void 0===t&&(t=r),v.isFunction(t)?t.call(n):t};var N=0;v.uniqueId=function(n){var t=++N+"";return n?n+t:t},v.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};function B(n){return"\\"+R[n]}var T=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g;v.template=function(i,n,t){!n&&t&&(n=t),n=v.defaults({},n,v.templateSettings);var r=RegExp([(n.escape||T).source,(n.interpolate||T).source,(n.evaluate||T).source].join("|")+"|$","g"),o=0,a="__p+='";i.replace(r,function(n,t,r,e,u){return a+=i.slice(o,u).replace(q,B),o=u+n.length,t?a+="'+\n((__t=("+t+"))==null?'':_.escape(__t))+\n'":r?a+="'+\n((__t=("+r+"))==null?'':__t)+\n'":e&&(a+="';\n"+e+"\n__p+='"),n}),a+="';\n",a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+(a=!n.variable?"with(obj||{}){\n"+a+"}\n":a)+"return __p;\n";try{var e=new Function(n.variable||"obj","_",a)}catch(n){throw n.source=a,n}t=function(n){return e.call(this,n,v)},r=n.variable||"obj";return t.source="function("+r+"){\n"+a+"}",t},v.chain=function(n){n=v(n);return n._chain=!0,n};function K(n,t){return n._chain?v(t).chain():t}v.mixin=function(r){v.each(v.functions(r),function(n){var t=v[n]=r[n];v.prototype[n]=function(){var n=[this._wrapped];return i.apply(n,arguments),K(this,t.apply(v,n))}})},v.mixin(v),v.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var r=e[t];v.prototype[t]=function(){var n=this._wrapped;return r.apply(n,arguments),"shift"!==t&&"splice"!==t||0!==n.length||delete n[0],K(this,n)}}),v.each(["concat","join","slice"],function(n){var t=e[n];v.prototype[n]=function(){return K(this,t.apply(this._wrapped,arguments))}}),v.prototype.value=function(){return this._wrapped},v.prototype.valueOf=v.prototype.toJSON=v.prototype.value,v.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return v})}).call(this);
!function(n){var s="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global;if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],function(t,e,i){s.Backbone=n(s,i,t,e)});else if("undefined"!=typeof exports){var t,e=require("underscore");try{t=require("jquery")}catch(t){}n(s,exports,e,t)}else s.Backbone=n(s,{},s._,s.jQuery||s.Zepto||s.ender||s.$)}(function(t,h,b,e){var i=t.Backbone,o=Array.prototype.slice;h.VERSION="1.4.0",h.$=e,h.noConflict=function(){return t.Backbone=i,this},h.emulateHTTP=!1,h.emulateJSON=!1;var a,n=h.Events={},u=/\s+/,c=function(t,e,i,n,s){var r,o=0;if(i&&"object"==typeof i){void 0!==n&&"context"in s&&void 0===s.context&&(s.context=n);for(r=b.keys(i);o<r.length;o++)e=c(t,e,r[o],i[r[o]],s)}else if(i&&u.test(i))for(r=i.split(u);o<r.length;o++)e=t(e,r[o],n,s);else e=t(e,i,n,s);return e};n.on=function(t,e,i){return this._events=c(s,this._events||{},t,e,{context:i,ctx:this,listening:a}),a&&(((this._listeners||(this._listeners={}))[a.id]=a).interop=!1),this},n.listenTo=function(t,e,i){if(!t)return this;var n=t._listenId||(t._listenId=b.uniqueId("l")),s=this._listeningTo||(this._listeningTo={}),r=a=s[n];r||(this._listenId||(this._listenId=b.uniqueId("l")),r=a=s[n]=new g(this,t));t=l(t,e,i,this);if(a=void 0,t)throw t;return r.interop&&r.on(e,i),this};var s=function(t,e,i,n){var s,r;return i&&(s=t[e]||(t[e]=[]),r=n.context,e=n.ctx,(n=n.listening)&&n.count++,s.push({callback:i,context:r,ctx:r||e,listening:n})),t},l=function(t,e,i,n){try{t.on(e,i,n)}catch(t){return t}};n.off=function(t,e,i){return this._events&&(this._events=c(r,this._events,t,e,{context:i,listeners:this._listeners})),this},n.stopListening=function(t,e,i){var n=this._listeningTo;if(!n)return this;for(var s=t?[t._listenId]:b.keys(n),r=0;r<s.length;r++){var o=n[s[r]];if(!o)break;o.obj.off(e,i,this),o.interop&&o.off(e,i)}return b.isEmpty(n)&&(this._listeningTo=void 0),this};var r=function(t,e,i,n){if(t){var s,r=n.context,o=n.listeners,h=0;if(e||r||i){for(s=e?[e]:b.keys(t);h<s.length;h++){var a=t[e=s[h]];if(!a)break;for(var u=[],c=0;c<a.length;c++){var l=a[c];i&&i!==l.callback&&i!==l.callback._callback||r&&r!==l.context?u.push(l):(l=l.listening)&&l.off(e,i)}u.length?t[e]=u:delete t[e]}return t}for(s=b.keys(o);h<s.length;h++)o[s[h]].cleanup()}};n.once=function(t,e,i){var n=c(d,{},t,e,this.off.bind(this));return"string"==typeof t&&null==i&&(e=void 0),this.on(n,e,i)},n.listenToOnce=function(t,e,i){i=c(d,{},e,i,this.stopListening.bind(this,t));return this.listenTo(t,i)};var d=function(t,e,i,n){var s;return i&&((s=t[e]=b.once(function(){n(e,s),i.apply(this,arguments)}))._callback=i),t};n.trigger=function(t){if(!this._events)return this;for(var e=Math.max(0,arguments.length-1),i=Array(e),n=0;n<e;n++)i[n]=arguments[n+1];return c(f,this._events,t,void 0,i),this};var f=function(t,e,i,n){var s,r;return t&&(s=t[e],r=t.all,s&&r&&(r=r.slice()),s&&p(s,n),r&&p(r,[e].concat(n))),t},p=function(t,e){var i,n=-1,s=t.length,r=e[0],o=e[1],h=e[2];switch(e.length){case 0:for(;++n<s;)(i=t[n]).callback.call(i.ctx);return;case 1:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r);return;case 2:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,o);return;case 3:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,o,h);return;default:for(;++n<s;)(i=t[n]).callback.apply(i.ctx,e);return}},g=function(t,e){this.id=t._listenId,this.listener=t,this.obj=e,this.interop=!0,this.count=0,this._events=void 0};g.prototype.on=n.on,g.prototype.off=function(t,e){e=this.interop?(this._events=c(r,this._events,t,e,{context:void 0,listeners:void 0}),!this._events):(this.count--,0===this.count);e&&this.cleanup()},g.prototype.cleanup=function(){delete this.listener._listeningTo[this.obj._listenId],this.interop||delete this.obj._listeners[this.id]},n.bind=n.on,n.unbind=n.off,b.extend(h,n);var v=h.Model=function(t,e){var i=t||{};e=e||{},this.preinitialize.apply(this,arguments),this.cid=b.uniqueId(this.cidPrefix),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(i=this.parse(i,e)||{});var n=b.result(this,"defaults"),i=b.defaults(b.extend({},n,i),n);this.set(i,e),this.changed={},this.initialize.apply(this,arguments)};b.extend(v.prototype,n,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",preinitialize:function(){},initialize:function(){},toJSON:function(t){return b.clone(this.attributes)},sync:function(){return h.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return b.escape(this.get(t))},has:function(t){return null!=this.get(t)},matches:function(t){return!!b.iteratee(t,this)(this.attributes)},set:function(t,e,i){if(null==t)return this;var n;if("object"==typeof t?(n=t,i=e):(n={})[t]=e,i=i||{},!this._validate(n,i))return!1;var s=i.unset,r=i.silent,o=[],t=this._changing;this._changing=!0,t||(this._previousAttributes=b.clone(this.attributes),this.changed={});var h,a=this.attributes,u=this.changed,c=this._previousAttributes;for(h in n)e=n[h],b.isEqual(a[h],e)||o.push(h),b.isEqual(c[h],e)?delete u[h]:u[h]=e,s?delete a[h]:a[h]=e;if(this.idAttribute in n&&(this.id=this.get(this.idAttribute)),!r){o.length&&(this._pending=i);for(var l=0;l<o.length;l++)this.trigger("change:"+o[l],this,a[o[l]],i)}if(t)return this;if(!r)for(;this._pending;)i=this._pending,this._pending=!1,this.trigger("change",this,i);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,b.extend({},e,{unset:!0}))},clear:function(t){var e,i={};for(e in this.attributes)i[e]=void 0;return this.set(i,b.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!b.isEmpty(this.changed):b.has(this.changed,t)},changedAttributes:function(t){if(!t)return!!this.hasChanged()&&b.clone(this.changed);var e,i,n=this._changing?this._previousAttributes:this.attributes,s={};for(i in t){var r=t[i];b.isEqual(n[i],r)||(s[i]=r,e=!0)}return!!e&&s},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return b.clone(this._previousAttributes)},fetch:function(i){i=b.extend({parse:!0},i);var n=this,s=i.success;return i.success=function(t){var e=i.parse?n.parse(t,i):t;if(!n.set(e,i))return!1;s&&s.call(i.context,n,t,i),n.trigger("sync",n,t,i)},B(this,i),this.sync("read",this,i)},save:function(t,e,i){var n;null==t||"object"==typeof t?(n=t,i=e):(n={})[t]=e;var s=(i=b.extend({validate:!0,parse:!0},i)).wait;if(n&&!s){if(!this.set(n,i))return!1}else if(!this._validate(n,i))return!1;var r=this,o=i.success,h=this.attributes;i.success=function(t){r.attributes=h;var e=i.parse?r.parse(t,i):t;if((e=s?b.extend({},n,e):e)&&!r.set(e,i))return!1;o&&o.call(i.context,r,t,i),r.trigger("sync",r,t,i)},B(this,i),n&&s&&(this.attributes=b.extend({},h,n));e=this.isNew()?"create":i.patch?"patch":"update";"patch"!=e||i.attrs||(i.attrs=n);e=this.sync(e,this,i);return this.attributes=h,e},destroy:function(e){e=e?b.clone(e):{};function i(){n.stopListening(),n.trigger("destroy",n,n.collection,e)}var n=this,s=e.success,r=e.wait,t=!(e.success=function(t){r&&i(),s&&s.call(e.context,n,t,e),n.isNew()||n.trigger("sync",n,t,e)});return this.isNew()?b.defer(e.success):(B(this,e),t=this.sync("delete",this,e)),r||i(),t},url:function(){var t=b.result(this,"urlRoot")||b.result(this.collection,"url")||F();if(this.isNew())return t;var e=this.get(this.idAttribute);return t.replace(/[^\/]$/,"$&/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},b.extend({},t,{validate:!0}))},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=b.extend({},this.attributes,t);t=this.validationError=this.validate(t,e)||null;return!t||(this.trigger("invalid",this,t,b.extend(e,{validationError:t})),!1)}});function x(t,e,i){i=Math.min(Math.max(i,0),t.length);for(var n=Array(t.length-i),s=e.length,r=0;r<n.length;r++)n[r]=t[r+i];for(r=0;r<s;r++)t[r+i]=e[r];for(r=0;r<n.length;r++)t[r+s+i]=n[r]}var m=h.Collection=function(t,e){e=e||{},this.preinitialize.apply(this,arguments),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,b.extend({silent:!0},e))},w={add:!0,remove:!0,merge:!0},_={add:!0,remove:!1};b.extend(m.prototype,n,{model:v,preinitialize:function(){},initialize:function(){},toJSON:function(e){return this.map(function(t){return t.toJSON(e)})},sync:function(){return h.sync.apply(this,arguments)},add:function(t,e){return this.set(t,b.extend({merge:!1},e,_))},remove:function(t,e){e=b.extend({},e);var i=!b.isArray(t);t=i?[t]:t.slice();t=this._removeModels(t,e);return!e.silent&&t.length&&(e.changes={added:[],merged:[],removed:t},this.trigger("update",this,e)),i?t[0]:t},set:function(t,e){if(null!=t){(e=b.extend({},w,e)).parse&&!this._isModel(t)&&(t=this.parse(t,e)||[]);var i=!b.isArray(t);t=i?[t]:t.slice();var n=e.at;(n=(n=null!=n?+n:n)>this.length?this.length:n)<0&&(n+=this.length+1);for(var s,r=[],o=[],h=[],a=[],u={},c=e.add,l=e.merge,d=e.remove,f=!1,p=this.comparator&&null==n&&!1!==e.sort,g=b.isString(this.comparator)?this.comparator:null,v=0;v<t.length;v++){s=t[v];var m,_=this.get(s);_?(l&&s!==_&&(m=this._isModel(s)?s.attributes:s,e.parse&&(m=_.parse(m,e)),_.set(m,e),h.push(_),p&&!f&&(f=_.hasChanged(g))),u[_.cid]||(u[_.cid]=!0,r.push(_)),t[v]=_):c&&(s=t[v]=this._prepareModel(s,e))&&(o.push(s),this._addReference(s,e),u[s.cid]=!0,r.push(s))}if(d){for(v=0;v<this.length;v++)u[(s=this.models[v]).cid]||a.push(s);a.length&&this._removeModels(a,e)}var y=!1,d=!p&&c&&d;if(r.length&&d?(y=this.length!==r.length||b.some(this.models,function(t,e){return t!==r[e]}),this.models.length=0,x(this.models,r,0),this.length=this.models.length):o.length&&(p&&(f=!0),x(this.models,o,null==n?this.length:n),this.length=this.models.length),f&&this.sort({silent:!0}),!e.silent){for(v=0;v<o.length;v++)null!=n&&(e.index=n+v),(s=o[v]).trigger("add",s,this,e);(f||y)&&this.trigger("sort",this,e),(o.length||a.length||h.length)&&(e.changes={added:o,removed:a,merged:h},this.trigger("update",this,e))}return i?t[0]:t}},reset:function(t,e){e=e?b.clone(e):{};for(var i=0;i<this.models.length;i++)this._removeReference(this.models[i],e);return e.previousModels=this.models,this._reset(),t=this.add(t,b.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),t},push:function(t,e){return this.add(t,b.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(t,e){return this.add(t,b.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return o.apply(this.models,arguments)},get:function(t){if(null!=t)return this._byId[t]||this._byId[this.modelId(this._isModel(t)?t.attributes:t)]||t.cid&&this._byId[t.cid]},has:function(t){return null!=this.get(t)},at:function(t){return t<0&&(t+=this.length),this.models[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,!0)},sort:function(t){var e=this.comparator;if(!e)throw new Error("Cannot sort a set without a comparator");t=t||{};var i=e.length;return b.isFunction(e)&&(e=e.bind(this)),1===i||b.isString(e)?this.models=this.sortBy(e):this.models.sort(e),t.silent||this.trigger("sort",this,t),this},pluck:function(t){return this.map(t+"")},fetch:function(i){var n=(i=b.extend({parse:!0},i)).success,s=this;return i.success=function(t){var e=i.reset?"reset":"set";s[e](t,i),n&&n.call(i.context,s,t,i),s.trigger("sync",s,t,i)},B(this,i),this.sync("read",this,i)},create:function(t,e){var n=(e=e?b.clone(e):{}).wait;if(!(t=this._prepareModel(t,e)))return!1;n||this.add(t,e);var s=this,r=e.success;return e.success=function(t,e,i){n&&s.add(t,i),r&&r.call(i.context,t,e,i)},t.save(null,e),t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},values:function(){return new E(this,k)},keys:function(){return new E(this,I)},entries:function(){return new E(this,S)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(t,e){if(this._isModel(t))return t.collection||(t.collection=this),t;t=new((e=e?b.clone(e):{}).collection=this).model(t,e);return t.validationError?(this.trigger("invalid",this,t.validationError,e),!1):t},_removeModels:function(t,e){for(var i=[],n=0;n<t.length;n++){var s,r,o=this.get(t[n]);o&&(s=this.indexOf(o),this.models.splice(s,1),this.length--,delete this._byId[o.cid],null!=(r=this.modelId(o.attributes))&&delete this._byId[r],e.silent||(e.index=s,o.trigger("remove",o,this,e)),i.push(o),this._removeReference(o,e))}return i},_isModel:function(t){return t instanceof v},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);null!=i&&(this._byId[i]=t),t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.modelId(t.attributes);null!=i&&delete this._byId[i],this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,n){if(e){if(("add"===t||"remove"===t)&&i!==this)return;var s,r;"destroy"===t&&this.remove(e,n),"change"!==t||(s=this.modelId(e.previousAttributes()))!==(r=this.modelId(e.attributes))&&(null!=s&&delete this._byId[s],null!=r&&(this._byId[r]=e))}this.trigger.apply(this,arguments)}});var y="function"==typeof Symbol&&Symbol.iterator;y&&(m.prototype[y]=m.prototype.values);var E=function(t,e){this._collection=t,this._kind=e,this._index=0},k=1,I=2,S=3;y&&(E.prototype[y]=function(){return this}),E.prototype.next=function(){if(this._collection){if(this._index<this._collection.length){var t,e=this._collection.at(this._index);return this._index++,{value:this._kind===k?e:(t=this._collection.modelId(e.attributes),this._kind===I?t:[t,e]),done:!1}}this._collection=void 0}return{value:void 0,done:!0}};var e=h.View=function(t){this.cid=b.uniqueId("view"),this.preinitialize.apply(this,arguments),b.extend(this,b.pick(t,P)),this._ensureElement(),this.initialize.apply(this,arguments)},T=/^(\S+)\s*(.*)$/,P=["model","collection","el","id","attributes","className","tagName","events"];b.extend(e.prototype,n,{tagName:"div",$:function(t){return this.$el.find(t)},preinitialize:function(){},initialize:function(){},render:function(){return this},remove:function(){return this._removeElement(),this.stopListening(),this},_removeElement:function(){this.$el.remove()},setElement:function(t){return this.undelegateEvents(),this._setElement(t),this.delegateEvents(),this},_setElement:function(t){this.$el=t instanceof h.$?t:h.$(t),this.el=this.$el[0]},delegateEvents:function(t){if(!(t=t||b.result(this,"events")))return this;for(var e in this.undelegateEvents(),t){var i,n=t[e];(n=!b.isFunction(n)?this[n]:n)&&(i=e.match(T),this.delegate(i[1],i[2],n.bind(this)))}return this},delegate:function(t,e,i){return this.$el.on(t+".delegateEvents"+this.cid,e,i),this},undelegateEvents:function(){return this.$el&&this.$el.off(".delegateEvents"+this.cid),this},undelegate:function(t,e,i){return this.$el.off(t+".delegateEvents"+this.cid,e,i),this},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){var t;this.el?this.setElement(b.result(this,"el")):(t=b.extend({},b.result(this,"attributes")),this.id&&(t.id=b.result(this,"id")),this.className&&(t.class=b.result(this,"className")),this.setElement(this._createElement(b.result(this,"tagName"))),this._setAttributes(t))},_setAttributes:function(t){this.$el.attr(t)}});function H(i,n,t,s){b.each(t,function(t,e){n[e]&&(i.prototype[e]=function(n,t,s,r){switch(t){case 1:return function(){return n[s](this[r])};case 2:return function(t){return n[s](this[r],t)};case 3:return function(t,e){return n[s](this[r],$(t,this),e)};case 4:return function(t,e,i){return n[s](this[r],$(t,this),e,i)};default:return function(){var t=o.call(arguments);return t.unshift(this[r]),n[s].apply(n,t)}}}(n,t,e,s))})}var $=function(e,t){return b.isFunction(e)?e:b.isObject(e)&&!t._isModel(e)?A(e):b.isString(e)?function(t){return t.get(e)}:e},A=function(t){var e=b.matches(t);return function(t){return e(t.attributes)}};b.each([[m,{forEach:3,each:3,map:3,collect:3,reduce:0,foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3},"models"],[v,{keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1},"attributes"]],function(t){var i=t[0],e=t[1],n=t[2];i.mixin=function(t){var e=b.reduce(b.functions(t),function(t,e){return t[e]=0,t},{});H(i,t,e,n)},H(i,b,e,n)}),h.sync=function(t,e,n){var i=C[t];b.defaults(n=n||{},{emulateHTTP:h.emulateHTTP,emulateJSON:h.emulateJSON});var s,r={type:i,dataType:"json"};n.url||(r.url=b.result(e,"url")||F()),null!=n.data||!e||"create"!==t&&"update"!==t&&"patch"!==t||(r.contentType="application/json",r.data=JSON.stringify(n.attrs||e.toJSON(n))),n.emulateJSON&&(r.contentType="application/x-www-form-urlencoded",r.data=r.data?{model:r.data}:{}),!n.emulateHTTP||"PUT"!==i&&"DELETE"!==i&&"PATCH"!==i||(r.type="POST",n.emulateJSON&&(r.data._method=i),s=n.beforeSend,n.beforeSend=function(t){if(t.setRequestHeader("X-HTTP-Method-Override",i),s)return s.apply(this,arguments)}),"GET"===r.type||n.emulateJSON||(r.processData=!1);var o=n.error;n.error=function(t,e,i){n.textStatus=e,n.errorThrown=i,o&&o.call(n.context,t,e,i)};r=n.xhr=h.ajax(b.extend(r,n));return e.trigger("request",e,r,n),r};var C={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"};h.ajax=function(){return h.$.ajax.apply(h.$,arguments)};var y=h.Router=function(t){t=t||{},this.preinitialize.apply(this,arguments),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},R=/\((.*?)\)/g,M=/(\(\?)?:\w+/g,N=/\*\w+/g,j=/[\-{}\[\]+?.,\\\^$|#\s]/g;b.extend(y.prototype,n,{preinitialize:function(){},initialize:function(){},route:function(e,i,n){b.isRegExp(e)||(e=this._routeToRegExp(e)),b.isFunction(i)&&(n=i,i=""),n=n||this[i];var s=this;return h.history.route(e,function(t){t=s._extractParameters(e,t);!1!==s.execute(n,t,i)&&(s.trigger.apply(s,["route:"+i].concat(t)),s.trigger("route",i,t),h.history.trigger("route",s,i,t))}),this},execute:function(t,e,i){t&&t.apply(this,e)},navigate:function(t,e){return h.history.navigate(t,e),this},_bindRoutes:function(){if(this.routes){this.routes=b.result(this,"routes");for(var t,e=b.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},_routeToRegExp:function(t){return t=t.replace(j,"\\$&").replace(R,"(?:$1)?").replace(M,function(t,e){return e?t:"([^/?]+)"}).replace(N,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return b.map(i,function(t,e){return e===i.length-1?t||null:t?decodeURIComponent(t):null})}});var O=h.History=function(){this.handlers=[],this.checkUrl=this.checkUrl.bind(this),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},U=/^[#\/]|\s+$/g,z=/^\/+|\/+$/g,q=/#.*$/;O.started=!1,b.extend(O.prototype,n,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root&&!this.getSearch()},matchRoot:function(){return this.decodeFragment(this.location.pathname).slice(0,this.root.length-1)+"/"===this.root},decodeFragment:function(t){return decodeURI(t.replace(/%25/g,"%2525"))},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){t=(t||this).location.href.match(/#(.*)$/);return t?t[1]:""},getPath:function(){var t=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return"/"===t.charAt(0)?t.slice(1):t},getFragment:function(t){return(t=null==t?this._usePushState||!this._wantsHashChange?this.getPath():this.getHash():t).replace(U,"")},start:function(t){if(O.started)throw new Error("Backbone.history has already been started");if(O.started=!0,this.options=b.extend({root:"/"},this.options,t),this.root=this.options.root,this._wantsHashChange=!1!==this.options.hashChange,this._hasHashChange="onhashchange"in window&&(void 0===document.documentMode||7<document.documentMode),this._useHashChange=this._wantsHashChange&&this._hasHashChange,this._wantsPushState=!!this.options.pushState,this._hasPushState=!(!this.history||!this.history.pushState),this._usePushState=this._wantsPushState&&this._hasPushState,this.fragment=this.getFragment(),this.root=("/"+this.root+"/").replace(z,"/"),this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){t=this.root.slice(0,-1)||"/";return this.location.replace(t+"#"+this.getPath()),!0}this._hasPushState&&this.atRoot()&&this.navigate(this.getHash(),{replace:!0})}this._hasHashChange||!this._wantsHashChange||this._usePushState||(this.iframe=document.createElement("iframe"),this.iframe.src="javascript:0",this.iframe.style.display="none",this.iframe.tabIndex=-1,(e=(e=document.body).insertBefore(this.iframe,e.firstChild).contentWindow).document.open(),e.document.close(),e.location.hash="#"+this.fragment);var e=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._usePushState?e("popstate",this.checkUrl,!1):this._useHashChange&&!this.iframe?e("hashchange",this.checkUrl,!1):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};this._usePushState?t("popstate",this.checkUrl,!1):this._useHashChange&&!this.iframe&&t("hashchange",this.checkUrl,!1),this.iframe&&(document.body.removeChild(this.iframe),this.iframe=null),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),O.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if((e=e===this.fragment&&this.iframe?this.getHash(this.iframe.contentWindow):e)===this.fragment)return!1;this.iframe&&this.navigate(e),this.loadUrl()},loadUrl:function(e){return!!this.matchRoot()&&(e=this.fragment=this.getFragment(e),b.some(this.handlers,function(t){if(t.route.test(e))return t.callback(e),!0}))},navigate:function(t,e){if(!O.started)return!1;e&&!0!==e||(e={trigger:!!e}),t=this.getFragment(t||"");var i=this.root,n=(i=""===t||"?"===t.charAt(0)?i.slice(0,-1)||"/":i)+t;t=t.replace(q,"");i=this.decodeFragment(t);if(this.fragment!==i){if(this.fragment=i,this._usePushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,n);else{if(!this._wantsHashChange)return this.location.assign(n);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getHash(this.iframe.contentWindow)&&(n=this.iframe.contentWindow,e.replace||(n.document.open(),n.document.close()),this._updateHash(n.location,t,e.replace))}return e.trigger?this.loadUrl(t):void 0}},_updateHash:function(t,e,i){i?(i=t.href.replace(/(javascript:|#).*$/,""),t.replace(i+"#"+e)):t.hash="#"+e}}),h.history=new O;v.extend=m.extend=y.extend=e.extend=O.extend=function(t,e){var i=this,n=t&&b.has(t,"constructor")?t.constructor:function(){return i.apply(this,arguments)};return b.extend(n,i,e),n.prototype=b.create(i.prototype,t),(n.prototype.constructor=n).__super__=i.prototype,n};var F=function(){throw new Error('A "url" property or function must be specified')},B=function(e,i){var n=i.error;i.error=function(t){n&&n.call(i.context,e,t,i),e.trigger("error",e,t,i)}};return h});
(function(t,e){if("function"==typeof define&&define.amd)define(["backbone","underscore"],function(i,n){return t.Marionette=t.Mn=e(t,i,n)});else if("undefined"!=typeof exports){var i=require("backbone"),n=require("underscore");module.exports=e(t,i,n)}else t.Marionette=t.Mn=e(t,t.Backbone,t._)})(this,function(t,e,i){"use strict";(function(t,e){var i=t.ChildViewContainer;return t.ChildViewContainer=function(t,e){var i=function(t){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),e.each(t,this.add,this)};e.extend(i.prototype,{add:function(t,e){var i=t.cid;return this._views[i]=t,t.model&&(this._indexByModel[t.model.cid]=i),e&&(this._indexByCustom[e]=i),this._updateLength(),this},findByModel:function(t){return this.findByModelCid(t.cid)},findByModelCid:function(t){var e=this._indexByModel[t];return this.findByCid(e)},findByCustom:function(t){var e=this._indexByCustom[t];return this.findByCid(e)},findByIndex:function(t){return e.values(this._views)[t]},findByCid:function(t){return this._views[t]},remove:function(t){var i=t.cid;return t.model&&delete this._indexByModel[t.model.cid],e.any(this._indexByCustom,function(t,e){return t===i?(delete this._indexByCustom[e],!0):void 0},this),delete this._views[i],this._updateLength(),this},call:function(t){this.apply(t,e.tail(arguments))},apply:function(t,i){e.each(this._views,function(n){e.isFunction(n[t])&&n[t].apply(n,i||[])})},_updateLength:function(){this.length=e.size(this._views)}});var n=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck","reduce"];return e.each(n,function(t){i.prototype[t]=function(){var i=e.values(this._views),n=[i].concat(e.toArray(arguments));return e[t].apply(e,n)}}),i}(t,e),t.ChildViewContainer.VERSION="0.1.7",t.ChildViewContainer.noConflict=function(){return t.ChildViewContainer=i,this},t.ChildViewContainer})(e,i),function(t,e){var i=t.Wreqr,n=t.Wreqr={};return t.Wreqr.VERSION="1.3.3",t.Wreqr.noConflict=function(){return t.Wreqr=i,this},n.Handlers=function(t,e){var i=function(t){this.options=t,this._wreqrHandlers={},e.isFunction(this.initialize)&&this.initialize(t)};return i.extend=t.Model.extend,e.extend(i.prototype,t.Events,{setHandlers:function(t){e.each(t,function(t,i){var n=null;e.isObject(t)&&!e.isFunction(t)&&(n=t.context,t=t.callback),this.setHandler(i,t,n)},this)},setHandler:function(t,e,i){var n={callback:e,context:i};this._wreqrHandlers[t]=n,this.trigger("handler:add",t,e,i)},hasHandler:function(t){return!!this._wreqrHandlers[t]},getHandler:function(t){var e=this._wreqrHandlers[t];if(e)return function(){return e.callback.apply(e.context,arguments)}},removeHandler:function(t){delete this._wreqrHandlers[t]},removeAllHandlers:function(){this._wreqrHandlers={}}}),i}(t,e),n.CommandStorage=function(){var i=function(t){this.options=t,this._commands={},e.isFunction(this.initialize)&&this.initialize(t)};return e.extend(i.prototype,t.Events,{getCommands:function(t){var e=this._commands[t];return e||(e={command:t,instances:[]},this._commands[t]=e),e},addCommand:function(t,e){var i=this.getCommands(t);i.instances.push(e)},clearCommands:function(t){var e=this.getCommands(t);e.instances=[]}}),i}(),n.Commands=function(t,e){return t.Handlers.extend({storageType:t.CommandStorage,constructor:function(e){this.options=e||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this),t.Handlers.prototype.constructor.apply(this,arguments)},execute:function(t){t=arguments[0];var i=e.rest(arguments);this.hasHandler(t)?this.getHandler(t).apply(this,i):this.storage.addCommand (t,i)},_executeCommands:function(t,i,n){var r=this.storage.getCommands(t);e.each(r.instances,function(t){i.apply(n,t)}),this.storage.clearCommands(t)},_initializeStorage:function(t){var i,n=t.storageType||this.storageType;i=e.isFunction(n)?new n:n,this.storage=i}})}(n,e),n.RequestResponse=function(t,e){return t.Handlers.extend({request:function(t){return this.hasHandler(t)?this.getHandler(t).apply(this,e.rest(arguments)):void 0}})}(n,e),n.EventAggregator=function(t,e){var i=function(){};return i.extend=t.Model.extend,e.extend(i.prototype,t.Events),i}(t,e),n.Channel=function(){var i=function(e){this.vent=new t.Wreqr.EventAggregator,this.reqres=new t.Wreqr.RequestResponse,this.commands=new t.Wreqr.Commands,this.channelName=e};return e.extend(i.prototype,{reset:function(){return this.vent.off(),this.vent.stopListening(),this.reqres.removeAllHandlers(),this.commands.removeAllHandlers(),this},connectEvents:function(t,e){return this._connect("vent",t,e),this},connectCommands:function(t,e){return this._connect("commands",t,e),this},connectRequests:function(t,e){return this._connect("reqres",t,e),this},_connect:function(t,i,n){if(i){n=n||this;var r="vent"===t?"on":"setHandler";e.each(i,function(i,s){this[t][r](s,e.bind(i,n))},this)}}}),i}(n),n.radio=function(t,e){var i=function(){this._channels={},this.vent={},this.commands={},this.reqres={},this._proxyMethods()};e.extend(i.prototype,{channel:function(t){if(!t)throw Error("Channel must receive a name");return this._getChannel(t)},_getChannel:function(e){var i=this._channels[e];return i||(i=new t.Channel(e),this._channels[e]=i),i},_proxyMethods:function(){e.each(["vent","commands","reqres"],function(t){e.each(n[t],function(e){this[t][e]=r(this,t,e)},this)},this)}});var n={vent:["on","off","trigger","once","stopListening","listenTo","listenToOnce"],commands:["execute","setHandler","setHandlers","removeHandler","removeAllHandlers"],reqres:["request","setHandler","setHandlers","removeHandler","removeAllHandlers"]},r=function(t,i,n){return function(r){var s=t._getChannel(r)[i];return s[n].apply(s,e.rest(arguments))}};return new i}(n,e),t.Wreqr}(e,i);var n=t.Marionette,r=t.Mn,s=e.Marionette={};s.VERSION="2.4.2",s.noConflict=function(){return t.Marionette=n,t.Mn=r,this},e.Marionette=s,s.Deferred=e.$.Deferred,s.extend=e.Model.extend,s.isNodeAttached=function(t){return e.$.contains(document.documentElement,t)},s.mergeOptions=function(t,e){t&&i.extend(this,i.pick(t,e))},s.getOption=function(t,e){return t&&e?t.options&&void 0!==t.options[e]?t.options[e]:t[e]:void 0},s.proxyGetOption=function(t){return s.getOption(this,t)},s._getValue=function(t,e,n){return i.isFunction(t)&&(t=n?t.apply(e,n):t.call(e)),t},s.normalizeMethods=function(t){return i.reduce(t,function(t,e,n){return i.isFunction(e)||(e=this[e]),e&&(t[n]=e),t},{},this)},s.normalizeUIString=function(t,e){return t.replace(/@ui\.[a-zA-Z_$0-9]*/g,function(t){return e[t.slice(4)]})},s.normalizeUIKeys=function(t,e){return i.reduce(t,function(t,i,n){var r=s.normalizeUIString(n,e);return t[r]=i,t},{})},s.normalizeUIValues=function(t,e,n){return i.each(t,function(r,o){i.isString(r)?t[o]=s.normalizeUIString(r,e):i.isObject(r)&&i.isArray(n)&&(i.extend(r,s.normalizeUIValues(i.pick(r,n),e)),i.each(n,function(t){var n=r[t];i.isString(n)&&(r[t]=s.normalizeUIString(n,e))}))}),t},s.actAsCollection=function(t,e){var n=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];i.each(n,function(n){t[n]=function(){var t=i.values(i.result(this,e)),r=[t].concat(i.toArray(arguments));return i[n].apply(i,r)}})};var o=s.deprecate=function(t,e){i.isObject(t)&&(t=t.prev+" is going to be removed in the future. "+"Please use "+t.next+" instead."+(t.url?" See: "+t.url:"")),void 0!==e&&e||o._cache[t]||(o._warn("Deprecation warning: "+t),o._cache[t]=!0)};o._warn="undefined"!=typeof console&&(console.warn||console.log)||function(){},o._cache={},s._triggerMethod=function(){function t(t,e,i){return i.toUpperCase()}var e=/(^|:)(\w)/gi;return function(n,r,s){var o=3>arguments.length;o&&(s=r,r=s[0]);var h,a="on"+r.replace(e,t),d=n[a];return i.isFunction(d)&&(h=d.apply(n,o?i.rest(s):s)),i.isFunction(n.trigger)&&(o+s.length>1?n.trigger.apply(n,o?s:[r].concat(i.drop(s,0))):n.trigger(r)),h}}(),s.triggerMethod=function(){return s._triggerMethod(this,arguments)},s.triggerMethodOn=function(t){var e=i.isFunction(t.triggerMethod)?t.triggerMethod:s.triggerMethod;return e.apply(t,i.rest(arguments))},s.MonitorDOMRefresh=function(t){function e(){t._isShown=!0,r()}function n(){t._isRendered=!0,r()}function r(){t._isShown&&t._isRendered&&s.isNodeAttached(t.el)&&i.isFunction(t.triggerMethod)&&t.triggerMethod("dom:refresh")}t.on({show:e,render:n})},function(t){function e(e,n,r,s){var o=s.split(/\s+/);i.each(o,function(i){var s=e[i];if(!s)throw new t.Error('Method "'+i+'" was configured as an event handler, but does not exist.');e.listenTo(n,r,s)})}function n(t,e,i,n){t.listenTo(e,i,n)}function r(t,e,n,r){var s=r.split(/\s+/);i.each(s,function(i){var r=t[i];t.stopListening(e,n,r)})}function s(t,e,i,n){t.stopListening(e,i,n)}function o(e,n,r,s,o){if(n&&r){if(!i.isObject(r))throw new t.Error({message:"Bindings must be an object or function.",url:"marionette.functions.html#marionettebindentityevents"});r=t._getValue(r,e),i.each(r,function(t,r){i.isFunction(t)?s(e,n,r,t):o(e,n,r,t)})}}t.bindEntityEvents=function(t,i,r){o(t,i,r,n,e)},t.unbindEntityEvents=function(t,e,i){o(t,e,i,s,r)},t.proxyBindEntityEvents=function(e,i){return t.bindEntityEvents(this,e,i)},t.proxyUnbindEntityEvents=function(e,i){return t.unbindEntityEvents(this,e,i)}}(s);var h=["description","fileName","lineNumber","name","message","number"];return s.Error=s.extend.call(Error,{urlRoot:"http://marionettejs.com/docs/v"+s.VERSION+"/",constructor:function(t,e){i.isObject(t)?(e=t,t=e.message):e||(e={});var n=Error.call(this,t);i.extend(this,i.pick(n,h),i.pick(e,h)),this.captureStackTrace(),e.url&&(this.url=this.urlRoot+e.url)},captureStackTrace:function(){Error.captureStackTrace&&Error.captureStackTrace(this,s.Error)},toString:function(){return this.name+": "+this.message+(this.url?" See: "+this.url:"")}}),s.Error.extend=s.extend,s.Callbacks=function(){this._deferred=s.Deferred(),this._callbacks=[]},i.extend(s.Callbacks.prototype,{add:function(t,e){var n=i.result(this._deferred,"promise");this._callbacks.push({cb:t,ctx:e}),n.then(function(i){e&&(i.context=e),t.call(i.context,i.options)})},run:function(t,e){this._deferred.resolve({options:t,context:e})},reset:function(){var t=this._callbacks;this._deferred=s.Deferred(),this._callbacks=[],i.each(t,function(t){this.add(t.cb,t.ctx)},this)}}),s.Controller=function(t){this.options=t||{},i.isFunction(this.initialize)&&this.initialize(this.options)},s.Controller.extend=s.extend,i.extend(s.Controller.prototype,e.Events,{destroy:function(){return s._triggerMethod(this,"before:destroy",arguments),s._triggerMethod(this,"destroy",arguments),this.stopListening(),this.off(),this},triggerMethod:s.triggerMethod,mergeOptions:s.mergeOptions,getOption:s.proxyGetOption}),s.Object=function(t){this.options=i.extend({},i.result(this,"options"),t),this.initialize.apply(this,arguments)},s.Object.extend=s.extend,i.extend(s.Object.prototype,e.Events,{initialize:function(){},destroy:function(){return this.triggerMethod("before:destroy"),this.triggerMethod("destroy"),this.stopListening(),this},triggerMethod:s.triggerMethod,mergeOptions:s.mergeOptions,getOption:s.proxyGetOption,bindEntityEvents:s.proxyBindEntityEvents,unbindEntityEvents:s.proxyUnbindEntityEvents}),s.Region=s.Object.extend({constructor:function(t){if(this.options=t||{},this.el=this.getOption("el"),this.el=this.el instanceof e.$?this.el[0]:this.el,!this.el)throw new s.Error({name:"NoElError",message:'An "el" must be specified for a region.'});this.$el=this.getEl(this.el),s.Object.call(this,t)},show:function(t,e){if(this._ensureElement()){this._ensureViewIsIntact(t);var n=e||{},r=t!==this.currentView,o=!!n.preventDestroy,h=!!n.forceShow,a=!!this.currentView,d=r&&!o,l=r||h;if(a&&this.triggerMethod("before:swapOut",this.currentView,this,e),this.currentView&&delete this.currentView._parent,d?this.empty():a&&l&&this.currentView.off("destroy",this.empty,this),l){t.once("destroy",this.empty,this),t.render(),t._parent=this,a&&this.triggerMethod("before:swap",t,this,e),this.triggerMethod("before:show",t,this,e),s.triggerMethodOn(t,"before:show",t,this,e),a&&this.triggerMethod("swapOut",this.currentView,this,e);var c=s.isNodeAttached(this.el),u=[],g=i.extend({triggerBeforeAttach:this.triggerBeforeAttach,triggerAttach:this.triggerAttach},n);return c&&g.triggerBeforeAttach&&(u=this._displayedViews(t),this._triggerAttach(u,"before:")),this.attachHtml(t),this.currentView=t,c&&g.triggerAttach&&(u=this._displayedViews(t),this._triggerAttach(u)),a&&this.triggerMethod("swap",t,this,e),this.triggerMethod("show",t,this,e),s.triggerMethodOn(t,"show",t,this,e),this}return this}},triggerBeforeAttach:!0,triggerAttach:!0,_triggerAttach:function(t,e){var n=(e||"")+"attach";i.each(t,function(t){s.triggerMethodOn(t,n,t,this)},this)},_displayedViews:function(t){return i.union([t],i.result(t,"_getNestedViews")||[])},_ensureElement:function(){if(i.isObject(this.el)||(this.$el=this.getEl(this.el),this.el=this.$el[0]),!this.$el||0===this.$el.length){if(this.getOption("allowMissingEl"))return!1;throw new s.Error('An "el" '+this.$el.selector+" must exist in DOM")}return!0},_ensureViewIsIntact:function(t){if(!t)throw new s.Error({name:"ViewNotValid",message:"The view passed is undefined and therefore invalid. You must pass a view instance to show."});if(t.isDestroyed)throw new s.Error({name:"ViewDestroyedError",message:'View (cid: "'+t.cid+'") has already been destroyed and cannot be used.'})},getEl:function(t){return e.$(t,s._getValue(this.options.parentEl,this))},attachHtml:function(t){this.$el.contents().detach(),this.el.appendChild(t.el)},empty:function(t){var e=this.currentView,i=s._getValue(t,"preventDestroy",this);return e?(e.off("destroy",this.empty,this),this.triggerMethod("before:empty",e),i||this._destroyView(),this.triggerMethod("empty",e),delete this.currentView,i&&this.$el.contents().detach(),this):void 0},_destroyView:function(){var t=this.currentView;t.destroy&&!t.isDestroyed?t.destroy():t.remove&&(t.remove(),t.isDestroyed=!0)},attachView:function(t){return this.currentView=t,this},hasView:function(){return!!this.currentView},reset:function(){return this.empty(),this.$el&&(this.el=this.getOption('el')),delete this.$el,this}},{buildRegion:function(t,e){if(i.isString(t))return this._buildRegionFromSelector(t,e);if(t.selector||t.el||t.regionClass)return this._buildRegionFromObject(t,e);if(i.isFunction(t))return this._buildRegionFromRegionClass(t);throw new s.Error({message:"Improper region configuration type.",url:"marionette.region.html#region-configuration-types"})},_buildRegionFromSelector:function(t,e){return new e({el:t})},_buildRegionFromObject:function(t,e){var n=t.regionClass||e,r=i.omit(t,"selector","regionClass");return t.selector&&!r.el&&(r.el=t.selector),new n(r)},_buildRegionFromRegionClass:function(t){return new t}}),s.RegionManager=s.Controller.extend({constructor:function(t){this._regions={},this.length=0,s.Controller.call(this,t),this.addRegions(this.getOption("regions"))},addRegions:function(t,e){return t=s._getValue(t,this,arguments),i.reduce(t,function(t,n,r){return i.isString(n)&&(n={selector:n}),n.selector&&(n=i.defaults({},n,e)),t[r]=this.addRegion(r,n),t},{},this)},addRegion:function(t,e){var i;return i=e instanceof s.Region?e:s.Region.buildRegion(e,s.Region),this.triggerMethod("before:add:region",t,i),i._parent=this,this._store(t,i),this.triggerMethod("add:region",t,i),i},get:function(t){return this._regions[t]},getRegions:function(){return i.clone(this._regions)},removeRegion:function(t){var e=this._regions[t];return this._remove(t,e),e},removeRegions:function(){var t=this.getRegions();return i.each(this._regions,function(t,e){this._remove(e,t)},this),t},emptyRegions:function(){var t=this.getRegions();return i.invoke(t,"empty"),t},destroy:function(){return this.removeRegions(),s.Controller.prototype.destroy.apply(this,arguments)},_store:function(t,e){this._regions[t]||this.length++,this._regions[t]=e},_remove:function(t,e){this.triggerMethod("before:remove:region",t,e),e.empty(),e.stopListening(),delete e._parent,delete this._regions[t],this.length--,this.triggerMethod("remove:region",t,e)}}),s.actAsCollection(s.RegionManager.prototype,"_regions"),s.TemplateCache=function(t){this.templateId=t},i.extend(s.TemplateCache,{templateCaches:{},get:function(t,e){var i=this.templateCaches[t];return i||(i=new s.TemplateCache(t),this.templateCaches[t]=i),i.load(e)},clear:function(){var t,e=i.toArray(arguments),n=e.length;if(n>0)for(t=0;n>t;t++)delete this.templateCaches[e[t]];else this.templateCaches={}}}),i.extend(s.TemplateCache.prototype,{load:function(t){if(this.compiledTemplate)return this.compiledTemplate;var e=this.loadTemplate(this.templateId,t);return this.compiledTemplate=this.compileTemplate(e,t),this.compiledTemplate},loadTemplate:function(t){var i=e.$(t).html();if(!i||0===i.length)throw new s.Error({name:"NoTemplateError",message:'Could not find template: "'+t+'"'});return i},compileTemplate:function(t,e){return i.template(t,e)}}),s.Renderer={render:function(t,e){if(!t)throw new s.Error({name:"TemplateNotFoundError",message:"Cannot render the template since its false, null or undefined."});var n=i.isFunction(t)?t:s.TemplateCache.get(t);return n(e)}},s.View=e.View.extend({isDestroyed:!1,constructor:function(t){i.bindAll(this,"render"),t=s._getValue(t,this),this.options=i.extend({},i.result(this,"options"),t),this._behaviors=s.Behaviors(this),e.View.call(this,this.options),s.MonitorDOMRefresh(this)},getTemplate:function(){return this.getOption("template")},serializeModel:function(t){return t.toJSON.apply(t,i.rest(arguments))},mixinTemplateHelpers:function(t){t=t||{};var e=this.getOption("templateHelpers");return e=s._getValue(e,this),i.extend(t,e)},normalizeUIKeys:function(t){var e=i.result(this,"_uiBindings");return s.normalizeUIKeys(t,e||i.result(this,"ui"))},normalizeUIValues:function(t,e){var n=i.result(this,"ui"),r=i.result(this,"_uiBindings");return s.normalizeUIValues(t,r||n,e)},configureTriggers:function(){if(this.triggers){var t=this.normalizeUIKeys(i.result(this,"triggers"));return i.reduce(t,function(t,e,i){return t[i]=this._buildViewTrigger(e),t},{},this)}},delegateEvents:function(t){return this._delegateDOMEvents(t),this.bindEntityEvents(this.model,this.getOption("modelEvents")),this.bindEntityEvents(this.collection,this.getOption("collectionEvents")),i.each(this._behaviors,function(t){t.bindEntityEvents(this.model,t.getOption("modelEvents")),t.bindEntityEvents(this.collection,t.getOption("collectionEvents"))},this),this},_delegateDOMEvents:function(t){var n=s._getValue(t||this.events,this);n=this.normalizeUIKeys(n),i.isUndefined(t)&&(this.events=n);var r={},o=i.result(this,"behaviorEvents")||{},h=this.configureTriggers(),a=i.result(this,"behaviorTriggers")||{};i.extend(r,o,n,h,a),e.View.prototype.delegateEvents.call(this,r)},undelegateEvents:function(){return e.View.prototype.undelegateEvents.apply(this,arguments),this.unbindEntityEvents(this.model,this.getOption("modelEvents")),this.unbindEntityEvents(this.collection,this.getOption("collectionEvents")),i.each(this._behaviors,function(t){t.unbindEntityEvents(this.model,t.getOption("modelEvents")),t.unbindEntityEvents(this.collection,t.getOption("collectionEvents"))},this),this},_ensureViewIsIntact:function(){if(this.isDestroyed)throw new s.Error({name:"ViewDestroyedError",message:'View (cid: "'+this.cid+'") has already been destroyed and cannot be used.'})},destroy:function(){if(this.isDestroyed)return this;var t=i.toArray(arguments);return this.triggerMethod.apply(this,["before:destroy"].concat(t)),this.isDestroyed=!0,this.triggerMethod.apply(this,["destroy"].concat(t)),this.unbindUIElements(),this.isRendered=!1,this.remove(),i.invoke(this._behaviors,"destroy",t),this},bindUIElements:function(){this._bindUIElements(),i.invoke(this._behaviors,this._bindUIElements)},_bindUIElements:function(){if(this.ui){this._uiBindings||(this._uiBindings=this.ui);var t=i.result(this,"_uiBindings");this.ui={},i.each(t,function(t,e){this.ui[e]=this.$(t)},this)}},unbindUIElements:function(){this._unbindUIElements(),i.invoke(this._behaviors,this._unbindUIElements)},_unbindUIElements:function(){this.ui&&this._uiBindings&&(i.each(this.ui,function(t,e){delete this.ui[e]},this),this.ui=this._uiBindings,delete this._uiBindings)},_buildViewTrigger:function(t){var e=i.isObject(t),n=i.defaults({},e?t:{},{preventDefault:!0,stopPropagation:!0}),r=e?n.event:t;return function(t){t&&(t.preventDefault&&n.preventDefault&&t.preventDefault(),t.stopPropagation&&n.stopPropagation&&t.stopPropagation());var e={view:this,model:this.model,collection:this.collection};this.triggerMethod(r,e)}},setElement:function(){var t=e.View.prototype.setElement.apply(this,arguments);return i.invoke(this._behaviors,"proxyViewProperties",this),t},triggerMethod:function(){var t=s._triggerMethod(this,arguments);return this._triggerEventOnBehaviors(arguments),this._triggerEventOnParentLayout(arguments[0],i.rest(arguments)),t},_triggerEventOnBehaviors:function(t){for(var e=s._triggerMethod,i=this._behaviors,n=0,r=i&&i.length;r>n;n++)e(i[n],t)},_triggerEventOnParentLayout:function(t,e){var n=this._parentLayoutView();if(n){var r=s.getOption(n,"childViewEventPrefix"),o=r+":"+t;s._triggerMethod(n,[o,this].concat(e));var h=s.getOption(n,"childEvents"),a=n.normalizeMethods(h);a&&i.isFunction(a[t])&&a[t].apply(n,[this].concat(e))}},_getImmediateChildren:function(){return[]},_getNestedViews:function(){var t=this._getImmediateChildren();return t.length?i.reduce(t,function(t,e){return e._getNestedViews?t.concat(e._getNestedViews()):t},t):t},_getAncestors:function(){for(var t=[],e=this._parent;e;)t.push(e),e=e._parent;return t},_parentLayoutView:function(){var t=this._getAncestors();return i.find(t,function(t){return t instanceof s.LayoutView})},normalizeMethods:s.normalizeMethods,mergeOptions:s.mergeOptions,getOption:s.proxyGetOption,bindEntityEvents:s.proxyBindEntityEvents,unbindEntityEvents:s.proxyUnbindEntityEvents}),s.ItemView=s.View.extend({constructor:function(){s.View.apply(this,arguments)},serializeData:function(){if(!this.model&&!this.collection)return{};var t=[this.model||this.collection];return arguments.length&&t.push.apply(t,arguments),this.model?this.serializeModel.apply(this,t):{items:this.serializeCollection.apply(this,t)}},serializeCollection:function(t){return t.toJSON.apply(t,i.rest(arguments))},render:function(){return this._ensureViewIsIntact(),this.triggerMethod("before:render",this),this._renderTemplate(),this.isRendered=!0,this.bindUIElements(),this.triggerMethod("render",this),this},_renderTemplate:function(){var t=this.getTemplate();if(t!==!1){if(!t)throw new s.Error({name:"UndefinedTemplateError",message:"Cannot render the template since it is null or undefined."});var e=this.mixinTemplateHelpers(this.serializeData()),i=s.Renderer.render(t,e,this);return this.attachElContent(i),this}},attachElContent:function(t){return this.$el.html(t),this}}),s.CollectionView=s.View.extend({childViewEventPrefix:"childview",sort:!0,constructor:function(){this.once("render",this._initialEvents),this._initChildViewStorage(),s.View.apply(this,arguments),this.on({"before:show":this._onBeforeShowCalled,show:this._onShowCalled,"before:attach":this._onBeforeAttachCalled,attach:this._onAttachCalled}),this.initRenderBuffer()},initRenderBuffer:function(){this._bufferedChildren=[]},startBuffering:function(){this.initRenderBuffer(),this.isBuffering=!0},endBuffering:function(){var t,e=this._isShown&&s.isNodeAttached(this.el);this.isBuffering=!1,this._isShown&&this._triggerMethodMany(this._bufferedChildren,this,"before:show"),e&&this._triggerBeforeAttach&&(t=this._getNestedViews(),this._triggerMethodMany(t,this,"before:attach")),this.attachBuffer(this,this._createBuffer()),e&&this._triggerAttach&&(t=this._getNestedViews(),this._triggerMethodMany(t,this,"attach")),this._isShown&&this._triggerMethodMany(this._bufferedChildren,this,"show"),this.initRenderBuffer()},_triggerMethodMany:function(t,e,n){var r=i.drop(arguments,3);i.each(t,function(t){s.triggerMethodOn.apply(t,[t,n,t,e].concat(r))})},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this.render),this.getOption("sort")&&this.listenTo(this.collection,"sort",this._sortViews))},_onCollectionAdd:function(t,e,n){var r;if(r=void 0!==n.at?n.at:i.indexOf(this._filteredSortedModels(),t),this._shouldAddChild(t,r)){this.destroyEmptyView();var s=this.getChildView(t);this.addChild(t,s,r)}},_onCollectionRemove:function(t){var e=this.children.findByModel(t);this.removeChildView(e),this.checkEmpty()},_onBeforeShowCalled:function(){this._triggerBeforeAttach=this._triggerAttach=!1,this.children.each(function(t){s.triggerMethodOn(t,"before:show",t)})},_onShowCalled:function(){this.children.each(function(t){s.triggerMethodOn(t,"show",t)})},_onBeforeAttachCalled:function(){this._triggerBeforeAttach=!0},_onAttachCalled:function(){this._triggerAttach=!0},render:function(){return this._ensureViewIsIntact(),this.triggerMethod("before:render",this),this._renderChildren(),this.isRendered=!0,this.triggerMethod("render",this),this},reorder:function(){var t=this.children,e=this._filteredSortedModels(),n=i.find(e,function(e){return!t.findByModel(e)});if(n)this.render();else{var r=i.map(e,function(e,i){var n=t.findByModel(e);return n._index=i,n.el});this.triggerMethod("before:reorder"),this._appendReorderedChildren(r),this.triggerMethod("reorder")}},resortView:function(){s.getOption(this,"reorderOnSort")?this.reorder():this.render()},_sortViews:function(){var t=this._filteredSortedModels(),e=i.find(t,function(t,e){var i=this.children.findByModel(t);return!i||i._index!==e},this);e&&this.resortView()},_emptyViewIndex:-1,_appendReorderedChildren:function(t){this.$el.append(t)},_renderChildren:function(){this.destroyEmptyView(),this.destroyChildren({checkEmpty:!1}),this.isEmpty(this.collection)?this.showEmptyView():(this.triggerMethod("before:render:collection",this),this.startBuffering(),this.showCollection(),this.endBuffering(),this.triggerMethod("render:collection",this),this.children.isEmpty()&&this.showEmptyView())},showCollection:function(){var t,e=this._filteredSortedModels();i.each(e,function(e,i){t=this.getChildView(e),this.addChild(e,t,i)},this)},_filteredSortedModels:function(){var t,e=this.getViewComparator();return t=e?i.isString(e)||1===e.length?this.collection.sortBy(e,this):i.clone(this.collection.models).sort(i.bind(e,this)):this.collection.models,this.getOption("filter")&&(t=i.filter(t,function(t,e){return this._shouldAddChild(t,e)},this)),t},showEmptyView:function(){var t=this.getEmptyView();if(t&&!this._showingEmptyView){this.triggerMethod("before:render:empty"),this._showingEmptyView=!0;var i=new e.Model;this.addEmptyView(i,t),this.triggerMethod("render:empty")}},destroyEmptyView:function(){this._showingEmptyView&&(this.triggerMethod("before:remove:empty"),this.destroyChildren(),delete this._showingEmptyView,this.triggerMethod("remove:empty"))},getEmptyView:function(){return this.getOption("emptyView")},addEmptyView:function(t,e){var n,r=this._isShown&&!this.isBuffering&&s.isNodeAttached(this.el),o=this.getOption("emptyViewOptions")||this.getOption("childViewOptions");i.isFunction(o)&&(o=o.call(this,t,this._emptyViewIndex));var h=this.buildChildView(t,e,o);h._parent=this,this.proxyChildEvents(h),this._isShown&&s.triggerMethodOn(h,"before:show",h),this.children.add(h),r&&this._triggerBeforeAttach&&(n=[h].concat(h._getNestedViews()),h.once("render",function(){this._triggerMethodMany(n,this,"before:attach")},this)),this.renderChildView(h,this._emptyViewIndex),r&&this._triggerAttach&&(n=[h].concat(h._getNestedViews()),this._triggerMethodMany(n,this,"attach")),this._isShown&&s.triggerMethodOn(h,"show",h)},getChildView:function(){var t=this.getOption("childView");if(!t)throw new s.Error({name:"NoChildViewError",message:'A "childView" must be specified'});return t},addChild:function(t,e,i){var n=this.getOption("childViewOptions");n=s._getValue(n,this,[t,i]);var r=this.buildChildView(t,e,n);return this._updateIndices(r,!0,i),this.triggerMethod("before:add:child",r),this._addChildView(r,i),this.triggerMethod("add:child",r),r._parent=this,r},_updateIndices:function(t,e,i){this.getOption("sort")&&(e&&(t._index=i),this.children.each(function(i){i._index>=t._index&&(i._index+=e?1:-1)}))},_addChildView:function(t,e){var i,n=this._isShown&&!this.isBuffering&&s.isNodeAttached(this.el);this.proxyChildEvents(t),this._isShown&&!this.isBuffering&&s.triggerMethodOn(t,"before:show",t),this.children.add(t),n&&this._triggerBeforeAttach&&(i=[t].concat(t._getNestedViews()),t.once("render",function(){this._triggerMethodMany(i,this,"before:attach")},this)),this.renderChildView(t,e),n&&this._triggerAttach&&(i=[t].concat(t._getNestedViews()),this._triggerMethodMany(i,this,"attach")),this._isShown&&!this.isBuffering&&s.triggerMethodOn(t,"show",t)},renderChildView:function(t,e){return t.render(),this.attachHtml(this,t,e),t},buildChildView:function(t,e,n){var r=i.extend({model:t},n);return new e(r)},removeChildView:function(t){return t&&(this.triggerMethod("before:remove:child",t),t.destroy?t.destroy():t.remove&&t.remove(),delete t._parent,this.stopListening(t),this.children.remove(t),this.triggerMethod("remove:child",t),this._updateIndices(t,!1)),t},isEmpty:function(){return!this.collection||0===this.collection.length},checkEmpty:function(){this.isEmpty(this.collection)&&this.showEmptyView()},attachBuffer:function(t,e){t.$el.append(e)},_createBuffer:function(){var t=document.createDocumentFragment();return i.each(this._bufferedChildren,function(e){t.appendChild(e.el)}),t},attachHtml:function(t,e,i){t.isBuffering?t._bufferedChildren.splice(i,0,e):t._insertBefore(e,i)||t._insertAfter(e)},_insertBefore:function(t,e){var i,n=this.getOption("sort")&&this.children.length-1>e;return n&&(i=this.children.find(function(t){return t._index===e+1})),i?(i.$el.before(t.el),!0):!1},_insertAfter:function(t){this.$el.append(t.el)},_initChildViewStorage:function(){this.children=new e.ChildViewContainer},destroy:function(){return this.isDestroyed?this:(this.triggerMethod("before:destroy:collection"),this.destroyChildren({checkEmpty:!1}),this.triggerMethod("destroy:collection"),s.View.prototype.destroy.apply(this,arguments))},destroyChildren:function(t){var e=t||{},n=!0,r=this.children.map(i.identity);return i.isUndefined(e.checkEmpty)||(n=e.checkEmpty),this.children.each(this.removeChildView,this),n&&this.checkEmpty(),r},_shouldAddChild:function(t,e){var n=this.getOption("filter");return!i.isFunction(n)||n.call(this,t,e,this.collection)},proxyChildEvents:function(t){var e=this.getOption("childViewEventPrefix");this.listenTo(t,"all",function(){var n=i.toArray(arguments),r=n[0],s=this.normalizeMethods(i.result(this,"childEvents"));n[0]=e+":"+r,n.splice(1,0,t),s!==void 0&&i.isFunction(s[r])&&s[r].apply(this,n.slice(1)),this.triggerMethod.apply(this,n)})},_getImmediateChildren:function(){return i.values(this.children._views)},getViewComparator:function(){return this.getOption("viewComparator")}}),s.CompositeView=s.CollectionView.extend({constructor:function(){s.CollectionView.apply(this,arguments)},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this._renderChildren),this.getOption("sort")&&this.listenTo(this.collection,"sort",this._sortViews))},getChildView:function(){var t=this.getOption("childView")||this.constructor;return t},serializeData:function(){var t={};return this.model&&(t=i.partial(this.serializeModel,this.model).apply(this,arguments)),t},render:function(){return this._ensureViewIsIntact(),this._isRendering=!0,this.resetChildViewContainer(),this.triggerMethod("before:render",this),this._renderTemplate(),this._renderChildren(),this._isRendering=!1,this.isRendered=!0,this.triggerMethod("render",this),this
},_renderChildren:function(){(this.isRendered||this._isRendering)&&s.CollectionView.prototype._renderChildren.call(this)},_renderTemplate:function(){var t={};t=this.serializeData(),t=this.mixinTemplateHelpers(t),this.triggerMethod("before:render:template");var e=this.getTemplate(),i=s.Renderer.render(e,t,this);this.attachElContent(i),this.bindUIElements(),this.triggerMethod("render:template")},attachElContent:function(t){return this.$el.html(t),this},attachBuffer:function(t,e){var i=this.getChildViewContainer(t);i.append(e)},_insertAfter:function(t){var e=this.getChildViewContainer(this,t);e.append(t.el)},_appendReorderedChildren:function(t){var e=this.getChildViewContainer(this);e.append(t)},getChildViewContainer:function(t){if(t.$childViewContainer)return t.$childViewContainer;var e,i=s.getOption(t,"childViewContainer");if(i){var n=s._getValue(i,t);if(e="@"===n.charAt(0)&&t.ui?t.ui[n.substr(4)]:t.$(n),0>=e.length)throw new s.Error({name:"ChildViewContainerMissingError",message:'The specified "childViewContainer" was not found: '+t.childViewContainer})}else e=t.$el;return t.$childViewContainer=e,e},resetChildViewContainer:function(){this.$childViewContainer&&(this.$childViewContainer=void 0)}}),s.LayoutView=s.ItemView.extend({regionClass:s.Region,options:{destroyImmediate:!1},childViewEventPrefix:"childview",constructor:function(t){t=t||{},this._firstRender=!0,this._initializeRegions(t),s.ItemView.call(this,t)},render:function(){return this._ensureViewIsIntact(),this._firstRender?this._firstRender=!1:this._reInitializeRegions(),s.ItemView.prototype.render.apply(this,arguments)},destroy:function(){return this.isDestroyed?this:(this.getOption("destroyImmediate")===!0&&this.$el.remove(),this.regionManager.destroy(),s.ItemView.prototype.destroy.apply(this,arguments))},showChildView:function(t,e){return this.getRegion(t).show(e)},getChildView:function(t){return this.getRegion(t).currentView},addRegion:function(t,e){var i={};return i[t]=e,this._buildRegions(i)[t]},addRegions:function(t){return this.regions=i.extend({},this.regions,t),this._buildRegions(t)},removeRegion:function(t){return delete this.regions[t],this.regionManager.removeRegion(t)},getRegion:function(t){return this.regionManager.get(t)},getRegions:function(){return this.regionManager.getRegions()},_buildRegions:function(t){var e={regionClass:this.getOption("regionClass"),parentEl:i.partial(i.result,this,"el")};return this.regionManager.addRegions(t,e)},_initializeRegions:function(t){var e;this._initRegionManager(),e=s._getValue(this.regions,this,[t])||{};var n=this.getOption.call(t,"regions");n=s._getValue(n,this,[t]),i.extend(e,n),e=this.normalizeUIValues(e,["selector","el"]),this.addRegions(e)},_reInitializeRegions:function(){this.regionManager.invoke("reset")},getRegionManager:function(){return new s.RegionManager},_initRegionManager:function(){this.regionManager=this.getRegionManager(),this.regionManager._parent=this,this.listenTo(this.regionManager,"before:add:region",function(t){this.triggerMethod("before:add:region",t)}),this.listenTo(this.regionManager,"add:region",function(t,e){this[t]=e,this.triggerMethod("add:region",t,e)}),this.listenTo(this.regionManager,"before:remove:region",function(t){this.triggerMethod("before:remove:region",t)}),this.listenTo(this.regionManager,"remove:region",function(t,e){delete this[t],this.triggerMethod("remove:region",t,e)})},_getImmediateChildren:function(){return i.chain(this.regionManager.getRegions()).pluck("currentView").compact().value()}}),s.Behavior=s.Object.extend({constructor:function(t,e){this.view=e,this.defaults=i.result(this,"defaults")||{},this.options=i.extend({},this.defaults,t),this.ui=i.extend({},i.result(e,"ui"),i.result(this,"ui")),s.Object.apply(this,arguments)},$:function(){return this.view.$.apply(this.view,arguments)},destroy:function(){return this.stopListening(),this},proxyViewProperties:function(t){this.$el=t.$el,this.el=t.el}}),s.Behaviors=function(t,e){function i(t,n){return e.isObject(t.behaviors)?(n=i.parseBehaviors(t,n||e.result(t,"behaviors")),i.wrap(t,n,e.keys(o)),n):{}}function n(t,e){this._view=t,this._behaviors=e,this._triggers={}}function r(t){return t._uiBindings||t.ui}var s=/^(\S+)\s*(.*)$/,o={behaviorTriggers:function(t,e){var i=new n(this,e);return i.buildBehaviorTriggers()},behaviorEvents:function(i,n){var o={};return e.each(n,function(i,n){var h={},a=e.clone(e.result(i,"events"))||{};a=t.normalizeUIKeys(a,r(i));var d=0;e.each(a,function(t,r){var o=r.match(s),a=o[1]+"."+[this.cid,n,d++," "].join(""),l=o[2],c=a+l,u=e.isFunction(t)?t:i[t];h[c]=e.bind(u,i)},this),o=e.extend(o,h)},this),o}};return e.extend(i,{behaviorsLookup:function(){throw new t.Error({message:"You must define where your behaviors are stored.",url:"marionette.behaviors.html#behaviorslookup"})},getBehaviorClass:function(e,n){return e.behaviorClass?e.behaviorClass:t._getValue(i.behaviorsLookup,this,[e,n])[n]},parseBehaviors:function(t,n){return e.chain(n).map(function(n,r){var s=i.getBehaviorClass(n,r),o=new s(n,t),h=i.parseBehaviors(t,e.result(o,"behaviors"));return[o].concat(h)}).flatten().value()},wrap:function(t,i,n){e.each(n,function(n){t[n]=e.partial(o[n],t[n],i)})}}),e.extend(n.prototype,{buildBehaviorTriggers:function(){return e.each(this._behaviors,this._buildTriggerHandlersForBehavior,this),this._triggers},_buildTriggerHandlersForBehavior:function(i,n){var s=e.clone(e.result(i,"triggers"))||{};s=t.normalizeUIKeys(s,r(i)),e.each(s,e.bind(this._setHandlerForBehavior,this,i,n))},_setHandlerForBehavior:function(t,e,i,n){var r=n.replace(/^\S+/,function(t){return t+"."+"behaviortriggers"+e});this._triggers[r]=this._view._buildViewTrigger(i)}}),i}(s,i),s.AppRouter=e.Router.extend({constructor:function(t){this.options=t||{},e.Router.apply(this,arguments);var i=this.getOption("appRoutes"),n=this._getController();this.processAppRoutes(n,i),this.on("route",this._processOnRoute,this)},appRoute:function(t,e){var i=this._getController();this._addAppRoute(i,t,e)},_processOnRoute:function(t,e){if(i.isFunction(this.onRoute)){var n=i.invert(this.getOption("appRoutes"))[t];this.onRoute(t,n,e)}},processAppRoutes:function(t,e){if(e){var n=i.keys(e).reverse();i.each(n,function(i){this._addAppRoute(t,i,e[i])},this)}},_getController:function(){return this.getOption("controller")},_addAppRoute:function(t,e,n){var r=t[n];if(!r)throw new s.Error('Method "'+n+'" was not found on the controller');this.route(e,n,i.bind(r,t))},mergeOptions:s.mergeOptions,getOption:s.proxyGetOption,triggerMethod:s.triggerMethod,bindEntityEvents:s.proxyBindEntityEvents,unbindEntityEvents:s.proxyUnbindEntityEvents}),s.Application=s.Object.extend({constructor:function(t){this._initializeRegions(t),this._initCallbacks=new s.Callbacks,this.submodules={},i.extend(this,t),this._initChannel(),s.Object.call(this,t)},execute:function(){this.commands.execute.apply(this.commands,arguments)},request:function(){return this.reqres.request.apply(this.reqres,arguments)},addInitializer:function(t){this._initCallbacks.add(t)},start:function(t){this.triggerMethod("before:start",t),this._initCallbacks.run(t,this),this.triggerMethod("start",t)},addRegions:function(t){return this._regionManager.addRegions(t)},emptyRegions:function(){return this._regionManager.emptyRegions()},removeRegion:function(t){return this._regionManager.removeRegion(t)},getRegion:function(t){return this._regionManager.get(t)},getRegions:function(){return this._regionManager.getRegions()},module:function(t,e){var n=s.Module.getClass(e),r=i.toArray(arguments);return r.unshift(this),n.create.apply(n,r)},getRegionManager:function(){return new s.RegionManager},_initializeRegions:function(t){var e=i.isFunction(this.regions)?this.regions(t):this.regions||{};this._initRegionManager();var n=s.getOption(t,"regions");return i.isFunction(n)&&(n=n.call(this,t)),i.extend(e,n),this.addRegions(e),this},_initRegionManager:function(){this._regionManager=this.getRegionManager(),this._regionManager._parent=this,this.listenTo(this._regionManager,"before:add:region",function(){s._triggerMethod(this,"before:add:region",arguments)}),this.listenTo(this._regionManager,"add:region",function(t,e){this[t]=e,s._triggerMethod(this,"add:region",arguments)}),this.listenTo(this._regionManager,"before:remove:region",function(){s._triggerMethod(this,"before:remove:region",arguments)}),this.listenTo(this._regionManager,"remove:region",function(t){delete this[t],s._triggerMethod(this,"remove:region",arguments)})},_initChannel:function(){this.channelName=i.result(this,"channelName")||"global",this.channel=i.result(this,"channel")||e.Wreqr.radio.channel(this.channelName),this.vent=i.result(this,"vent")||this.channel.vent,this.commands=i.result(this,"commands")||this.channel.commands,this.reqres=i.result(this,"reqres")||this.channel.reqres}}),s.Module=function(t,e,n){this.moduleName=t,this.options=i.extend({},this.options,n),this.initialize=n.initialize||this.initialize,this.submodules={},this._setupInitializersAndFinalizers(),this.app=e,i.isFunction(this.initialize)&&this.initialize(t,e,this.options)},s.Module.extend=s.extend,i.extend(s.Module.prototype,e.Events,{startWithParent:!0,initialize:function(){},addInitializer:function(t){this._initializerCallbacks.add(t)},addFinalizer:function(t){this._finalizerCallbacks.add(t)},start:function(t){this._isInitialized||(i.each(this.submodules,function(e){e.startWithParent&&e.start(t)}),this.triggerMethod("before:start",t),this._initializerCallbacks.run(t,this),this._isInitialized=!0,this.triggerMethod("start",t))},stop:function(){this._isInitialized&&(this._isInitialized=!1,this.triggerMethod("before:stop"),i.invoke(this.submodules,"stop"),this._finalizerCallbacks.run(void 0,this),this._initializerCallbacks.reset(),this._finalizerCallbacks.reset(),this.triggerMethod("stop"))},addDefinition:function(t,e){this._runModuleDefinition(t,e)},_runModuleDefinition:function(t,n){if(t){var r=i.flatten([this,this.app,e,s,e.$,i,n]);t.apply(this,r)}},_setupInitializersAndFinalizers:function(){this._initializerCallbacks=new s.Callbacks,this._finalizerCallbacks=new s.Callbacks},triggerMethod:s.triggerMethod}),i.extend(s.Module,{create:function(t,e,n){var r=t,s=i.drop(arguments,3);e=e.split(".");var o=e.length,h=[];return h[o-1]=n,i.each(e,function(e,i){var o=r;r=this._getModule(o,e,t,n),this._addModuleDefinition(o,r,h[i],s)},this),r},_getModule:function(t,e,n,r){var s=i.extend({},r),o=this.getClass(r),h=t[e];return h||(h=new o(e,n,s),t[e]=h,t.submodules[e]=h),h},getClass:function(t){var e=s.Module;return t?t.prototype instanceof e?t:t.moduleClass||e:e},_addModuleDefinition:function(t,e,i,n){var r=this._getDefine(i),s=this._getStartWithParent(i,e);r&&e.addDefinition(r,n),this._addStartWithParent(t,e,s)},_getStartWithParent:function(t,e){var n;return i.isFunction(t)&&t.prototype instanceof s.Module?(n=e.constructor.prototype.startWithParent,i.isUndefined(n)?!0:n):i.isObject(t)?(n=t.startWithParent,i.isUndefined(n)?!0:n):!0},_getDefine:function(t){return!i.isFunction(t)||t.prototype instanceof s.Module?i.isObject(t)?t.define:null:t},_addStartWithParent:function(t,e,i){e.startWithParent=e.startWithParent&&i,e.startWithParent&&!e.startWithParentIsConfigured&&(e.startWithParentIsConfigured=!0,t.addInitializer(function(t){e.startWithParent&&e.start(t)}))}}),s});
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],n):e.Backbone.Radio=n(e._,e.Backbone)}(this,function(e,n){"use strict";function t(e,n,t,r){var s=e[n];return t&&t!==s.callback&&t!==s.callback._callback||r&&r!==s.context?void 0:(delete e[n],!0)}function r(n,r,s,i){n||(n={});for(var a=r?[r]:e.keys(n),u=!1,o=0,c=a.length;c>o;o++)r=a[o],n[r]&&t(n,r,s,i)&&(u=!0);return u}function s(n){return c[n]||(c[n]=e.partial(u.log,n))}function i(n){return e.isFunction(n)?n:function(){return n}}var a=n.Radio,u=n.Radio={};u.VERSION="1.0.1",u.noConflict=function(){return n.Radio=a,this},u.DEBUG=!1,u._debugText=function(e,n,t){return e+(t?" on the "+t+" channel":"")+': "'+n+'"'},u.debugLog=function(e,n,t){u.DEBUG&&console&&console.warn&&console.warn(u._debugText(e,n,t))};var o=/\s+/;u._eventsApi=function(n,t,r,s){if(!r)return!1;var i={};if("object"==typeof r){for(var a in r){var u=n[t].apply(n,[a,r[a]].concat(s));o.test(a)?e.extend(i,u):i[a]=u}return i}if(o.test(r)){for(var c=r.split(o),l=0,h=c.length;h>l;l++)i[c[l]]=n[t].apply(n,[c[l]].concat(s));return i}return!1},u._callHandler=function(e,n,t){var r=t[0],s=t[1],i=t[2];switch(t.length){case 0:return e.call(n);case 1:return e.call(n,r);case 2:return e.call(n,r,s);case 3:return e.call(n,r,s,i);default:return e.apply(n,t)}};var c={};e.extend(u,{log:function(n,t){var r=e.rest(arguments,2);console.log("["+n+'] "'+t+'"',r)},tuneIn:function(e){var n=u.channel(e);return n._tunedIn=!0,n.on("all",s(e)),this},tuneOut:function(e){var n=u.channel(e);return n._tunedIn=!1,n.off("all",s(e)),delete c[e],this}}),u.Requests={request:function(n){var t=e.rest(arguments),r=u._eventsApi(this,"request",n,t);if(r)return r;var s=this.channelName,i=this._requests;if(s&&this._tunedIn&&u.log.apply(this,[s,n].concat(t)),i&&(i[n]||i["default"])){var a=i[n]||i["default"];return t=i[n]?t:arguments,u._callHandler(a.callback,a.context,t)}u.debugLog("An unhandled request was fired",n,s)},reply:function(e,n,t){return u._eventsApi(this,"reply",e,[n,t])?this:(this._requests||(this._requests={}),this._requests[e]&&u.debugLog("A request was overwritten",e,this.channelName),this._requests[e]={callback:i(n),context:t||this},this)},replyOnce:function(n,t,r){if(u._eventsApi(this,"replyOnce",n,[t,r]))return this;var s=this,a=e.once(function(){return s.stopReplying(n),i(t).apply(this,arguments)});return this.reply(n,a,r)},stopReplying:function(e,n,t){return u._eventsApi(this,"stopReplying",e)?this:(e||n||t?r(this._requests,e,n,t)||u.debugLog("Attempted to remove the unregistered request",e,this.channelName):delete this._requests,this)}},u._channels={},u.channel=function(e){if(!e)throw new Error("You must provide a name for the channel.");return u._channels[e]?u._channels[e]:u._channels[e]=new u.Channel(e)},u.Channel=function(e){this.channelName=e},e.extend(u.Channel.prototype,n.Events,u.Requests,{reset:function(){return this.off(),this.stopListening(),this.stopReplying(),this}});var l,h,f=[n.Events,u.Commands,u.Requests];e.each(f,function(n){e.each(n,function(n,t){u[t]=function(n){return h=e.rest(arguments),l=this.channel(n),l[t].apply(l,h)}})}),u.reset=function(n){var t=n?[this._channels[n]]:this._channels;e.invoke(t,"reset")};var p=u;return p});
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.mexp=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=a("./postfix_evaluator.js");d.prototype.formulaEval=function(){"use strict";for(var a,b,c,d=[],e=this.value,f=0;f<e.length;f++)1===e[f].type||3===e[f].type?d.push({value:3===e[f].type?e[f].show:e[f].value,type:1}):13===e[f].type?d.push({value:e[f].show,type:1}):0===e[f].type?d[d.length-1]={value:e[f].show+("-"!=e[f].show?"(":"")+d[d.length-1].value+("-"!=e[f].show?")":""),type:0}:7===e[f].type?d[d.length-1]={value:(1!=d[d.length-1].type?"(":"")+d[d.length-1].value+(1!=d[d.length-1].type?")":"")+e[f].show,type:7}:10===e[f].type?(a=d.pop(),b=d.pop(),"P"===e[f].show||"C"===e[f].show?d.push({value:"<sup>"+b.value+"</sup>"+e[f].show+"<sub>"+a.value+"</sub>",type:10}):d.push({value:(1!=b.type?"(":"")+b.value+(1!=b.type?")":"")+"<sup>"+a.value+"</sup>",type:1})):2===e[f].type||9===e[f].type?(a=d.pop(),b=d.pop(),d.push({value:(1!=b.type?"(":"")+b.value+(1!=b.type?")":"")+e[f].show+(1!=a.type?"(":"")+a.value+(1!=a.type?")":""),type:e[f].type})):12===e[f].type&&(a=d.pop(),b=d.pop(),c=d.pop(),d.push({value:e[f].show+"("+c.value+","+b.value+","+a.value+")",type:12}));return d[0].value},b.exports=d},{"./postfix_evaluator.js":5}],2:[function(a,b,c){function d(a,b){for(var c=0;c<a.length;c++)a[c]+=b;return a}function e(a,b,c,d){for(var e=0;e<d;e++)if(a[c+e]!==b[e])return!1;return!0}var f=a("./math_function.js"),g=["sin","cos","tan","pi","(",")","P","C","asin","acos","atan","7","8","9","int","cosh","acosh","ln","^","root","4","5","6","/","!","tanh","atanh","Mod","1","2","3","*","sinh","asinh","e","log","0",".","+","-",",","Sigma","n","Pi","pow"],h=["sin","cos","tan","&pi;","(",")","P","C","asin","acos","atan","7","8","9","Int","cosh","acosh"," ln","^","root","4","5","6","&divide;","!","tanh","atanh"," Mod ","1","2","3","&times;","sinh","asinh","e"," log","0",".","+","-",",","&Sigma;","n","&Pi;","pow"],j=[f.math.sin,f.math.cos,f.math.tan,"PI","(",")",f.math.P,f.math.C,f.math.asin,f.math.acos,f.math.atan,"7","8","9",Math.floor,f.math.cosh,f.math.acosh,Math.log,Math.pow,Math.sqrt,"4","5","6",f.math.div,f.math.fact,f.math.tanh,f.math.atanh,f.math.mod,"1","2","3",f.math.mul,f.math.sinh,f.math.asinh,"E",f.math.log,"0",".",f.math.add,f.math.sub,",",f.math.sigma,"n",f.math.Pi,Math.pow],k={0:11,1:0,2:3,3:0,4:0,5:0,6:0,7:11,8:11,9:1,10:10,11:0,12:11,13:0},l=[0,0,0,3,4,5,10,10,0,0,0,1,1,1,0,0,0,0,10,0,1,1,1,2,7,0,0,2,1,1,1,2,0,0,3,0,1,6,9,9,11,12,13,12,8],m={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,9:!0,12:!0,13:!0},n={0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,10:!0,11:!0,12:!0,13:!0},o={0:!0,3:!0,4:!0,8:!0,12:!0,13:!0},p={},q={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,12:!0,13:!0},r={1:!0},s=[[],["1","2","3","7","8","9","4","5","6","+","-","*","/","(",")","^","!","P","C","e","0",".",",","n"],["pi","ln","Pi"],["sin","cos","tan","Del","int","Mod","log","pow"],["asin","acos","atan","cosh","root","tanh","sinh"],["acosh","atanh","asinh","Sigma"]];f.addToken=function(a){for(i=0;i<a.length;i++){x=a[i].token.length;var b=-1;if(x<s.length)for(y=0;y<s[x].length;y++)if(a[i].token===s[x][y]){b=g.indexOf(s[x][y]);break}b===-1?(g.push(a[i].token),l.push(a[i].type),s.length<=a[i].token.length&&(s[a[i].token.length]=[]),s[a[i].token.length].push(a[i].token),j.push(a[i].value),h.push(a[i].show)):(g[b]=a[i].token,l[b]=a[i].type,j[b]=a[i].value,h[b]=a[i].show)}},f.lex=function(a,b){"use strict";var c,i,t,u,v=[{type:4,value:"(",show:"(",pre:0}],w=[],x=a,y=0,z=m,A=0,B=p,C="";"undefined"!=typeof b&&f.addToken(b);var D={};for(i=0;i<x.length;i++)if(" "!=x[i]){c="";a:for(t=x.length-i>s.length-2?s.length-1:x.length-i;t>0;t--)for(u=0;u<s[t].length;u++)if(e(x,s[t][u],i,t)){c=s[t][u];break a}if(i+=c.length-1,""===c)throw new f.exception("Can't understand after "+x.slice(i));var E=g.indexOf(c),F=c,G=l[E],H=j[E],I=k[G],J=h[E],K=v[v.length-1];for(L=w.length;L--;)if(0===w[L]&&[0,2,3,5,9,11,12,13].indexOf(G)!==-1){if(z[G]!==!0)throw new f.exception(c+" is not allowed after "+C);v.push({value:")",type:5,pre:0,show:")"}),z=n,B=q,d(w,-1).pop()}if(z[G]!==!0)throw new f.exception(c+" is not allowed after "+C);if(B[G]===!0&&(G=2,H=f.math.mul,J="&times;",I=3,i-=c.length),D={value:H,type:G,pre:I,show:J},0===G)z=m,B=p,d(w,2).push(2),v.push(D),v.push({value:"(",type:4,pre:0,show:"("});else if(1===G)1===K.type?(K.value+=H,d(w,1)):v.push(D),z=n,B=o;else if(2===G)z=m,B=p,d(w,2),v.push(D);else if(3===G)v.push(D),z=n,B=q;else if(4===G)y+=w.length,w=[],A++,z=m,B=p,v.push(D);else if(5===G){if(!A)throw new f.exception("Closing parenthesis are more than opening one, wait What!!!");for(;y--;)v.push({value:")",type:5,pre:0,show:")"});y=0,A--,z=n,B=q,v.push(D)}else if(6===G){if(K.hasDec)throw new f.exception("Two decimals are not allowed in one number");1!==K.type&&(K={value:0,type:1,pre:0},v.push(K),d(w,-1)),z=r,d(w,1),B=p,K.value+=H,K.hasDec=!0}else 7===G&&(z=n,B=q,d(w,1),v.push(D));8===G?(z=m,B=p,d(w,4).push(4),v.push(D),v.push({value:"(",type:4,pre:0,show:"("})):9===G?(9===K.type?K.value===f.math.add?(K.value=H,K.show=J,d(w,1)):K.value===f.math.sub&&"-"===J&&(K.value=f.math.add,K.show="+",d(w,1)):5!==K.type&&7!==K.type&&1!==K.type&&3!==K.type&&13!==K.type?"-"===F&&(z=m,B=p,d(w,2).push(2),v.push({value:f.math.changeSign,type:0,pre:21,show:"-"}),v.push({value:"(",type:4,pre:0,show:"("})):(v.push(D),d(w,2)),z=m,B=p):10===G?(z=m,B=p,d(w,2),v.push(D)):11===G?(z=m,B=p,v.push(D)):12===G?(z=m,B=p,d(w,6).push(6),v.push(D),v.push({value:"(",type:4,pre:0})):13===G&&(z=n,B=q,v.push(D)),d(w,-1),C=c}for(var L=w.length;L--;)0===w[L]&&(v.push({value:")",show:")",type:5,pre:3}),d(w,-1).pop());if(z[5]!==!0)throw new f.exception("complete the expression");for(;A--;)v.push({value:")",show:")",type:5,pre:3});return v.push({type:5,value:")",show:")",pre:0}),new f(v)},b.exports=f},{"./math_function.js":3}],3:[function(a,b,c){var d=function(a){this.value=a};d.math={isDegree:!0,acos:function(a){return d.math.isDegree?180/Math.PI*Math.acos(a):Math.acos(a)},add:function(a,b){return a+b},asin:function(a){return d.math.isDegree?180/Math.PI*Math.asin(a):Math.asin(a)},atan:function(a){return d.math.isDegree?180/Math.PI*Math.atan(a):Math.atan(a)},acosh:function(a){return Math.log(a+Math.sqrt(a*a-1))},asinh:function(a){return Math.log(a+Math.sqrt(a*a+1))},atanh:function(a){return Math.log((1+a)/(1-a))},C:function(a,b){var c=1,e=a-b,f=b;f<e&&(f=e,e=b);for(var g=f+1;g<=a;g++)c*=g;return c/d.math.fact(e)},changeSign:function(a){return-a},cos:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.cos(a)},cosh:function(a){return(Math.pow(Math.E,a)+Math.pow(Math.E,-1*a))/2},div:function(a,b){return a/b},fact:function(a){if(a%1!==0)return"NAN";for(var b=1,c=2;c<=a;c++)b*=c;return b},inverse:function(a){return 1/a},log:function(a){return Math.log(a)/Math.log(10)},mod:function(a,b){return a%b},mul:function(a,b){return a*b},P:function(a,b){for(var c=1,d=Math.floor(a)-Math.floor(b)+1;d<=Math.floor(a);d++)c*=d;return c},Pi:function(a,b,c){for(var d=1,e=a;e<=b;e++)d*=Number(c.postfixEval({n:e}));return d},pow10x:function(a){for(var b=1;a--;)b*=10;return b},sigma:function(a,b,c){for(var d=0,e=a;e<=b;e++)d+=Number(c.postfixEval({n:e}));return d},sin:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.sin(a)},sinh:function(a){return(Math.pow(Math.E,a)-Math.pow(Math.E,-1*a))/2},sub:function(a,b){return a-b},tan:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.tan(a)},tanh:function(a){return d.sinha(a)/d.cosha(a)},toRadian:function(a){return a*Math.PI/180}},d.exception=function(a){this.message=a},b.exports=d},{}],4:[function(a,b,c){var d=a("./lexer.js");d.prototype.toPostfix=function(){"use strict";for(var a,b,c,e,f,g=[],h=[{value:"(",type:4,pre:0}],i=this.value,j=1;j<i.length;j++)if(1===i[j].type||3===i[j].type||13===i[j].type)1===i[j].type&&(i[j].value=Number(i[j].value)),g.push(i[j]);else if(4===i[j].type)h.push(i[j]);else if(5===i[j].type)for(;4!==(b=h.pop()).type;)g.push(b);else if(11===i[j].type){for(;4!==(b=h.pop()).type;)g.push(b);h.push(b)}else{a=i[j],e=a.pre,f=h[h.length-1],c=f.pre;var k="Math.pow"==f.value&&"Math.pow"==a.value;if(e>c)h.push(a);else{for(;c>=e&&!k||k&&e<c;)b=h.pop(),f=h[h.length-1],g.push(b),c=f.pre,k="Math.pow"==a.value&&"Math.pow"==f.value;h.push(a)}}return new d(g)},b.exports=d},{"./lexer.js":2}],5:[function(a,b,c){var d=a("./postfix.js");d.prototype.postfixEval=function(a){"use strict";a=a||{},a.PI=Math.PI,a.E=Math.E;for(var b,c,e,f=[],g=this.value,h="undefined"!=typeof a.n,i=0;i<g.length;i++)1===g[i].type?f.push({value:g[i].value,type:1}):3===g[i].type?f.push({value:a[g[i].value],type:1}):0===g[i].type?"undefined"==typeof f[f.length-1].type?f[f.length-1].value.push(g[i]):f[f.length-1].value=g[i].value(f[f.length-1].value):7===g[i].type?"undefined"==typeof f[f.length-1].type?f[f.length-1].value.push(g[i]):f[f.length-1].value=g[i].value(f[f.length-1].value):8===g[i].type?(b=f.pop(),c=f.pop(),f.push({type:1,value:g[i].value(c.value,b.value)})):10===g[i].type?(b=f.pop(),c=f.pop(),"undefined"==typeof c.type?(c.value=c.concat(b),c.value.push(g[i]),f.push(c)):"undefined"==typeof b.type?(b.unshift(c),b.push(g[i]),f.push(b)):f.push({type:1,value:g[i].value(c.value,b.value)})):2===g[i].type||9===g[i].type?(b=f.pop(),c=f.pop(),"undefined"==typeof c.type?(console.log(c),c=c.concat(b),c.push(g[i]),f.push(c)):"undefined"==typeof b.type?(b.unshift(c),b.push(g[i]),f.push(b)):f.push({type:1,value:g[i].value(c.value,b.value)})):12===g[i].type?(b=f.pop(),"undefined"!=typeof b.type&&(b=[b]),c=f.pop(),e=f.pop(),f.push({type:1,value:g[i].value(e.value,c.value,new d(b))})):13===g[i].type&&(h?f.push({value:a[g[i].value],type:3}):f.push([g[i]]));if(f.length>1)throw new d.exception("Uncaught Syntax error");return f[0].value>1e15?"Infinity":Number(f[0].value.toFixed(15)).toPrecision()},d.eval=function(a,b,c){return"undefined"==typeof b?this.lex(a).toPostfix().postfixEval():"undefined"==typeof c?"undefined"!=typeof b.length?this.lex(a,b).toPostfix().postfixEval():this.lex(a).toPostfix().postfixEval(b):this.lex(a,b).toPostfix().postfixEval(c)},b.exports=d},{"./postfix.js":4}]},{},[1])(1)});
var nfRadio=Backbone.Radio;
nfRadio.channel('form').on('render:view', function(){
jQuery('.g-recaptcha').each(function(){
var callback=jQuery(this).data('callback');
var fieldID=jQuery(this).data('fieldid');
if(typeof window[ callback ]!=='function'){
window[ callback ]=function(response){
nfRadio.channel('recaptcha').request('update:response', response, fieldID);
};}});
});
var nfRecaptcha=Marionette.Object.extend({
initialize: function(){
if(0!=jQuery('.g-recaptcha').length){
this.renderCaptcha();
}
this.listenTo(nfRadio.channel('form'), 'render:view', this.renderCaptcha);
this.listenTo(nfRadio.channel('captcha'), 'reset', this.renderCaptcha);
},
renderCaptcha: function(){
jQuery('.g-recaptcha').each(function(){
var opts={
fieldid: jQuery(this).data('fieldid'),
size: jQuery(this).data('size'),
theme: jQuery(this).data('theme'),
sitekey: jQuery(this).data('sitekey'),
callback: jQuery(this).data('callback')
};
var grecaptchaID=grecaptcha.render(jQuery(this)[0], opts);
if(opts.size==='invisible'){
try {
grecaptcha.execute(grecaptchaID);
} catch(e){
console.log('Notice: Error trying to execute grecaptcha.');
}}
});
}});
var nfRenderRecaptcha=function(){
new nfRecaptcha();
};
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