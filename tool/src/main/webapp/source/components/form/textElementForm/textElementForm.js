tenjinApp.directive('textElementForm', function() {
	'use strict';

	return {
		scope: {
			element: '=textElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/textElementForm/textElementForm.html',

		controller: function($scope) {
			// Setup editor options
			var removeButtonsList = 'Maximize,Anchor,Source,PageBreak,Blockquote,NumberedList,BulletedList,Image,Table,SpecialChar,Outdent,Indent,RemoveFormat,Link,Unlink,JustifyBlock,Strike';

			$scope.editorOptions = {
				language: 'fr',
				height: '200',
				removeButtons: removeButtonsList,
				removePlugins: 'elementspath,resize'
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!this.description || this.description.length <= 0) {
					ret.push({
						field: "description",
						message: "ERROR_CONTENT_MANDATORY"
					});
				}

				return ret;
			}
		}
	};
});
