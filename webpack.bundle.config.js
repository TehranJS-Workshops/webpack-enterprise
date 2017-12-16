const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const BundleAnalyzerPluginFn = function() {
	return new BundleAnalyzerPlugin({
	  analyzerMode: 'static',
	  analyzerHost: HOST,
	  analyzerPort: parseInt(PORT) + 1000,
	  reportFilename: 'report.html',
	  defaultSizes: 'parsed',
	  openAnalyzer: true,
	  generateStatsFile: false,
	  statsFilename: 'stats.json',
	  statsOptions: null,
	  logLevel: 'info'
	});
}

module.exports = BundleAnalyzerPluginFn;
