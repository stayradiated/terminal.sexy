var log = require('log_');
var brfs = require('brfs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var reactify = require('reactify');
var insert = require('gulp-insert');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var autoprefix = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');

var vendor = [
  'bluebird',
  'filereader-stream',
  'husl',
  'jquery',
  'lodash',
  'react',
  'react/addons',
  'reactwm',
  'signals',
  'termcolors',
  'termio',
  'tinytinycolor',
  'urlsafe-base64'
];

gulp.task('default', ['sass', 'vendor'], function () {
  return gulp.start('bundle');
});

gulp.task('watch', ['default'], function () {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
  gulp.watch('lib/**/*', ['bundle']);
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

  browserify({ extensions: '.jsx' })
  .add('./lib/init.jsx')
  .transform(reactify)
  .transform(brfs)
  .external(vendor)
  .bundle()
  .on('error', function (error) {
    logErr(error);
    cb();
  })
  .pipe(source('lib.js'))
  .pipe(gulp.dest('dist/js'))
  .on('end', cb);
});

gulp.task('bundle', ['lib'], function () {
  return gulp.src([
    'dist/js/vendor.js',
    'dist/js/lib.js'
  ])
  .pipe(insert.prepend(';'))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload());
});

gulp.task('vendor', function () {
  return browserify().exclude('stylus')
  .require(vendor)
  .bundle()
  .pipe(source('vendor.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('minify', ['lib'], function () {
  return gulp.src('dist/js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
