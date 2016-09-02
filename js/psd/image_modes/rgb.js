/**
 * 图像RGB颜色模式
 */
exports {
	/**
	 * 设置RGB通道
	 */
    setRgbChannels: function() {
		this.channelsInfo = [
			{
			  id: 0,
			},
			{
			  id: 1,
			},
			{
			  id: 2,
			}
		];
		if (this.channels() === 4) {
			return this.channelsInfo.push({
				id: -1,
			});
		}
    },
	/**
	 * 合并RGB通道
	 */
    combineRgbChannel: function() {
		let rgbChannels = this.channelsInfo.map(function(channel) {
			return channel.id;
		}).filter(function(channel) {
			return channel >= -1;
		});
		let results = [];
		for (let i = j = 0; 0 <= this.numPixels ? j < this.numPixels : j > this.numPixels; i = 0 <= this.numPixels ? ++j : --j) {
			let r = g = b = 0;
			let a = 255;
			for (let index = 0, len = rgbChannels.length; index < len; ++index) {
				let chan = rgbChannels[index];
				let val = this.channelData[i + (this.channelLength * index)];
				switch (chan) {
					case -1:
						a = val;
						break;
					case 0:
						r = val;
						break;
					case 1:
						g = val;
						break;
					case 2:
						b = val;
				}
			}
			results.push(this.pixelData.push(r, g, b, a));
		}
		return results;
    }
}