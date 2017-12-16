const path = require('path');
const getLocalIP = require('./config/localIP');

let PORT = process.env.PORT || 3000;
let HOST = process.env.HOST || "localhost";

if(HOST === "0.0.0.0"){
	HOST = getLocalIP();
}

const devServer = {
	hot: true,
	inline: true,
	open: true,
	overlay: true,
	port: PORT,
	host: HOST,
	quiet: true,
	compress: true,
	contentBase: "./build/",
	historyApiFallback: {
		rewrites: [
			// http://localhost:3000/pages/domestic/domestic.html/THR-MHD/1396-07-25/1-0-0/#/results
			{
				from: /\/(\w{3})-(\w{3})/gi,
				to: function(context) {
					return context.parsedUrl.pathname.replace(context["match"][0], '');
				}
			}
		]
	},
	clientLogLevel: "warning",
	openPage: 'pages/home/home.html',
	allowedHosts: [
		'.dev',

	],
};

module.exports = {
	port: PORT,
	host: HOST,

	devServer: devServer,
};
