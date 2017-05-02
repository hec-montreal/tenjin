tenjinApp.service('EditorService', ['UserService', function(UserService) {
	this.createEditorOptions = function() {
		var lang = UserService.getProfile().locale;

		if (!lang || lang.length === 0) {
			lang = 'fr';
		} else {
			lang = lang.substring(0, lang.indexOf('_'));
		}

		return {
			language: lang,
			height: '120',
			toolbar: [{
					name: 'basicstyles',
					items: ['Bold', 'Italic', 'Strike', 'Underline']
				}, {
					name: 'paragraph',
					items: ['BulletedList', 'NumberedList', 'Blockquote']
				}, {
					name: 'editing',
					items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
				}, {
					name: 'links',
					items: ['Link', 'Unlink', 'Anchor']
				},
				'/', {
					name: 'styles',
					items: ['PasteText', 'PasteFromWord', 'RemoveFormat']
				}, {
					name: 'forms',
					items: ['Outdent', 'Indent']
				}, {
					name: 'insert',
					items: ['Table']
				}
			],
			removePlugins: 'elementspath,resize'
		};
	};
}]);
