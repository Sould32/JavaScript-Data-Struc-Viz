function
/**
 * Souleymane Dia
 * 
 * @version <07/25/2015> ~summer (2015) Binary search tree implementation in
 *          javaScript
 */
BinarySearchTree() {
	this.root = null;
}
/**
 * 
 * @param entry
 *            to be added to the tree
 * @returns {Boolean} true
 */
BinarySearchTree.prototype.add = function(entry) {
	if (this.root === null) {
		this.root = new Node(entry);
		return true;
	}
	this.root = this.root.add(this.root, entry);
	return true;
};
/**
 * This is a tree in control structure. Remove an entry from the binary search
 * tree.
 * 
 * @param entry
 *            to be remove from the tree
 */
BinarySearchTree.prototype.remove = function(entry) {
	if (this.root === null) {
		return;
	}
	this.root = this.root.remove(this.root, entry);
};
/**
 * 
 * @param entry
 *            to look for in the tree
 * @returns the entry looked for or null otherwise O(log(n)) performance in the
 *          average case
 */
BinarySearchTree.prototype.search = function(entry) {
	if (this.root === null) {
		return null;
	}
	return this.root.search(this.root, entry);
};

/**
 * @returns the number of entry in the tree
 */
BinarySearchTree.prototype.size = function() {
	if (this.root === null) {
		return 0;
	}
	return this.root.size(this.root);
}
/**
 * @returns the height of the tree (root height = 1)
 */
BinarySearchTree.prototype.height = function() {
	if (this.root === null) {
		return 0;
	}
	return this.root.height(this.root);
};
/**
 * 
 * @returns {String} the pre-order traversal of the tree
 */
BinarySearchTree.prototype.preOrder = function() {
	if (this.root === null) {
		return '';
	}
	this.root.preOrder(this.root);
};
/**
 * 
 * @returns {String} the post order traversal of the tree
 */
BinarySearchTree.prototype.postOrder = function() {
	if (this.root === null) {
		return '';
	}
	this.root.postOrder(this.root);
};
/**
 * 
 * @returns {String} the in-order traversal of the tree
 */
BinarySearchTree.prototype.inOrder = function() {
	if (this.root === null) {
		return '';
	}
	this.root.inOrder(this.root);
};
/**
 * compare the first arg to the sec
 * 
 * @return positive if first greater than sec
 */
var compareTo = function(first, sec) {
	if ((typeof (first) === 'number') && (typeof (sec) === 'number')) {
		return first - sec;
	}
	return first.localeCompare(sec);
};
/**
 * node class
 * 
 * @version <05/19/2015>
 */
function Node(data) {
	this.data = data;
	this.left = null;
	this.right = null;
}
/**
 * 
 * @returns the data
 */
Node.prototype.getData = function() {
	return this.data;
};
/**
 * 
 * @returns the left node
 */
Node.prototype.getLeft = function() {
	return this.left;
};
/**
 * 
 * @returns the righ node
 */
Node.prototype.getRight = function() {
	return this.right;
};
/**
 * 
 * @param entry
 *            to replace data
 */
Node.prototype.setData = function(entry) {
	this.data = entry;
};
/**
 * 
 * @param entry
 *            to replace the right node
 */
Node.prototype.setRight = function(entry) {
	this.right = entry;
};
/**
 * 
 * @param entry
 *            to replace the left node
 */
Node.prototype.setLeft = function(entry) {
	this.left = entry;
};
/**
 * @returns the amount entry in the tree
 */
Node.prototype.size = function(root) {
	if (root === null) {
		return 0;
	}
	return 1 + this.size(root.getRight()) + this.size(root.getLeft());
};

/**
 * @param entry
 *            to add to the tree
 * @returns the data added to the tree O(log(n)) performance in the best and
 *          average case
 */
Node.prototype.add = function(root, entry) {
	if (root === null) {
		// console.log(entry);
		return new Node(entry);
	} else if (compareTo(entry, root.getData()) <= 0) {
		var lNode = this.add(root.getLeft(), entry);
		root.setLeft(lNode);
		return root;
	}
	var rNode = this.add(root.getRight(), entry);
	root.setRight(rNode);
	return root;
};
/**
 * 
 * @param entry
 *            to remove from the tree
 * @returns the entry removed from the tree O(log(n)) performance in the best
 *          and average case
 */
Node.prototype.remove = function(root, entry) {
	if (root === null) {
		return null;
	} else if ((compareTo(entry, root.getData()) < 0)) {
		root.setLeft(this.remove(root.getLeft(), entry));
		return root;
	} else if ((compareTo(entry, root.getData()) > 0)) {
		root.setRight(this.remove(root.getRight(), entry));
		return root;
	}
	var removed = root;
	// leaf node
	if (root.getLeft() === null && root.getRight() === null) {
		return null;
	}// no left child
	else if (root.getLeft() === null) {
		return root.getRight();
	}
	// no right child
	else {
		// find the min
		var newRoot = root.getLeft();
		var before = root;
		while (newRoot.getRight() !== null) {
			before = newRoot;
			newRoot = newRoot.getRight();
		}
		if (before.getLeft() === newRoot) {
			// replace the replacement with left or null
			before.setLeft(newRoot.getLeft());

		} else {
			// replace the replacement with left or null
			before.setRight(newRoot.getLeft());
		}
		// change content of root
		root.setData(newRoot.getData());
		return root;
	}
};
/**
 * 
 * @param root
 *            to look into
 * @param entry
 *            to look for in the root
 * @returns the root
 */
Node.prototype.search = function(root, entry) {
	if (root === null) {
		return null;
	} else if (compareTo(root.getData(), entry) < 0) {
		return this.search(root.getRight(), entry);
	} else if (compareTo(root.getData(), entry) > 0) {
		return this.search(root.getLeft(), entry);
	}
	return root.getData();
};
/**
 * 
 * @param root
 *            to get the height of
 * @returns the height
 */
Node.prototype.height = function(root) {
	if (root === null) {
		return 0;
	}
	return 1 + Math.max(this.height(root.getRight()), this.height(root
			.getLeft()))
};
/**
 * pre-order traversal
 */
Node.prototype.preOrder = function(rootTree) {
	if (rootTree === null) {
		return result;
	}
	console.log(rootTree.getData());
	this.preOrder(rootTree.getLeft());
	this.preOrder(rootTree.getRight());
};
/**
 * post order traversal
 */
Node.prototype.postOrder = function(rootTree) {
	if (rootTree === null) {
		return;
	}
	this.postOrder(rootTree.getRight());
	this.postOrder(rootTree.getLeft());
	result += rootTree.getData();
};
/**
 * in order traversal
 */
Node.prototype.inOrder = function(rootTree) {
	if (rootTree === null) {
		return "";
	}
	this.inOrder(rootTree.getLeft());
	console.log(rootTree.getData() + '\n');
	this.inOrder(rootTree.getRight());
};

