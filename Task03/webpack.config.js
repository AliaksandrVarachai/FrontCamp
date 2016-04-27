'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require("webpack");
const path = require('path');

module.exports = {
	context: __dirname + "/app/scripts",
	entry: {
		index: "./app"
	},
	output: {
		path: __dirname + "/public/scripts", //it's better use absolute path
		//publicPath: "/scripts/",  //for local http server
		publicPath: __dirname + "/public/scripts/",  //file protocol
		filename: "[name].js",
		library: "[name]"
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
			name: "common"
			//minChunks: 2 //we can ['module1', 'module2'] - common code for modules
		})
	],
	resolve: {
		modulesDorectories: ["node_modules"],
		extensions: ["", ".js"]
	},
	resolveLoader: {
		modulesDorectories: ["node_modules"],
		moduleTemplates: ["*-loader", "*"],
		extensions: ["", ".js"]
	},
	module: {
		loaders: [{
			//test: /app\/scripts\/[^\/]*\.js$/,
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel", //"babel?presets[]=es2015" is the same
			query: {
				presets: ["es2015"],
				plugins: ["transform-runtime"]
			}
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