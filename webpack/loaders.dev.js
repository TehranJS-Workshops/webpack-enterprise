const {resolve} = require('path');

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
		enforce: 'pre',
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
			}
		],
		include: [resolvePath("pages"), resolvePath("commons/scripts")],
		exclude: /node_modules/,
	},
	{
		test: /\.vue$/,
		loader: 'vue'
	},
	{
		test: /\.html?$/,
		use: [
			{
				loader: "html-loader",
				options: {
					interpolate: true,
					root: "./pages",
				}
			}
		],
		include: [resolvePath("pages"), resolvePath("commons/partials")],
		exclude: /node_modules/,
	},
	{
		test: /\global\.scss$/,
		use: [
			{
				loader: "style-loader"
			},
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
					sourceComments: true,
					outputStyle: "expanded",
					data: "$env: " + process.env.NODE_ENV + ";",
					includePaths: [resolvePath('commons/styles'), resolvePath('pages')],
				}
			},
			{
				loader: "postcss-loader"
			},
		]
	},
	{
		test: /\.css$/,
		use: [
			{
				loader: 'style-loader',
			},
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
			name: 'fonts/[path]/[name].[hash:7].[ext]',
		},
	},
];

module.exports = loaders;
