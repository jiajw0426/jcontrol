function BodyPanel(style, data) {

	if (window._bodyPanel == null) {
		this.children = new Array();
		window._bodyPanel = this;
		this.paint = function(recreate) {
			this.domElement = $("body");
			this.control = $("<div class='ui-body-panel'>").appendTo(this.domElement);
			this.domElement.addClass("ui-body");
			this.domElement.height($(window).height())
			this.control.css({"width":this.domElement.width(),"height":$(window).height(),"position":"absolute"});
		};
		this.vExpand = function(height) {
			    this.creatVScrollbar(height);
		};
		this.hExpand = function(width) {
			//this.
		};
		this.getClientArea = function() {
			return {
				x : 0,
				y : 0,
				width : this.vScrollbar?this.domElement.width()-Constants.PANEL_V_SCROLL_BAR_WIDTH:this.domElement.width(),
				height :this.hScrollbar? this.domElement.height() -Constants.PANEL_H_SCROLL_BAR_HEIGHT:this.domElement.height()
			};
		};
		this.getControl = function() {
			return this.control;
		};
		$(window).resize(function() {
			//BodyPanel().layout();
		});
	
		this.paint();
	}
	return window._bodyPanel;
}


function Panel(container, style, data) {

	this.showTitle = true;
	this.titleHeight = Constants.PANEL_TITLE_HEIGHT;
	this.created = false;
	this.scrolled=false;
     
	this.vExpand = function(height) {
		if(height>this.domElement.height()){
			this.creatVScrollbar(height);
		}else{
		this.domElement.css("height", height + this.titleHeight);
		this.getControl().css("height", height);
		}
		this.getContainer().layout( {
			shallow : true
		});
	};
	this.hExpand = function(width) {
		if(width>this.domElement.width()){
			this.creatHScrollbar(width);
		}else{
		this.domElement.css("width", width);
		this.getControl().css("width", width);
		}
		this.getContainer().layout( {
			shallow : true
		});
	};

	this.create = function(recreate) {
		if (this.created && !recreate)
			return;
		this.created = true;
		this.domElement = $("<div />").addClass(
				"ui-widget ui-widget-content ui-corner-all ui-control");
		if (container == null) {
			$("body").append(this.domElement);
		} else {
			container.getControl().append(this.domElement);
		}
		if (this.showTitle) {
			this.title = $("<div id='title' />").appendTo(this.domElement).css(
					"height", this.titleHeight).addClass(
					"ui-corner-all ui-widget-header");
		} else {
			this.titleHeight = 0;
		}
		this.control = $("<div id='control' />").appendTo(this.domElement);
		var clientArea=this.getClientArea();
		this.control.css({"position":"absolute","width":clientArea.width,"top":this.titleHeight,"left":clientArea.x,"height":clientArea.height});
		if(this.scrolled){
			this.domElement.css({"overflow":"hidden"});
			this.control.css({"overflow":"hidden"});
		}
	};
	this.getClientArea = function() {
		return {
			x : 0,
			y: 0,
			width : this.vScrollbar?this.domElement.width()-Constants.PANEL_V_SCROLL_BAR_WIDTH:this.domElement.width(),
			height :this.hScrollbar? this.domElement.height() - this.titleHeight-Constants.PANEL_H_SCROLL_BAR_HEIGHT:this.domElement.height() - this.titleHeight
		};
	};
	this.getControl = function() {
		return this.control;
	};
	this.paint = function(recreate) {
		this.create(recreate);
		this.domElement.css(style);
	};
	this.init(container, style, data);
}


