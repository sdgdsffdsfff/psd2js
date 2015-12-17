var LazyExecute, __slice = [].slice,
	__indexOf = [].indexOf || function(item) {
		for (var i = 0,
		l = this.length; i < l; i++) {
			if (i in this && this[i] === item) return i;
		}
		return - 1;
	};

module.exports = LazyExecute = (function() {
    function LazyExecute(obj, file) {
        this.obj = obj;
        this.file = file;
        this.startPos = this.file.tell();
        this.loaded = false;
        this.loadMethod = null;
        this.loadArgs = [];
        this.passthru = [];
    }

    LazyExecute.prototype.now = function() {
        var args, method;
        method = arguments[0],
        args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        this.obj[method].apply(this.obj, args);
        return this;
    };

    LazyExecute.prototype.later = function() {
        var args, method;
        method = arguments[0],
        args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        this.loadMethod = method;
        this.loadArgs = args;
        return this;
    };

    LazyExecute.prototype.ignore = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.passthru.concat(args);
        return this;
    };

    LazyExecute.prototype.get = function() {
        var key, val, _fn, _ref;
        _ref = this.obj;
        _fn = (function(_this) {
            return function(key, val) {
                if (_this[key] != null) {
                    return;
                }
                return Object.defineProperty(_this, key, {
                    get: function() {
                        if (!this.loaded && !(__indexOf.call(this.passthru, key) >= 0)) {
                            this.load();
                        }
                        return this.obj[key];
                    }
                });
            };
        })(this);
        for (key in _ref) {
            val = _ref[key];
            _fn(key, val);
        }
        return this;
    };

    LazyExecute.prototype.load = function() {
        var origPos;
        origPos = this.file.tell();
        this.file.seek(this.startPos);
        this.obj[this.loadMethod].apply(this.obj, this.loadArgs);
        this.file.seek(origPos);
        return this.loaded = true;
    };

    return LazyExecute;

})();