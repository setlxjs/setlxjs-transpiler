const gulp = require('gulp');
const peg = require('gulp-peg');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');

gulp.task('make:grammar', () => {
  gulp.src('src/grammar/*.pegjs')
    .pipe(peg())
    .pipe(gulp.dest('build/'));
});

gulp.task('make:helpers', () => {
  gulp.src('src/helper/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/'));
});

gulp.task('default', [
  'make:grammar',
  'make:helpers',
]);

gulp.task('test:grammar', () => {
  gulp.src('test/grammar/*.test.js')
    .pipe(mocha());
});
