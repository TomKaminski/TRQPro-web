import React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layouts/layout"
import IndexRightArticle from "../components/index/shared/IndexSmallArticle"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"

class AuthorTemplate extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Author" />
        {this.props.data.allStrapiArticle.edges.map((article, i) => (
          <IndexRightArticle
            article={article.node}
            key={article.node.id}
            isLast={this.props.data.allStrapiArticle.edges.length === i + 1}
          />
        ))}
        <IndexPager
          activePageIndex={this.props.pageContext.currentPage - 1}
          pageCount={this.props.data.allStrapiArticle.pageInfo.pageCount}
          onPageChangeCallback={page => {
            if (page === 0) {
              navigate(`/autor/${this.props.pageContext.key}`)
            } else {
              navigate(
                `/autor/${this.props.pageContext.key}/strona/${page + 1}`
              )
            }
          }}
        />
      </Layout>
    )
  }
}

export default AuthorTemplate

export const query = graphql`
  query AuthorTemplate($key: Int!, $skip: Int!, $limit: Int!) {
    allStrapiArticle(
      filter: { isPublished: { eq: true }, author: { id: { eq: $key } } }
      limit: $limit
      sort: { order: DESC, fields: strapiId }
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          created_at
          strapiId
          content
          category {
            key
            name
          }
          fields {
            slug
          }
          author {
            id
            username
          }
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
