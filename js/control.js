var Control;
(function($) {
	Control = function(oInit) {

		if (typeof oInit == "string") {
			return $.data(Control, oInit);
		}

		function _appendControl(control) {

			this.oAttr.control.append(control.oAttr.dom);
		}

		function __layout(data) {
			data = data ? data : {};
			if (this.oAttr.layout && this.oAttr.isContainer
					&& this.oAttr.children.length)
				this.oAttr.layout._layout(this,data.reCompute);
			if (!data.shallow) {
				var allChild = this.oAttr.children;
				for ( var i in allChild) {
					allChild[i].__layout(data);
				}
			}
		}
		;
		function _fnAddControl(oInit) {
			if (this.oAttr.isContainer) {
				if (!oInit.container) {
					oInit.container = this;
				}
				var control = $(new Object()).Control(oInit);
				var _that = this;
				this.oAttr.children.push(control);
				control.oAttr.container=this;
				control.__layout({shallow:true});
				setTimeout(function() {				
					_that.__layout();
				}, 0);
				return control;
			}
		}

		function __create() {
			this.oInit.layout=$.extend(true,{},Control.oDefaults.olayout,this.oInit.layout);
			var oInit = this.oInit;
			
			var layout = $.Layout(oInit.layout);
			this.oAttr.layout = layout;
			this._create(oInit);
			if (this.getFeatures) {
				var ofeatures = this.getFeatures();
				for ( var index in ofeatures) {
					var feature = ofeatures[index];
					if (feature.fnCreate) {
						feature.fnCreate.call(this, this);
					}
				}
			}

		}

		this.getSubclassMeta = function() {
			return Control.aExts;
		};

		function _getClientArea(){
			var dom = this.oAttr.dom;
			return {
				x : 0,
				y : 0,
				offsetX : 0,
				offsetY : 0, 
				width:dom.width(),
				height:dom.height()
				};
		}
		this.oApi = {
				"_getClientArea":_getClientArea,
			"_fnAddControl" : _fnAddControl,
			"_appendControl" : _appendControl,
			"addControl" : _fnAddControl,
			"__create" : __create,
			"__layout" : __layout
		};
		this.oAttr = {
			"dom" : null,
			"client" : null,
			"control" : null,
			"children" : [],
			"layout" : null,
			"scrollBar" : {
				"hbar" : null,
				"vbar" : null,
				"originWidth" : -1,
				"originHeight" : -1,
				"height" : 0,
				"toheight" : 0
			}
		};
		oInit = $.extend( {}, Control.oDefaults.oSettigs, oInit);
		var oimp = $.inherit(this, oInit);
		oimp.__create();
		$.data(Control, oimp.oInit.id, oimp);
		return oimp;

	};
	Control.aExts = [];
	Control.oDefaults = {
		"olayout" : {
			"type" : "hrowlayout",
			"layoutData" : {

			}
		}
	};
	Control.oDefaults.oSettigs = {

		"scroll" : {

		}

	};

	$.fn.Control = Control;
	$.Control = Control;

})(jQuery);
