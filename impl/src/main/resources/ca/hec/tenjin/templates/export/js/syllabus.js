(function() {
	var $selectedElement = null;

	$(document).ready(function() {
		$(".navigation-element .click").click(function() {
			selectElement(this);
		});

		$selectedElement = $($(".root > .element:first-child")[0]);

		updateElements();
	});

	var updateElements = function() {
		// Hide all elements
		$(".element").hide();

		var $parents = $selectedElement.parents(".element");

		// Show all selected element parents
		$parents.find("*").hide();
		$parents.find(".element-host").show();
		$parents.find(".element-listing").show();
		$parents.show();

		$selectedElement.find("*").show();
		$selectedElement.find(".element-debug-info").hide();
		$selectedElement.show();

		$(".navigation-element").removeClass("selected");
		$(".navigation-element[data-id='" + $selectedElement.attr("data-id") + "']").addClass("selected");
	};

	var selectElement = function(el) {
		var $el = $(el).parents(".navigation-element");

		$selectedElement = $(".element[data-id='" + $el.attr("data-id") + "']");

		updateElements();
	};
})();
