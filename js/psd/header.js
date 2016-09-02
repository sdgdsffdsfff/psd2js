/**
 * PSD头部信息
 */
export class Header {
	/**
	 * 构造函数
	 * @param {PSD.StreamReader} stream
	 */
	constructor(file) {
		this.file = file;
        this.sig = null;
        this.version = null;
        this.channels = null;
        this.rows = this.height = null;
        this.cols = this.width = null;
        this.depth = null;
        this.mode = null;
	}
	/**
	 * 解析
	 */
	parse() {
		// signature
        this.sig = this.file.readString(4);
		if (this.signature !== '8BPS') {
			throw new Error('invalid signature');
		}
        this.version = this.file.readUShort();
        this.file.seek(6, true);
        this.channels = this.file.readUShort();
        this.rows = this.height = this.file.readUInt();
        this.cols = this.width = this.file.readUInt();
        this.depth = this.file.readUShort();
        this.mode = this.file.readUShort();
        let colorDataLen = this.file.readUInt();
        return this.file.seek(colorDataLen, true);
    }
	modeName() {
		let MODES = ['Bitmap', 'GrayScale', 'IndexedColor', 'RGBColor', 'CMYKColor', 'HSLColor', 'HSBColor', 'Multichannel', 'Duotone', 'LabColor', 'Gray16', 'RGB48', 'Lab48', 'CMYK64', 'DeepMultichannel', 'Duotone16'];
        return MODES[this.mode];
    }
	export() {
        let data = {};
        let _ref = ['sig', 'version', 'channels', 'rows', 'cols', 'depth', 'mode'];
        for (let i = 0, len = _ref.length; i < len; i++) {
            let key = _ref[i];
            data[key] = this[key];
        }
        return data;
    }
}