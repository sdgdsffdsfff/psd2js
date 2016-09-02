import fs from 'fs'
import { PNG } from 'pngjs'
import RSVP from 'rsvp'

/**
 * 图像PNG导出格式
 */
exports {
    // 生成PNG
    toPng: function() {
        let png = new PNG({
            filterType: 4,
            width: this.width(),
            height: this.height()
        });
        png.data = this.pixelData;
        return png;
    },
    // 保存为PNG
    saveAsPng: function(output) {
		let that = this;
        return new RSVP.Promise(function(resolve, reject) {
			return that.toPng().pack().pipe(fs.createWriteStream(output)).on('finish', resolve);
        });
    }
};