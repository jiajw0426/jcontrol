Util={		
		loop:function(array,callback){
			for ( var i = 0; i < array.length; i++) {
				var child=array[i];
				callback(child,i);
			}
		}
}