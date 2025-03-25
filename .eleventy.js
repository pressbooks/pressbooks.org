import rssPlugin from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import path from "node:path";
import postcss from "postcss";
import slugify from "@sindresorhus/slugify";
import cssnanoPlugin from "cssnano";
import postcssJitProps from "postcss-jit-props";
import autoprefixer from "autoprefixer";
import atImport from "postcss-import";

// Filters
import dateFilter from "./src/filters/date-filter.js";
import w3DateFilter from "./src/filters/w3-date-filter.js";

export default (eleventyConfig) => {
  // Add footnotes and anchor links to Markdown
  const markdownIt = MarkdownIt;
  const markdownLib = markdownIt({
    html: true,
  })
    .use(markdownItFootnote)
    .use(markdownItAnchor, { slugify: slugify });

  eleventyConfig.setLibrary("md", markdownLib);

  // Add filters
  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("w3DateFilter", w3DateFilter);

  // Plugins
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight, {
    init: ({ Prism }) => {
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

      Prism.hooks.add("wrap", (env) => {
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

              const parts = env.content.toLowerCase().split(".");
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
  eleventyConfig.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("src/admin/config.yml");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ "src/icons": "/" });

  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: (inputContent, inputPath) => {
      const parsed = path.parse(inputPath);
      if (parsed.name.includes("_")) {
        return;
      }
      const result = postcss([
        cssnanoPlugin({
          preset: "default",
        }),
        atImport(),
        postcssJitProps({
          files: ["./node_modules/open-props/open-props.min.css"],
        }),
        autoprefixer(),
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
