const webpack = require('webpack');
const merge = require('webpack-merge');

const loaders = require('./webpack/loaders.prod');
const baseWebpackConfig = require('./webpack.common.config');

const BundleAnalyzerPlugin = require('./webpack.bundle.config');

const devConfig = merge(baseWebpackConfig, {
	name: "Webpack-Enterprise: Production",
	devtool: "source-map",
	output: {
		filename: "pages/[name]/[name].[hash].js",
		chunkFilename: 'pages/[name]/[name].[chunkhash].chunks.js',
	},
	resolve: {
		alias: {
			"vue": 'vue/dist/vue.min',
		}
	},
	module: {
		strictExportPresence: true,
		rules: [
			...loaders
		]
	},
	plugins: [
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true,
				dead_code: true,
				drop_console: true,
			},
			ie8: true,
			comments: false,
			sourceMap: true,
		}),

		BundleAnalyzerPlugin(),
	],
	performance: {
		maxEntrypointSize: 300000,
	},
});

module.exports = devConfig;
