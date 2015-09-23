opensyllabusApp.controller('addElementCtrl', function (){
    'use strict';

	this.types = ["Texte", "Document", "Hyperlien"];
	
	this.addElement = function(type) {
		alert(type);
	};
	
});
