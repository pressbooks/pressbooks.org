const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const slugifyFilter = require('./src/filters/slugify-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = config => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('slugify', slugifyFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlightPlugin);

  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
