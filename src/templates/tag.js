import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"
import "../styles/tagCategoryResults.scss"
import { Row, Col } from "react-bootstrap"
import MiniArticleImageWrapper from "../components/index/shared/miniArticleImageWrapper"
import { injectIntl, navigate, FormattedMessage } from "gatsby-plugin-intl"

class TagTemplate extends React.Component {
  getTagName() {
    if (this.props.location.state) {
      return this.props.location.state.tagName
    } else {
      return this.props.pageContext.key
    }
  }

  render() {
    return (
      <Layout>
        <SEO title={`TRQPro - Tag - ${this.getTagName()}`} />
        <h1>{`TRQPro - ${this.getTagName()}`}</h1>
        <br></br>
        <p className="categoryTagResults">
          <FormattedMessage id="article.tag-results" />:{" "}
          <span className={"name"}>{this.getTagName()}</span>{" "}
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
                navigate(`/tag/${this.props.pageContext.key}`)
              } else {
                navigate(
                  `/tag/${this.props.pageContext.key}/strona/${page + 1}`
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

export default injectIntl(TagTemplate)

export const tagQuery = graphql`
  query TagTemplate(
    $key: String!
    $skip: Int!
    $limit: Int!
    $date: Date
    $isDefaultLanguage: Boolean!
  ) {
    allStrapiArticle(
      filter: {
        publishedAt: { lte: $date }
        tags: { elemMatch: { key: { eq: $key } } }
      }
      limit: $limit
      sort: { order: DESC, fields: publishedAt }
      skip: $skip
    ) {
      edges {
        node {
          id
          publishedAt
          strapiId
          title @include(if: $isDefaultLanguage)
          title_en @skip(if: $isDefaultLanguage)
          content @include(if: $isDefaultLanguage)
          content_en @skip(if: $isDefaultLanguage)
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
            name @include(if: $isDefaultLanguage)
            name_en @skip(if: $isDefaultLanguage)
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
