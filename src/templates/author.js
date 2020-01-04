import React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layouts/layout"
import IndexMiniArticle from "../components/index/shared/indexMiniArticle"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"
import { Row, Col } from "react-bootstrap"

class AuthorTemplate extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Author" />

        <Row>
          {this.props.data.allStrapiArticle.edges.map((element, i) => {
            return (
              <Col xs={12} key={i}>
                <IndexMiniArticle article={element.node} articleLength={400} />
              </Col>
            )
          })}
        </Row>

        {this.props.data.allStrapiArticle.pageInfo.pageCount > 1 ? (
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
        ) : (
          <div className={"margin-bottom-40"} />
        )}
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
