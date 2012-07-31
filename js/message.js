var Message={
    error:function(message){
      alert(message);
      throw message;
    },
    assertNotNull:function(object,message){
    	if(object==null){
    		this.error(message);
    	}
    },
    assert:function(exp,message){
    	if(exp){
    		this.error(message);
    	}	
    }
}