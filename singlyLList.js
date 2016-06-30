/**
 * Single link list implementation in javascript
 * 
 * @version <06/21/15>
 */
function SinglyLList() {
	this.size = 0;
	this.head = null;
}
/**
 * add in the singly list
 * 
 * @param data
 */
SinglyLList.prototype.add = function(data) {
	var newNode = new Node(data);
	newNode.setNext(this.head);
	this.head = newNode;
	this.size++;
	return true;
};
SinglyLList.prototype.isEmpty = function() {
	return this.size === 0;
};

SinglyLList.prototype.remove = function(anEntry) {
	if (this.isEmpty()) {
		return false;
	}
	if (this.head.getData() === anEntry) {
		this.head = this.head.getNext();
		this.size--;
		return true;
	}
	var cur = this.head;
	while (cur.getNext() !== null) {
		if (cur.getNext().getData() === anEntry) {
			cur.setNext(cur.getNext().getNext());
			this.size--;
			return true;
		}
		cur = cur.getNext();
	}
	return false;
};
SinglyLList.prototype.size = function(anEntry) {
	return this.size;
};
SinglyLList.prototype.get = function(anEntry) {
	if (this.size === 0) {
		return null;
	} else if (this.head.getData() === anEntry) {
		var ret = this.head.getNext();
		return ret;
	} else {
		return this.head.get(anEntry);
	}
};

SinglyLList.prototype.toString = function() {
	if (this.head === null) {
		return;
	}
	var result = '';
	return this.head.toString(result);
};

/**
 * node
 */
function Node(data) {
	this.data = data;
	this.next = null;
}
Node.prototype.getData = function() {
	return this.data;
};
Node.prototype.getNext = function() {
	return this.next;
};
Node.prototype.setNext = function(entry) {
	this.next = entry;
};

Node.prototype.get = function(entry) {
	if (this.next === null) {
		return null;
	} else if (this.next.data === entry) {
		return this.next.data;
	} else {
		return this.next.get(entry);
	}
};
Node.prototype.toString = function(rsl) {
	rsl += this.data.toString() + "\n";
	if (this.next === null) {
		return rsl;
	}
	return this.next.toString(rsl);
};

var compareTo = function(first, sec) {
	if ((typeof (first) === 'number') && (typeof (sec) === 'number')) {
		return first - sec;
	}
	return first.localeCompare(sec);
};

var sl = new SinglyLList();
sl.add("cool\n");
sl.add("bro\n");
sl.add("sup\n");
sl.add("late\n");
sl.add("literal\n");
sl.remove("litera.\n");
console.log("this is it " + sl.get("sup\n"));
console.log(sl.toString());
