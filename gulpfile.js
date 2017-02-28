const gulp = require('gulp');
const browserSync = require('browser-sync');

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