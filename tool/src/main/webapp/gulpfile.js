'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	templateCache = require('gulp-angular-templatecache'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	md5 = require('gulp-md5-assets'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate');

// Images
gulp.task('images', function() {
	return gulp.src('./source/img/**/*')
		.pipe(gulp.dest('./dest/img'));
});

// Style
gulp.task('style', ['style:lib', 'style:fonts', 'style:sass']);

gulp.task('style:lib', function() {
	return gulp.src([
			'./source/lib/bootstrap/css/bootstrap.css',
			'./source/lib/angular-ui-tree/angular-ui-tree.min.css',
			'./source/lib/angular-ui-tree/angular-ui-tree.custom.css',
			'./source/lib/xeditable/xeditable.custom.css',
			'./node_modules/ng-dialog/css/ngDialog.css',
			'./node_modules/ng-dialog/css/ngDialog-theme-default.css'
		])
		.pipe(gulp.dest('./dest/lib/css'));
});

gulp.task('style:fonts', function() {
	return gulp.src([
			'./source/lib/bootstrap/fonts/*',
			'./source/style/fonts/*'
		])
		.pipe(gulp.dest('./dest/lib/fonts'));
});

gulp.task('style:sass', function() {
	return gulp.src('./source/style/tenjin.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dest/css'));
});

// JS
gulp.task('js', ['js:lib', 'js:locale', 'js:app']);

gulp.task('js:lib', function() {
	return gulp.src([
			'./node_modules/angular/angular.js',
			'./node_modules/angular-dynamic-locale/tmhDynamicLocale.min.js',
			'./node_modules/angular-promise-extras/angular-promise-extras.js',
			'./node_modules/angular-resource/angular-resource.min.js',
			'./node_modules/angular-sanitize/angular-sanitize.min.js',
			'./node_modules/angular-animate/angular-animate.min.js',
			'./node_modules/angular-ui-tree/dist/angular-ui-tree.js',
			'./node_modules/checklist-model/checklist-model.js',
			'./node_modules/angular-translate/dist/angular-translate.min.js',
			'./node_modules/angular-translate-loader-url/angular-translate-loader-url.min.js',
			'./node_modules/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
			'./node_modules/angular-ui-router/release/angular-ui-router.min.js',
			'./node_modules/es6-shim/es6-shim.js',
			'./node_modules/ng-dialog/js/ngDialog.min.js',
			'./node_modules/js-base64/base64.js',
			'./source/lib/angular-ui/ui-bootstrap-custom-tpls-1.1.0.js',
			'./source/lib/xeditable/xeditable.min.js',
			'./source/lib/ng-ckeditor-master/ng-ckeditor.js',
			'./source/lib/modernizr/modernizr-custom.js'
		])
		.pipe(concat('tenjinlib.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dest/lib'));
});

gulp.task('js:locale', function() {
	return gulp.src([
			'./node_modules/angular-i18n/angular-locale_fr-ca.js',
			'./node_modules/angular-i18n/angular-locale_en-us.js'
		]).pipe(rename(function(path) {
			path.basename = path.basename.replace('locale_fr-ca', 'locale_fr_CA-ca').replace('locale_en-us', 'locale_en_US-ca');
		}))
		.pipe(gulp.dest('./dest/lib/locale'));
});

gulp.task('js:app', ['js:htmltemplates'], function() {
	return gulp.src(['source/js/app.js', 'source/components/**/*.js', 'source/js/*.js', 'source/js/services/*.js', 'build/js/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('tenjin.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dest/js/'));
});

gulp.task('js:htmltemplates', function() {
	return gulp.src(['./source/components/**/*.html'])
		.pipe(templateCache({
			module: 'templateModule'
		}))
		.pipe(gulp.dest('./build/js'));
});

// Web
gulp.task('web', ['web:index', 'web:webinf', 'web:tools']);

gulp.task('web:index', function() {
	return gulp.src('./source/index.jsp')
		.pipe(gulp.dest('./dest'));
});

// WEB-INF
gulp.task('web:webinf', function() {
	return gulp.src(['./source/WEB-INF/*'])
		.pipe(gulp.dest('./dest/WEB-INF'));
});

// Tools
gulp.task('web:tools', function() {
	return gulp.src(['./source/tools/*'])
		.pipe(gulp.dest('./dest/tools'));
});

// Build
gulp.task('build', ['images', 'style', 'js', 'web', 'md5']);

gulp.task('md5', ['web', 'js', 'style'], function () {
	return gulp.src(['./dest/js/tenjin.js', './dest/lib/tenjinlib.js', './dest/css/tenjin.css'])
		.pipe(md5(10, './dest/index.jsp'));
});

// Deploy
gulp.task('deploy', ['build', 'deploy:tomcat']);

gulp.task('deploy:tomcat', function() {
	return gulp.src(['./dest/**/*'])
		.pipe(gulp.dest(process.env.CATALINA_HOME + '/webapps/tenjin-tool'));
});

// Watch
gulp.task('watch', function() {
	gulp.watch(['./source/img/**/*'], ['images']);

	gulp.watch(['./source/**/*.scss'], ['style:sass']);

	gulp.watch(['./source/**/*.js'], ['js:app']);
	gulp.watch(['./source/**/*.html'], ['js:app']);

	gulp.watch(['./source/index.jsp'], ['web:index']);
	gulp.watch(['./source/tools/*'], ['web:tools']);
	gulp.watch(['./source/WEB-INF/*'], ['web:webinf']);

	gulp.watch(['./dest/**/*'], ['deploy:tomcat']);
});
