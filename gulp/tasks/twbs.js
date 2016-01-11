'use strict';

import config           from '../config';
import gulp             from 'gulp';
import handleErrors     from '../util/handleErrors';

gulp.task('copy_twbs_js', function () {
    return gulp.src(config.twbsjs.src)
      .pipe(gulp.dest(config.twbsjs.dest))
    .on('error', handleErrors);
});