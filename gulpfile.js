var log = require('log_');
var brfs = require('brfs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var autoprefix = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');

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

gulp.task('lib', function (cb) {
  var logErr = log('browserify', 'blue');

  browserify({
    extensions: ['.jsx', '.js', '.json'],
    noParse: ['jquery', 'lodash']
  })
  .add('./lib/init.jsx')
  .transform(reactify)
  .transform(brfs)
  .exclude('stylus')
  .bundle()
  .on('error', function (error) {
    logErr(error);
    cb();
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload())
  .on('end', cb);
});

gulp.task('minify', ['lib'], function () {
  return gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
