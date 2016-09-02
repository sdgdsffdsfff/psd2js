var File, Header, Image, LayerMask, LazyExecute, Module, PSD, RSVP, Resources,
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) {
	for (var key in parent) {
		if (__hasProp.call(parent, key)) {
			child[key] = parent[key];
		}
	}
	function ctor() {
		this.constructor = child;
	}
	ctor.prototype = parent.prototype;
	child.prototype = new ctor();
	child.__super__ = parent.prototype;
	return child; 
};

import RSVP from 'rsvp'
import File from './psd/file'
import LazyExecute from './psd/lazy_execute'
import Header from './psd/header'
import Resources from './psd/resources'
import LayerMask from './psd/layer_mask'
import Image from './psd/image'


RSVP = require('rsvp');
Module = require('coffeescript-module').Module;
File = require('./psd/file');
LazyExecute = require('./psd/lazy_execute');
Header = require('./psd/header');
Resources = require('./psd/resources');
LayerMask = require('./psd/layer_mask');
Image = require('./psd/image');



exports class PSD {
	/**
	 * 构造函数
	 */
	constructor(data) {
		this.file = new File(data);
		this.parsed = false;
		this.header = null;
		Object.defineProperty(this, 'layers', {
			get: function() {
				return this.layerMask.layers;
			}
		});
		RSVP.on('error', function(reason) {
			return console.error(reason);
		});
	}
	/**
	 * 解析
	 */
	parse() {
		if (this.parsed) {
			return;
		}
		this.parseHeader();
		this.parseResources();
		this.parseLayerMask();
		this.parseImage();
		return this.parsed = true;
	}
	/**
	 * 解析头部
	 */
	parseHeader() {
		this.header = new Header(this.file);
		return this.header.parse();
	}
	/**
	 * 解析资源
	 */
	parseResources() {
		var resources;
		resources = new Resources(this.file);
		return this.resources = new LazyExecute(resources, this.file).now('skip').later('parse').get();
	}
	/**
	 * 解析图层蒙版
	 */
	parseLayerMask() {
		var layerMask;
		layerMask = new LayerMask(this.file, this.header);
		return this.layerMask = new LazyExecute(layerMask, this.file).now('skip').later('parse').get();
	}
	/**
	 * 解析图片
	 */
	parseImage() {
		var image;
		image = new Image(this.file, this.header);
		return this.image = new LazyExecute(image, this.file).later('parse').ignore('width', 'height').get();
	}
	/**
	 * 节点树
	 */
	tree() {
		return new PSD.Node.Root(this);
	}
}






module.exports = PSD = (function(_super) {
__extends(PSD, _super);

PSD.Node = {
  Root: require('./psd/nodes/root')
};

PSD['extends'](require('./psd/init'));

function PSD(data) {
  this.file = new File(data);
  this.parsed = false;
  this.header = null;
  Object.defineProperty(this, 'layers', {
	get: function() {
	  return this.layerMask.layers;
	}
  });
  RSVP.on('error', function(reason) {
	return console.error(reason);
  });
}

PSD.prototype.parse = function() {
  if (this.parsed) {
	return;
  }
  this.parseHeader();
  this.parseResources();
  this.parseLayerMask();
  this.parseImage();
  return this.parsed = true;
};

PSD.prototype.parseHeader = function() {
  this.header = new Header(this.file);
  return this.header.parse();
};

PSD.prototype.parseResources = function() {
  var resources;
  resources = new Resources(this.file);
  return this.resources = new LazyExecute(resources, this.file).now('skip').later('parse').get();
};

PSD.prototype.parseLayerMask = function() {
  var layerMask;
  layerMask = new LayerMask(this.file, this.header);
  return this.layerMask = new LazyExecute(layerMask, this.file).now('skip').later('parse').get();
};

PSD.prototype.parseImage = function() {
  var image;
  image = new Image(this.file, this.header);
  return this.image = new LazyExecute(image, this.file).later('parse').ignore('width', 'height').get();
};

PSD.prototype.tree = function() {
  return new PSD.Node.Root(this);
};

return PSD;

})(Module);
