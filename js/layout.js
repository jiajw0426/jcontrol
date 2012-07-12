function FillLayout() {
	this.hExpand = true;
	this.vExpand = false;
	this.layout = function(control) {
		var size = this.computerSize(control);
		control.loop(function(child, index) {
			Message.assert(index > 0,
					"FillLayout layout more than one Contril!");
			child.getDomElement().css( {
				"width" : size.width,
				"height" : size.height,
				"position" : "relative",
				"top" : "0px",
				"left" : "0px"
			});

		});
	};
	this.computerSize = function(control) {
		var result = {
			width : control.getDomElement().width(),
			height : control.getDomElement().height()
		};
		control.loop(function(child, index) {
			Message.assert(index > 0,
					"FillLayout layout more than one Contril!");
			var width = child.getDomElement().width();
			var height = child.getDomElement().height();
			if (this.hExpand && result.width < width) {
				result.width = width;
				control.hExpand(result.width);
			}
			if (this.hExpand && result.height < height) {
				result.height = height;
				control.vExpand(result.height);
			}
		});
		return result;
	};

	return this;
}

function RowLayout(data) {
	this.type = "horizontal";// vertical";//horizontal";
	this.marginLeft = 0;
	this.marginTop = 0;
	this.marginRight = 0;
	this.marginBottom = 0;
	this.vSpacing = 0;
	this.hSpacing = 0;
	this.hExpand = false;
	this.vExpand = false;
	this.valign = "top";
	this.align = "left";

	$.extend(this, data);
	this.allHeight = this.marginTop + this.marginBottom;
	this.allWidth = this.marginLeft + this.marginRight;
	this.rowCount = 0;
	this.rows = new Array();
	this.setAlign = function(align) {
		this.align = align;
	};
	this.setValign = function(valign) {
		this.valign = valign;
	};
	this.setType = function(type) {
		this.type = type;
	};
	this.addNewRow = function() {
		this.rows[this.rowCount] = {
			blankWidth : 0,
			blankHeight : 0,
			offsetX : 0,
			offsetY : 0,
			index : this.rowCount,
			maxHeight : 0,
			maxWidth : 0
		};
		this.rowCount++;
		return this.rows[this.rowCount - 1];
	};
	this.clrearRows = function() {
		this.rowCount = 0;
		this.rows = new Array();
	};

	this.place = function(child) {
		if (this.type == "vertical") {
			VERTICAL_place(this, child);
		} else {
			HORIZONTAL_place(this, child);
		}
	};
	this.computerOffset = function(control) {

		if (this.type == "vertical") {
			VERTICAL_computerOffset(this, control);
		} else {
			HORIZONTAL_computerOffset(this, control);
		}
	};

	this.couputerLayoutData = function(control) {
		if (this.type == "vertical") {
			VERTICAL_couputerLayoutData(this, control);
		} else {
			HORIZONTAL_couputerLayoutData(this, control);
		}
	};
	this.layout = function(control) {
		if (this.type == "vertical") {
			VERTICAL_layout(this, control);
		} else {
			HORIZONTAL_layout(this, control);
		}
	};
	return this;

}
function HORIZONTAL_place(layout, child) {
	with (layout) {
		var layoutData = child.getLayoutData();
		var row = rows[layoutData.rowindex];
		var top = layoutData.top;
		var left = row.offsetX + layoutData.left;
		if (valign == "middle") {
			top = layoutData.top + (row.maxHeight - layoutData.height) / 2;
		}
		if (valign == "bottom") {
			top = layoutData.top + row.maxHeight - layoutData.height;
		}
		child.getDomElement().css( {
			"position" : "absolute",
			"top" : top + "px",
			"left" : left + "px"
		});
	}
}
function HORIZONTAL_computerOffset(layout, control) {
	with (layout) {
		if (vExpand) {
			control.vExpand(allHeight);
		}
		var allHeight = marginTop;
		for ( var i = 0; i < rows.length; i++) {
			if (align == "center") {
				rows[i].offsetX = rows[i].blankWidth / 2;
			}
			if (align == "right") {
				rows[i].offsetX = rows[i].blankWidth;
			}

		}
	}
}

function HORIZONTAL_couputerLayoutData(layout, control) {
	with (layout) {
		clrearRows();
		var clientArea = control.getClientArea();
		var width = clientArea.width;
		var height = clientArea.height;
		var offsetX = marginLeft;
		var offsetY = marginTop;
		var maxHeight = 0;
		var row = addNewRow();
		Util.loop(control.children, function(child, index) {
			var controlWidth = child.getDomElement().width();
			var controlHeight = child.getDomElement().height();
			if (offsetX + controlWidth + marginRight > width) {
				offsetY += maxHeight + vSpacing;
				allHeight += vSpacing;
				offsetX = marginLeft;
				maxHeight = 0;
				row = addNewRow();
			}
			if (maxHeight < controlHeight) {
				allHeight += controlHeight - maxHeight;
				maxHeight = controlHeight;
			}
			child.setLayoutData( {
				rowindex : row.index,
				top : clientArea.y + offsetY,
				left : clientArea.x + offsetX,
				width : controlWidth,
				height : controlHeight
			});
			row.blankWidth = width - controlWidth - offsetX - marginRight;
			offsetX += controlWidth + hSpacing;
			row.maxHeight = maxHeight;

		});
	}

}
function HORIZONTAL_layout(layout, control) {

	with (layout) {
		couputerLayoutData(control);
		computerOffset(control);
		Util.loop(control.children, function(child, index) {
			place(child);
		});
	}

}

function VERTICAL_place(layout, child) {
	with (layout) {
		var layoutData = child.getLayoutData();
		var row = rows[layoutData.rowindex];
		var top = row.offsetY + layoutData.top;
		var left = row.offsetX + layoutData.left;
		if (align == "center") {
			left = layoutData.left + (row.maxWidth - layoutData.width) / 2;
		}
		if (align == "right") {
			left = layoutData.left + row.maxWidth - layoutData.width;
		}
		child.getDomElement().css( {
			"position" : "absolute",
			"top" : top + "px",
			"left" : left + "px"
		});
	}
}

function VERTICAL_computerOffset(layout, control) {

	with (layout) {
		if (hExpand) {
			control.hExpand(allWidth);
		}
		var allWidth = marginLeft;
		for ( var i = 0; i < rows.length; i++) {
			allWidth += rows[i].maxWidth + hSpacing;
			if (valign == "middle") {
				rows[i].offsetY = (rows[i].blankHeight) / 2;
			}
			if (valign == "bottom") {
				rows[i].offsetY = rows[i].blankHeight;
			}

		}

	}
}
function VERTICAL_couputerLayoutData(layout, control) {
	with (layout) {
		clrearRows();
		var clientArea = control.getClientArea();
		var width = clientArea.width;
		var height = clientArea.height;
		var offsetX = marginLeft;
		var offsetY = marginTop;
		var maxWidth = 0;

		var row = addNewRow();
		Util.loop(control.children, function(child, index) {
			var controlWidth = child.getDomElement().width();
			var controlHeight = child.getDomElement().height();
			if (offsetY + controlHeight + marginBottom > height) {
				offsetX += maxWidth + hSpacing;
				allWidth += hSpacing;
				offsetY = marginTop;
				maxWidth = 0;
				row = addNewRow();
			}
			if (maxWidth < controlWidth) {
				allWidth += controlWidth - maxWidth;
				maxWidth = controlWidth
			}
			child.setLayoutData( {
				rowindex : row.index,
				top : offsetY + clientArea.y,
				left : offsetX + clientArea.x,
				width : controlWidth,
				height : controlHeight
			});
			row.blankHeight = height - offsetY - controlHeight - marginBottom;
			row.maxWidth = maxWidth;
			offsetY += controlHeight + vSpacing;

		});
	}
}
function VERTICAL_layout(layout, control) {

	with (layout) {
		couputerLayoutData(control);
		computerOffset(control);
		Util.loop(control.children, function(child, index) {
			place(child);
		});
	}

}