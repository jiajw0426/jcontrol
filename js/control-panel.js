(function($, window) {
	var Panel = function(oInit) {
		
		function _create(oInit) {
			var oAttr = this.oAttr;
			var dom = $("<div class='ui-widget ui-widget-content ui-corner-all ui-control ui.absolute'/>");
			oAttr.dom = dom;
			dom.width(oInit.width);
			dom.height(oInit.height);
			if (oInit.container == null) {
				$("body").append(dom);
			} else {
				oInit.container._appendControl(this);
			}
			if (oInit.title) {
				oAttr.title = $(
						"<div id='" + oInit.id + "'_title ui.absolute/>")
						.appendTo(dom).css("height", oInit.titleHeight)
						.addClass("ui-corner-all ui-widget-header");
			}
			var client = $("<div class='ui-panel-client'></div>").appendTo(dom);
			oAttr.client = client;
			var clientArea = this._getClientArea();
			client.css( {
				"position" : "absolute",
				"top" : clientArea.offsetY,
				"left" : clientArea.offsetX,
				"width" : clientArea.width,
				"height" : clientArea.height
			});
			var control = $("<div class='ui.absolute ui-panel-control' id='control'></div>");
			oAttr.control = control;
			control.appendTo(client);
			control.css( {
				"position" : "absolute",
				"left" : "0px",
				"top" : "0px",
				"width" : clientArea.width,
				"height" : clientArea.height
			});
			if (oInit.scrolled) {
				dom.css( {
					"overflow" : "hidden"
				});
				client.css( {
					"overflow" : "hidden"
				});
			}
		}

		function _getClientArea() {
			var oInit = this.oInit;
			var dom = this.oAttr.dom;
			var vbar=this.oAttr.scrollBar.vbar;
			var hbar=this.oAttr.scrollBar.hbar;
			return {
				x : 0,
				y : 0,
				offsetX : 0,
				offsetY : oInit.titleHeight + 2,
				width : vbar ? dom.width()
						- $.Scrollable.oDefaults.barWidth : dom.width(),
				height : hbar ? dom.height() 
						- $.Scrollable.oDefaults.barHeight : dom.height()
						- oInit.titleHeight-2
			};
		};
       
		this.oApi = {
			"_create" : _create,
			"_getClientArea" : _getClientArea
		};
		this.oAttr = {
			"isContainer" : true,
			"title" : null
		};
		this.oInit = $.extend(true, {}, Panel.defaults.oSetting, oInit);
	};

	Panel.defaults = {};
	Panel.defaults.oSetting = {
		"id" : new Date().getTime()+"",
		"title":"",
		"titleHeight" : 28,
		"height" : 200,
		"width" : 300,
		"scrolled" : true,
		 "scroll" : {
			scrollY:true,
			scrollX:true
		}
	};
	if (typeof $.fn.Control == "function") {
		$.fn.Control.aExts.push( {
			"type" : "panel",
			"fnImp" : function(oInit) {
				return new Panel(oInit);
			}

		});
	}
})(jQuery);