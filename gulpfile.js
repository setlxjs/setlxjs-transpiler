const gulp = require('gulp');
const peg = require('gulp-peg');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');

const GRAMMAR_PATH = 'src/grammar/*.pegjs';
const HELPER_PATH = 'src/helper/**/*.js';

gulp.task('make:grammar', () => {
  gulp.src(GRAMMAR_PATH)
    .pipe(peg({ allowedStartRules: ['Programm', 'Statement'] }))
    .pipe(gulp.dest('build/grammar/'));
});

gulp.task('make:helpers', () => {
  gulp.src(HELPER_PATH)
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

gulp.task('watch', () => {
  gulp.watch(GRAMMAR_PATH, ['make:grammar']);
  gulp.watch(HELPER_PATH, ['make:helpers']);
});
