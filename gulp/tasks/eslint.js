'use strict';

import config    from '../config';
import gulp      from 'gulp';
import gulpif    from 'gulp-if';
import eslint    from 'gulp-eslint';
import formatter from 'eslint-friendly-formatter';

gulp.task('eslint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([config.scripts.src, '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format(formatter))
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // Optionally fail on production deployment if lint has errors.
    .pipe(gulpif(global.isProd && global.eslint.enforceProd, eslint.failAfterError()));
});
