var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = path.resolve(__dirname);

module.exports = {
    entry: {
        'bundle': './src/app.js',
        'mock': './src/mock.js'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
        publicPath: "/"
    },
    watch: true,
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ["es2015"],
                    //plugins: ["transform-runtime"]
                }
            }
        ]

    }
};