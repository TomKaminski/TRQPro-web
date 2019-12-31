import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import "../styles/index/index.scss"
import IndexSection from "../components/index/currencies/indexCurrenciesSection"
import IndexAcademySection from "../components/index/academy/indexAcademySection"
import IndexICOMiningSection from "../components/index/ico_mining/indexICOSection"
import IndexMarketAnalysisSection from "../components/index/market_analysis/indexMarketAnalysisSection"
import SEO from "../components/seo"
import ArticleSlideshow from "../components/index/article_slideshow/article_slideshow"
import LayoutIndex from "../components/layouts/layout_index"
import { TwitterTimelineEmbed } from "react-twitter-embed"

export default class IndexPage extends React.Component {
  getArticlesForSlideshow() {
    var computingArray = []
    this.props.data.allStrapiArticle.group.forEach(groupOfArticles => {
      groupOfArticles.edges.forEach(article => {
        computingArray.push(article.node)
      })
    })

    computingArray.sort((a, b) => b.strapiId - a.strapiId)

    return computingArray.slice(0, 5)
  }

  getArticlesForCategory(categoryTag) {
    let articles = this.props.data.allStrapiArticle.group.find(group => {
      return group.fieldValue === categoryTag
    })

    if (articles) {
      return articles.edges.map((element, _) => element.node)
    } else {
      return []
    }
  }

  getArticlesForCryptocurrenciesSection() {
    var articles = this.getArticlesForCategory("cat-cryptocurrency")
    if (articles) {
      return articles.slice(0, 4)
    } else {
      return []
    }
  }

  getArticlesForMarketAnalysisSection() {
    return this.getArticlesForCategory("cat-at")
  }

  getArticlesForICOMiningSection() {
    let icoArticles = this.getArticlesForCategory("cat-ico")
    let miningArticles = this.getArticlesForCategory("cat-mining")

    var computingArray = []
    computingArray.push(...icoArticles)
    computingArray.push(...miningArticles)

    computingArray.sort((a, b) => b.strapiId - a.strapiId)

    return computingArray.slice(0, 5)
  }

  getArticlesForAcademySection() {
    return this.getArticlesForCategory("cat-academy")
  }

  render() {
    return (
      <LayoutIndex>
        <SEO title="Home" />
        <ArticleSlideshow articles={this.getArticlesForSlideshow()} />
        <Container fluid={true} id="main-container" className={"page-padding"}>
          <Row>
            <Col xs={12} md={10}>
              {/* <IndexMainSection articles={this.getArticlesForMainSection()} /> */}
              {/* Index cryptocurrencies component */}
              <IndexSection
                sectionName="Kryptowaluty"
                articles={this.getArticlesForCryptocurrenciesSection()}
              />

              {/* Index academy component */}
              <IndexAcademySection
                sectionName="Akademia"
                articles={this.getArticlesForAcademySection()}
              />

              {/* Index ICO/Mining component */}
              <IndexICOMiningSection
                sectionName="ICO / Mining"
                articles={this.getArticlesForICOMiningSection()}
              />

              {/* Index AT component */}
              <IndexMarketAnalysisSection
                sectionName="Analiza rynków"
                articles={this.getArticlesForMarketAnalysisSection()}
              />
            </Col>
            <Col xs={12} md={2}>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="trqpro"
                options={{ height: 1000 }}
              />
            </Col>
          </Row>
        </Container>
      </LayoutIndex>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle(
      sort: { fields: id, order: DESC }
      filter: { isPublished: { eq: true } }
    ) {
      group(field: category___key, limit: 5) {
        totalCount
        fieldValue
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
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 960) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
