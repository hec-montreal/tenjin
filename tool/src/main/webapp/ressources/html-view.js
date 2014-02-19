$(document).ready(function() { 
  //bind click handler for each menu link
  $('a.menu-link').each(function() {
	$(this).bind (
		"click",
		function(){
			$('div.content').hide();
			$($(this).attr("data-target")).fadeIn('slow');
		})
  });
});
