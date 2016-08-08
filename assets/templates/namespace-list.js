window.JST = JST || {};
window.JST['assets/templates/namespace-list'] = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (namespaces, undefined) {
// iterate namespaces
;(function(){
  var $$obj = namespaces;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var chunk = $$obj[$index];

buf.push("<div class=\"col-sm-4\"><div class=\"list-group\">");
// iterate chunk
;(function(){
  var $$obj = chunk;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<a href=\"#\"" + (jade.attr("id", val, true, false)) + " class=\"list-group-item list-group\">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<a href=\"#\"" + (jade.attr("id", val, true, false)) + " class=\"list-group-item list-group\">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var chunk = $$obj[$index];

buf.push("<div class=\"col-sm-4\"><div class=\"list-group\">");
// iterate chunk
;(function(){
  var $$obj = chunk;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<a href=\"#\"" + (jade.attr("id", val, true, false)) + " class=\"list-group-item list-group\">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<a href=\"#\"" + (jade.attr("id", val, true, false)) + " class=\"list-group-item list-group\">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</div></div>");
    }

  }
}).call(this);
}.call(this,"namespaces" in locals_for_with?locals_for_with.namespaces:typeof namespaces!=="undefined"?namespaces:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
