var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "build");
var APP_DIR = path.resolve(__dirname);

module.exports = {
    //entry: APP_DIR + "/src/main.jsx",
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        //'./src/Posts.jsx'
        './src/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        filename: "bundle.js",
        publicPath: "/"
    },
    //watch: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: "react-hot",
                exclude: /node_modules/
            }, {
                test: /\.jsx?/,
                include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ["es2015", "react"],
                    //plugins: ["transform-runtime"]
                }
            }
        ]

    }
};