const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `StrapiArticle`) {
    createNodeField({
      node,
      name: `slug`,
      value: `article/${node.id}`,
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
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/article/${node.id}`,
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
                ? `/author/${articleGroup.fieldValue}`
                : `/author/${articleGroup.fieldValue}/page/${i + 1}`,
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
                ? `/category/${articleGroup.fieldValue}`
                : `/category/${articleGroup.fieldValue}/page/${i + 1}`,
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
                : `/tag/${articleGroup.fieldValue}/page/${i + 1}`,
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
