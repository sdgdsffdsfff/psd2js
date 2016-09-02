import _ from 'lodash'
import Util from './util'
import Layer from './layer'

export class LayerMask {
	constructor(file, header) {
		this.file = file;
		this.header = header;
		this.layers = [];
		this.mergedAlpha = false;
		this.globalMask = null;
	}
	skip() {
		return this.file.seek(this.file.readInt(), true);
    }
	parse() {
		let maskSize = this.file.readInt();
		let finish = maskSize + this.file.tell();
		if (maskSize <= 0) {
			return;
		}
		this.parseLayers();
		this.parseGlobalMask();
		this.layers.reverse();
		return this.file.seek(finish);
    }
	parseLayers() {
		let layerInfoSize = Util.pad2(this.file.readInt());
		if (layerInfoSize > 0) {
			let layerCount = this.file.readShort();
			if (layerCount < 0) {
				layerCount = Math.abs(layerCount);
				this.mergedAlpha = true;
			}
			for (let i = j = 0; 0 <= layerCount ? j < layerCount : j > layerCount; i = 0 <= layerCount ? ++j : --j) {
				this.layers.push(new Layer(this.file, this.header).parse());
			}
			let layers = this.layers;
			let results = [];
			for (let i = 0, len = layers.length; i < len; i++) {
				let layer = layers[i];
				results.push(layer.parseChannelImage());
			}
			return results;
		}
    }
	parseGlobalMask() {
		let length = this.file.readInt();
		if (length <= 0) {
			return;
		}
		let maskEnd = this.file.tell() + length;
		var that = this;
		this.globalMask = _({}).tap(function(mask) {
			mask.overlayColorSpace = that.file.readShort();
			mask.colorComponents = [that.file.readShort() >> 8, that.file.readShort() >> 8, that.file.readShort() >> 8, that.file.readShort() >> 8];
			mask.opacity = that.file.readShort() / 16.0;
			return mask.kind = that.file.readByte();
		});
		return this.file.seek(maskEnd);
    }
}