tenjinApp.directive('clusterElementForm', ['config', 'SyllabusService', function(config, SyllabusService) {
	'use strict';

	return {
		scope: {
			element: '=clusterElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/clusterElementForm/clusterElementForm.html',

		controller: function($scope) {
			// setup editor options
			$scope.editorOptions = {
				language: 'fr',
				height: '120',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			var templateType = SyllabusService.template[$scope.element.templateStructureId];

			if (!$scope.element.title || $scope.element.title.length === 0) {
				$scope.element.title = templateType.label
			}
		}
	};
}]);
