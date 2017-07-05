'use strict';

var app = angular.module('select2filter', ['sdeutils']);

// Adds filter functionality to anuglar select
app.filter('propsFilter', function(sdeutils) {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (prop.indexOf('.') !== -1 && sdeutils.getDescendantProp(item, prop).toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
          } else if (prop.indexOf('.') === -1 && item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
          }

          if (itemMatches) {
            out.push(item);
            break;
          }
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
