const gulp = require('gulp');
const browserSync = require('browser-sync');

const env = process.env.NODE_ENV;

if (env === 'development' || env !== 'test') {
  gulp.task('browserSync', () => {
    browserSync.init({
      server: {
        baseDir: 'public'
      },
      open: env === 'development' ? true : false
    });
  });
}

if (env === 'development') {
  gulp.task('watch', ['browserSync'], () => {
    gulp.watch('public/index.html', browserSync.reload);
    gulp.watch('public/partials/*.html', browserSync.reload);
    gulp.watch('public/css/*.css', browserSync.reload);
    gulp.watch('public/js/*.js', browserSync.reload);
  });
}

if (env === 'test') {
  const path = require('path');
  const browserify = require('gulp-browserify');
  const Server = require('karma').Server;
  const rename = require('gulp-rename');

  gulp.task('test', () => {
    new Server({
      configFile: path.join(__dirname, 'karma.conf.js'),
      singleRun: true
    }).start();
  });

  gulp.task('browserify', () => {
    gulp.src('./jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundledTest.js'))
    .pipe(gulp.dest('jasmine'));
  });
}

