(function($) {
	var VRowlayout = function(oInit) {

		function _addNewRow() {
			var oAttr = this.oAttr;
			oAttr.rows[oAttr.rowCount] = {
				blankWidth : 0,
				blankHeight : 0,
				offsetX : 0,
				offsetY : 0,
				index : oAttr.rowCount,
				maxHeight : 0,
				maxWidth : 0
			};
			oAttr.rowCount++;
			return oAttr.rows[oAttr.rowCount - 1];
		}

		function _clrearRows() {
			this.oAttr.rowCount = 0;
			this.oAttr.rows = [];
		}

		function _place(child) {
			var oInit = this.oInit;
			var layoutData = child.oInit.layout.layoutData;
			var row = this.oAttr.rows[layoutData.rowindex];
			var top = row.offsetY + layoutData.top;
			var left = row.offsetX + layoutData.left;
			if (oInit.align == "center") {
				left = layoutData.left + (row.maxWidth - layoutData.width) / 2;
			}
			if (oInit.align == "right") {
				left = layoutData.left + row.maxWidth - layoutData.width;
			}
			child.oAttr.dom.css( {
				"position" : "absolute",
				"top" : top + "px",
				"left" : left + "px"
			});
		}
		function _computerOffset(control) {
			var oInit = this.oInit;
			var rows=this.oAttr.rows;
			if (oInit.hExpand) {
				 $.Scrollable(control,{"toWidth":this.oAttr.allWidth});
			}
			for ( var i = 0; i < rows.length; i++) {
				if (oInit.valign == "middle") {
					rows[i].offsetY = (rows[i].blankHeight) / 2;
				}
				if (oInit.valign == "bottom") {
					rows[i].offsetY = rows[i].blankHeight;
				}

			}
		}

		function _couputerLayoutData(control) {
			var oAttr=this.oAttr;
			var oInit=this.oInit;

			oAttr.allWidth = oInit.marginLeft + oInit.marginRight;
			this._clrearRows();
			var clientArea = control._getClientArea();
			var width = clientArea.width;
			var height = clientArea.height;
			var offsetX = oInit.marginLeft;
			var offsetY =oInit. marginTop;
			var maxWidth = 0;

			var row = this._addNewRow();
			var allChild = control.oAttr.children;
			for ( var index in allChild) {
				var child=allChild[index];
				var controlWidth = child.oAttr.dom.outerWidth();
				var controlHeight = child.oAttr.dom.outerHeight();
				if (offsetY + controlHeight + oInit.marginBottom > height) {
					offsetX += maxWidth + oInit.hSpacing;
					oAttr.allWidth += oInit.hSpacing;
					offsetY = oInit.marginTop;
					maxWidth = 0;
					row = this._addNewRow();
				}
				if (maxWidth < controlWidth) {
					oAttr.allWidth += controlWidth - maxWidth;
					maxWidth = controlWidth;
				}
				child.oInit.layout.layoutData={
					rowindex : row.index,
					top : offsetY + clientArea.y,
					left : offsetX + clientArea.x,
					width : controlWidth,
					height : controlHeight
				};
				row.blankHeight = height - offsetY - controlHeight - oInit.marginBottom;
				row.maxWidth = maxWidth;
				offsetY += controlHeight + oInit.vSpacing;

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
			"_couputerLayoutData" : _couputerLayoutData,
			"_addNewRow" : _addNewRow,
			"_clrearRows" : _clrearRows
		};
		this.oAttr = {
			"allHeight" : 0,
			"allWidth" : 0,
			"rowCount" : 0,
			"rows" : []

		};
		this.oInit=$.extend(true,{},VRowlayout.oDefaults.oSettings,oInit);
		
	};
	VRowlayout.oDefaults = {};
	VRowlayout.oDefaults.oSettings = {
		"marginLeft" : 2,
		"marginTop" : 2,
		"marginRight" : 2,
		"marginBottom" :2,
		"vSpacing" :2,
		"hSpacing" : 5,
		"hExpand" : true,
		"vExpand" : true,
		"valign" : "middle",
		"align" : "center"
	};
	
	if ( typeof $.fn.Layout == "function"){
		$.fn.Layout.aExts.push({
				"type":"vrowlayout",
				"fnImp":function(oInit){	
				      return new VRowlayout(oInit);
			          }
				  
			}
		);
	}
})(jQuery);