import _ from 'lodash'

exports {
	/**
	 * param {String} path
	 * param {Object} opts
	 */
    childrenAtPath: function(path, opts) {
		if (opts == null) {
			opts = {};
		}
		if (!Array.isArray(path)) {
			path = path.split('/').filter(function(p) {
				return p.length > 0;
			});
		}
		path = _.clone(path);
		let query = path.shift();
		let matches = this.children().filter(function(child) {
			// 大小写敏感
			if (opts.caseSensitive) {
				return child.name === query;
			} else {
				return child.name.toLowerCase() === query.toLowerCase();
			}
		});
		if (path.length === 0) {
			return matches;
		} else {
			return _.flatten(matches.map(function(match) {
				return match.childrenAtPath(_.clone(path), opts);
			}));
		}
    }
}