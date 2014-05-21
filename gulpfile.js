var log = require('log_');
var gulp = require('gulp');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var reactify = require('reactify');
var autoprefix = require('gulp-autoprefixer');
var browserify = require('browserify');

gulp.task('default', ['sass', 'lib']);

gulp.task('watch', ['default'], function () {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
  gulp.watch('lib/**/*', ['lib']);
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

gulp.task('lib', function () {
  return browserify({
    extensions: ['.jsx', '.js', '.json'],
    noParse: ['jquery', 'lodash']
  })
  .add('./lib/init.jsx')
  .transform(reactify)
  .bundle()
  .on('error', log('browserify', 'blue'))
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload());
});

gulp.task('minify', ['lib'], function () {
  return gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
