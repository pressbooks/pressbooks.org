const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownItFootnote = require("markdown-it-footnote");
const path = require("path");
const postcss = require("postcss");

// Filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

module.exports = (config) => {
  // Add footnotes to Markdown
  let markdownIt = require("markdown-it");
  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options).use(markdownItFootnote);

  config.setLibrary("md", markdownLib);

  // Add filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlightPlugin, {
    init: function ({ Prism }) {
      Prism.languages.treeview = {
        "treeview-part": {
          pattern: /(^|\n).+/,
          inside: {
            "entry-line": [
              {
                pattern: /\|-- |├── /,
                alias: "line-h",
              },
              {
                pattern: /\|   |│   /,
                alias: "line-v",
              },
              {
                pattern: /`-- |└── /,
                alias: "line-v-last",
              },
              {
                pattern: / {4}/,
                alias: "line-v-gap",
              },
            ],
            "entry-name": {
              pattern: /.*\S.*/,
              inside: {
                // symlink
                operator: / -> /,
              },
            },
          },
        },
      };

      Prism.hooks.add("wrap", function (env) {
        if (env.language === "treeview") {
          // Remove line breaks
          if (env.type === "treeview-part") {
            env.content = env.content.replace(/\n/g, "") + "<br />";
          }
          if (env.type === "entry-name") {
            if (/(^|[^\\])\/\s*$/.test(env.content)) {
              env.content = env.content.slice(0, -1);
              // This is a folder
              env.classes.push("dir");
            } else {
              if (/(^|[^\\])[=*|]\s*$/.test(env.content)) {
                env.content = env.content.slice(0, -1);
              }

              var parts = env.content.toLowerCase().split(".");
              while (parts.length > 1) {
                parts.shift();
                // Ex. 'foo.min.js' would become '<span class="token keyword ext-min-js ext-js">foo.min.js</span>'
                env.classes.push("ext-" + parts.join("-"));
              }
            }

            if (env.content.charAt(0) === ".") {
              env.classes.push("dotfile");
            }
          }
        }
      });
    },
  });

  // Returns a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addPassthroughCopy("src/images");
  config.addPassthroughCopy("src/fonts");

  config.addTemplateFormats("css");

  config.addExtension("css", {
    outputFileExtension: "css",
    compile: function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.includes("_")) {
        return;
      }
      let result = postcss([
        require("cssnano")({
          preset: "default",
        }),
        require("postcss-jit-props")(require("open-props")),
        require("postcss-easy-import"),
        require("autoprefixer"),
      ])
        .process(inputContent, { from: inputPath })
        .then((result) => {
          return result.css;
        });

      return () => {
        return result;
      };
    },
    compileOptions: {
      cache: false,
    },
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
