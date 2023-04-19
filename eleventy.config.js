const pluginWebc = require("@11ty/eleventy-plugin-webc");

const pluginJavaScriptFrontMatter = require("./_config/javascriptFrontMatter");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	// Use arbitrary JavaScript in front matter.
	eleventyConfig.addPlugin(pluginJavaScriptFrontMatter);

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	return {
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
		},
	}
};
