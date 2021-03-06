<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html> 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes" />

		<title>Tenjin</title>

		<link rel="stylesheet" href="/tenjin-tool/lib/css/bootstrap.css"/>
		<link rel="stylesheet" href="/tenjin-tool/lib/css/angular-ui-tree.min.css">
		<link rel="stylesheet" href="/tenjin-tool/lib/css/angular-ui-tree.custom.css">
		<link rel="stylesheet" href="/tenjin-tool/lib/css/ngDialog.css"/>
		<link rel="stylesheet" href="/tenjin-tool/lib/css/ngDialog-theme-default.css"/>

		<link rel="stylesheet" href="/tenjin-tool/css/tenjin.css"/>
		
		<!-- include sakai scripts (for resizing frame, etc). includes ckeditor -->
		<%= request.getAttribute("sakai.html.head.js") %>

		<script src="/tenjin-tool/lib/tenjinlib.js"></script> 

		<script src="/tenjin-tool/js/tenjin.js"></script>

		<!-- Hide url bar on mobile -->
		<script>
			window.addEventListener("load",function() {
				setTimeout(function(){
					window.scrollTo(0, 1);
				}, 0);
			});
		</script>
	</head>

	<body id="body" class="portletBody">
		<!-- Tenjin app -->
		<div id="tenjin" ng-app="tenjin" class="portletBody">
			<tenjin></tenjin>
		</div>
	</body>
</html>
