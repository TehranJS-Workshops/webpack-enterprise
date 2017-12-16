const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const baseWebpackConfig = require('./webpack.common.config');
const loaders = require('./webpack/loaders.dev');

const {port} = require('./webpack.serve.config');
const {host} = require('./webpack.serve.config');
const {devServer} = require('./webpack.serve.config');

const devConfig = merge(baseWebpackConfig, {
	name: "Webpack-Enterprise: Development",
	watch: true,
	module: {
		strictExportPresence: true,
		rules: [
			...loaders
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
				messages: [`Application is running on ${host}:${port}`],
				notes: ['Some additionnal notes to be displayed unpon successful compilation']
			},
		}),
	],
	devServer: devServer,
	performance: {
		hints: false
	},
});

module.exports = devConfig;
