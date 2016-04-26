'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require("webpack");

module.exports = {
	context: __dirname + "/frontend",
	entry: {
		home: "./home",
		about: "./about"
	},
	output: {
		path: __dirname + "/public", //it's better use absolute path
		filename: "[name].js",
		library: "[name]"
	},
	watch: NODE_ENV == "development",

	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			LANG: JSON.stringify("ru")
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "common"
		})
	],
	resolve: {
		modulesDirecoties: ["node_modules"],
		extensions: ["", ".js"]
	},
	resolveLoader: {
		modulesDorectories: ["node_modules"],
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