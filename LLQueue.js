/**
 * 
 */
function LLQueue(){
	this.size = 0;
	this.head = null;
	this.tail = null;
}
// O(1) performance
LLQueue.prototype.enQueue = function(item){
	if (this.isEmpty()){
		this.head = new Node(item);
		this.tail = this.head;
		this.size++;
		return true;
	}
	var entry = new Node(item);
	this.tail.setNext(entry);
	this.tail = entry;
	this.size++;
	return true;
};
LLQueue.prototype.deQueue = function(){
	if (this.head === null){
		return null;
	}
	var item = this.head.getData();
	this.head = this.head.getNext();
	this.size--;
	return item;
};
LLQueue.prototype.toString = function(){
	if(this.isEmpty()){
		return '';
	}
	var content = '';
	return this.head.toString(content);
};

LLQueue.ptototype.isEmpty = function(){
	return this.size === 0;
};
LLQueue.ptototype.peek = function(){
	return this.head.getData();
};
/**
 * node 
 */
function Node(data){
	this.data = data;
	this.next = null;
}

Node.prototype.getData = function(){
	return this.data;
};
Node.prototype.getNext = function(){
	return this.next;
};
Node.prototype.setNext = function(entry){
	this.next = entry;
};

Node.prototype.get = function(entry){
	if(this.next === null){
		return null;
	}else if(this.next.data === entry){
		return this.next;
	}else{
		return this.next.get(entry);
	}
};
Node.prototype.toString = function(content){
		content += this.data.toString() + '\n';
		if (this.next === null){
			return content;
		}else{
			this.next.toString();
		}
};

var que = new LLQueue();
que.enQueue("orange");
que.enQueue("banana");
que.enQueue("apple");
que.enQueue("juice");
que.enQueue("papaya");
que.enQueue("tangerine");
console.log(que.toString());