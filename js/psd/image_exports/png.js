var fs = require('fs'),
	PNG = require('pngjs').PNG,
	RSVP = require('rsvp');

module.exports = {
    // 生成PNG
    toPng: function() {
        var png = new PNG({
            filterType: 4,
            width: this.width(),
            height: this.height()
        });
        png.data = this.pixelData;
        return png;
    },
    // 保存为PNG
    saveAsPng: function(output) {
        return new RSVP.Promise((function(_this) {
            return function(resolve, reject) {
                return _this.toPng().pack().pipe(fs.createWriteStream(output)).on('finish', resolve);
            };
        })(this));
    }
};