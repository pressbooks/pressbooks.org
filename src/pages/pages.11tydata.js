export default {
  layout: "layouts/page.njk",

  permalink: function ({ title, slug }) {
    return `/${slug ? slug : this.slugify(title)}/index.html`;
  },
};
