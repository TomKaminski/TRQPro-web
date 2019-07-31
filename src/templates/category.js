import React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import IndexRightArticle from "../components/index/shared/IndexSmallArticle"
import IndexPager from "../components/index/shared/indexPager"

class CategoryTemplate extends React.Component {
  render() {
    console.log(this)
    return (
      <Layout>
        {this.props.data.allStrapiArticle.edges.map(article => (
          <IndexRightArticle article={article.node} key={article.node.id} />
        ))}
        <IndexPager
          activePageIndex={this.props.pageContext.currentPage - 1}
          pageCount={this.props.data.allStrapiArticle.pageInfo.pageCount}
          onPageChangeCallback={page => {
            if (page === 0) {
              navigate(`/category/${this.props.pageContext.key}`)
            } else {
              navigate(
                `/category/${this.props.pageContext.key}/page/${page + 1}`
              )
            }
          }}
        />
      </Layout>
    )
  }
}

export default CategoryTemplate

export const query = graphql`
  query CategoryTemplate($key: String!, $skip: Int!, $limit: Int!) {
    allStrapiArticle(
      filter: { category: { key: { eq: $key } } }
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
