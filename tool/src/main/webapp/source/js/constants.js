tenjinApp.constant('config', {
	defaultHyperlinkProtocol: "http",

	datepickerOptions: {
		showWeeks: false
	},

	// Loaded from the backend
	types: {},

	// Loaded from the backend
	documentTypes: [],

	// Loaded from the backend
	citationTypes: [],

	// Loaded from the backend
	contactInfoTitles: [],

	extensionsImage: ['jpg', 'jpeg', 'jfif', 'bmp', 'gif', 'png'],

	statusLabel: {
		1: "PUBLISHED_SYLLABUS",
		2: "DRAFTED_SYLLABUS",
		3: "NOTATTRIBUTED_SYLLABUS"
	}
});

tenjinApp.constant("Modernizr", Modernizr);
