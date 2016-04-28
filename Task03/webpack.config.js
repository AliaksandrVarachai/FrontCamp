'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname + "/",
	entry: {
		"scripts/app": "./src/scripts/app",
		"styles/styles": "./src/styles/styles"
	},
	output: {
		path: __dirname + "/public/", //it's better use absolute path
		//publicPath: "/",  //for local http server
		publicPath: __dirname + "/public/",  //file protocol (!!!not forget about the last /)
		chunkFilename: "./scripts/core/[name].js",
		filename: "[name].js"
		//library: "[name]"  //chaining is impossible for "/" in the name of librari
	},
	watch: NODE_ENV == "development",

	watchOptions: {
		aggregateTimeout: 100
	},
	//devtool: NODE_ENV == "development" ? "eval" : null,
	devtool: null,
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "/scripts/common"
			//minChunks: 2 //we can ['module1', 'module2'] - common code for modules
		}),
		new ExtractTextPlugin("[name].css", {allChunks: true})
	],
	resolve: {
		modulesDirectories: ["node_modules"],
		extensions: ["", ".js", ".css", ".less"]
	},
	resolveLoader: {
		modulesDirectories: ["node_modules"],
		moduleTemplates: ["*-loader", "*"],
		extensions: ["", ".js"]
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel", //"babel?presets[]=es2015" is the same
			query: {
				presets: ["es2015"],
				plugins: ["transform-runtime"]
			}
		},
		{
			test: /\.css$/,
			exclude: /node_modules/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			//loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		},
		{
			test: /\.less$/,
			//context: __dirname + "/src/styles/styles.less",  //doesn't work!
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
		}]
	}
};

console.log("NODE_ENV=" + NODE_ENV);
if (NODE_ENV == "production") {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin ({
			compress: {
				warnings: true,      //warnings during build
				drop_console: false, //for console.log
				unsafe: true
			}
		})
	);
}