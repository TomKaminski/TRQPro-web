module.exports = {
  siteMetadata: {
    title: `TRQ Pro`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@tomaszkaminski`,
    twitterHandle: `@TRQPro`,
    url: `https://www.facebook.com/TRQPro/`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
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
        apiURL: process.env.DEPLOY_URL
          ? "https://trq-cms.herokuapp.com"
          : "http://localhost:1337",
        contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          "article",
          "user",
          "tag",
          "category",
        ],
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
        display: `minimal-ui`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `tags`, `category`, `name`],
        resolvers: {
          StrapiArticle: {
            title: node => node.title,
            category: node => node.category.name,
            tags: node => node.tags.map(tag => tag.name).join(", "),
            path: node => node.id,
            content: node => node.content.substring(0, 350).concat("..."),
            author: node => node.author,
            created_at: node => node.created_at,
          },
          StrapiCategory: {
            name: node => node.name,
            key: node => node.key,
          },
          StrapiTag: {
            name: node => node.name,
            key: node => node.key,
          },
        },
      },
    },
  ],
}
