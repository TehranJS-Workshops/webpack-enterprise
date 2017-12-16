const glob = require('glob');

const {dirname} = require('path');
const {basename} = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = require('../config/env');
const paths = require('../config/paths');
const {htmlPartials} = require('../config/utils');
const WatchMissingNodeModulesPlugin = require('../config/WatchMissingNodeModulesPlugin');

const plugins = [
	// Generates html files with the <script> and <link> injected.
	...htmlPartials("./pages/*/*.html").pluginEntries,

	new ExtractTextPlugin({
		allChunks: true,
		filename: "styles/[name].[chunkhash:7].css",
	}),

	new WatchMissingNodeModulesPlugin(paths.appNodeModules),

	new webpack.ProgressPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		name: "vendors",
		minChunks: Infinity,
		filename: "vendors/vendors.[hash:7].js",
	}),
	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
	new(webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)(),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]

module.exports = plugins;
