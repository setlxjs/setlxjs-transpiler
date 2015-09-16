const gulp = require('gulp');
const peg = require('gulp-peg');
const mocha = require('gulp-mocha');

gulp.task('default', () => {
  gulp.src('src/grammar/*.pegjs')
    .pipe(peg())
    .pipe(gulp.dest('build/'));
});

gulp.task('test:grammar', () => {
  gulp.src('test/grammar/*.test.js')
    .pipe(mocha());
});