const glob = require("glob");
const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');

// replace %whatever% with text
const template = function (string, data){
	return string.toString(16).replace(/\%(\w*)\%/g, (match, key) => {
		return data.hasOwnProperty(key) ? data[key] : "";
	})
};

// resolve backslash in path urls
const resolveBackslash = function (string) {
	return string.toString(16).replace(/\\/g, "/");
};

/**
* [find all entries]
* @method
* @param  {[string]} globPath [entries path]
*/
const globEntries = function (globPath) {
	var files = glob.sync(globPath);
	var entries = {};

	files.map(function(entry, index) {
		var keyName = path.dirname(entry).split("/").pop();

		Object.assign(entries, {[keyName]: "./" + entry});
	})

	return entries;
};

/**
* [find all vendor entries]
* @method
* @param  {[string]} globPath [entries path]
*/
const globVendors = function (globPath) {
	var files = glob.sync(globPath);
	var entries = [];

	files.map(function(entry, index) {
		if(/\.min\.js$/.test(entry)) return;

		var keyName = path.basename(entry, path.extname(entry));

		entries.push(path.resolve(entry))
	})

	return entries;
};

/**
* [find all html file entries]
* @method
* @param  {[string]} globPath [entries path]
*/
const htmlPartials = function(globPath) {
	let files = glob.sync(globPath);
	let entries = [];
	let htmlEntries = [];

	files.map(function(entry, index) {
		const parent = resolveBackslash(path.dirname(entry)).split("/").pop();
		const pointer = path.basename(entry);
		const entryPointer = path.basename(entry, ".html");

		entries.push(new htmlWebpackPlugin({
			hash: true,
			inject: true,
			chunks: ["vendors", entryPointer],
			filename: `pages/${entryPointer}/${pointer}`,
			template: [".", "pages", parent, pointer].join("/"),
			minify: {
				removeComments: false,
				collapseWhitespace: true
			},
		}));
		htmlEntries.push(entry)
	});

	return {
		pluginEntries: entries,
		htmlEntries: htmlEntries,
	};
};

module.exports = {
	globVendors: globVendors,
	globEntries: globEntries,
	htmlPartials: htmlPartials,

	template: template,
	resolveBackslash: resolveBackslash,
};
