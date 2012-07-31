/**
 * @summary     Button
 * @description Button
 * @version     1.0.0
 * @file        Button.js
 * @author      jia.jw
 *
 */

(function($,document) {
	var Line=function(oInit){
		
		function _create(oInit){
			var oAttr = this.oAttr;
			oAttr.dom=$("<div></div>");
			oAttr.control=oAttr.dom;
			oAttr.client=oAttr.dom;
	    	if(oInit.container){
	    		oInit.container._appendControl(this);
	    	}else{
	    		$("body").append(oAttr.dom);
	    	}
	    	oAttr.dom.css({
	    		"width":"1px",
	    		"height":"1px",
	    		"background-color":oInit.color
	    		
	    	});
	    	
		}
		
		this.oApi={
			"_create":_create
		};
		this.oAttr={
				"isContainer" : false	
		};
		this.getFeatures=function(){
			return Line.aFeatures;
		};
		this.oInit=$.extend({},Line.defaults.oSetting,oInit);
		
		
	};
	Line.aFeatures=[];
	Line.defaults={
			
	};
	Line.defaults.oSetting={
			id : ""+new Date().getTime(),
			label:"label",
			"color":""
			
	};
	if ( typeof $.fn.Control == "function"){
		$.fn.Control.aExts.push({
				"type":"blank",
				"fnImp":function(oInit){				
				      return new Line(oInit);
			          }
				  
			}
		);
	}
	$.fn.Line=Line;
})(jQuery,document);
