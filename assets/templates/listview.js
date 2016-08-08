window.JST = JST || {};
window.JST['assets/templates/listview'] = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (keyvals, undefined) {
buf.push("<div class=\"col-md-12\"><table id=\"mainTable\" style=\"cursor: pointer;\" class=\"table table-bordered\"><thead><tr><th style=\"text-align: center;\">#</th><th style=\"text-align: center;\">Key</th><th style=\"text-align: center;\">Value</th></tr></thead><tbody>");
// iterate keyvals
;(function(){
  var $$obj = keyvals;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var pair = $$obj[index];

// iterate pair
;(function(){
  var $$obj = pair;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var val = $$obj[key];

buf.push("<tr><td>" + (jade.escape(null == (jade_interp = index) ? "" : jade_interp)) + "</td><td" + (jade.attr("data-key", key, true, false)) + ">" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)) + "</td><td" + (jade.attr("id", key, true, false)) + (jade.attr("data-val", val, true, false)) + ">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var val = $$obj[key];

buf.push("<tr><td>" + (jade.escape(null == (jade_interp = index) ? "" : jade_interp)) + "</td><td" + (jade.attr("data-key", key, true, false)) + ">" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)) + "</td><td" + (jade.attr("id", key, true, false)) + (jade.attr("data-val", val, true, false)) + ">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</td></tr>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var pair = $$obj[index];

// iterate pair
;(function(){
  var $$obj = pair;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var val = $$obj[key];

buf.push("<tr><td>" + (jade.escape(null == (jade_interp = index) ? "" : jade_interp)) + "</td><td" + (jade.attr("data-key", key, true, false)) + ">" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)) + "</td><td" + (jade.attr("id", key, true, false)) + (jade.attr("data-val", val, true, false)) + ">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var val = $$obj[key];

buf.push("<tr><td>" + (jade.escape(null == (jade_interp = index) ? "" : jade_interp)) + "</td><td" + (jade.attr("data-key", key, true, false)) + ">" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)) + "</td><td" + (jade.attr("id", key, true, false)) + (jade.attr("data-val", val, true, false)) + ">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</td></tr>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</tbody></table></div>");}.call(this,"keyvals" in locals_for_with?locals_for_with.keyvals:typeof keyvals!=="undefined"?keyvals:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
