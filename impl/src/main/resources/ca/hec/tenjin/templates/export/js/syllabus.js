(function () {
	var $selectedElement = null;

	$(document).ready(function () {
		$(".navigation-element .click").click(function () {
			selectElement(this);
		});

		$selectedElement = $($(".root > .element > .element-root:first-child")[0]);

		updateElements();
	});

	var updateElements = function () {
		$(".element-root").hide();

		$selectedElement.find(".element-root").show();
		$selectedElement.show();

		$(".navigation-element").removeClass("selected");
		$(".navigation-element[data-id='" + $selectedElement.attr("data-id") + "']").addClass("selected");
	};

	var selectElement = function (el) {
		var $el = $(el).parents(".navigation-element");

		$selectedElement = $(".element-root[data-id='" + $el.attr("data-id") + "']");

		updateElements();
	};
})();
