'use strict';

import gulp       from 'gulp';
import config     from '../config';
import awspublish from 'gulp-awspublish';

gulp.task('deploy', ['prod'], function() {
  // Deploy to AWS S3.

  // Create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create({
    params: {
      Bucket: config.deployBucket
    }
  });

  // Define custom headers
  var headers = {
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
  };

  return gulp.src('build/**')
    // Publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    .pipe(publisher.sync())

    // Create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // Print upload updates to console
    .pipe(awspublish.reporter());
});
