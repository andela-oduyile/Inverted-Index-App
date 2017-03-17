const gulp = require('gulp');
const browserSync = require('browser-sync');
const path = require('path');
const browserify = require('gulp-browserify');
const Server = require('karma').Server;
const rename = require('gulp-rename');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public'
    }
  });
});

gulp.task('default', ['browserSync'], () => {
  gulp.watch('public/index.html', browserSync.reload);
  gulp.watch('public/partials/*.html', browserSync.reload);
  gulp.watch('public/css/*.css', browserSync.reload);
  gulp.watch('public/js/*.js', browserSync.reload);
});

gulp.task('test', (done) => {
  new Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('browserify', () => {
  gulp.src('./jasmine/spec/inverted-index-test.js')
  .pipe(browserify())
  .pipe(rename('bundledTest.js'))
  .pipe(gulp.dest('jasmine'));
});
// ./tests/bundles/bundled-test.js