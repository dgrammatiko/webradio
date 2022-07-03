const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksFilter('activeStation',
      function(array, station){
        const x = array.filter(x => x.code === station);
        if (x[0]) {
          return x[0];
        }
       return {}
      }
    );

    eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'serverless',
    functionsDir: './netlify/functions/',
    copy: [
      { from: '_includes', to: '_includes' },
      { from: '_data', to: '_data' }
    ],
  });
};
