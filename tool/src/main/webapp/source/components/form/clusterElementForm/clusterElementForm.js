tenjinApp.directive('clusterElementForm', ['SyllabusService', 'EditorService', function(SyllabusService, EditorService) {
	'use strict';

	return {
		scope: {
			element: '=clusterElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/clusterElementForm/clusterElementForm.html',

		controller: function($scope) {
			// setup editor options
			$scope.editorOptions = EditorService.createEditorOptions();

			var templateType = SyllabusService.template[$scope.element.templateStructureId];

			if (!$scope.element.title || $scope.element.title.length === 0) {
				$scope.element.title = templateType.label
			}
		}
	};
}]);
