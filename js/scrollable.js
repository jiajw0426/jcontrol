function Scrollable() {

	this.creatVScrollbar = function(toHeight) {
		var control = this.getControl();
		if (this.vScrollbar) {
			this.vScrollbar.remove();
		}

		this.vScrollbar = $("<div/>")
				.insertAfter(control)
				.addClass(
						"ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all ui-scroll-v");
		this.vScrollbar.topArrow = $(
				"<div class='ui-scroll-arrow-n-div ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-n ui-scroll-arrow-icon'></span></div>")
				.appendTo(this.vScrollbar);
		
		var buttonContaiment = $("<div class='ui-scroll-button-container-v'>")
				.appendTo(this.vScrollbar);
		var button = $(
				"<div class='ui-widget-header ui-corner-all ui-scroll-button-v'>")
				.appendTo(buttonContaiment);
		this.vScrollbar.buttomArrow = $(
				"<div class='ui-scroll-arrow-s-div ui-scroll-arrow-s ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-s ui-scroll-arrow-icon'></span></div>")
				.appendTo(this.vScrollbar);
		
		
		button.mouseenter(function() {
			button.addClass("ui-state-focus");
		});
		button.mouseout(function() {
			button.removeClass("ui-state-focus");
		});
		button
				.draggable( {
					axis : "y",
					containment : "parent",
					drag : function(event, ui) {
						control.css("top", -ui.position.top / button.scrollHeight
								* button.toHeight);
					}
				});

		this.vScrollbar.button = button;
		this.vScrollbar.buttonContaiment = buttonContaiment;
		this.vScrollbar.button.toHeight= toHeight;
	    if(this.getLayout()){
        	this.getLayout().couputerLayoutData(this);        	
        }
	    this.coputerVScrollbarLoaction();
	};
    this.coputerVScrollbarLoaction=function(){
		if(this.vScrollbar){
			var clientArea=this.getClientArea();
			with(this.vScrollbar){
				css("height",clientArea.height-1*2-1*2);
				buttonContaiment.css("top", 1*2+topArrow.height()+1*2+clientArea.y);
				button.scrollHeight=clientArea.height-(1+1+1+1*2+1+topArrow.height())*2;
				button.scrollOffsetHeight=button.toHeight-clientArea.height;
				buttonContaiment.height(clientArea.height-(1+1+1+1*2+1+topArrow.height())*2);
				button.width(buttonContaiment.width()-2);
				button.height((button.scrollHeight-2)*clientArea.height/button.toHeight);
				
			}
		}
	};
	this.creatHScrollbar = function(toWidth) {
		var control = this.getControl();
		if (this.hScrollbar) {
			this.hScrollbar.remove();
		}
		var width = this.vScrollbar ? this.domElement.width()
				- Constants.PANEL_V_SCROLL_BAR_WIDTH : this.domElement.width();
		this.hScrollbar = $("<div/>")
				.insertAfter(control)
				.addClass(
						"ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all ui-scroll-h")
		this.hScrollbar.leftArrow = $(
				"<div class='ui-scroll-arrow-w-div ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-w ui-scroll-arrow-icon'></span></div>")
				.appendTo(this.hScrollbar);
		var buttonContaiment = $("<div class='ui-scroll-button-container-h'>")
				.appendTo(this.hScrollbar);
		var button = $(
				"<div class='ui-widget-header ui-corner-all ui-scroll-button-h'>")
				.appendTo(buttonContaiment);
		this.hScrollbar.rightArrow = $(
				"<div class='ui-scroll-arrow-e-div ui-scroll-arrow-e ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-e ui-scroll-arrow-icon'></span></div>")
				.appendTo(this.hScrollbar);
		var scrollWidth = this.hScrollbar.width()
				- this.hScrollbar.leftArrow.width()
				- this.hScrollbar.rightArrow.width() - 10;
		buttonContaiment.css( {
			"width" : scrollWidth,
			"left" : this.hScrollbar.leftArrow.width() + 6
		});
		button.width(scrollWidth * this.getClientArea().width / toWidth);
		button.height(buttonContaiment.height() - 2);
		button.mouseenter(function() {
			button.addClass("ui-state-focus");
		});
		button.mouseout(function() {
			button.removeClass("ui-state-focus");
		});
		button.draggable( {
			axis : "x",
			containment : "parent",
			drag : function(event, ui) {
				control.css("left", -ui.position.left / scrollWidth * toWidth);
			},
			end : function(event, ui) {
				control.css("left",this.getClientArea().width -toWidth);
			}
		});
        if(this.getLayout()){
        	this.getLayout().couputerLayoutData(this);        	
        }
		this.hScrollbar.button = button;
	};
	this.coputerHScrollbarLoaction=function(){
		
	};
}