var webpack = require("webpack");

var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/bundle');
var APP_DIR = path.resolve(__dirname);

module.exports = {
	devtool: 'eval',
	entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        APP_DIR + "/src/react.jsx"
    ],
    output: {
        path: BUILD_DIR,
        filename: "bundle.js",
        publicPath: '/static'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: APP_DIR,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel']
        }
      ]
    }
};