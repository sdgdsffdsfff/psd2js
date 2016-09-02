import Util from '../util'

exports = {
    parseLegacyLayerName: function() {
		let len = Util.pad4(this.file.readByte());
		return this.legacyName = this.file.readString(len);
    }
}