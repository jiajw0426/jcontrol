function Button(container,style,data) {
	this.created=false;
    
    this.create=function(recreate){
    	if(this.created&&!recreate)return;
    	this.created=true;
    	
    	this.domElement=$("<button  />").addClass("ui-button ui-widget ui-state-default ui-corner-all ");
    	$("<span>"+this.value+"</span>").appendTo(this.domElement).addClass("ui-button-text");
   		container.getControl().append(this.domElement);
    };
	this.paint = function(recreate) {
		this.create(recreate);
		this.domElement.css(style);
	};
	this.init(container,style,data);
}
