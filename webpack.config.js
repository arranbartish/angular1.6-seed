(function () {
    'use strict';
    var path = require('path');
    var webpack = require('webpack');
    var ngAnnotatePlugiun = require('ng-annotate-webpack-plugin');
    var StyleLintPlugin = require('stylelint-webpack-plugin');
    var distLocation = path.join(__dirname, 'dist');
    var srcLocation = path.join(__dirname, 'src');

    console.log('distlocation: ' + distLocation);

    var styleLintPluginConfig = {
        configFile: 'stylelint.config.js',
        syntax: 'scss'
    };

    var jshint = {};

    var entry = [
        './hello-world-app.js'
    ];

    var plugins = [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ngAnnotatePlugiun({add: true})
    ];

    var environment = process.env.NODE_ENV;
    switch (environment) {
        case 'prod':
            console.log('Building prod');
            jshint.failOnHint = true;
            styleLintPluginConfig.failOnError = true;
            break;
        default:
            entry.push(
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080');
            plugins.push(new webpack.HotModuleReplacementPlugin());
            break;
    }

    plugins.push(new StyleLintPlugin(styleLintPluginConfig));

    module.exports = {
        context: srcLocation,
        entry: entry,
        output: {
            path: distLocation,
            filename: 'hello-world.js',
            publicPath: '/dist/' // check this
        },
        devtool: 'source-map',
        module: {
            preLoaders: [
                {test: /\.js$/, exclude: [/node_modules/], loader: 'jshint-loader'}
            ],
            loaders: [
                {test: /\.js$/, loader: 'ng-annotate'},
                {test: /\.css$/, loaders: ['style', 'css']},
                {test: /\.scss$/, loaders: ['style', 'css', 'sass-loader']},
                {test: /\.html$/, loader: 'raw'}
            ]
        },
        plugins: plugins,
        externals: {
            angular: true,
            'angular-route': '"ngRoute"',
            'moment': true
        },
        jshint: jshint
    };
})();