const pkg = require("../package.json")
module.exports = {
	// Feel free to override these, they are pulling from package.json for default values.
	title: "Eleventy Base WebC" || pkg.name,
	description: "" || pkg.description,
	language: "en",
};