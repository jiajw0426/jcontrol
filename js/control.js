function Control () {
	
	this.init = function(container,style,data) {
		$.extend(this,data);
		this.children  = new Array();
	    Message.assertNotNull(container,"Control init prameters 'container' is null");
	    this.setContainer(container);
		this.data = data;
		this.paint();
	};
	this.setDomElement  = function(domElement) {
		this.domElement = domElement;
	};
	this.getDomElement  = function(domElement) {
		return this.domElement;
	};
	this.setContainer  = function(container) {
		this.container = container;
		this.container.children.push(this);
	};
	this.getContainer  = function() {
		return this.container;
	};
	
	this.setLayoutData = function(layoutData) {
		this._layoutData = layoutData;
	};
	this.getLayoutData  = function() {
		return this._layoutData;
	};
	
	this.setLayout = function(layout) {
		var tempLayout = new Object();
		$.extend(tempLayout, layout);
		this._layout = tempLayout;
	};
	this.getLayout  = function() {
		return this._layout;
	};
	this.loop=function(callback){
		for ( var i = 0; i < this.children.length; i++) {
			var child=this.children[i];
			callback(child);
		}
	};
	this.layout=function (data) {
		data=data?data:{};
		if(this.getLayout())
			this.getLayout().layout(this);
        if(!data.shallow){        	
        	Util.loop(this.children,function(child){
        		child.layout(data);
        	});	
        }
	};
}


