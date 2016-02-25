'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  gulp.src('./public/scss/main.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('./public/styles'))
});

gulp.task('stream', ['sass'], function() {
  gulp.watch('./public/scss/*.scss', ['sass']);
})