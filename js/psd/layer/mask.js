var Mask = require('../mask');
module.exports = {
    parseMaskData: function() {
		return this.mask = new Mask(this.file).parse();
    }
};