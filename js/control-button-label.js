(function($){
	var ButtonLabel=function(button){
		button.addControl( {
			type : "line",
			layout:{
            "layoutData":{
			       "grabExcessVSpace":true
			       
              }
	         }
		 });
		button.addControl( {
			"id" : "label1",
			label : button.oInit.label,
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
				      return new ButtonLabel(button);
			          }
				  
			}
		);
	}
	
})(jQuery);