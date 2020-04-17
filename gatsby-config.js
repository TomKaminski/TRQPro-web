const moment = require("moment")

module.exports = {
  siteMetadata: {
    title: `TRQ Pro`,
    description: `TRQPro to polska społeczność traderów. Chat telegram, edukacja, analizy - forex, bitcoin i inne kryptowaluty. Cykliczne ligi TRQPro na giełdach krypto.`,
    author: `TRQ Pro`,
    twitterHandle: `@TRQPro`,
    url: `https://www.facebook.com/TRQPro/`,
    siteUrl: `https://www.trqpro.pl`,
  },
  plugins: [
    // `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.trqpro.pl",
        sitemap: "https://www.trqpro.pl/sitemap.xml",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "https://cms.trqpro.pl",
        contentTypes: ["article", "user", "tag", "category", "static"],
        queryLimit: 1000,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        icon: `./src/images/favicon.png`,
        display: `minimal-ui`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        head: true,
        trackingId: "UA-150986586-1",
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `tags`, `category`, `name`],
        resolvers: {
          StrapiArticle: {
            title: (node) => node.title,
            category: (node) => node.category.name,
            tags: (node) => node.tags.map((tag) => tag.name).join(", "),
            path: (node) => node.id,
            content: (node) => node.content.substring(0, 350).concat("..."),
            author: (node) => node.author,
            publishedAt: (node) => node.publishedAt,
            fields: (node) => node.fields,
          },
          StrapiCategory: {
            name: (node) => node.name,
            key: (node) => node.key,
          },
          StrapiTag: {
            name: (node) => node.name,
            key: (node) => node.key,
          },
        },
        filter: (node, getNode) => {
          let momentNowString = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss.SSS"
          )
          if (node.internal.type === "StrapiArticle") {
            return node.publishedAt <= momentNowString
          }
          return true
        },
      },
    },
  ],
}
