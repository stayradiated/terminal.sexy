'use strict';

var fs           = require('fs');
var path         = require('path');
var gulp         = require('gulp');
var brfs         = require('brfs');
var source       = require('vinyl-source-stream');
var connect      = require('gulp-connect');
var sass         = require('gulp-dart-sass');
var autoprefixer = require('gulp-autoprefixer');
var reactify     = require('reactify');
var browserify   = require('browserify');
var watchify     = require('watchify');
var uglify       = require('gulp-uglify');
var replace      = require('gulp-replace');

gulp.task('lib-dev', function () {
  var bundler = watchify(browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: '.jsx'
  }));

  bundler.add('./lib/init.js');
  bundler.transform(reactify);
  bundler.transform(brfs);

  bundler.on('update', rebundle);

  function rebundle () {
    console.log('rebundling');
    return bundler.bundle()
      .on('error', function (err) {
        console.log(err.message);
      })
      .pipe(source('main.js'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(connect.reload());
  }

  return rebundle();
});

gulp.task('style-dev', function () {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('set-version-dev', function () {
  return gulp.src('./dist/index.html')
  .pipe(replace(/\?v=([\w\.]+)/g, '?v=' + require('./package.json').version))
  .pipe(gulp.dest('./dist/'))
  .pipe(connect.reload());
});

gulp.task('lib', function () {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: '.jsx'
  });

  bundler.add('./lib/init.js');
  bundler.transform(reactify);
  bundler.transform(brfs);
  
  console.log('bundling');
  return bundler.bundle()
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('style', function () {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('set-version', function () {
  return gulp.src('./dist/index.html')
  .pipe(replace(/\?v=([\w\.]+)/g, '?v=' + require('./package.json').version))
  .pipe(gulp.dest('./dist/'))
});

gulp.task('schemes', function () {
  var source = 'dist/schemes';
  var index = 'index.json';
  var output = [];

  fs.readdirSync(source).forEach(function (folder) {
    if (folder !== index) {

      var files = fs.readdirSync(path.join(source, folder));

      output = output.concat(files.map(function (file) {
        return path.join(folder, path.basename(file, '.json'));
      }));

    }
  });

  fs.writeFileSync(path.join(source, index), JSON.stringify(output));
});

gulp.task('minify', function () {
  return gulp.src('./dist/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', gulp.series('set-version', 'lib', 'style', 'minify'))

gulp.task('default', gulp.series('set-version-dev', 'lib-dev', 'style-dev', function () {
  gulp.watch('./stylesheets/**/*.scss', gulp.series('style-dev'));

  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
}));
