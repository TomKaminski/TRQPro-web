module.exports = {
  siteMetadata: {
    title: `TRQ Pro`,
    description: `TRQPro jest społecznością stworzoną przez Traderów dla Traderów. Znajdziesz tu kompendium wiedzy na każdy możliwy temat dotyczący spekulacji wyłożone w prosty sposób. Dzielimy się swoimi taktykami rozgrywania pozycji, strategiami, analizami technicznymi i informacjami dotyczącymi walorów, które znamy i na których gramy. Pomagamy w zapoznaniu się z platformami, na których gramy, aby w głupi sposób nie tracić pieniędzy. Tropimy nieuczciwe grupy sygnałowe i ujawniając oszustwa przestrzegamy innych uczestników. Wszystko po to, aby wspólnie zarabiać na giełdzie.  
    Co ważne – robimy to wszystko za darmo, dlatego, że zarabiamy na rynkach, nie szkoleniach. W zamian za pomoc, oczekujemy jedynie zaangażowania w grupę i pomocy innym.`,
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
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Montserrat",
              variants: ["400", "600"],
            },
          ],
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.DEPLOY_URL
          ? "http://cms.trqpro.pl"
          : "http://localhost:1337",
        contentTypes: ["article", "user", "tag", "category"],
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
