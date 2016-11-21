"use strict";

var gulp = require("gulp"),
	concat = require("gulp-concat"),
	templateCache = require("gulp-angular-templatecache"),
	sass = require("gulp-sass"),
	gutil = require("gulp-util");

// Images
gulp.task("images", function() {
	return gulp.src("./source/img/**/*")
		.pipe(gulp.dest("./dest/img"));
});

// Css
gulp.task("css", ["css:lib", "css:fonts", "css:sass"]);

gulp.task("css:lib", function() {
	return gulp.src([
			"./source/lib/bootstrap/css/bootstrap.css",
			"./source/lib/angular-ui-tree/angular-ui-tree.min.css",
			"./node_modules/ng-dialog/css/ngDialog.css",
			"./node_modules/ng-dialog/css/ngDialog-theme-default.css"
		])
		.pipe(gulp.dest("./dest/lib/css"));
});

gulp.task("css:fonts", function() {
	return gulp.src([
			"./source/lib/bootstrap/fonts/*"
		])
		.pipe(gulp.dest("./dest/lib/fonts"));
});

gulp.task("css:sass", function() {
	return gulp.src("./source/scss/tenjin.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./dest/css"));
});

// JS
gulp.task("js", ["js:lib", "js:locale", "js:app"]);

gulp.task("js:lib", function() {
	return gulp.src([
			"./node_modules/angular/angular.js",
			"./node_modules/angular-dynamic-locale/tmhDynamicLocale.min.js",
			"./node_modules/angular-promise-extras/angular-promise-extras.js",
			"./node_modules/angular-resource/angular-resource.min.js",
			"./node_modules/angular-sanitize/angular-sanitize.min.js",
			"./node_modules/angular-animate/angular-animate.min.js",
			"./node_modules/angular-ui-tree/dist/angular-ui-tree.js",
			"./node_modules/checklist-model/checklist-model.js",
			"./node_modules/angular-translate/dist/angular-translate.min.js",
			"./node_modules/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js",
			"./node_modules/angular-ui-router/release/angular-ui-router.min.js",
			"./source/lib/angular-ui/ui-bootstrap-custom-tpls-1.1.0.js",
			"./source/lib/xeditable/xeditable.min.js",
			"./source/lib/ng-ckeditor-master/ng-ckeditor.js",
			"./source/lib/modernizr/modernizr-custom.js",
			"./node_modules/es6-shim/es6-shim.js",
			"./node_modules/angular-i18n/angular-locale_fr-ca.js",
			"./node_modules/ng-dialog/js/ngDialog.min.js"
		])
		.pipe(concat("tenjinlib.js"))
		.pipe(gulp.dest("./dest/lib"));
});

gulp.task("js:locale", function() {
	return gulp.src([
			"./node_modules/angular-i18n/angular-locale_fr-ca.js",
			"./node_modules/angular-i18n/angular-locale_en-ca.js"
		])
		.pipe(gulp.dest("./dest/lib/locale"));
});

gulp.task("js:app", ["js:htmltemplates"], function() {
	return gulp.src(["source/js/app.js", "source/components/**/*.js", "source/js/*.js", "source/js/services/*.js", "build/js/*.js"])
		.pipe(concat("tenjin.js"))
		.pipe(gulp.dest("./dest/js/"));
});

gulp.task("js:htmltemplates", function() {
	return gulp.src(["./source/components/**/*.html"])
		.pipe(templateCache({
			module: "templateModule"
		}))
		.pipe(gulp.dest("./build/js"));
});

// Web
gulp.task("web", ["web:index", "web:webinf", "web:tools"]);

gulp.task("web:index", function() {
	return gulp.src("./source/index.jsp")
		.pipe(gulp.dest("./dest"));
});

// WEB-INF
gulp.task("web:webinf", function() {
	return gulp.src(["./source/WEB-INF/*"])
		.pipe(gulp.dest("./dest/WEB-INF"));
});

// Tools
gulp.task("web:tools", function() {
	return gulp.src(["./source/tools/*"])
		.pipe(gulp.dest("./dest/tools"));
});

// Build
gulp.task("build", ["images", "css", "js", "web"]);

// Deploy
gulp.task("deploy", ["build", "deploy:tomcat"]);

gulp.task("deploy:tomcat", function () {
	return gulp.src(["./dest/**/*"])
			.pipe(gulp.dest(process.env.CATALINA_HOME+"/webapps/tenjin-tool"));
});

// Watch
gulp.task("watch", function() {
	gulp.watch(["./source/img/**/*"], ["images"]);

	gulp.watch(["./source/**/*.scss"], ["css:sass"]);

	gulp.watch(["./source/**/*.js"], ["js:app"]);
	gulp.watch(["./source/**/*.html"], ["js:app"]);

	gulp.watch(["./source/index.jsp"], ["web:index"]);
	gulp.watch(["./source/tools/*"], ["web:tools"]);
	gulp.watch(["./source/WEB-INF/*"], ["web:webinf"]);

	gulp.watch(["./dest/**/*"], ["deploy:tomcat"]);
});
