import _ from 'lodash'

exports {
	/**
	 * 获取ROOT节点
	 */
	root: function() {
		if (isRoot()) {
			return this;
		}
		return this.parent.root();
    },
	/**
	 * 是否ROOT节点
	 */
    isRoot: function() {
		return this.depth() === 0;
    },
	/**
	 * 获取子节点
	 */
    children: function() {
		return this._children;
    },
	/**
	 * 获取父节点
	 */
    ancestors: function() {
		if ((this.parent == null) || this.parent.isRoot()) {
			return [];
		}
		return this.parent.ancestors().concat([this.parent]);
    },
	/**
	 * 是否存在子节点
	 */
    hasChildren: function() {
		return this._children.length > 0;
    },
	/**
	 * 不存在子节点
	 */
    childless: function() {
		return !this.hasChildren();
    },
	/**
	 * 相邻节点
	 */
    siblings: function() {
		if (this.parent == null) {
			return [];
		}
		return this.parent.children();
    },
	/**
	 * 下一个相邻节点
	 */
    nextSibling: function() {
		if (this.parent == null) {
			return null;
		}
		let index = this.siblings().indexOf(this);
		return this.siblings()[index + 1];
    },
	/**
	 * 上一个相邻节点
	 */
    prevSibling: function() {
		if (this.parent == null) {
			return null;
		}
		let index = this.siblings().indexOf(this);
		return this.siblings()[index - 1];
    },
	/**
	 * 是否存在相邻节点
	 */
    hasSiblings: function() {
		return this.siblings().length > 1;
    },
	/**
	 * 只存在一个节点
	 */
    onlyChild: function() {
		return !this.hasSiblings();
    },
	/**
	 * 获取后代
	 */
    descendants: function() {
		return _.flatten(this._children.map(function(child) {
			return child.subtree();
		}));
    },
	/**
	 * 获取子节点树
	 */
    subtree: function() {
		return [this].concat(this.descendants());
    },
	/**
	 * 获取层次
	 */
    depth: function() {
		return this.ancestors().length + 1;
    },
	/**
	 * 获取路径
	 */
    path: function(asArray) {
		if (asArray == null) {
			asArray = false;
		}
		let path = this.ancestors().map(function(n) {
			return n.name;
		}).concat([this.name]);
		if (asArray) {
			return path;
		} else {
			return path.join('/');
		}
    }
}