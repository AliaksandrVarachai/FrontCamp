'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname + "/",
	entry: {
		"app": "./src/scripts/app"
	},
	output: {
		path: __dirname + "/public/", //it's better use absolute path
		//publicPath: "/",  //for local http server
		publicPath: __dirname + "/public/",  //file protocol (!!!not forget about the last /)
		//chunkFilename: "./scripts/core/[name].js", //duplicate CommonsChinkPlugin parameters
		filename: "/scripts/[name].js"
		//library: "[name]"  //chaining is impossible for "/" in the name of librari
	},
	watch: NODE_ENV == "development",

	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == "development" ? "source-map" : null,
	//devtool: null,
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "/chunks/common-chunk"
			//minChunks: 2 //we can ['module1', 'module2'] - common code for modules
		}),
		new ExtractTextPlugin("styles/styles.css", {allChunks: true}),
		new webpack.OldWatchingPlugin()  //fix of a bug: ExtractTextPlugin disables watch 
	],
	resolve: {
		modulesDirectories: ["node_modules"],
		extensions: ["", ".js", ".css"]
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
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}
		]
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