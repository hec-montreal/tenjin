var leftMenuApp = angular.module('opensyllabus', []);

leftMenuApp.controller('LeftMenuCtrl', function ($scope){
	$scope.title = 'Finance';
	$scope.siteId = '2-200-96.A2015';
	$scope.section = 'A01';
	$scope.sections = [
	{title: 'Presentation du cours',
	 id:'26af5f9b-074c-459d-830c-144bd1ab47e6'},
	{title: 'Coordonnees',
     id:'28748a47-2cf8-4c2d-954b-5201af32a380'},
	{title: 'Materiel pedagogique',
     id:'d4b21b86-7fe0-44fa-9b69-0ee60095fa4e'},
	{title: 'Evaluations',
     id:'bf216a6c-5098-4b5e-91e9-b3012d36a04f',
     ssections: [
  		{
  			title: 'Travail',
  			id: 'c194e47f-3500-4e95-b581-ebc9d3522cc9'
  		}, {
  			title: 'Examen intra',
  			id: '2afea2d6-e3b5-483b-b6bd-ede11f5a9520'
  		}, {
  			title: 'Participation',
  			id: '12d63777-bec7-40ae-ade1-60d60d106194'
  		}, {
  			title: 'Quiz',
  			id: '3a305ac7-1694-467f-9a1d-21f10769ce4a'
  		}, {
  			title: 'Examen final',
  			id: '32f8f592-33c8-42ca-a19d-42d5e9b9ff8b'
  		}]},
	{title: 'Organisation du cours',
     id:'4d4f3160-ac13-41b7-9269-8ceae75cc83c',
     ssections: [
  		{title:'Seance 1',
  		 id:'22aaa9b5-7654-4fe4-988d-227a99375b33'}, 
  		{title: 'Seance 2',
  			id: '5e0adac7-7aff-44fb-8bd1-5eb8e0fb57ba'
  		}, {
  			title: 'Seance 3',
  			id: '38e3f7d6-3985-4067-a49e-71bceea6744d'
  		}, {
  			title: 'Seance 4',
  			id: 'f2b58532-07ae-4260-b2f3-e8e31b6eb0b4'
  		}, {
  			title: 'Seance 5',
  			id: '2874ead9-b38c-4f55-9a72-2ac82e08bd36'
  		}]}
	];
	
	$scope.display = function (section){};
});