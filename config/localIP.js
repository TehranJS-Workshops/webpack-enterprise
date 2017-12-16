const interfaces = require('os').networkInterfaces();

function getLocalIP() {
	for (let localInterface in interfaces) {
		let iface = interfaces[localInterface];

		for (let i = 0; i < iface.length; i++) {
			let alias = iface[i];

			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address
			};
		}
	}

	return '0.0.0.0';
}
module.exports = getLocalIP;
