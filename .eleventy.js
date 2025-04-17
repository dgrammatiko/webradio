import { EleventyServerlessBundlerPlugin } from '@11ty/eleventy';

export default function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter('activeStation', function(array, station) {
    const x = array.filter(x => x.code === station);
    if (x.length) {
      return x[0];
    }
    return {}
  });

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'serverless',
    functionsDir: './functions/',
  });
};
