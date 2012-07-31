(function($,window) {
	var BodyPanel = function(oInit) {
		if(BodyPanel.defaults.instance){
			return BodyPanel.defaults.instance;
		}
		function _create(oInit) {
			var oAttr = this.oAttr;
			oAttr.dom = $("body").css("overflow" ,"hidden");
			oAttr.control = $("<div class='ui.absolute ui-body-panel'/>")
					.appendTo(oAttr.dom);
			oAttr.cient = oAttr.control;
			oAttr.dom.addClass("ui-body");
			oAttr.dom.height($(window).height());
			
			oAttr.control.css( {
				"width" : oAttr.dom.width(),
				"height" : $(window).height(),
				"position" : "absolute"
			});
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
						- 2 
			};
		};
		var _that=this;
		$(window).resize(function() {
			_that.oAttr.dom.css( {
				"height" : $(window).height()
			});
			_that.__layout();
			
		});
		this.oApi = {
			"_getClientArea" : _getClientArea,
			"_create" : _create
		};
        this.oAttr={
			"isContainer":true
		};
		this.oInit = $.extend(true, {}, BodyPanel.defaults.oSetting, oInit);
		BodyPanel.defaults.instance=this;
	};

	BodyPanel.defaults = {instance:null};
	BodyPanel.defaults.oSetting = {
		"id" : new Date().getTime(),
		 "scroll" : {
			scrollY:true,
			scrollX:true
		}
	};
	if (typeof $.fn.Control == "function") {
		$.fn.Control.aExts.push( {
			"type" : "bodypanel",
			"fnImp" : function(oInit) {
				return new BodyPanel(oInit);
			}

		});
	}
	
	
})(jQuery,window);