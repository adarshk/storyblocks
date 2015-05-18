var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');

var port = process.env.PORT || 3000;
var reloadPort = process.env.RELOAD_PORT || 35729;


/*gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./js/*.js'])
    .pipe(browserified)
    .pipe(gulp.dest('./browserified/'));
});
*/


//This worked but needs to be changed
/*
gulp.task('browserify', function() {
return browserify('./js/utils/Editor.js')
  .bundle()
//Pass desired output filename to vinyl-source-stream
  .pipe(source('editor.js'))
// Start piping stream to tasks!
  .pipe(gulp.dest('./browserified/'));
});
*/


gulp.task('clean', function () {
  del(['build']);
});

gulp.task('build', function () {
  return gulp.src(webpackConfig.entry.app[0])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/'));
});

gulp.task('serve', function () {
  connect.server({
    port: port,
    livereload: {
      port: reloadPort
    }
  });
});

gulp.task('reload-js', function () {
  return gulp.src('./build/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./build/*.js'], ['reload-js']);
});

gulp.task('default', ['clean', 'build', 'serve', 'watch']);
//gulp.task('default', ['clean', 'browserify', 'build', 'serve', 'watch']);
