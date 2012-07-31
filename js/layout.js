
(function($) {
	if($.Layout)return;
	var Layout = function(oInit) {

		function __create() {
		}
		function _create(oInit) {
		}
		this.getSubclassMeta = function() {
			return Layout.aExts;
		};
		
		this.oApi = {
			"__create" : __create,
			"_create" : __create
		};
		this.oAttr = {

		};
		var oimp = $.inherit(this, oInit);
		if(oimp.__create){
		 oimp.__create();
		}
		return oimp?oimp:this;

	};
	Layout.aExts = [];

	$.fn.Layout = Layout;
	$.Layout = Layout;

})(jQuery);
