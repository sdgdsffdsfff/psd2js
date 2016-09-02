import _ from 'lodash'
import Node from '../node'
import Group from './group'
import Layer from './layer'

class Root {
	constructor(psd) {
		this.psd = psd;
		Root.__super__.constructor.call(this, Root.layerForPsd(this.psd));
		this.buildHeirarchy();
	}
	type() {
		return 'root';
	}
	/**
	 * 获取PSD图层
	 */
	layerForPsd(psd) {
		let layer, _ref = {}, Node.PROPERTIES;
		for (let i = 0, len = _ref.length; i < len; i++) {
			let prop = _ref[i];
			layer[prop] = null;
		}
		layer.top = 0;
		layer.left = 0;
		layer.right = psd.header.width;
		layer.bottom = psd.header.height;
		return layer;
	}
	/**
	 * 获取文档尺寸
	 */
	documentDimensions() {
		return [this.width, this.height];
	}
	/**
	 * 获取层次
	 */
	depth() {
		return 0;
	}
	/**
	 * 获取透明度
	 */
	opacity() {
		return 255;
	}
	/**
	 * 获取填充透明度
	 */
	fillOpacity() {
		return 255;
	}
	/**
	 * 构建层级
	 */
	buildHeirarchy() {
		let currentGroup = this;
		let parseStack = [];
		let _ref = this.psd.layers;
		for (let i = 0, len = _ref.length; i < len; i++) {
			let layer = _ref[i];
			let parent;
			if (layer.isFolder()) {
				parseStack.push(currentGroup);
				currentGroup = new Group(layer, _.last(parseStack));
			} else if (layer.isFolderEnd()) {
				parent = parseStack.pop();
				parent.children().push(currentGroup);
				currentGroup = parent;
			} else {
				currentGroup.children().push(new Layer(layer, currentGroup));
			}
		}
		return this.updateDimensions();
	}
} 
exports Root


(function() {
  var Group, Layer, Node, Root, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  Node = require('../node');

  Group = require('./group');

  Layer = require('./layer');

  module.exports = Root = (function(_super) {
    __extends(Root, _super);

    Root.layerForPsd = function(psd) {
      var layer, prop, _i, _len, _ref;
      layer = {};
      _ref = Node.PROPERTIES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        layer[prop] = null;
      }
      layer.top = 0;
      layer.left = 0;
      layer.right = psd.header.width;
      layer.bottom = psd.header.height;
      return layer;
    };

    Root.prototype.type = 'root';

    function Root(psd) {
      this.psd = psd;
      Root.__super__.constructor.call(this, Root.layerForPsd(this.psd));
      this.buildHeirarchy();
    }

    Root.prototype.documentDimensions = function() {
      return [this.width, this.height];
    };

    Root.prototype.depth = function() {
      return 0;
    };

    Root.prototype.opacity = function() {
      return 255;
    };

    Root.prototype.fillOpacity = function() {
      return 255;
    };

    Root.prototype["export"] = function() {
      var _ref;
      return {
        children: this._children.map(function(c) {
          return c["export"]();
        }),
        document: {
          width: this.width,
          height: this.height,
          resources: {
            layerComps: ((_ref = this.psd.resources.resource('layerComps')) != null ? _ref["export"]() : void 0) || [],
            guides: [],
            slices: []
          }
        }
      };
    };

    Root.prototype.buildHeirarchy = function() {
      var currentGroup, layer, parent, parseStack, _i, _len, _ref;
      currentGroup = this;
      parseStack = [];
      _ref = this.psd.layers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        layer = _ref[_i];
        if (layer.isFolder()) {
          parseStack.push(currentGroup);
          currentGroup = new Group(layer, _.last(parseStack));
        } else if (layer.isFolderEnd()) {
          parent = parseStack.pop();
          parent.children().push(currentGroup);
          currentGroup = parent;
        } else {
          currentGroup.children().push(new Layer(layer, currentGroup));
        }
      }
      return this.updateDimensions();
    };

    return Root;

  })(Node);

}).call(this);
