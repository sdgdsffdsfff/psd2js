import _ from 'lodash'
import Node from '../node'

/**
 * 图层
 */
class Layer extends Node {
	type() {
		return 'layer'
	}
	isEmpty() {
		return this.width === 0 || this.height === 0
	}
}


(function() {
  var Layer, Node, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  Node = require('../node');

  module.exports = Layer = (function(_super) {
    __extends(Layer, _super);

    function Layer() {
      return Layer.__super__.constructor.apply(this, arguments);
    }

    Layer.prototype.type = 'layer';

    Layer.prototype.isEmpty = function() {
      return this.width === 0 || this.height === 0;
    };

    Layer.prototype["export"] = function() {
      var _ref;
      return _.merge(Layer.__super__["export"].call(this), {
        type: 'layer',
        mask: this.layer.mask["export"](),
        text: (_ref = this.get('typeTool')) != null ? _ref["export"]() : void 0,
        image: {}
      });
    };

    return Layer;

  })(Node);

}).call(this);
