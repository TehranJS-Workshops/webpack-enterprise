const assets = require("postcss-assets");
const autoprefixer = require("autoprefixer");
const flexBugs = require("postcss-flexbugs-fixes");
const sorting = require("postcss-sorting");
const inlineSvg = require("postcss-inline-svg");
const alias = require("postcss-alias");
const use = require("postcss-use");

const paths = require("./config/paths");

const plugins = {
	plugins: [
		assets({
			cacheBuster: true,
			loadPaths: [
				paths.appImages,
				paths.appIcons,
				paths.appFonts
			]
		}),
		autoprefixer({
			browsers: [
				">1%",
				"last 4 versions",
				"Firefox ESR",
				"not ie < 9",
			],
			flexbox: "no-2009",
		}),
		use({
			resolveFromFile: true,
			modules: '*'
		}),
		// https://github.com/seaneking/postcss-alias
		alias(),
		// https://github.com/TrySound/postcss-inline-svg
		inlineSvg({
			path: paths.appImages
		}),
		// https://github.com/hudochenkov/postcss-sorting
		sorting({
			"properties-order": [
				"margin",
				"padding",

				"width",
				"height",

				"color",
				"border",
				"background",

				"font-family",
				"font-size",
				"font-weight",
				"font-style",

				"box-shadow",
				"text-shadow",

				"float",
				"display",

				"position",
				"top",
				"right",
				"bottom",
				"left"
			]
		})
	]
}

module.exports = plugins;
