import { jspack } from 'jspack'
import iconv from 'iconv-lite'
import Color from './color'
import Util from './util'

exports class File {
	constructor(data) {
        this.data = data;
        this.pos = 0;
    }
	/*
	var __hasProp = {}.hasOwnProperty;
    var FORMATS = {
        Int: {
            code: '>i',
            length: 4
        },
        UInt: {
            code: '>I',
            length: 4
        },
        Short: {
            code: '>h',
            length: 2
        },
        UShort: {
            code: '>H',
            length: 2
        },
        Float: {
            code: '>f',
            length: 4
        },
        Double: {
            code: '>d',
            length: 8
        },
        LongLong: {
            code: '>q',
            length: 8
        }
    };

    var _fn = function(format, info) {
        return File.prototype["read" + format] = function() {
            return this.readf(info.code, info.length)[0];
        };
    };
    for (var format in FORMATS) {
        if (!__hasProp.call(FORMATS, format)) continue;
        var info = FORMATS[format];
        _fn(format, info);
    }
	*/
	readInt() {
        return this.readf('>i', 4)[0];
    }
	readUInt() {
        return this.readf('>I', 4)[0];
    }
	readShort() {
        return this.readf('>h', 2)[0];
    }
	readUShort() {
        return this.readf('>H', 2)[0];
    }
	readFloat() {
        return this.readf('>f', 4)[0];
    }
	readDouble() {
        return this.readf('>d', 8)[0];
    }
	readLongLong() {
        return this.readf('>q', 8)[0];
    }
	tell() {
        return this.pos;
    }
    read(length) {
        var i, _i, _results;
        let _results = [];
        for (i = _i = 0; 0 <= length ? _i < length: _i > length; i = 0 <= length ? ++_i: --_i) {
            _results.push(this.data[this.pos++]);
        }
        return _results;
    }
	readf(format, len) {
        if (len == null) {
            len = null;
        }
        return jspack.Unpack(format, this.read(len || jspack.CalcLength(format)));
    }
	seek(amt, rel) {
        if (rel == null) {
            rel = false;
        }
        if (rel) {
            return this.pos += amt;
        } else {
            return this.pos = amt;
        }
    }
	readString(length) {
        return String.fromCharCode.apply(null, this.read(length)).replace(/\u0000/g, "");
    }
	readUnicodeString(length) {
        if (length == null) {
            length = null;
        }
        length || (length = this.readInt());
        return iconv.decode(new Buffer(this.read(length * 2)), 'utf-16be').replace(/\u0000/g, "");
    }
	readByte() {
        return this.read(1)[0];
    }
	readBoolean() {
        return this.readByte() !== 0;
    }
	readSpaceColor() {
        let colorComponent;
        let colorSpace = this.readShort();
        for (let i = _i = 0; _i < 4; i = ++_i) {
            colorComponent = this.readShort() >> 8;
        }
        return {
            colorSpace: colorSpace,
            components: colorComponent
        };
    }
	readPathNumber() {
        let a = this.readByte();
        let arr = this.read(3);
        let b1 = arr[0] << 16;
        let b2 = arr[1] << 8;
        let b3 = arr[2];
        let b = b1 | b2 | b3;
        return parseFloat(a, 10) + parseFloat(b / Math.pow(2, 24), 10);
    };
}