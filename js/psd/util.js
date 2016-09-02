exports {
	pad2: function(i) {
		return (i + 1) & ~0x01;
	},
	pad4: function(i) {
		return ((i + 4) & ~0x03) - 1;
	},
	/**
	 * 获取Unicode字符串
	 */
	getUnicodeCharacter: function(cp) {
		if (cp >= 0 && cp <= 0xD7FF || cp >= 0xE000 && cp <= 0xFFFF) {
			return String.fromCharCode(cp);
		} else if (cp >= 0x10000 && cp <= 0x10FFFF) {
			cp -= 0x10000;
			let first = ((0xffc00 & cp) >> 10) + 0xD800;
			let second = (0x3ff & cp) + 0xDC00;
			return String.fromCharCode(first) + String.fromCharCode(second);
		}
	},
	/**
	 * 限制num取值范围
	 * @param {Number} num
	 * @param {Number} min 最小值
	 * @param {Number} max 最大值
	 */
	clamp: function(num, min, max) {
		return Math.min(Math.max(num, min), max);
	}
}