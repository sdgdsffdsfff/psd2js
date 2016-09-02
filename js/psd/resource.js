import Util from './util'
import resourceSection from './resource_section'

class Resource {
	get Section() {
		return resourceSection;
	}
	constructor(file) {
		this.file = file;
        this.id = null;
        this.type = null;
        this.length = 0;
	}
	parse() {
        var nameLength;
        this.type = this.file.readString(4);
        this.id = this.file.readShort();
        nameLength = Util.pad2(this.file.readByte() + 1) - 1;
        this.name = this.file.readString(nameLength);
        return this.length = Util.pad2(this.file.readInt());
    }
}
export Resource