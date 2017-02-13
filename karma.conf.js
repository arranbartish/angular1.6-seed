var _ = require('lodash');
var path = require('path');
var webpackConfig = require('./webpack.config.js');

webpackConfig.entry = {};


module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        //browsers: ['Chrome'],
        browsers: ['PhantomJS'],
        singleRun: false,
        autoWatchBatchDelay: 300,

        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-route/angular-route.js',
            './node_modules/moment/moment.js',
            './node_modules/angular-mocks/angular-mocks.js',
            //'./src/hello-world-app.js',
            './src/**/*.js'],
            //'./src/**/*.spec.js'],

        preprocessors: {
            //'./src/**/!(*.spec)+(.js)' : [ 'coverage'],
            './src/**/!(*.spec)+(.js)': [ 'coverage', 'browserify' ]
            //, './src/**/!(*spec).js': ['coverage']
        },

        browserify: {
            transform: ['browserify-ng-html2js', 'scssify', 'browserify-ngannotate']
        },

        coverageReporter: {
            includeAllSources: true,
            dir : 'dist/coverage/',
            reporters: [
                { type : 'html', subdir: 'html' },
                { type: 'text-summary' }
            ]

        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        }
    });
};