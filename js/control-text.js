/**
 * @summary     Button
 * @description Button
 * @version     1.0.0
 * @file        Button.js
 * @author      jia.jw
 *
 */

(function($,document) {
	var Text=function(oInit){
		
		function _create(oInit){
			var oAttr = this.oAttr;
			oAttr.dom=$("<span>"+oInit.label+"</span>");
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
				"isContainer" : false	
		};
		this.getFeatures=function(){
			return Label.aFeatures;
		};
		this.oInit=$.extend({},Text.defaults.oSetting,oInit);
		
		
	};
	Text.aFeatures=[];
	Text.defaults={
			
	};
	Text.defaults.oSetting={
			id : +new Date().getTime(),
			label:"label"
	};
	if ( typeof $.fn.Control == "function"){
		$.fn.Control.aExts.push({
				"type":"label",
				"fnImp":function(oInit){				
				      return new Text(oInit);
			          }
				  
			}
		);
	}
	$.fn.Text=Text;
})(jQuery,document);
