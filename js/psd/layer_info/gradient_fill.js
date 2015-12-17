// Generated by CoffeeScript 1.7.1
(function() {
  var Descriptor, GradientFill, LayerInfo,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  LayerInfo = require('../layer_info.coffee');

  Descriptor = require('../descriptor.coffee');

  module.exports = GradientFill = (function(_super) {
    __extends(GradientFill, _super);

    function GradientFill() {
      return GradientFill.__super__.constructor.apply(this, arguments);
    }

    GradientFill.shouldParse = function(key) {
      return key === 'GdFl';
    };

    GradientFill.prototype.parse = function() {
      this.file.seek(4, true);
      return this.data = new Descriptor(this.file).parse();
    };

    return GradientFill;

  })(LayerInfo);

}).call(this);
