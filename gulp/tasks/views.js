'use strict';

import config         from '../config';
import gulp           from 'gulp';
import data           from 'gulp-data';
import nunjucksRender from 'gulp-nunjucks-render';
import browserSync    from 'browser-sync';
import merge         from 'merge-stream';
import templateCache from 'gulp-angular-templatecache';

// Views task
gulp.task('views', function() {
  // Set template paths for nunjucks.
  nunjucksRender.nunjucks.configure(config.views.templatePaths, { watch: false });

  // Put our index.html in the dist folder
  const indexFile = gulp.src(config.views.index)
    .pipe(gulp.dest(config.buildDir));

  // Process any other view files from app/views
  const views = gulp.src(config.views.src)
    // Render nunjucks templates.
    .pipe(data({
      // Pass environment config to templates.
      env: config.env,
      config: config
    }))
    .pipe(nunjucksRender())
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(config.views.dest))
    .pipe(browserSync.stream());

  return merge(indexFile, views);
});
