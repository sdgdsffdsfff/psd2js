
var fontMap = {
	'MicrosoftYaHei-Bold': 'Microsoft YaHei',
	'MicrosoftYaHei': 'Microsoft YaHei',
	'黑体': 'SimHei',
	'宋体': 'SimSun',//AdobeInvisFont
	'新宋体': 'NSimSun',
	'仿宋': 'FangSong',
	'楷体': 'KaiTi',
	'幼圆': 'YouYuan',
};
var Font = (function() {
    Resource.Section = require('./resource_section');

    function Resource(file) {
        this.file = file;
        this.id = null;
        this.type = null;
        this.length = 0;
    }

    Resource.prototype.parse = function() {
        var nameLength;
        this.type = this.file.readString(4);
        this.id = this.file.readShort();
        nameLength = Util.pad2(this.file.readByte() + 1) - 1;
        this.name = this.file.readString(nameLength);
        return this.length = Util.pad2(this.file.readInt());
    };

    return Resource;

})();

module.exports = Resource;