/**
 * RLE压缩
 */
exports {
	parseRLE: function() {
		this.byteCounts = this.parseByteCounts();
		return this.parseChannelData();
    },
    parseByteCounts: function() {
		let results = [];
		for (let i = j = 0, channels = this.channels() * this.height(); 0 <= channels ? j < channels : j > channels; i = 0 <= channels ? ++j : --j) {
			results.push(this.file.readShort());
		}
		return results;
    },
    parseChannelData: function() {
		this.chanPos = 0;
		this.lineIndex = 0;
		let results = [];
		for (let i = j = 0, channels = this.channels(); 0 <= channels ? j < channels : j > channels; i = 0 <= channels ? ++j : --j) {
			this.decodeRLEChannel();
			results.push(this.lineIndex += this.height());
		}
		return results;
    },
    decodeRLEChannel: function() {
      var byteCount, finish, i, j, len, val, _i, _ref, _results;
      _results = [];
      for (j = _i = 0, _ref = this.height(); 0 <= _ref ? _i < _ref : _i > _ref; j = 0 <= _ref ? ++_i : --_i) {
        byteCount = this.byteCounts[this.lineIndex + j];
        finish = this.file.tell() + byteCount;
        _results.push((function() {
          var _ref1, _results1;
          _results1 = [];
          while (this.file.tell() < finish) {
            len = this.file.read(1)[0];
            if (len < 128) {
              len += 1;
              (_ref1 = this.channelData).splice.apply(_ref1, [this.chanPos, 0].concat([].slice.call(this.file.read(len))));
              _results1.push(this.chanPos += len);
            } else if (len > 128) {
              len ^= 0xff;
              len += 2;
              val = this.file.read(1)[0];
              _results1.push((function() {
                var _j, _results2;
                _results2 = [];
                for (i = _j = 0; 0 <= len ? _j < len : _j > len; i = 0 <= len ? ++_j : --_j) {
                  _results2.push(this.channelData[this.chanPos++] = val);
                }
                return _results2;
              }).call(this));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }
}
