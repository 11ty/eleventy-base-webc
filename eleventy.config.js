const pluginWebc = require("@11ty/eleventy-plugin-webc");

const pluginJavaScriptFrontMatter = require("./_config/javascriptFrontMatter.cjs");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginJavaScriptFrontMatter);

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	eleventyConfig.setServerOptions({
		domDiff: false
	});
};