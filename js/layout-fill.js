(function($) {
	var Filllayout = function(oInit) {

		function _place(child) {
			var oInit=this.oInit;
			var oAttr=this.oAttr;
			var layoutData=child.oInit.layout.layoutData;
	
		    child.oAttr.dom.css({
			    	"position" : "absolute",
					"top" : layoutData.top + "px",
					"left" : layoutData.left + "px",
					"height":oAttr.controlHeight+"px",
					"width":oAttr.controlWidth+"px"
			    	
			    });
		    child.__layout();

		}
		function _computerOffset(control) {

		
		}

		function _couputerLayoutData(control) {
			var clientArea = control._getClientArea();
			var allChild = control.oAttr.children;
			var length=allChild.length;
			var oAttr=this.oAttr;
			var oInit=this.oInit;
           if(oInit.fill.toLowerCase()=="h"){
        	   oAttr.controlWidth=(clientArea.width-(length-1)*oInit.spacing-oInit.marginLeft-oInit.marginRight)/length;
        	   oAttr.controlHeight=clientArea.height -oInit.marginTop-oInit.marginBottom;
			}
	         if(oInit.fill.toLowerCase()=="v"){
	        	oAttr.controlWidth=clientArea.width-oInit.marginLeft-oInit.marginLeft;
	        	oAttr.controlHeight=(clientArea.height-(length-1)*oInit.spacing-oInit.marginTop-oInit.marginBottom)/length;
				
			}
	         
	     	var allChild = control.oAttr.children;
			for ( var index in allChild) {
				var child=allChild[index];
				var top=oInit.marginTop;
				var left=oInit.marginLeft;
				if(oInit.fill.toLowerCase()=="v"){
					top+=index*oAttr.controlHeight+index*oInit.spacing;
				}
		         if(oInit.fill.toLowerCase()=="h"){
					left+=index*oAttr.controlWidth+index*oInit.spacing;
				}
				child.oInit.layout.layoutData= {
						top : top,
						left : left
						
					};
			}
			
		}
		function _layout(control) {
			this._couputerLayoutData(control);
			this._computerOffset(control);
			var _that = this;
			var allChild = control.oAttr.children;
			for ( var child in allChild) {
				_that._place(allChild[child]);
			}

		}

		this.oApi = {
			"_place" : _place,
			"_layout" : _layout,
			"_computerOffset" : _computerOffset,
			"_couputerLayoutData" : _couputerLayoutData
		};
		this.oAttr = {
			"controlWidth" : 0,
			"controlHeight" : 0
		

		};
		this.oInit = $.extend(true, {}, Filllayout.oDefaults.oSettings, oInit);

	};
	Filllayout.oDefaults = {};
	Filllayout.oDefaults.oSettings = {
		"marginLeft" : 2,
		"marginTop" : 2,
		"marginRight" : 2,
		"marginBottom" : 2,
		"spacing" : 2,
		"fill" :"h",
		gridData : {
			"width" : 0,
			"height" : 0

		}
	};

	if (typeof $.fn.Layout == "function") {
		$.fn.Layout.aExts.push( {
			"type" : "filllayout",
			"fnImp" : function(oInit) {
				return new Filllayout(oInit);
			}

		});
	}
})(jQuery);