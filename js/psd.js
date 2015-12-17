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

RSVP = require('rsvp');

Module = require('coffeescript-module').Module;

File = require('./psd/file.coffee');

LazyExecute = require('./psd/lazy_execute.coffee');

Header = require('./psd/header.coffee');

Resources = require('./psd/resources.coffee');

LayerMask = require('./psd/layer_mask.coffee');

Image = require('./psd/image.coffee');

module.exports = PSD = (function(_super) {
__extends(PSD, _super);

PSD.Node = {
  Root: require('./psd/nodes/root.coffee')
};

PSD['extends'](require('./psd/init.js'));

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
