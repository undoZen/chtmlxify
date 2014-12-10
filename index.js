'use strict';
var path = require('path');
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
      if (path.extname(file) === ext) {
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
