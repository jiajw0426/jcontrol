(function($){
	var ButtonText=function(button){
		button.addControl( {
			type : "blank",
			layout:{
            "layoutData":{
			       "grabExcessVSpace":true
			       
              }
	         }
		 });
		button.addControl( {
			"id" : "label1",
			value : "button4",
			type : "label",
			layout:{
            "layoutData":{
			       "vAlignment":"center",
			       "grabExcessHSpace":true
              }
	         }
		 });

	};
	
	if ( typeof $.fn.Button == "function"){
		$.fn.Button.aFeatures.push({
			"cFeature": "L",
			"sFeature": "label",
			"fnCreate":function(button){				
				      return new ButtonText(button);
			          }
				  
			}
		);
	}
	
})(jQuery);