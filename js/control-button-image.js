(function($){
	var ButtonImage=function(button){
		button.oAttr.layout.oInit.numColumns=4;
		button.addControl( {
			type : "blank",
			color:"red",
			layout:{
            "layoutData":{
			       "grabExcessVSpace":true
			       
              }
	         }
		 });
		button.addControl( {
			"id" : "label1",
			value : "button4",
			type : "image",
			layout:{
            "layoutData":{
			       "vAlignment":"center"
              }
	         }
		 });

	};
	
	if ( typeof $.fn.Button == "function"){
		$.fn.Button.aFeatures.push({
			"cFeature": "I",
			"sFeature": "Image",
			"fnCreate":function(button){				
				      return new ButtonImage(button);
			          }
				  
			}
		);
	}
	
})(jQuery);