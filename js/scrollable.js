(function($) {
	var Scrollable = function(control, oSetting) {

		function creatVScrollbar(oControl, oSetting) {
			var layout = oControl.oAttr.layout;
			var scrollBar = oControl.oAttr.scrollBar;
			if (scrollBar.vbar) {
				if (layout) {
					scrollBar.vbar.button.toHeight = layout.oAttr.allHeight;
				}
				coputerVScrollbarLoaction(oControl, false);
				return scrollBar.vbar;
			}
			var control = oControl.oAttr.control;

			var vbar = $("<div/>")
					.insertAfter(control)
					.addClass(
							"ui-widget ui-widget-content ui-corner-all ui-scroll-v");
			vbar.topArrow = $(
					"<div class='ui-scroll-arrow-n-div ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-n ui-scroll-arrow-icon'></span></div>")
					.appendTo(vbar);

			var buttonContaiment = $(
					"<div class='ui-scroll-button-container-v'>")
					.appendTo(vbar);
			var button = $(
					"<div class='ui-widget-header ui-corner-all ui-scroll-button-v'>")
					.appendTo(buttonContaiment);
			vbar.bottomArrow = $(
					"<div class='ui-scroll-arrow-s-div ui-scroll-arrow-s ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-s ui-scroll-arrow-icon'></span></div>")
					.appendTo(vbar);

			button.mouseenter(function() {
				button.addClass("ui-state-focus");
			});
			button.mouseout(function() {
				button.removeClass("ui-state-focus");
			});
			vbar.topArrow.click(function(){
				button.positionTop+=-oSetting.scrollStep* button.rate / 1000;
				scroll(button, control);
			});
			vbar.bottomArrow.click(function(){
				button.positionTop+=+oSetting.scrollStep* button.rate / 1000;
				scroll(button, control);
			});
			
			function scroll(button, control) {
				if(button.positionTop <= 0 ){
					button.positionTop=0;
				}
				if(button.positionTop >= button.maxOfssetY ){
					button.positionTop=button.maxOfssetY;
				}
				button.css("top",button.positionTop);
				var top=button.positionTop;
				control
						.css(
								"top",
								-(top >= button.maxOfssetY ? button.maxScrollTop
										: top * 1000 / button.rate));
				if (top == 0) {
					button.positionRate = 0;
				} else if (top >= button.maxOfssetY) {
					button.positionRate = 1;
				} else {
					button.positionRate = top / button.maxScrollTop;
				}
			}
			button.draggable( {
				axis : "y",
				containment : "parent",
				drag : function(event, ui) {
					button.positionTop = ui.position.top;
					scroll(button, control);
				}
			});

			oControl.oAttr.dom.mousewheel(function(event,delta) {
				if( delta<0){					
					button.positionTop += oSetting.scrollStep * button.rate / 1000;
				}else{
					button.positionTop += -oSetting.scrollStep * button.rate / 1000;
				}
				
				scroll(button, control);

			});
			vbar.button = button;
			vbar.buttonContaiment = buttonContaiment;
			vbar.button.toHeight = oSetting.toHeight;
			vbar.button.positionRate = 0;
			vbar.button.positionTop = 0;
			scrollBar.vbar = vbar;

			if (layout) {
				layout._couputerLayoutData(oControl);
				vbar.button.toHeight = layout.oAttr.allHeight;
			}
			coputerVScrollbarLoaction(oControl, false);
		}

		function coputerVScrollbarLoaction(oControl, forHbar) {
			var vbar = oControl.oAttr.scrollBar.vbar;
			var control = oControl.oAttr.control;

			if (vbar) {
				var clientArea = oControl._getClientArea();
				with (vbar) {
					css("top", 1 + clientArea.y);
					css("height", clientArea.height - 1 * 2 - 1 * 2);
					buttonContaiment.css("top", 1 * 2 + topArrow.height() + 1
							* 2);
					button.scrollHeight = clientArea.height
							- (1 + 1 + 1 + 1 * 2 + 1 + topArrow.height()) * 2;
					buttonContaiment.height(clientArea.height
							- (1 + 1 + 1 + 1 * 2 + 1 + topArrow.height()) * 2);
					button.width(buttonContaiment.width() - 4);
					button.rate = (clientArea.height * 1000) / button.toHeight;
					button.height((button.scrollHeight * button.rate) / 1000);
					button.maxOfssetY = button.scrollHeight - 2
							- button.height();
					button.maxScrollTop = button.toHeight
							- (clientArea.height - 2);
					var top = button.positionRate == 1 ? button.maxOfssetY
							: button.positionRate * button.maxScrollTop;
					button.css("top", top);
					control.css("top",
							-(top == button.maxOfssetY ? button.maxScrollTop
									: top * 1000 / button.rate));
				}
				if (!forHbar) {
					 coputerHScrollbarLoaction(oControl,true);
				}
			}
		}
		function creatHScrollbar(oControl,toWidth) {
			var layout = oControl.oAttr.layout;
			var scrollBar = oControl.oAttr.scrollBar;
			if (scrollBar.hbar) {
				if (layout) {
					scrollBar.hbar.button.toWidth = layout.oAttr.allWidth;
				
				}
				coputerHScrollbarLoaction(oControl, false);
				return scrollBar.hbar;
			}
			var control = oControl.oAttr.control;
			var hbar = $("<div/>")
					.insertAfter(control)
					.addClass(
							"ui-widget ui-widget-content ui-corner-all ui-scroll-h");
			hbar.leftArrow = $(
					"<div class='ui-scroll-arrow-w-div ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-w ui-scroll-arrow-icon'></span></div>")
					.appendTo(hbar);
			var buttonContaiment = $(
					"<div class='ui-scroll-button-container-h'>").appendTo(	hbar);
			var button = $(
					"<div class='ui-widget-header ui-corner-all ui-scroll-button-h'>")
					.appendTo(buttonContaiment);
			hbar.rightArrow = $(
					"<div class='ui-scroll-arrow-e-div ui-scroll-arrow-e ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-e ui-scroll-arrow-icon'></span></div>")
					.appendTo(hbar);
			button.mouseenter(function() {
				button.addClass("ui-state-focus");
			});
			button.mouseout(function() {
				button.removeClass("ui-state-focus");
			});
			
			hbar.rightArrow.click(function(){
				button.positionLeft+=oSetting.scrollStep* button.rate / 1000;
				scroll(button, control);
			});
			hbar.leftArrow.click(function(){
				button.positionLeft+=-oSetting.scrollStep* button.rate / 1000;
				scroll(button, control);
			});
			function scroll(button, control) {
				if(button.positionLeft <= 0 ){
					button.positionLeft=0;
				}
				if(button.positionLeft >= button.maxOfssetX ){
					button.positionLeft=button.maxOfssetX;
				}
				button.css("left",button.positionLeft);
				var left=button.positionLeft;
				control
						.css(
								"left",
								-(left >= button.maxOfssetX ? button.maxScrollLeft
										: left * 1000 / button.rate));
				if (left == 0) {
					button.positionRate = 0;
				} else if (left >= button.maxOfssetX) {
					button.positionRate = 1;
				} else {
					button.positionRate = left / button.maxScrollLeft;
				}
			}
			button.draggable( {
				axis : "x",
				containment : "parent",
				drag : function(event, ui) {
					button.positionLeft = ui.position.left;
					scroll(button, control);
				}
			});

		
			hbar.button = button;
			hbar.buttonContaiment = buttonContaiment;
			hbar.button.toWidth = toWidth;
			hbar.button.positionRate = 0;
			hbar.button.positionLeft = 0;
			scrollBar.hbar = hbar;

			if (layout) {
				layout._couputerLayoutData(oControl);
				hbar.button.toWidth = layout.oAttr.allWidth;
			}
			coputerHScrollbarLoaction(oControl, false);
		}
		function coputerHScrollbarLoaction(oControl,forVbar) {
			var hbar = oControl.oAttr.scrollBar.hbar;
			var control = oControl.oAttr.control;
			if (hbar) {
				var clientArea = oControl._getClientArea();
				with (hbar) {
					css("left", 1 + clientArea.x);
					css("width", clientArea.width - 1 * 2 - 1 * 2);
					buttonContaiment.css("left", 1 * 2 + leftArrow.width() + 1
							* 2 + clientArea.x);
					button.scrollWidth = clientArea.width
							- (1 + 1 + 1 + 1 * 2 + 1 + leftArrow.width()) * 2;
					buttonContaiment.width(button.scrollWidth);
					button.height(buttonContaiment.height() - 4);
					button.rate = (clientArea.width * 1000) / button.toWidth;
					button.width((button.scrollWidth * button.rate) / 1000);
					button.maxOfssetX = button.scrollWidth - 2 - button.width();
					button.maxScrollLeft = button.toWidth- (clientArea.width - 2);
					
					var left = button.positionRate == 1 ? button.maxOfssetX
							: button.positionRate * button.maxScrollLeft;
					button.css("left", left);
					control.css("left",
							-(left == button.maxOfssetX ? button.maxScrollLeft
									: left * 1000 / button.rate));

				}
				if (!forVbar) {
					 coputerVScrollbarLoaction(oControl,true);
				}
			}

		}

		var oSetting = $.extend( {}, Scrollable.oDefaults.oSettings, oSetting,
				control.oInit.scroll);
		var scroll = control.oAttr.scrollBar;
		var scrollDom = control.oAttr.control;
		// 只有在第一次运行时初始化原始高度和宽度
		if (scroll.originWidth == -1) {
			scroll.originWidth = scrollDom.width();
		}
		if (scroll.originHeight == -1) {
			scroll.originHeight = scrollDom.height();
		}
		if (oSetting.toHeight > scroll.originHeight) {
			if (oSetting.scrollY) {
				creatVScrollbar(control, oSetting);
			}else{
				if(control.oAttr.dom.outerHeight()<oSetting.toHeight){
				    control.oAttr.dom.css("height",oSetting.toHeight);
				    control.oInit.layout.layoutData._outerHeight=control.oAttr.dom.outerHeight();
				    control.oInit.layout.layoutData._orignHeight= control.oInit.layout.layoutData._height;
				    control.oInit.layout.layoutData._height=control.oAttr.dom.height();
				}
			}
		}
		if (oSetting.toWidth > scroll.originWidth) {
			if (oSetting.scrollX) {
				creatHScrollbar(control, oSetting);
			}else{
				if(control.oAttr.dom.outerWidth()<oSetting.toWidth){
				   control.oAttr.control.css("width",oSetting.toWidth);
				   control.oInit.layout.layoutData._outerWidth= control.oAttr.dom.outerWidth();
				   control.oInit.layout.layoutData._orignWidth=control.oInit.layout.layoutData._width;
				   control.oInit.layout.layoutData._width= control.oAttr.dom.width();
				}
			}
		}

	};

	Scrollable.oDefaults = {
		barHeight : 28 + 2 + 1,
		barWidth : 28 + 2 + 1,
		
		oSettings : {
		    scrollStep:300,
			scrollX : false,
			scrollY : false,
			toHeight : -1,
			toWidth : -1
		}
	};
	$.Scrollable = Scrollable;
})(jQuery);