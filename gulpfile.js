
const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const njkRender = require('gulp-nunjucks-render');
const plumber=require('gulp-plumber');
const watch = require('gulp-watch');
const imagemin = require ('gulp-imagemin');

gulp.task('sass', function (done) {
   gulp.src('./src/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/css'));
		done();
});

gulp.task('imagemin', function (done) {
   gulp.src('./src/images/*')
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('./public/images'));
		done();
});

gulp.task ('scripts', function (done) {
	gulp.src('js/*.js+')
		.pipe(plumber())
		.pipe(gulp.dest('public/js'));
		done();
});

gulp.task('webserver', function (done) {
  gulp.src('./public')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('webserver', function (done) {
  gulp.src('public')
    .pipe(webserver({
      fallback: 'index.html'
    }));
	done();
});

gulp.task('nunjucks', function (done) {
    return gulp.src('src/templates/*.njk')
        .pipe(plumber())
        .pipe(njkRender())
        .pipe(gulp.dest('public'));
        done();
});

gulp.task('watch', function () {
    gulp.watch ('js/*.js', gulp.series('scripts'));
    gulp.watch ('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch ('src/templates/**/*.njk', gulp.series('nunjucks'));
	gulp.watch ('src/img/*', gulp.series('imagemin'));
    return 
});

gulp.task('default',gulp.parallel('webserver',gulp.series('imagemin','sass', 'nunjucks', 'watch')));
