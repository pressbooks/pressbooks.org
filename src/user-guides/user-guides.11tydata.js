export default {
  layout: "layouts/page.njk",

  permalink: function ({ title, slug }) {
    return `/user-guides/${slug ? slug : this.slugify(title)}/index.html`;
  },
};
