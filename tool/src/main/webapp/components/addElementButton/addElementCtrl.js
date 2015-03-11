opensyllabusApp.controller('addElementCtrl', function (){
	this.types = ["Texte", "Document", "Hyperlien"];
	
	this.addElement = function(type) {
		alert(type);
	};
	
});
