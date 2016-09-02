/**
 * 未压缩
 */
exports = {
    parseRaw: function() {
      return this.channelData = this.file.read(this.length);
    }
}