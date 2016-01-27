'use strict';

import config         from '../config';
import gulp           from 'gulp';
import data           from 'gulp-data';
import nunjucksRender from 'gulp-nunjucks-render';
import browserSync    from 'browser-sync';

// Views task
gulp.task('views', function() {
  // Set template paths for nunjucks.
  nunjucksRender.nunjucks.configure(config.views.templatePaths, { watch: false });

  // Process any view files and render them.
  return gulp.src(config.views.src)
    .pipe(data({
      // Pass environment config to templates.
      env: config.env,
      config: config
    }))
    .pipe(nunjucksRender())
    .pipe(gulp.dest(config.views.dest))
    .pipe(browserSync.stream());
});
