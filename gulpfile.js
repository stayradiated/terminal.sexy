var log = require('log_');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var sequence = require('run-sequence');
var autoprefix = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');

gulp.task('default', function (cb) {
  return sequence(['sass', 'libs', 'scripts'], 'minify', cb);
});

gulp.task('watch', function () {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
  gulp.watch('scripts/**/*.js', ['scripts']);
});

gulp.task('connect', ['watch'], function () {
  connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});

gulp.task('sass', function () {
  return gulp.src('stylesheets/main.scss')
    .pipe(sass({ outputStyle: 'compressed', errLogToConsole: true }))
    .pipe(autoprefix())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src('scripts/app.js')
    .pipe(browserify({ standalone: 'App' }))
    .on('error', log('browserify', 'blue'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('libs', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/backbone.marionette/lib/backbone.marionette.js',
    'bower_components/backbone-relational/backbone-relational.js'
  ]).pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify', function () {
  return gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
