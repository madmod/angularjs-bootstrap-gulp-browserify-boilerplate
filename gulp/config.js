'use strict';

import gutil       from 'gulp-util';
import extend      from 'extend';
import parseArgs   from 'minimist';

export default {

  browserPort: 3000,
  UIPort: 3001,

  sourceDir: './app/',
  buildDir: './build/',

  project: 'portalsync',

  deploy: {
    // Added by env configs.
    //bucket: '',
    headers: {
      // Disable caching except for production.
      'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
    }
  },

  styles: {
    src: 'app/styles/**/*.scss',
    dest: 'build/css',
    prodSourcemap: false,
    sassIncludePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
  },

  lint: {
    failAfterError: false
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

  favicon: {
    src: 'app/assets/favicon/**/*',
    dest: 'build/assets/favicon/',
    rootSrc: ['app/assets/favicon/favicon.ico', 'app/assets/favicon/manifest.json'],
    rootDest: 'build/'
  },

  views: {
    // Include the templates directory for HTML partials that wont be copied to the build output.
    templatePaths: ['app/templates', 'app/views'],
    src: 'app/views/**/*.html',
    dest: 'build/'
  },

  gzip: {
    src: '', //'build/**/*.{html,xml,json,css,js,js.map,css.map}',
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

  // Env specific overrides of these default configurations.
  envOverrides: {
    defaultEnv: 'development',
    // If a key matching the --env argument value is found it is merged with the config.
    environments: {
      // If you have a custom deployment stage add it's S3 bucket name here.
      development: {
        deploy: {
          // AWS S3 bucket for development deployment.
          bucket: 'development-portalsync-titleio.net'
        }
      },

      beta: {
        deploy: {
          // AWS S3 bucket for beta deployment.
          bucket: 'beta-portalsync-titleio.net'
        }
      },

      production: {
        deploy: {
          // AWS S3 bucket for production deployment.
          bucket: 'production-portalsync-titleio.net',
          headers: {
            // TODO: Enable caching for production assets.
            //'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
          }
        },

        lint: {
          // Don't allow production deployment with lint errors.
          failAfterError: true
        }
      }
    }
  },

  init () {
    this.applyEnvOverrides();

    return this;
  },

  // Apply environment specific config overrides.
  applyEnvOverrides () {
    let args = parseArgs(process.argv.slice(2));

    let env = (args.e || args.env || args.environment || this.envOverrides.defaultEnv).toLowerCase();

    gutil.log('Environment:', env);

    let envConfig = this.envOverrides.environments[env];

    // Add command line arguments to the config.
    let envArgs = {
      env: env,
      debug: !!args.debug
    };

    // Deep extend the base config with the env config and command line arguments.
    // This wont replace options in the default config unless they are defined or null in the env config.
    extend(true, this, envConfig, envArgs);

    if (this.debug) {
      gutil.log('Environment specific config', JSON.stringify(envConfig, null, 2));
    }
  }

}.init();


