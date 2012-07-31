(function($) {
	var inherit = function(parent,oInit) {		
		
		function __doimp(parent, oInit) {
			var oExts=[];
			if(parent &&parent.getSubclassMeta){
				oExts=parent.getSubclassMeta();
			}
			if (oInit && oInit.type) {
				for ( var index in oExts) {
					var ext = oExts[index];
					if (oInit.type.toLowerCase() == ext.type) {
						return _doimp(ext, parent, oInit);
					}
				}
			}
			return parent;
		}
		
		function getSubclassMeta(){
			return [];
		}
		function _doimp(ext,parent,oInit) {
			var imp=ext.fnImp.call(parent,oInit);
			var oAttr=$.extend({},parent.oAttr,imp.oAttr);
			imp.oAttr=oAttr;
			return $.extend(imp,parent.oApi,imp.oApi);;
			
		}
	    
		return __doimp(parent,oInit);
		
	};
	

	$.inherit = inherit;

})(jQuery);
