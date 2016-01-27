'use strict';

import config      from '../config';
import gulp        from 'gulp';
import merge       from 'merge-stream';
import changed     from 'gulp-changed';
import browserSync from 'browser-sync';

// Favicon task
gulp.task('favicon', function () {
  // TODO: Use gulp-favicon to generate favicon assets.

  // Copy favicon files to build.
  const allFiles = gulp.src(config.favicon.src)
    .pipe(changed(config.favicon.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.favicon.dest));

  // Copy favicon files that belong in the site root.
  const rootFiles = gulp.src(config.favicon.rootSrc)
    .pipe(changed(config.favicon.rootDest)) // Ignore unchanged files
    .pipe(gulp.dest(config.favicon.rootDest));

  return merge(allFiles, rootFiles)
    .pipe(browserSync.stream());
});


