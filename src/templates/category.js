import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"
import "../styles/tagCategoryResults.scss"
import { Row, Col } from "react-bootstrap"
import MiniArticleImageWrapper from "../components/index/shared/miniArticleImageWrapper"
import { injectIntl, FormattedMessage, navigate } from "gatsby-plugin-intl"

class CategoryTemplate extends React.Component {
  getCategoryName() {
    if (this.props.location.state) {
      return this.props.location.state.categoryName
    } else {
      return this.props.pageContext.key
    }
  }

  render() {
    return (
      <Layout>
        <SEO title={`TRQPro - Kategoria - ${this.getCategoryName()}`} />

        <h1>{`TRQPro - ${this.getCategoryName()}`}</h1>
        <br></br>
        <p className="categoryTagResults">
          <FormattedMessage id="article.category-results" />:{" "}
          <span className={"name"}>{this.getCategoryName()}</span>
        </p>
        <Row>
          {this.props.data.allStrapiArticle.edges.map((element, i) => {
            return (
              <Col xs={12} key={i}>
                <MiniArticleImageWrapper article={element.node} />
              </Col>
            )
          })}
        </Row>

        {this.props.data.allStrapiArticle.pageInfo.pageCount > 1 ? (
          <IndexPager
            activePageIndex={this.props.pageContext.currentPage - 1}
            pageCount={this.props.data.allStrapiArticle.pageInfo.pageCount}
            onPageChangeCallback={(page) => {
              if (page === 0) {
                navigate(`/kategoria/${this.props.pageContext.key}`)
              } else {
                navigate(
                  `/kategoria/${this.props.pageContext.key}/strona/${page + 1}`
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

export default injectIntl(CategoryTemplate)

export const categoryQuery = graphql`
  query CategoryTemplate(
    $key: String!
    $skip: Int!
    $limit: Int!
    $date: Date
  ) {
    allStrapiArticle(
      filter: { publishedAt: { lte: $date }, category: { key: { eq: $key } } }
      limit: $limit
      sort: { order: DESC, fields: publishedAt }
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          publishedAt
          strapiId
          content
          image {
            publicURL
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          fields {
            slug
          }
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
