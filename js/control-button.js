/**
 * @summary     Button
 * @description Button
 * @version     1.0.0
 * @file        Button.js
 * @author      jia.jw
 *
 */

(function($,document) {
	var Button=function(oInit){
		
		function _create(oInit){
			var oAttr = this.oAttr;
			oAttr.dom=$("<button/>").addClass("ui-button ui-widget ui-state-default ui-corner-all ui-button-button");
			oAttr.control=oAttr.dom;
			oAttr.client=oAttr.dom;
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
				"isContainer" : true	
		};
		this.getFeatures=function(){
			return Button.aFeatures;
		};
		this.oInit=$.extend(true,{},Button.defaults.oSetting,oInit);
		
		
	};
	Button.aFeatures=[];
	Button.defaults={
			
	};
	Button.defaults.oSetting={
			id : +new Date().getTime(),
			value:"button",
			"layout" : {
		    "type" : "gridlayout",
		    "numColumns":2
	     }
	};
	if ( typeof $.fn.Control == "function"){
		$.fn.Control.aExts.push({
				"type":"button",
				"fnImp":function(oInit){				
				      return new Button(oInit);
			          }
				  
			}
		);
	}
	$.fn.Button=Button;
})(jQuery,document);
