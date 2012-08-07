/**
 * @summary Button
 * @description Button
 * @version 1.0.0
 * @file Button.js
 * @author jia.jw
 * 
 */
var _index=100;
(function($, document) {
	var MenuItem = function(oInit) {

		function _create(oInit) {
			var oAttr = this.oAttr;
			oAttr.dom = $("<div></div>").addClass("ui-corner-all");
			oAttr.client = $("<div></div>").addClass("ui-menuitem ui-corner-all");
			oAttr.client.appendTo(oAttr.dom);
			oAttr.control = oAttr.client;
			if (oInit.container) {
				oInit.container._appendControl(this);
			} else {
				$("body").append(oAttr.dom);
			}
			if (this.oInit.events) {
				for ( var event in this.oInit.events) {
					this.oAttr.control.bind(event, this.oInit.events[event]);
				}
			}
			var label = this.addControl( {
				"id" : "label1",
				label : this.oInit.label,
				type : "label",
				layout :{
				"layoutData":{"grabExcessHSpace":true}
			}
			});
			var _that = this;
			label.oAttr.dom.addClass("ui-menuitem-label");
			oAttr.dom.bind("mouseenter", function() {
				_that.oAttr.menu._focusItem(_that);
			});
			oAttr.dom.bind("mouseleave", function() {
				_that.oAttr.menu._lostFocusItem(_that);
			});
			
			oAttr.dom.click(function() {
				_that.oAttr.menu._clickItem(_that);
			});
		}
		function _addItem(oInit){
			this.oAttr.menu._addItem(oInit,this);
		}
		
		this.oApi = {
			"_create" : _create,
			"_addItem":_addItem
		};
		this.oAttr = {
			"isContainer" : true,
			"menu":null,
			"parentItem":null,
			"level":0,
			"subItems":[]
		};
		this.getFeatures = function() {
			return MenuItem.aFeatures;
		};
		this.oInit = $.extend( {}, MenuItem.defaults.oSetting, oInit);

	};
	MenuItem.aFeatures = [];
	MenuItem.defaults = {

	};
	MenuItem.defaults.oSetting = {
		id : "" + new Date().getTime(),
		"layout" : {
			"marginLeft" : 0,
			"marginTop" : 0,
			"marginRight" : 0,
			"marginBottom" : 0,
			"vSpacing" : 4,
			"hSpacing" : 0,
			"type" : "gridlayout",
			"numColumns":1,
			"valign" : "middle",
			"align" : "center"
			

		}
	};
	if (typeof $.fn.Control == "function") {
		$.fn.Control.aExts.push( {
			"type" : "menuitem",
			"fnImp" : function(oInit) {
				return new MenuItem(oInit);
			}

		});
	}
	$.fn.MenuItem = MenuItem;
})(jQuery, document);
