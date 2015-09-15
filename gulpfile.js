const gulp = require('gulp');
const peg = require('gulp-peg');

gulp.task('default', () => {
  gulp.src('src/grammar/*.pegjs')
    .pipe(peg())
    .pipe(gulp.dest('build/'));
});