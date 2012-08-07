/**
 * @summary Button
 * @description Button
 * @version 1.0.0
 * @file Button.js
 * @author jia.jw
 * 
 */

(function($, document) {
	var Menu = function(oInit) {

		function _create(oInit) {
			var oAttr = this.oAttr;
			oAttr.dom = $("<div/>").addClass(
					"ui-widget-content ui-corner-all ui-menu");
			if (oInit.height) {
				oAttr.dom.height(oInit.height);
			}
			if (oInit.width) {
				oAttr.dom.width(oInit.width);
			}
			oAttr.control = oAttr.dom;
			oAttr.client = oAttr.dom;
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
		}
		function _getClientArea() {
			var dom = this.oAttr.dom;
			return {
				width : dom.width(),
				height : dom.height()
			};
		}

		function _clickItem(item){
			this.oAttr.showing=!this.oAttr.showing;
			this._showSubItems(item);
		}
		function _addItem(oInit, parentItem) {
			var container=this;
			var level=0;
			var _that=this;
			if(parentItem){
				level=parentItem.oAttr.level+1;
				if(!parentItem.oAttr.itemsPanel){
					var data={};
					if(level>1){
						data.position="e";
					}
					var newPanel=$.Attach(parentItem,data);
					parentItem.oAttr.itemsPanel=newPanel;
					var dom=newPanel.oAttr.dom;
					dom.addClass("ui-menu");
					dom.bind("mouseenter",function(){
						_that.oAttr.fcousCount++;
					});
					dom.bind("mouseleave",function(){
						_that.oAttr.fcousCount--;
						_that._tryHideSubItems();
					} );
				}
				container=parentItem.oAttr.itemsPanel;
			}
			var newItem=container.addControl(oInit);
			newItem.oAttr.menu=this;
			newItem.oAttr.level=level;
			return newItem;
		}
		function _tryHideSubItems(){
			var _that=this;
			setTimeout(function (){
				
				var count=_that.oAttr.fcousCount;
				if(count==0&&_that.oAttr.focusItem==null){
					_that.oAttr.showing=false;
					_that._hideAllSubItems();
				}
			},1000);
		}
		function _lostFocusItem(item){
			this.oAttr.focusItem=null;
			this._tryHideSubItems();
		}

		
		function _hideAllSubItems(){
			var showingSubItems=this.oAttr.showingSubItems;
			var length=showingSubItems.length;
			for(var i=0;i<length;i++){
				var itemsPanel=showingSubItems.pop();
				itemsPanel.oAttr.dom.css("display","none");
			}
		}
		function _focusItem(item){
			this.oAttr.focusItem=item;
			var level=item.oAttr.level;
			var currentItems=this.oAttr.currentItems;
			var length=currentItems.length;
			for(var i=level;i<length;i++){
				var oldItem=currentItems.pop();
				oldItem.oAttr.dom.removeClass("ui-menuitem-focus");
			}
			item.oAttr.dom.addClass("ui-menuitem-focus");
			currentItems.push(item);
			this._showSubItems(item);
		}
		function _showSubItems(item){
			if(!this.oAttr.showing){
				this._hideAllSubItems();
				return;
			}
			if(!item.oAttr.itemsPanel){
				var label=item.oInit.label+"-"+item.oAttr.level+"-";
				item._addItem( {
					type : "menuitem",
					label:label+"1"
							});
				item._addItem( {
					type : "menuitem",
					label:label+"2"
							});
				item._addItem( {
					type : "menuitem",
					label:label+"3"
							});
			}
			var level=item.oAttr.level;
			var showingSubItems=this.oAttr.showingSubItems;
			var length=showingSubItems.length;
			for(var i=level;i<length;i++){
				var itemsPanel=showingSubItems.pop();
				itemsPanel.oAttr.dom.css("display","none");
			}
			if(item.oAttr.itemsPanel){
				showingSubItems.push(item.oAttr.itemsPanel);
				item.oAttr.itemsPanel.oAttr.dom.css("display","");
			}
			
		}
		this.oApi = {
			"_addItem" : _addItem,
			"_clickItem":_clickItem,
			"_tryHideSubItems":_tryHideSubItems,
			"_create" : _create,
			"_focusItem":_focusItem,
			"_showSubItems":_showSubItems,
		   "_lostFocusItem":_lostFocusItem,
		   "_hideAllSubItems":_hideAllSubItems,
			"_getClientArea" : _getClientArea
		};
		this.oAttr = {
		    "focusItem":null,
			"fcousCount":0,
			"isContainer" : true,
			"showing":false,
			"showingSubItems":[],
			"currentItems":[]
		};
		this.getFeatures = function() {
			return Menu.aFeatures;
		};
		this.oInit = $.extend(true, {}, Menu.defaults.oSetting, oInit);

	};
	Menu.aFeatures = [];
	Menu.defaults = {

	};
	Menu.defaults.oSetting = {
		id : "" + new Date().getTime(),
		height : 35,
		width : 980,
		"layout" : {
			"type" : "filllayout",
			"fill" : "v"
		}
	};
	if (typeof $.fn.Control == "function") {
		$.fn.Control.aExts.push( {
			"type" : "menu",
			"fnImp" : function(oInit) {
				return new Menu(oInit);
			}

		});
	}
	$.fn.Menu = Menu;
})(jQuery, document);
