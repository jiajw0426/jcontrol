(function($,window) {
	var Attach=function(control,data){
		var dom=control.oAttr.dom;
		
		var width = dom.outerWidth();
		var height = dom.outerHeight();
		var oInit=$.extend({},Attach.oDefault.settings,data);
		var top=dom.offset().top;
		var left=dom.offset().left;
		if(oInit["position"].toLowerCase()=="s"){
			top+=oInit["offsetY"]+height+oInit["chink"];
			
		}
		if(oInit["position"].toLowerCase()=="e"){
			left+=oInit["offsetX"]+width+oInit["chink"];	
		}
       	var panel = $.Control( {
			type : "panel",
			width : width,
			height : 108,
			value : "button1",
			"layout" : {
				type : "filllayout",
				"fill":"h"
		
		    }
		});
		if(!control.oAttr.attach){
			control.oAttr.attach={};
		}
		control.oAttr.attach[oInit.name]=panel;
		panel.oAttr.dom.appendTo(document.body);
		panel.oAttr.dom.css({
			       "position":"absolute",
			       "left":left,
			       "top" :top
			});
		return panel;
	}
	Attach.oDefault={
			settings:{
		       "name" :""+new Date().getTime(),
	           "position":"s",
	           "chink":1,
	           "offsetX":0,
	           "offsetY" :5,
	           "width" :100,
	           "height" :50,
	           "align": "center",
	           "display":"none"
			}
			
	}
	$.Attach=Attach;
})(jQuery);