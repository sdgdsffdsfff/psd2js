import ImageFormat from './image_format'
import ImageMode from './image_mode'
import Export from './image_export'

exports class Image {
	/**
	 * 构造函数
	 */
	constructor() {
		this.file = file;
		this.header = header;
		this.numPixels = this.width() * this.height();
		if (this.depth() === 16) {
			this.numPixels *= 2;
		}
		this.calculateLength();
		this.channelData = [];
		this.pixelData = [];
		this.opacity = 1.0;
		this.hasMask = false;
		this.startPos = this.file.tell();
		this.endPos = this.startPos + this.length;
		this.setChannelsInfo();
	}
	width() {
		return this.header['width'];
	}
	height() {
		return this.header['height'];
	}
	channels() {
		return this.header['channels'];
	}
	depth() {
		return this.header['depth'];
	}
	mode() {
		return this.header['mode'];
	}
	setChannelsInfo = function() {
		switch (this.mode()) {
			case 1:
				return ImageMode.setGreyscaleChannels();
			case 3:
				return ImageMode.setRgbChannels();
			case 4:
				return ImageMode.setCmykChannels();
		}
    }
	calculateLength() {
		switch (this.depth()) {
			case 1:
				this.length = (this.width() + 7) / 8 * this.height();
			case 16:
				this.length = this.width() * this.height() * 2;
			default:
				this.length = this.width() * this.height();
		}
		this.channelLength = this.length;
		return this.length *= this.channels();
    }
	parse() {
		this.compression = this.parseCompression();
		if (this.compression === 2 || this.compression === 3) {
			this.file.seek(this.endPos);
			return;
		}
		return this.parseImageData();
    }
	parseCompression() {
		return this.file.readShort();
    }
	parseImageData() {
		switch (this.compression) {
			case 0:
				this.parseRaw();
				break;
			case 1:
				this.parseRLE();
				break;
			case 2:
			case 3:
				this.parseZip();
				break;
			default:
				this.file.seek(this.endPos);
		}
		return this.processImageData();
    }
	processImageData() {
		switch (this.mode()) {
			case 1:
				this.combineGreyscaleChannel();
				break;
			case 3:
				this.combineRgbChannel();
				break;
			case 4:
				this.combineCmykChannel();
		}
		return this.channelData = null;
    }
}


(function() {
  var Export, Image, ImageFormat, ImageMode, Module,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Module = require('coffeescript-module').Module;

  ImageFormat = require('./image_format');

  ImageMode = require('./image_mode');

  Export = require('./image_export');

  module.exports = Image = (function(_super) {
    var COMPRESSIONS, attr, _fn, _i, _len, _ref;

    __extends(Image, _super);

    Image.includes(ImageFormat.RAW);

    Image.includes(ImageFormat.RLE);

    Image.includes(ImageMode.Greyscale);

    Image.includes(ImageMode.RGB);

    Image.includes(ImageMode.CMYK);

    Image.includes(Export.PNG);

    COMPRESSIONS = ['Raw', 'RLE', 'ZIP', 'ZIPPrediction'];

    function Image(file, header) {
      this.file = file;
      this.header = header;
      this.numPixels = this.width() * this.height();
      if (this.depth() === 16) {
        this.numPixels *= 2;
      }
      this.calculateLength();
      this.channelData = [];
      this.pixelData = [];
      this.opacity = 1.0;
      this.hasMask = false;
      this.startPos = this.file.tell();
      this.endPos = this.startPos + this.length;
      this.setChannelsInfo();
    }

    _ref = ['width', 'height', 'channels', 'depth', 'mode'];
    _fn = function(attr) {
      return Image.prototype[attr] = function() {
        return this.header[attr];
      };
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attr = _ref[_i];
      _fn(attr);
    }

    Image.prototype.setChannelsInfo = function() {
      switch (this.mode()) {
        case 1:
          return this.setGreyscaleChannels();
        case 3:
          return this.setRgbChannels();
        case 4:
          return this.setCmykChannels();
      }
    };

    Image.prototype.calculateLength = function() {
      this.length = (function() {
        switch (this.depth()) {
          case 1:
            return (this.width() + 7) / 8 * this.height();
          case 16:
            return this.width() * this.height() * 2;
          default:
            return this.width() * this.height();
        }
      }).call(this);
      this.channelLength = this.length;
      return this.length *= this.channels();
    };

    Image.prototype.parse = function() {
      var _ref1;
      this.compression = this.parseCompression();
      if ((_ref1 = this.compression) === 2 || _ref1 === 3) {
        this.file.seek(this.endPos);
        return;
      }
      return this.parseImageData();
    };

    Image.prototype.parseCompression = function() {
      return this.file.readShort();
    };

    Image.prototype.parseImageData = function() {
      switch (this.compression) {
        case 0:
          this.parseRaw();
          break;
        case 1:
          this.parseRLE();
          break;
        case 2:
        case 3:
          this.parseZip();
          break;
        default:
          this.file.seek(this.endPos);
      }
      return this.processImageData();
    };

    Image.prototype.processImageData = function() {
      switch (this.mode()) {
        case 1:
          this.combineGreyscaleChannel();
          break;
        case 3:
          this.combineRgbChannel();
          break;
        case 4:
          this.combineCmykChannel();
      }
      return this.channelData = null;
    };

    return Image;

  })(Module);

}).call(this);
