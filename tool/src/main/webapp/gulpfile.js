'use strict';

var gulp         = require('gulp'),
    // connect    = require('gulp-connect'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    config       = require('./config.json'),
    sourcemaps   = require('gulp-sourcemaps');

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

// Views task
gulp.task('views', function() {
  return gulp.src('./source/views/**/*.html')
  .pipe(gulp.dest('./dest/views'));
});
 
//Js task
gulp.task('js', function() {
    return gulp.src(['./source/js/**/*.js'])
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
  return sass('./source/scss/opensyllabus.scss', { sourcemap: true })
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
  gulp.watch(['./source/js/**/*.js'], ['js']);
  gulp.watch(['./source/scss/**/*.scss'], ['sass']);
  gulp.watch(['./source/index.jsp'], ['jsp']);
  gulp.watch(['./source/views/**/*.html'], ['views']);
  gulp.watch(['./source/tools/*'], ['tools']);
  gulp.watch(['./source/WEB-INF/*'], ['web-inf']);
  gulp.watch(['./dest/**/*'], ['copy']);
});



gulp.task('deploy',['lib', 'js', 'views', 'web-inf', 'sass', 'tools','jsp', 'copy'] , function(){
	gutil.log('Source déployée sur tomcat!');
});




gulp.task('deploy-maven',['lib', 'js', 'views', 'web-inf', 'sass', 'tools','jsp'] , function(){
	  gutil.log('Source déployée sur tomcat avec maven!');
});


 
// gulp.task('connect', function() {
//   connect.server({
//     root: '.',
//     port: 8888,
//     livereload: true
//   });
// });
 
// Start the tasks
gulp.task('default');
//gulp.task('default', ['connect', 'watch']);
