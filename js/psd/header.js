var Header;

module.exports = Header = (function() {
    var MODES;

    MODES = ['Bitmap', 'GrayScale', 'IndexedColor', 'RGBColor', 'CMYKColor', 'HSLColor', 'HSBColor', 'Multichannel', 'Duotone', 'LabColor', 'Gray16', 'RGB48', 'Lab48', 'CMYK64', 'DeepMultichannel', 'Duotone16'];

    function Header(file) {
        this.file = file;
        this.sig = null;
        this.version = null;
        this.channels = null;
        this.rows = this.height = null;
        this.cols = this.width = null;
        this.depth = null;
        this.mode = null;
    }

    Header.prototype.parse = function() {
        var colorDataLen;
        this.sig = this.file.readString(4);
        this.version = this.file.readUShort();
        this.file.seek(6, true);
        this.channels = this.file.readUShort();
        this.rows = this.height = this.file.readUInt();
        this.cols = this.width = this.file.readUInt();
        this.depth = this.file.readUShort();
        this.mode = this.file.readUShort();
        colorDataLen = this.file.readUInt();
        return this.file.seek(colorDataLen, true);
    };

    Header.prototype.modeName = function() {
        return MODES[this.mode];
    };

    Header.prototype["export"] = function() {
        var data, key, _i, _len, _ref;
        data = {};
        _ref = ['sig', 'version', 'channels', 'rows', 'cols', 'depth', 'mode'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            data[key] = this[key];
        }
        return data;
    };

    return Header;

})();