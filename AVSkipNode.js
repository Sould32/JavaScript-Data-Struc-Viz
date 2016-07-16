/*******************************************************************************************
	 * SkipNode script (part if the SkipList implementation)
	 ******************************************************************************************/
	 /**
 * @author Souleymane Dia
 * @version <05/24/2016>~ OpenDSA summer 2016
 * represent the Skipnode script use in the SkipList implementation
 */
function SkipNode(p, nodeLevel, jsav, options, num) {
	this.jsav = jsav;
	this.options = options;
	this.element = this.options.nodeelement || $("<div><ol></ol></div>");
	this.element.addClass("jsavautoresize jsavcenter jsavindexed jsavarray jsavverticalarray");
	// set id
	//this.element.attr({"id": this.id()});
	// save this node in the DOM (used by the click handler) ???
	this.element.data("array", this);
	/// ????
	if (this.options.autoResize) {
      this.element.addClass("jsavautoresize");
    }
	// Add the Array Tree Node element to the Array Tree container.
    //this.container.element.append(this.element);

    // Create array for the skipnode and added to the skiplist element.
    this.arrayelement = $(this.element).find("ol");
    var array_options = $.extend(
      {element: this.arrayelement}, this.options);
	  
	this.nodeNum = num;
	this.pair = p;
	this.nodeLevel = nodeLevel;
	this.arr = new Array(nodeLevel + 1);
	this.forward = new Array(nodeLevel + 1);
	this.pointer = new Array(nodeLevel+1);
	for (var i = 0; i < nodeLevel + 1; i++) {
		this.arr[i] = ' \ -/';
		this.forward[i] = null;
		this.pointer[i] = null;
	}
	this.disArr = this.jsav.ds.array(this.arr, options);
	this.newOp = $.extend(true, {autoresize: true}, this.options);
	this.newOp.indexed = false;
	this.newOp.top = -15;
	this.newOp.left = (this.options.indexed === true)? this.options.left + 8: this.options.left;
	if (this.pair === null){
		this.val = jsav.ds.array(['head'],this.newOp);
	}else{
		this.val = jsav.ds.array([p.toString() ],this.newOp);
	}
	JSAV.utils._helpers.handleVisibility(this, this.newOp);
}
var skipNodeProto = SkipNode.prototype;
skipNodeProto.updateDis = function(options, newOp) {
	this.val.hide();
	this.val = this.jsav.ds.array([ this.pair.toString() ], newOp);
	this.disArr.hide();
	this.disArr = this.jsav.ds.array(this.arr, options);
	this.val.show();
	this.disArr.show();
};
skipNodeProto.resetArrDis = function(i) {
	this.arr[i] = " \ -/";
	this.disArr.value(i, " \ -/");
};
skipNodeProto.updateArrDis = function(i) {
	this.arr[i] = " " ;
	this.disArr.value(i, " ");
};
skipNodeProto.equalKey = function(other) {
	return (this.pair.getKey() === other);
};
skipNodeProto.equals = function(other) {
	return (this.pair.getKey() === other.pair.getKey()) &&
				(this.pair.getVal() === other.pair.getVal());
};
skipNodeProto.getNewOp = function() {
	return this.newOp;
};
skipNodeProto.getNodeNum = function() {
	return this.nodeNum;
};
skipNodeProto.incrNodeNum = function(i) {
	this.nodeNum++;
};
skipNodeProto.getOptions = function() {
	return this.options;
};
skipNodeProto.updateNextPointer = function(longer, j){
	this.pointer[j].hide();
	this.pointer[j] =  this.jsav.pointer(" ", this.disArr, {
			targetIndex: j,
			left: -(longer - 1)*100 + (-85),
			top: 23,
			arrowAnchor: "left center",
			fixed: false,
			"stroke-width": 2	
			});
}
skipNodeProto.movePointerRight = function(lev, longer, t) {
	var point = this.pointer;
	for (var i = 0; (i < (this.nodeLevel + 1) && point[i] !== null); i++) {
		var lef = this.pointer[i].options.left;
		this.pointer[i].hide();
		var d = -((this.nodeNum - longer) -1) * 100 - 85;
		d = -d;
		this.pointer[i] = this.jsav.pointer(" ", this.disArr, {
			targetIndex: i,
			left: (t == 0)? lef - 100: (d <= -lef)? lef - 100: lef,
			top: 23,
			arrowAnchor: "left center",
			fixed: false,
			"stroke-width": 2	
		});
	}
};
skipNodeProto.decrNodeNum = function(i) {
	this.nodeNum--;
};
skipNodeProto.movePointerLeft = function(lev, longer, t) {
	var point = this.pointer;
	for (var i = 0; (i < (this.nodeLevel + 1) && point[i] !== null); i++) {
		var lef = this.pointer[i].options.left;
		this.pointer[i].hide();
		var d = -((this.nodeNum - longer)) * 100 - 85;
		d = -d;
		this.pointer[i] = this.jsav.pointer(" ", this.disArr, {
			targetIndex: i,
			left: (d > -lef)? lef: lef + 100,
			top: 23,
			arrowAnchor: "left center",
			fixed: false
		});
		this.pointer[i].css({"stroke-width": 2});	
	}
}
skipNodeProto.updPter = function(i, opt) {
	this.pointer[i].hide();
	this.pointer[i] = this.jsav.pointer(" ", this.disArr,opt);
	this.pointer[i].css({"stroke-width": 2});	
};	
skipNodeProto.clear = function(i, pt) {
	for (var i = 0; i < this.nodeLevel + 1; i++) {
		this.pointer[i].hide();
	}
	this.disArr.hide();
	this.val.hide();
};
skipNodeProto.setPointer = function(i, pt) {
	return this.pointer[i] = pt;
	this.pointer[i].css({"stroke-width": 2});	
};
skipNodeProto.getLevel = function() {
	return this.nodeLevel;
};
skipNodeProto.getForward = function() {
	return this.forward;
};
skipNodeProto.getDispArr = function() {
	return this.disArr;
};
skipNodeProto.getPair = function(forward) {
	return this.pair;
};
skipNodeProto.toString = function() {
	if (this.pair === null) {
		return 'Node has depth ' + this.nodeLevel + ', Value (null) ';
	}
	else if (this.pair.getVal() === null) {
		return 'Node has depth ' + this.nodeLevel + ', Value (null) ';
	} else {
		return 'Node has depth ' + this.nodeLevel + ', Value '
				+ this.pair.toString();
	}
};
// ---------------------------------------------------------------------------
  // Add interface for array methods
  // ---------------------------------------------------------------------------
  
  skipNodeProto.isHighlight = function (index, options) {
    this.disArr.isHighlight(index, options);
  };

  skipNodeProto.highlight = function (indices, options) {
    this.disArr.highlight(indices, options);
  };

  skipNodeProto.unhighlight = function (indices, options) {
    this.disArr.unhighlight(indices, options);
  };

  skipNodeProto.css = function (indices, cssprop, options) {
    this.disArr.css(indices, cssprop, options);
  };

  skipNodeProto.index = function (index) {
    this.disArr.index(index);
  };

  skipNodeProto.swap = function (index1, index2, options) {
    this.disArr.swap(index1, index2, options);
  };