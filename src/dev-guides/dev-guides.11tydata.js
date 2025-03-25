export default {
  layout: "layouts/page.njk",

  permalink: function ({ title, slug }) {
    return `/dev-guides/${slug ? slug : this.slugify(title)}/index.html`;
  },
};
