var gulp         = require('gulp');
var brfs         = require('brfs');
var source       = require('vinyl-source-stream');
var connect      = require('gulp-connect');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reactify     = require('reactify');
var browserify   = require('browserify');
var watchify     = require('watchify');
var uglify       = require('gulp-uglify');

gulp.task('default', ['lib', 'style'], function () {
  gulp.watch('./stylesheets/**/*.scss', ['style']);

  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
}); 

gulp.task('lib', function () {
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

gulp.task('style', function () {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('minify', function () {
  return gulp.src('./dist/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});
