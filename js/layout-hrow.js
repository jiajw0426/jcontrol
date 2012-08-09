(function($) {
	var HRowlayout = function(oInit) {

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
			var top = layoutData.top;
			var left = row.offsetX + layoutData.left;
			if (oInit.valign == "middle") {
				top = layoutData.top + (row.maxHeight - layoutData.height) / 2;
			}
			if (oInit.valign == "bottom") {
				top = layoutData.top + row.maxHeight - layoutData.height;
			}
			child.oAttr.dom.css( {
				"position" : "absolute",
				"top" : top + "px",
				"left" : left + "px"
			});
		}
		function _computerOffset(control) {
			var oInit = this.oInit;
			var rows = this.oAttr.rows;
			if (oInit.vExpand) {
				$.Scrollable(control, {
					"toHeight" : this.oAttr.allHeight
				});
			}
			var allHeight = oInit.marginTop;
			for ( var i = 0; i < rows.length; i++) {
				if (oInit.align == "center") {
					rows[i].offsetX = rows[i].blankWidth / 2;
				}
				if (oInit.align == "right") {
					rows[i].offsetX = rows[i].blankWidth;
				}

			}
		}
		

		function _couputerLayoutData(control) {
			var oAttr = this.oAttr;
			var oInit = this.oInit;
			oAttr.allHeight = oInit.marginTop + oInit.marginBottom;
			this._clrearRows();
			var clientArea = control._getClientArea();
			var width = clientArea.width;
			var height = clientArea.height;
			var offsetX = oInit.marginLeft;
			var offsetY = oInit.marginTop;
			var maxHeight = 0;
			var row = this._addNewRow();
			var allChild = control.oAttr.children;
			for ( var index in allChild) {
				var child = allChild[index];
				var controlWidth = child.oAttr.dom.outerWidth();
				var controlHeight = child.oAttr.dom.outerHeight();
				if (offsetX + controlWidth + oInit.marginRight > width) {
					offsetY += maxHeight + oInit.vSpacing;
					oAttr.allHeight += oInit.vSpacing;
					offsetX = oInit.marginLeft;
					maxHeight = 0;
					row = this._addNewRow();
				}
				if (maxHeight < controlHeight) {
					oAttr.allHeight += controlHeight - maxHeight;
					maxHeight = controlHeight;
				}
				child.oInit.layout.layoutData = {
					rowindex : row.index,
					top : clientArea.y + offsetY,
					left : clientArea.x + offsetX,
					width : controlWidth,
					height : controlHeight
				};
				row.blankWidth = width - controlWidth - offsetX
						- oInit.marginRight;
				offsetX += controlWidth + oInit.hSpacing;
				row.maxHeight = maxHeight;

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
		this.oInit = $.extend(true, {}, HRowlayout.oDefaults.oSettings, oInit);

	};
	HRowlayout.oDefaults = {};
	HRowlayout.oDefaults.oSettings = {
		"marginLeft" : 2,
		"marginTop" : 2,
		"marginRight" : 2,
		"marginBottom" : 2,
		"vSpacing" : 2,
		"hSpacing" : 5,
		"hExpand" : true,
		"vExpand" : true,
		"valign" : "top",
		"align" : "center"
	};

	if (typeof $.fn.Layout == "function") {
		$.fn.Layout.aExts.push( {
			"type" : "hrowlayout",
			"fnImp" : function(oInit) {
				return new HRowlayout(oInit);
			}

		});
	}
})(jQuery);