(function($,window) {
	var Attach=function(control,data, afterCreate){
		
		 var oInit=$.extend({},Attach.oDefault.settings,data);
		 if($.Attach.exist(control,oInit.name)){
			 return control.oAttr.attach[oInit.name];
		 }
		function _show(){
			var dom=this.oAttr.host.oAttr.dom;
			var width = dom.outerWidth();
			var height = dom.outerHeight();
			var top=dom.offset().top;
			var left=dom.offset().left;
			var oInit=this.oInit.attach;
			
			if(oInit["position"].toLowerCase()=="s"){
				top+=oInit["offsetY"]+height+oInit["chink"];
				var dom=this.oAttr.dom;
				left+=(width-dom.outerWidth())/2
			}
			if(oInit["position"].toLowerCase()=="e"){
				left+=oInit["offsetX"]+width+oInit["chink"];
				
			}
		    
			this.oAttr.dom.css({"top":top,"left":left,"display":""});
		}
        function _hide(){
            var dom=this.oAttr.dom;
			dom.css("display","none");
		}
		
		
       	var panel = $.Control( {
			"type" : "panel",
			"scrolled" : false,
			"width" : oInit.width,
			"height" : oInit.height,
			"layout" : {
				"type" : "gridlayout",
				"numColumns" : 1
		    }
		});
       	panel.oAttr.dom.css({
       		   "display":"none",
		       "position":"absolute"
		});
		if(!control.oAttr.attach){
			control.oAttr.attach={};
		}
		control.oAttr.attach[oInit.name]=panel;
		panel.oInit.attach=oInit;
		panel.oAttr.host=control;
		panel.oAttr.dom.appendTo(document.body);
		
		panel._show=_show;
		panel._hide=_hide;
		panel._hide();
		if( typeof afterCreate == "function"){
			afterCreate(panel);
		}
		return panel;
	};
	Attach.exist=function(host,name){
			if(!host.oAttr.attach||!host.oAttr.attach[name]){
				return false;
			}
			return true;
		}
	Attach.oDefault={
			settings:{
		       "name" :""+new Date().getTime(),
	           "position":"s",
	           "chink":1,
	           "offsetX":2,
	           "offsetY" :2,
	           "width" :10,
	           "height" :50,
	           "align": "center",
	           "display":"none"
			}
			
	}
	$.Attach=Attach;
})(jQuery);