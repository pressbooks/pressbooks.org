module.exports = {
    title: "Pressbooks",
    description: "Open publishing. Open web. Open source.",
    plugins: ["@vuepress/medium-zoom", '@vuepress/blog'],
    head: [["link", { rel: "icon", type: "image/svg+xml", href: "/icon.svg" }]],
    themeConfig: {
        logo: '/icon.svg',
        nav: [
        {
                text: "Home",
                link: "/"
        },
          {
            text: "Blog",
            link: "/blog"
          },
          {
            text: "Documentation",
            link: "https://docs.pressbooks.org/"
          },
          {
              text: "Accessibility",
              link: "/accessibility/"
          },
          {
              text: "Support Pressbooks",
              link: "/support-pressbooks/"
          }
        ],
      },
}
