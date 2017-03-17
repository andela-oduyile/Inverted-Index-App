const gulp = require('gulp');
const browserSync = require('browser-sync');

const env = process.env.NODE_ENV;

if (env !== ('development' || 'test')) {
  gulp.task('serve', () => {
    const static = require('node-static');
    const file = new static.Server('./public');
    require('http').createServer((request, response) => {
      request.addListener('end', function() {
        file.serve(request, response);
      }).resume();
    }).listen(process.env.PORT || 3000);
  })
}

if (env === 'development') {
  gulp.task('browserSync', () => {
    browserSync.init({
      server: {
        baseDir: 'public'
      }
    });
  });

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

  gulp.task('test', function karma(done) {
    new Server({
      configFile: path.join(__dirname, 'karma.conf.js')
    }, () => done).start();
  });

  gulp.task('browserify', () => {
    gulp.src('./jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundledTest.js'))
    .pipe(gulp.dest('jasmine'));
  });
}

