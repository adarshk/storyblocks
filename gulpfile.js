var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');

var port = process.env.PORT || 3000;
var reloadPort = process.env.RELOAD_PORT || 35729;

gulp.task('scripts', function() {
    // Single entry point to browserify 
    return gulp.src('js/main.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('serve', function () {
  connect.server({
    port: port,
    livereload: {
      port: reloadPort
    }
  });
});

/*gulp.task('reload-js', function () {
  return gulp.src('./public/*.js')
    .pipe(connect.reload());
});
*/

gulp.task('load-js', function () {
  return gulp.src('js/main.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function () {
  gulp.watch(['./js/**/*.js'], ['load-js']);
});

gulp.task('default', ['scripts', 'serve', 'watch']);
gulp.task('no', ['serve', 'watch']);