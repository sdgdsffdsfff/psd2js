[].prototype.indexOf = [].indexOf || function(item) {
	for (var i = 0, l = this.length; i < l; i++) {
		if (i in this && this[i] === item) {
			return i;
		}
	}
	return -1;
};
exports class LazyExecute {
	/**
	 * 构造函数
	 */
	constructor(obj, file) {
		this.obj = obj;
        this.file = file;
        this.startPos = this.file.tell();
        this.loaded = false;
        this.loadMethod = null;
        this.loadArgs = [];
        this.passthru = [];
	}
	now() {
        let method = arguments[0];
        let args = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
        this.obj[method].apply(this.obj, args);
        return this;
    }
	later() {
        let method = arguments[0];
        let args = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
        this.loadMethod = method;
        this.loadArgs = args;
        return this;
    }
	ignore() {
        let args = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
        this.passthru.concat(args);
        return this;
    }
	get() {
        let _ref = this.obj;
        for (key in _ref) {
            let val = _ref[key];
			if (this[key] != null) {
				return;
			}
			return Object.defineProperty(this, key, {
				get: function() {
					if (!this.loaded && !([].indexOf.call(this.passthru, key) >= 0)) {
						this.load();
					}
					return this.obj[key];
				}
			});
        }
        return this;
    }
	load() {
        let origPos = this.file.tell();
        this.file.seek(this.startPos);
        this.obj[this.loadMethod].apply(this.obj, this.loadArgs);
        this.file.seek(origPos);
        return this.loaded = true;
    }
}