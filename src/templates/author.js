import React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import IndexRightArticle from "../components/index/shared/IndexSmallArticle"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"

class AuthorTemplate extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Author" />
        {this.props.data.allStrapiArticle.edges.map(article => (
          <IndexRightArticle article={article.node} key={article.node.id} />
        ))}
        <IndexPager
          activePageIndex={this.props.pageContext.currentPage - 1}
          pageCount={this.props.data.allStrapiArticle.pageInfo.pageCount}
          onPageChangeCallback={page => {
            if (page === 0) {
              navigate(`/author/${this.props.pageContext.key}`)
            } else {
              navigate(`/author/${this.props.pageContext.key}/page/${page + 1}`)
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
      filter: { author: { id: { eq: $key } } }
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
