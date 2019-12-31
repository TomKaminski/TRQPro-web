import React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layouts/layout"
import IndexRightArticle from "../components/index/shared/IndexSmallArticle"
import IndexArticleWithCategory from "../components/index/shared/IndexArticleWithCategory"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"
import "../styles/tagCategoryResults.scss"
import { Row, Col } from "react-bootstrap"

class CategoryTemplate extends React.Component {
  getUpperArticles() {
    return this.props.data.allStrapiArticle.edges.slice(0, 4)
  }

  getRestArticles() {
    return this.props.data.allStrapiArticle.edges.slice(4, 7)
  }

  getCategoryName() {
    if (this.props.location.state) {
      return this.props.location.state.categoryName
    } else {
      return this.props.pageContext.key
    }
  }

  render() {
    let restArticles = this.getRestArticles()
    return (
      <Layout>
        <SEO title={`Kategoria - ${this.getCategoryName()}`} />
        <p className="categoryTagResults">
          Wyniki wpisów pod kategorią:{" "}
          <span className={"name"}>{this.getCategoryName()}</span>{" "}
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
                  isLast={true}
                />
              </Col>
            )
          })}
        </Row>
        <div className="divider" />
        {restArticles.map((article, i) => (
          <IndexRightArticle
            article={article.node}
            key={article.node.id}
            isLast={restArticles.length === i + 1}
          />
        ))}
        {this.props.data.allStrapiArticle.pageInfo.pageCount > 1 ? (
          <IndexPager
            activePageIndex={this.props.pageContext.currentPage - 1}
            pageCount={this.props.data.allStrapiArticle.pageInfo.pageCount}
            onPageChangeCallback={page => {
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

export default CategoryTemplate

export const query = graphql`
  query CategoryTemplate($key: String!, $skip: Int!, $limit: Int!) {
    allStrapiArticle(
      filter: { isPublished: { eq: true }, category: { key: { eq: $key } } }
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
