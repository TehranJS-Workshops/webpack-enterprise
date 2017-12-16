const {resolve} = require('path');

const aliases = {
	"@pages": resolve(__dirname, "..", "pages"),

	"@": resolve(__dirname, "..", "commons"),
	"@sass": resolve(__dirname, "..", "commons/styles/sass"),
	"@styles": resolve(__dirname, "..", "commons/styles"),
	"@scripts": resolve(__dirname, "..", "commons/scripts"),
	"@partials": resolve(__dirname, "..", "commons/partials"),
	"@images": resolve(__dirname, "..", "commons/images"),
	"@fonts": resolve(__dirname, "..", "commons/fonts"),

	"@vendors": resolve(__dirname, "..", "commons/scripts/vendors"),
	"@cssVendors": resolve(__dirname, "..", "commons/styles/vendors"),
};

module.exports = aliases;
