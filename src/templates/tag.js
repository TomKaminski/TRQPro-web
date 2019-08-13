import React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import IndexRightArticle from "../components/index/shared/IndexSmallArticle"
import IndexArticleWithCategory from "../components/index/shared/IndexArticleWithCategory"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"
import "../styles/tagCategoryResults.scss"
import { Row, Col } from "react-bootstrap"

class TagTemplate extends React.Component {
  getUpperArticles() {
    return this.props.data.allStrapiArticle.edges.slice(0, 4)
  }

  getRestArticles() {
    console.log(this.props.data.allStrapiArticle)
    return this.props.data.allStrapiArticle.edges.slice(5, 7)
  }

  render() {
    return (
      <Layout>
        <SEO title={`Tag - ${this.props.location.state.tagName}`} />
        <p className="categoryTagResults">
          Wyniki wpisów pod tagiem:{" "}
          <span className={"name"}>{this.props.location.state.tagName}</span>{" "}
        </p>
        <Row>
          {this.getUpperArticles().map((element, i) => {
            return (
              <Col
                xs={12}
                sm={6}
                lg={3}
                className={i === 0 ? "black-bg" : ""}
                key={i}
              >
                <IndexArticleWithCategory
                  article={element.node}
                  darkMode={i === 0}
                />
              </Col>
            )
          })}
        </Row>
        <div className="divider" />
        {this.getRestArticles().map(article => (
          <IndexRightArticle article={article.node} key={article.node.id} />
        ))}
        {this.props.data.allStrapiArticle.pageInfo.pageCount > 1 ? (
          <IndexPager
            activePageIndex={this.props.pageContext.currentPage - 1}
            pageCount={this.props.data.allStrapiArticle.pageInfo.pageCount}
            onPageChangeCallback={page => {
              if (page === 0) {
                navigate(`/tag/${this.props.pageContext.key}`)
              } else {
                navigate(`/tag/${this.props.pageContext.key}/page/${page + 1}`)
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

export default TagTemplate

export const query = graphql`
  query TagTemplate($key: String!, $skip: Int!, $limit: Int!) {
    allStrapiArticle(
      filter: { tags: { elemMatch: { key: { eq: $key } } } }
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
          image {
            publicURL
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
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
