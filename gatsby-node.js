const path = require(`path`)

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, "") // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = "ąàáãäâęèéëêìíïîòóöôùúüûñçć·/_,:;źżóśń"
  var to = "aaaaaaeeeeeiiiioooouuuuncć------zzosn"

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return str
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `StrapiArticle`) {
    console.log(node)
    createNodeField({
      node,
      name: `slug`,
      value: `wpisy/${node.strapiId}/${string_to_slug(node.title)}`,
    })
  }
}

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getArticles = makeRequest(
    graphql,
    `
    {
      allStrapiArticle {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      console.log(node)
      createPage({
        path: `/${node.fields.slug}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getPagedAuthors = makeRequest(
    graphql,
    `
    {
      allStrapiArticle {
        group(field: author___id, limit: 1) {
          fieldValue
          pageInfo {
            pageCount
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      reject(result.errors)
    }
    // ...
    // Create paged categories based on page count lol.
    const postsPerPage = 7
    result.data.allStrapiArticle.group.forEach(articleGroup => {
      Array.from({ length: articleGroup.pageInfo.pageCount }).forEach(
        (_, i) => {
          createPage({
            path:
              i === 0
                ? `/autor/${articleGroup.fieldValue}`
                : `/autor/${articleGroup.fieldValue}/strona/${i + 1}`,
            component: path.resolve(`src/templates/author.js`),
            context: {
              key: parseInt(articleGroup.fieldValue),
              limit: postsPerPage,
              skip: i * postsPerPage,
              pageCount: articleGroup.pageInfo.pageCount,
              currentPage: i + 1,
            },
          })
        }
      )
    })
  })

  const getPagedCategories = makeRequest(
    graphql,
    `
    {
      allStrapiArticle {
        group(field: category___key, limit: 1) {
          fieldValue
          pageInfo {
            pageCount
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      reject(result.errors)
    }
    // ...
    // Create paged categories based on page count lol.
    const postsPerPage = 7
    result.data.allStrapiArticle.group.forEach(articleGroup => {
      Array.from({ length: articleGroup.pageInfo.pageCount }).forEach(
        (_, i) => {
          createPage({
            path:
              i === 0
                ? `/kategoria/${articleGroup.fieldValue}`
                : `/kategoria/${articleGroup.fieldValue}/strona/${i + 1}`,
            component: path.resolve(`src/templates/category.js`),
            context: {
              key: articleGroup.fieldValue,
              limit: postsPerPage,
              skip: i * postsPerPage,
              pageCount: articleGroup.pageInfo.pageCount,
              currentPage: i + 1,
            },
          })
        }
      )
    })
  })

  const getPagedTags = makeRequest(
    graphql,
    `
    {
      allStrapiArticle {
        group(field: tags___key, limit: 1) {
          fieldValue
          pageInfo {
            pageCount
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      reject(result.errors)
    }
    // ...
    // Create paged categories based on page count lol.
    const postsPerPage = 7
    result.data.allStrapiArticle.group.forEach(articleGroup => {
      Array.from({ length: articleGroup.pageInfo.pageCount }).forEach(
        (_, i) => {
          createPage({
            path:
              i === 0
                ? `/tag/${articleGroup.fieldValue}`
                : `/tag/${articleGroup.fieldValue}/strona/${i + 1}`,
            component: path.resolve(`src/templates/tag.js`),
            context: {
              key: articleGroup.fieldValue,
              limit: postsPerPage,
              skip: i * postsPerPage,
              pageCount: articleGroup.pageInfo.pageCount,
              currentPage: i + 1,
            },
          })
        }
      )
    })
  })

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getPagedAuthors,
    getPagedCategories,
    getPagedTags,
  ])
}
