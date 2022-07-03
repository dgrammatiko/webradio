const { EleventyServerless } = require('@11ty/eleventy');

// Explicit dependencies for the bundler from config file and global data.
// The file is generated by the Eleventy Serverless Bundler Plugin.
require('./eleventy-bundler-modules.js');

async function handler(event) {
  let elev = new EleventyServerless('serverless', {
    path: new URL(event.rawUrl).pathname,
    query: event.multiValueQueryStringParameters || event.queryStringParameters,
    functionsDir: './netlify/functions/',
  });

  //event.headers.cookie

  try {
    if (event.httpMethod === 'POST') {
     const formData = (new URLSearchParams(event.body))

     if (formData.get('country') || formData.get('station')) {
      elev.options.query = {
        country: formData.get('country'),
        station: formData.get('station'),
      };
     }
    }

    let [page] = await elev.getOutput();

    // If you want some of the data cascade available in `page.data`, use `eleventyConfig.dataFilterSelectors`.
    // Read more: https://www.11ty.dev/docs/config/#data-filter-selectors

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
      body: page.content,
    };
  } catch (error) {
    // Only console log for matching serverless paths
    // (otherwise you’ll see a bunch of BrowserSync 404s for non-dynamic URLs during --serve)
    if (elev.isServerlessUrl(event.path)) {
      console.log('Serverless Error:', error);
    }

    return {
      statusCode: error.httpStatusCode || 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    };
  }
}

exports.handler = handler;
