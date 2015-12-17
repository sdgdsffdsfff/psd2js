var Util = require('./util');

module.exports = {
	// CMYK转换成RGB
	cmykToRgb: function(c, m, y, k) {
	  var b, g, r;
	  r = Util.clamp((65535 - (c * (255 - k) + (k << 8))) >> 8, 0, 255);
	  g = Util.clamp((65535 - (m * (255 - k) + (k << 8))) >> 8, 0, 255);
	  b = Util.clamp((65535 - (y * (255 - k) + (k << 8))) >> 8, 0, 255);
	  return [r, g, b];
	}
};