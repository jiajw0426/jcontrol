/**
 * @summary     Button
 * @description Button
 * @version     1.0.0
 * @file        Button.js
 * @author      jia.jw
 *
 */

(function($,document) {
	var Image=function(oInit){
		
		function _create(oInit){
			var oAttr = this.oAttr;
			oAttr.dom= $("<div  class='ui-icon ui-button-image'></div>");
			oAttr.client=oAttr.dom;
			oAttr.control=oAttr.dom;
			if(oInit.style){
				oAttr.dom.addClass(oInit.style);
			}
			if(oInit.image){
				oAttr.control=$("<image srx='"+oInit.image+"'/>").appendTo(oAttr.dom);
			}
	    	if(oInit.container){
	    		oInit.container._appendControl(this);
	    	}else{
	    		$("body").append(oAttr.dom);
	    	}
	    	if(this.oInit.events){
				for(var event in this.oInit.events){
				     this.oAttr.control.bind(event,this.oInit.events[event]);
				}
			}
		}
		
		this.oApi={
			"_create":_create
		};
		this.oAttr={
				"isContainer" : false	
		};
		this.getFeatures=function(){
			return Image.aFeatures;
		};
		this.oInit=$.extend({},Image.defaults.oSetting,oInit);
		
		
	};
	Image.aFeatures=[];
	Image.defaults={
			
	};
	Image.defaults.oSetting={
			id : ""+new Date().getTime(),
			style:"ui-icon-folder-open",
			image:""
	};
	if ( typeof $.fn.Control == "function"){
		$.fn.Control.aExts.push({
				"type":"image",
				"fnImp":function(oInit){				
				      return new Image(oInit);
			          }
				  
			}
		);
	}
	$.fn.Image=Image;
})(jQuery,document);
