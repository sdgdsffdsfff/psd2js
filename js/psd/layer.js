import positionChannels from './layer/position_channels'
import blendModes from './layer/blend_modes'
import mask from './layer/mask'
import blendingRanges from './layer/blending_ranges'
import name from './layer/name'
import info from './layer/info'
import helpers from './layer/helpers'
import channelImage from './layer/channel_image'

export class Layer {
	/**
	 * 构造函数
	 */
	constructor() {
		this.file = file;
		this.header = header;
		this.mask = {};
		this.blendingRanges = {};
		this.adjustments = {};
		this.channelsInfo = [];
		this.blendMode = {};
		this.groupLayer = null;
		this.infoKeys = [];
      Object.defineProperty(this, 'name', {
        get: function() {
          
        }
      });
	}
	get name() {
		if (this.adjustments['name'] != null) {
            return this.adjustments['name'].data;
		} else {
            return this.legacyName;
		}
	}
	/**
	 * 解析
	 */
	parse = function() {
		this.parsePositionAndChannels();
		this.parseBlendModes();
		let extraLen = this.file.readInt();
		this.layerEnd = this.file.tell() + extraLen;
		this.parseMaskData();
		this.parseBlendingRanges();
		this.parseLegacyLayerName();
		this.parseLayerInfo();
		this.file.seek(this.layerEnd);
		return this;
    }
	/**
	 * 导出
	 */
	export() {
		return {
			name: this.name,
			top: this.top,
			right: this.right,
			bottom: this.bottom,
			left: this.left,
			width: this.width,
			height: this.height,
			opacity: this.opacity,
			visible: this.visible,
			clipped: this.clipped,
			mask: this.mask["export"](),
		};
    }
}



(function() {
  var Layer, Module,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Module = require('coffeescript-module').Module;

  module.exports = Layer = (function(_super) {
    __extends(Layer, _super);

    Layer.includes(require('./layer/position_channels'));

    Layer.includes(require('./layer/blend_modes'));

    Layer.includes(require('./layer/mask'));

    Layer.includes(require('./layer/blending_ranges'));

    Layer.includes(require('./layer/name'));

    Layer.includes(require('./layer/info'));

    Layer.includes(require('./layer/helpers'));

    Layer.includes(require('./layer/channel_image'));

    function Layer(file, header) {
      this.file = file;
      this.header = header;
      this.mask = {};
      this.blendingRanges = {};
      this.adjustments = {};
      this.channelsInfo = [];
      this.blendMode = {};
      this.groupLayer = null;
      this.infoKeys = [];
      Object.defineProperty(this, 'name', {
        get: function() {
          if (this.adjustments['name'] != null) {
            return this.adjustments['name'].data;
          } else {
            return this.legacyName;
          }
        }
      });
    }

    Layer.prototype.parse = function() {
      var extraLen;
      this.parsePositionAndChannels();
      this.parseBlendModes();
      extraLen = this.file.readInt();
      this.layerEnd = this.file.tell() + extraLen;
      this.parseMaskData();
      this.parseBlendingRanges();
      this.parseLegacyLayerName();
      this.parseLayerInfo();
      this.file.seek(this.layerEnd);
      return this;
    };

    Layer.prototype["export"] = function() {
      return {
        name: this.name,
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left,
        width: this.width,
        height: this.height,
        opacity: this.opacity,
        visible: this.visible,
        clipped: this.clipped,
        mask: this.mask["export"]()
      };
    };

    return Layer;

  })(Module);

}).call(this);
