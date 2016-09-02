import ResourceSection from './resource_section'

// 字体映射
let fontMap = {
	'MicrosoftYaHei-Bold': 'Microsoft YaHei',
	'MicrosoftYaHei': 'Microsoft YaHei',
	'黑体': 'SimHei',
	'宋体': 'SimSun',//AdobeInvisFont
	'新宋体': 'NSimSun',
	'仿宋': 'FangSong',
	'楷体': 'KaiTi',
	'幼圆': 'YouYuan',
};
class Resource {
	constructor(file) {
		this.file = file;
        this.id = null;
        this.type = null;
        this.length = 0;
	}
	get Section() {
		return ResourceSection;
	}
	/**
	 * 解析
	 */
	parse() {
		this.type = this.file.readString(4);
        this.id = this.file.readShort();
        let nameLength = Util.pad2(this.file.readByte() + 1) - 1;
        this.name = this.file.readString(nameLength);
        return this.length = Util.pad2(this.file.readInt());
	}
}
exports Font = Resource;