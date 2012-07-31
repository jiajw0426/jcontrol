var usedCells = [];
var startRow = 0;
var startColumns = 0;
var columns = 3;
function a(vSpan,value){
	if(vSpan==3){
		alert(value);
	}
}
function findCell(i,j,hSpan,vSpan){
	var find=true;
	var findCells=[];
	var str = usedCells.join("-");
	for(var c=0;c<hSpan;c++){
		for(var r=0; r<vSpan;r++){
			if(str.indexOf((i+c)+","+(j+r))!=-1){
				find=false;
				break;
			}
			findCells.push((i+c)+","+(j+r));
		}
		if(!find){
			break;
		}
		
	}
	if(find){
		
		usedCells=usedCells.concat(findCells);
	}
	return find;
}
function addnewCell(hSpan, vSpan) {
	while (true) {
		var str = usedCells.join("-");
		alert(str)
		var cells = [];
		var newrow = false;
		var find = false;
		for(var i=0;i<=columns-hSpan;i++){
				if(str.indexOf(i+","+startRow)==-1){
					find=findCell(i,startRow,hSpan,vSpan);
					if(find){
						break;
					}
				}
			}
		if(!find){
			startRow+=1;
		}
		if (find) {
			break;
		}
	}

}
var controls = [ {
	hSpan : 1,
	vSpan : 1

}, {
	hSpan : 2,
	vSpan : 1

}, {
	hSpan : 2,
	vSpan : 1

}, {
	hSpan : 1,
	vSpan : 3

}, {
	hSpan : 2,
	vSpan : 1

}, {
	hSpan : 1,
	vSpan : 1

}, {
	hSpan : 2,
	vSpan : 2

}, {
	hSpan : 3,
	vSpan : 5

}];
for ( var index in controls) {
	var control = controls[index];
	addnewCell(control.hSpan, control.vSpan);
}
