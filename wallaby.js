(function () {

    'use strict';

    var wallabyWebpack = require('wallaby-webpack');
    var webpackConfig = require('./webpack.config');
    var webpackPostprocessor = wallabyWebpack(webpackConfig);

    module.exports = function (wallaby) {
        return {
            // set `load: false` to all source files and tests processed by webpack
            // (except external files),
            // as they should not be loaded in browser,
            // their wrapped versions will be loaded instead
            files: [
                // {pattern: 'lib/jquery.js', instrument: false},
                {pattern: 'dist/**/*.js', load: true},
                {pattern: 'src/**/*/.spec.js', ignore: true}
            ],

            tests: [
                {pattern: 'src/**/*.spec.js', load: true}
            ],

            postprocessor: webpackPostprocessor,

            setup: function () {
                // required to trigger test loading
                window.__moduleBundler.loadTests();
            }
        };
    };
})();
