'use strict';

var gulp         = require('gulp'),
    // connect    = require('gulp-connect'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    sourcemaps   = require('gulp-sourcemaps');

// Html task
gulp.task('html', function() {
  gulp.src('*.html');
  // .pipe(connect.reload());
});
 
//Js task
gulp.task('js', function() {
    return gulp.src(['./source/js/**/*.js'])
    .pipe(concat('opensyllabus.js'))
    .pipe(gulp.dest('./dest/js'));
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
    .pipe(gulp.dest('dest/css'));
});


// Watch our changes
gulp.task('watch', function(){
  //html
  // gulp.watch(['*.html'], ['html']);
  gulp.watch(['./source/js/**/*.js'], ['js']);
  gulp.watch(['./source/scss/**/*.scss'], ['sass']);

});

 
// gulp.task('connect', function() {
//   connect.server({
//     root: '.',
//     port: 8888,
//     livereload: true
//   });
// });
 
// Start the tasks
gulp.task('default', ['watch']);
//gulp.task('default', ['connect', 'watch']);
