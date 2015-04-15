#!/usr/bin/env node

(function() {
  
  'use strict';
  
  var gulp = require('gulp');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;
  var gutil = require('gulp-util'); 
  var watchify = require('watchify');
  var browserify = require('browserify');
  var reactify = require('reactify');
  var source = require('vinyl-source-stream');
  
  var BUNDLE_FILE = 'react-typeracer.js';
  var BROWSERIFY_OPTS = {
    entries: [ './lib/app.js' ],
    debug: true,
    cache: {},
    packageCache: {}
  };
  
  gulp.task('serve', [ 'watch-bin' ], function() {
    browserSync({
      ui: false,
      ghostMode: false,
      logLevel: 'silent',
      server: '.',
      open: false,
      notify: false,
      injectChanges: false
    });
  });
  
  gulp.task('reload', function() {
    reload();
  });
  
  gulp.task('watch-bin', [ 'watch-lib' ], function() {
    gulp.watch([ '*.*' ], [ 'reload' ]);
  });
  
  // http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
  gulp.task('watch-lib', function() {
      var b;
      function bundle() {
        return b.bundle()
          .on('error', gutil.log.bind(gutil, 'Browserify Error'))
          .pipe(source(BUNDLE_FILE))
          .pipe(gulp.dest('./bin'));
      };
      b = watchify(browserify(BROWSERIFY_OPTS));
      b.transform('reactify');
      b.on('update', bundle);
      b.on('log', gutil.log);
      return bundle();
  });
  
})();