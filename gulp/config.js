'use strict';

export default {

  browserPort: 3000,
  UIPort: 3001,

  sourceDir: './app/',
  buildDir: './build/',

  // AWS S3 bucket for production deployment.
  deployBucket: 'production-portalsync-titleio.net',

  styles: {
    src: 'app/styles/**/*.scss',
    dest: 'build/css',
    prodSourcemap: false,
    sassIncludePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
  },

  eslint: {
    // Don't allow production deployment with lint errors.
    enforceProd: true
  },

  scripts: {
    src: 'app/js/**/*.js',
    dest: 'build/js'
  },

  images: {
    src: 'app/images/**/*',
    dest: 'build/images'
  },

  fonts: {
    src: ['app/fonts/**/*'],
    dest: 'build/fonts'
  },

  assetExtensions: [
    'js',
    'css',
    'png',
    'jpe?g',
    'gif',
    'svg',
    'eot',
    'otf',
    'ttc',
    'ttf',
    'woff2?'
  ],

  views: {
    index: 'app/index.html',
    src: 'app/views/**/*.html',
    dest: 'app/js'
  },

  gzip: {
    src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: 'build/',
    options: {}
  },

  browserify: {
    bundleName: 'main.js',
    prodSourcemap: false
  },

  twbsjs: {
    src : 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/*.js',
    dest: 'app/js/node_modules/app_custom/vendor/bootstrap/'
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  },

  init: function() {
    this.views.watch = [
      this.views.index,
      this.views.src
    ];

    return this;
  }

}.init();
