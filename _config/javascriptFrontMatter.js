const { RetrieveGlobals } = require("node-retrieve-globals");

module.exports = function(eleventyConfig) {
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      "javascript": function(frontMatterCode) {
        let vm = new RetrieveGlobals(frontMatterCode);

        let data = {};
        return vm.getGlobalContext(data, {
          reuseGlobal: true,
          dynamicImport: true,
        });
      }
    }
  });
};