'use strict';

var gulp         = require('gulp'),
    connect      = require('gulp-connect'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    config       = require('./config.json'),
    sourcemaps   = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache');



// Img task
gulp.task('img', function() {
  return gulp.src('./source/img/**/*')
  .pipe(gulp.dest( './dest/img'));
});

// Lib task
gulp.task('lib', function() {
  return gulp.src('./source/lib/**/*')
  .pipe(gulp.dest( './dest/lib'));
});

// Jsp task
gulp.task('jsp', function() {
  return gulp.src('./source/index.jsp')
  .pipe(gulp.dest( './dest'));
});

// Template cache task
gulp.task('viewscache', function () {
  return gulp.src('./source/components/**/*.html')
    // .pipe(templateCache())
    .pipe(templateCache({ module: 'templateModule', standalone: true }))
    .pipe(gulp.dest('./source/js'));
});

// Views task
gulp.task('views', function() {
  return gulp.src('./source/components/**/*.html')
  .pipe(gulp.dest('./dest/views'));
});
 
//Js task
gulp.task('js', ['viewscache'], function() {
    return gulp.src([ './source/js/**/*.js', './source/components/**/*.js'])
    .pipe(concat('opensyllabus.js'))
    .pipe(gulp.dest('./dest/js'));
});

//web-inf task
gulp.task('web-inf', function() {
    return gulp.src(['./source/WEB-INF/*'])
    .pipe(gulp.dest('./dest/WEB-INF'));
});

//tool task
gulp.task('tools', function() {
    return gulp.src(['./source/tools/*'])
    .pipe(gulp.dest('./dest/tools'));
});

// gulp.task('sass', function () {
//   return sass('./source/scss/*.scss')
//     .on('error', sass.logError)
//     .pipe(gulp.dest('css'));
//     // .pipe(connect.reload());
// });

gulp.task('sass', function () {
  return sass('./source/components/opensyllabus/opensyllabus.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( './dest/css'));
});

gulp.task('copy', function () {
	  return gulp.src(['./dest/**/*'])
		 .pipe(gulp.dest(config.tomcat));
});

// Watch our changes
gulp.task('watch', function(){
  //html
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['./source/img/**/*'], ['img']);
  gulp.watch(['./source/js/**/*.js', './source/components/**/*.js'], ['js']);
  gulp.watch(['./source/**/*.scss'], ['sass']);
  gulp.watch(['./source/index.jsp'], ['jsp']);
  gulp.watch(['./source/**/*.html'], ['js']); // on met les views dans un fichier js puis on lance js pour concatener le tout
  gulp.watch(['./source/tools/*'], ['tools']);
  gulp.watch(['./source/WEB-INF/*'], ['web-inf']);
  gulp.watch(['./dest/**/*'], ['copy']);
});



gulp.task('deploy',['lib', 'img', 'js', 'web-inf', 'sass', 'tools','jsp', 'copy'] , function(){
	gutil.log('Source déployée sur tomcat!');
});




gulp.task('deploy-maven',['lib', 'img', 'js', 'web-inf', 'sass', 'tools','jsp'] , function(){
	  gutil.log('Source déployée sur tomcat avec maven!');
});


gulp.task('connect', function() {
  connect.server({
    root: ["."],
    port: 8888,
    livereload: true
  });
});
 
// Start the tasks
// gulp.task('default');
gulp.task('default', ['connect', 'watch']);
