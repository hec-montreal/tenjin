
opensyllabusApp.controller('ContentPanelCtrl', function ($scope){
    'use strict';

    $scope.syllabus.syllabusStructures[$scope.infos.currentItemId];
    $scope.items = [$scope.syllabus.syllabusStructures[$scope.infos.currentItemId]];

    $scope.tab = [42, 43, 45];
});



