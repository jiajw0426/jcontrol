(function($) {
	var Gridlayout = function(oInit) {

		function _addCell(child) {
			var oAttr = this.oAttr;
			var vSpan = child.oInit.layout.layoutData.vSpan;
			var hSpan = child.oInit.layout.layoutData.hSpan;
			var str = oAttr.allCells.join("-");
			var numColumns = this.oInit.numColumns;

			while (true) {
				var newrow = false;
				var find = false;
				for ( var i = 0; i <= numColumns - hSpan; i++) {
					if (str.indexOf(i + "," + oAttr.startRow) == -1) {
						find = this._findCell(i, oAttr.startRow, child);
						if (find) {
							break;
						}
					}
				}
				if (!find) {
					oAttr.startRow += 1;
				}
				if (find) {
					break;
				}
			}

		}

		function _findCell(i, j, child) {
			var layoutData = child.oInit.layout.layoutData;
			var vSpan = layoutData.vSpan;
			var hSpan = layoutData.hSpan;
			var oAttr = this.oAttr;
			var find = true;
			var findCells = [];
			var oAttr = this.oAttr;
			var str = oAttr.allCells.join("-");
			for ( var c = 0; c < hSpan; c++) {
				for ( var r = 0; r < vSpan; r++) {
					if (str.indexOf((i + c) + "," + (j + r)) != -1) {
						find = false;
						break;
					}
					findCells.push((i + c) + "," + (j + r));
				}
				if (!find) {
					break;
				}

			}
			if (find) {
                
				layoutData._outerWidth=child.oAttr.dom.outerWidth();
				layoutData._outerHeight=child.oAttr.dom.outerHeight();
				layoutData._rowIndex = j;
				layoutData._columndIndex = i;
				
				oAttr.allCells = oAttr.allCells.concat(findCells);
				
			
			}
			return find;
		}

		function _computerCellRange(child){
			var oAttr = this.oAttr;
			
			var layoutData = child.oInit.layout.layoutData;
			var outerHeight = layoutData._outerHeight;
			var outerWidth = layoutData._outerWidth;
			var vSpan = layoutData.vSpan;
			var hSpan = layoutData.hSpan;
			var j=layoutData._rowIndex ;
			var i=layoutData._columndIndex ;
			var controlWidth = layoutData.widthHint > outerWidth ? layoutData.widthHint
					: outerWidth;
			var width = controlWidth / hSpan;

			var controlHeight = layoutData.heightHint > outerHeight ? layoutData.heightHint
					: outerHeight;
			var height = controlHeight / vSpan;
			for ( var c = 0; c < hSpan; c++) {
				if(layoutData.grabExcessHSpace){
					oAttr.grabExcessHSpaceColumns[i + c]=1;
				}		
				if (oAttr.columnWidth[i + c]) {
					if (width > oAttr.columnWidth[i + c]) {
						oAttr.columnWidth[i + c] = width;
					}
				} else {
					oAttr.columnWidth[i + c] = width;
				}
			}

			for ( var r = 0; r < vSpan; r++) {
				if(layoutData.grabExcessVSpace){
					oAttr.grabExcessVSpaceRows[j + r]=1;
				}
				if (oAttr.rowHeight[j + r]) {
					if (height > oAttr.rowHeight[j + r]) {
						oAttr.rowHeight[j + r] = height;
					}
				} else {
					oAttr.rowHeight[j + r] = height;
				}
			}
		}
		function _place(child) {
			var layoutData = child.oInit.layout.layoutData;
			var outerHeight = layoutData._outerHeight;
			var outerWidth = layoutData._outerWidth;
			var vSpan = layoutData.vSpan;
			var hSpan = layoutData.hSpan;
			var oAttr = this.oAttr;
			var top = this.oInit.marginTop + layoutData._rowIndex
					* this.oInit.vSpacing;
			for ( var i = 0; i < layoutData._rowIndex; i++) {
				top += oAttr.rowHeight[i];
			}
			var left = this.oInit.marginLeft + layoutData._columndIndex
					* this.oInit.hSpacing;
			for ( var i = 0; i < layoutData._columndIndex; i++) {
				left += oAttr.columnWidth[i];
			}
			var earaHeight = (vSpan - 1) * this.oInit.vSpacing;
			for ( var i = 0; i < vSpan; i++) {
				earaHeight += oAttr.rowHeight[i + layoutData._rowIndex];
			}
			
			
			if (layoutData.grabExcessVSpace||layoutData.vAlignment=="full") {
				
				child.oAttr.dom.css( {
					"height" : earaHeight
				});
			}else{
				var topOfsset=earaHeight-outerHeight;
				if(layoutData.vAlignment=="begin"){
					top+= Math.min(layoutData.vIndent,topOfsset);
				}
				if(layoutData.vAlignment=="center"){
					top+=topOfsset/2;
				}
	             if(layoutData.vAlignment=="end"){
	            	 top+=topOfsset;
				}
				
			}
			
			var earaWidth = (hSpan - 1) * this.oInit.hSpacing;
			for ( var i = 0; i < hSpan; i++) {
				earaWidth += oAttr.columnWidth[i
						+ layoutData._columndIndex];
			}
			if (layoutData.grabExcessHSpace||layoutData.hAlignment=="full") {
				
				child.oAttr.dom.css( {
					"width" : earaWidth
				});
			}else {
				var leftOffset=earaWidth-outerWidth;
				if(layoutData.hAlignment=="begin"){
					left+=Math.min(leftOffset, layoutData.hIndent); 
				}
				if(layoutData.hAlignment=="center"){
					left+=(leftOffset)/2;  
				}
	             if(layoutData.hAlignment=="end"){
	            	left+=leftOffset;
				}
				
			}
			child.oAttr.dom.css( {
				"position" : "absolute",
				"top" : top,
				"left" : left

			});
		}
		function _computerOffset(control) {
			
			if (this.oInit.hExpand) {
				$.Scrollable(control, {
					"toWidth" : this.oAttr.allWidth,
					"toHeight" : this.oAttr.allHeight
				});
			}
		}

		function _couputerLayoutData(control) {
			var allChild = control.oAttr.children;
			if (this.oAttr.allCells.length == 0) {
				for ( var index in allChild) {
					var child = allChild[index];
					child.oInit.layout.layoutData = $.extend( {},
							Gridlayout.oDefaults.oSettings.gridData,
							child.oInit.layout.layoutData);
					this._addCell(child);
				}
			}
			this.oAttr.columnWidth=[];
			this.oAttr.rowHeight=[];
			for ( var index in allChild) {
				var child = allChild[index];
				this._computerCellRange(child);
			}
			this.oAttr.allColumnWidth = this.oInit.marginLeft+this.oInit.marginRight - this.oInit.hSpacing;
			for ( var i = 0; i < this.oAttr.columnWidth.length; i++) {
				this.oAttr.allColumnWidth += this.oAttr.columnWidth[i]
						+ this.oInit.hSpacing;
			}

			this.oAttr.allRowHeight = this.oInit.marginTop+this.oInit.marginBottom - this.oInit.vSpacing;
			for ( var i = 0; i < this.oAttr.rowHeight.length; i++) {
				this.oAttr.allRowHeight += this.oAttr.rowHeight[i]
						+ this.oInit.vSpacing;
			}
		
			var scrollBar = control.oAttr.scrollBar;
			this.oAttr.allWidth=this.oAttr.allColumnWidth;
			if (scrollBar.vbar) {
					this.oAttr.allWidth =this.oAttr.allColumnWidth+ $.Scrollable.oDefaults.barWidth;
			}
			this.oAttr.allHeight=this.oAttr.allRowHeight;
			if (scrollBar.hbar) {
					this.oAttr.allHeight=  this.oAttr.allRowHeight+$.Scrollable.oDefaults.barHeight;
			}
			
			var oAttr=this.oAttr;
			if(oAttr.allRowHeight<control.oAttr.control.height()){
				var grabableVSpace=control.oAttr.control.height()-oAttr.allRowHeight;
				oAttr.allRowHeight=control.oAttr.control.height();
				var grabRows=[];
				for(var i in  oAttr.grabExcessVSpaceRows){
					if(oAttr.grabExcessVSpaceRows[i]==1){
						grabRows.push(i);
					}
				}
				var grapHeight=grabableVSpace/grabRows.length;
				for(var i in grabRows){
					oAttr.rowHeight[grabRows[i]]+=grapHeight;
				}
			}
			if(oAttr.allColumnWidth<control.oAttr.control.width()){
				var grabableVSpace=control.oAttr.control.width()-oAttr.allColumnWidth;
				oAttr.allColumnWidth=control.oAttr.control.width();
				var grabColumns=[];
				for(var i in  oAttr.grabExcessHSpaceColumns){
					if(oAttr.grabExcessHSpaceColumns[i]==1){
						grabColumns.push(i);
					}
				}
				var grapWidth=grabableVSpace/grabColumns.length;
				for(var i in grabColumns){
					oAttr.columnWidth[grabColumns[i]]+=grapWidth;
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
			"_couputerLayoutData" : _couputerLayoutData,
			"_addCell" : _addCell,
			"_findCell" : _findCell,
			"_computerCellRange":_computerCellRange
		};
		this.oAttr = {
			"allCells" : [],
			"columnWidth" : [],
			"rowHeight" : [],
			"startRow" : 0,
			"allWidth" : 0,
			"grabExcessHSpaceColumns":[],
			"grabExcessVSpaceRows" :[]

		};
		this.oInit = $.extend(true, {}, Gridlayout.oDefaults.oSettings, oInit);

	};
	Gridlayout.oDefaults = {};
	Gridlayout.oDefaults.oSettings = {
		"marginLeft" : 2,
		"marginTop" : 2,
		"marginRight" : 2,
		"marginBottom" : 2,
		"vSpacing" : 2,
		"hSpacing" : 5,
		"hExpand" : true,
		"vExpand" : true,
		"numColumns" : 1,
		"makeColumnsEqualWidth" : false,
		
		gridData : {
			"grabExcessHSpace" : false,
			"grabExcessVSpace" : false,
			"heightHint" : -1,
			"widthHint" : -1,
			"hAlignment" : "begin",
			"vAlignment" : "begin",
			"hIndent" : 0,
			"vIndent" : 0,
			"hSpan" : 1,
			"vSpan" : 1,
			"_rowIndex" : -1,
			"_columndIndex" : -1

		}
	};

	if (typeof $.fn.Layout == "function") {
		$.fn.Layout.aExts.push( {
			"type" : "gridlayout",
			"fnImp" : function(oInit) {
				return new Gridlayout(oInit);
			}

		});
	}
})(jQuery);