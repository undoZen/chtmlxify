'use strict';
var through = require('through2');
var chtmlx = require('chtmlx');
var coffee = require('coffee-script');

module.exports = function (ext) {
  ext = ext || '.chtmlx';
  if (ext[0] != '.') {
    ext = '.' + ext;
  }
  return function (file) {
    return through(function (buf, enc, next) {
      var index;
      if ( (index = file.indexOf(ext)) > -1 && file.length - index - ext.length === 0) {
        var transformed = chtmlx(buf.toString('utf-8'), file);
        transformed = coffee.compile(transformed, { bare: true });
        this.push(transformed);
      } else {
        this.push(buf);
      }
      next();
    });
  }
};
