/**
 * 图层蒙版
 */
class Mask {
	/**
	 * 构造函数
	 * @param {Sting} file
	 */
	constructor(file) {
		this.file = file;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
	}
	/**
	 * 解析文件
	 */
	parse() {
		this.size = this.file.readInt();
        if (this.size === 0) {
            return this;
        }
		let maskEnd = this.file.tell() + this.size;
        this.top = this.file.readInt();
        this.left = this.file.readInt();
        this.bottom = this.file.readInt();
        this.right = this.file.readInt();
        this.width = this.right - this.left;
        this.height = this.bottom - this.top;
        this.relative = (this.flags & 0x01) > 0;
        this.disabled = (this.flags & (0x01 << 1)) > 0;
        this.invert = (this.flags & (0x01 << 2)) > 0;
        this.defaultColor = this.file.readByte();
        this.flags = this.file.readByte();
        this.file.seek(maskEnd);
        return this;
	}
	/**
	 * 导出
	 */
	export() {
		if (this.size === 0) {
            return {};
        }
        return {
            top: this.top,
            left: this.left,
            bottom: this.bottom,
            right: this.right,
            width: this.width,
            height: this.height,
            defaultColor: this.defaultColor,
            relative: this.relative,
            disabled: this.disabled,
            invert: this.invert
        };
	}
}
exports Mask