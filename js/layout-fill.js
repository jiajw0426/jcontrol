(function($) {
	var Filllayout = function(oInit) {

		function _place(child) {
			var oInit = this.oInit;
			var oAttr = this.oAttr;
			var layoutData = child.oInit.layout.layoutData;
			var stable=layoutData.stable;
			var dom=child.oAttr.dom;
			var outlineWidth=dom.outerWidth()-dom.width();
			var outlineHeight=dom.outerHeight()-dom.height();
            var css=
			 {
				"position" : "absolute",
				"top" : layoutData.top + "px",
				"left" : layoutData.left + "px"
			};
            if (oInit.fill.toLowerCase() == "h") {
            	
            	css["width"]=(oAttr.controlWidth-outlineWidth)+ "px";
            	if(!stable){
            		css["height"]=(oAttr.controlHeight-outlineHeight) + "px";
            	}
            }
             if (oInit.fill.toLowerCase() == "v") {
            	 css["height"]=(oAttr.controlHeight-outlineHeight) + "px";
             	if(!stable){
             		css["width"]=(oAttr.controlWidth-outlineWidth) + "px";
             	}
            }
            child.oAttr.dom.css(css);
			 child.__layout();

		}
		function _computerOffset(control) {

		}

		function _couputerLayoutData(control) {
			var clientArea = control._getClientArea();
			var allChild = control.oAttr.children;
			var length=allChild.length;
			var count = length;
			var oAttr = this.oAttr;
			var oInit = this.oInit;
			var grabWidth=clientArea.width;
			var grabHeight=clientArea.height;
			for ( var index in allChild) {
				var child = allChild[index];
				if (child.oInit.layout.layoutData.stable) {
					count--;
					grabWidth-=child.oAttr.dom.outerWidth();
					grabHeight-=child.oAttr.dom.outerHeight();
				}
			}
			if (oInit.fill.toLowerCase() == "v") {
				oAttr.controlWidth = (grabWidth - (length - 1)
						* oInit.spacing - oInit.marginLeft - oInit.marginRight)
						/ (count<=0?1:count);
				oAttr.controlHeight = clientArea.height - oInit.marginTop
						- oInit.marginBottom;
			}
			if (oInit.fill.toLowerCase() == "h") {
				oAttr.controlWidth = clientArea.width - oInit.marginLeft
						- oInit.marginRight;
				oAttr.controlHeight = (grabHeight - (length - 1)
						* oInit.spacing - oInit.marginTop - oInit.marginBottom)
						/ (count<=0?1:count);

			}

			var top = oInit.marginTop;
			var left = oInit.marginLeft;
			for ( var index in allChild) {
				var child = allChild[index];
				child.oInit.layout.layoutData=$.extend(true,{},child.oInit.layout.layoutData,{
					
					"top":top,
					"left":left
				});
				if (oInit.fill.toLowerCase() == "h") {
					if(child.oInit.layout.layoutData.stable){
						top +=child.oAttr.dom.outerHeight() + oInit.spacing;
					}else{
						top +=oAttr.controlHeight + oInit.spacing;
					
					}
				}
				if (oInit.fill.toLowerCase() == "v") {
					if(child.oInit.layout.layoutData.stable){
						left +=child.oAttr.dom.outerWidth() + oInit.spacing;
					}else{
						left +=oAttr.controlWidth + oInit.spacing;
					}
				}
				
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
		"marginBottom" :2,
		"spacing" : 2,
		"fill" : "h"
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