const {join} = require('path');
const {resolve} = require('path');
const {dirname} = require('path');
const {basename} = require('path');
const {delimiter} = require('path');

const paths = require('./config/paths');
const {template} = require('./config/utils');
const {globEntries} = require('./config/utils');
const {globVendors} = require('./config/utils');

// webpack utilities
const aliases = require('./webpack/aliases');
const plugins = require('./webpack/plugins');

// glob entries
const entries = globEntries('pages/*/index.js');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;

const config = {
	// bail: true,
	target: 'web',
	devtool: 'cheap-module-eval-source-map',
	entry: Object.assign({}, entries, {
		vendors: [
			"./node_modules/es6-promise/dist/es6-promise.auto.js",
			resolve(__dirname, "commons/scripts/global.js"),
		]
	}),
	output: {
		pathinfo: true,
		path: paths.appBuild,
		publicPath: publicPath,
		filename: "pages/[name]/[name].js",
		chunkFilename: 'pages/[name]/[name].chunk.js',
	},
	resolve: {
		alias: aliases,
		extensions: [".js", ".json", ".sass", ".scss", ".css", ".html", ".htm"]
	},
	plugins: plugins,
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		__dirname: true,
	},
	// Turn off performance hints during development because we don't do any
	// splitting or minification in interest of speed. These warnings become
	// cumbersome.
	performance: {
		hints: "warning",
	},
}

module.exports = config;
