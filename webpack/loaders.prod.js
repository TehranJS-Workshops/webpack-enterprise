const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolvePath(path) {
	return resolve(__dirname, "..", path);
}

const loaders = [
	{
		test: /\.js$/,
		enforce: 'pre',
		loader: 'eslint-loader',
		exclude: [resolvePath("commons/styles")],
		include: [resolvePath('pages'), resolvePath('commons/scripts')],
		options: {
			formatter: require('eslint-friendly-formatter')
		}
	},
	{
		test: /\global\.scss$/,
		loader: 'import-glob-loader',
		enforce: 'pre'
	},
	{
		test: /\.js$/,
		use: [
			{
				loader: "babel-loader",
				options: {
					babelrc: true,
					cacheDirectory: true,
				}
			},
		],
		include: [resolvePath("pages"), resolvePath("commons/scripts")],
		exclude: /node_modules/,
	},
	{
		test: /\.html?$/,
		use: [
			{
				loader: "html-loader",
				options: {
					root: "./pages",
					interpolate: true,
				}
			}
		],
		include: [resolvePath("pages"), resolvePath("commons/partials")],
		exclude: /node_modules/,
	},
	{
		test: /\global\.scss$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			//resolve-url-loader may be chained before sass-loader if necessary
			use: [
				{
					loader: "css-loader",
					options: {
						importLoaders: 1,
						sourceMap: true,
						alias: {
							"@@images": resolvePath("commons/images")
						}
					}
				},
				{
					loader: "sass-loader",
					options: {
						sourceMap: true,
						outputStyle: "expanded",
						data: "$env: " + process.env.NODE_ENV + ";",
					}
				},
				{
					loader: "postcss-loader"
				},
			]
		}),
	},
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			//resolve-url-loader may be chained before sass-loader if necessary
			use: [
				{
					loader: "css-loader",
					options: {
						importLoaders: 1,
						sourceMap: true,
					}
				},
				{
					loader: "postcss-loader"
				},
			]
		})
	},
	{
		test: /\.(bmp|gif|jpe?g|png|svg)$/,
		use: [
			{
				loader: "file-loader",
				options: {
					name: 'images/[path]/[name].[hash:7].[ext]',
				}
			}
		]
	},
	{
		test: /\.(woff2?|eot|ttf|otf)$/,
		loader: "file-loader",
		options: {
			name: 'fonts/[name]/[name].[hash:7].[ext]',
		},
	},
];

module.exports = loaders;
