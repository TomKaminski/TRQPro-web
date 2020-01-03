import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import "../styles/index/index.scss"
import IndexCurrenciesSection from "../components/index/sections/indexCurrenciesSection"
import IndexRestSection from "../components/index/sections/indexRestSection"
import IndexAcademySection from "../components/index/sections/indexAcademySection"
import IndexMarketAnalysisSection from "../components/index/sections/indexMarketAnalysisSection"
import SEO from "../components/seo"
import ArticleSlideshow from "../components/index/article_slideshow/article_slideshow"
import LayoutIndex from "../components/layouts/layout_index"
import { TwitterTimelineEmbed } from "react-twitter-embed"

import telegramImg from "../images/telegram_feed.png"

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

  getArticlesForCategory(categoryTag, take) {
    let articles = this.props.data.allStrapiArticle.group.find(group => {
      return group.fieldValue === categoryTag
    })

    if (articles) {
      if (take) {
        return articles.edges.map((element, _) => element.node).slice(0, take)
      }
      return articles.edges.map((element, _) => element.node)
    } else {
      return []
    }
  }

  getArticlesForCryptocurrenciesSection() {
    var articles = this.getArticlesForCategory("cat-cryptocurrency")
    if (articles) {
      return articles.slice(0, 5)
    } else {
      return []
    }
  }

  getArticlesForMarketAnalysisSection() {
    return this.getArticlesForCategory("cat-at", 2)
  }

  getArticlesForAcademySection() {
    return this.getArticlesForCategory("cat-academy", 3)
  }

  getArticlesForRestSection() {
    let icoArticles = this.getArticlesForCategory("cat-ico")
    let miningArticles = this.getArticlesForCategory("cat-mining")
    let forexArticles = this.getArticlesForCategory("cat-forex")

    var computingArray = []
    computingArray.push(...icoArticles)
    computingArray.push(...miningArticles)
    computingArray.push(...forexArticles)

    computingArray.sort((a, b) => b.strapiId - a.strapiId)

    return computingArray.slice(0, 5)
  }

  render() {
    let restArticles = this.getArticlesForRestSection()
    return (
      <LayoutIndex>
        <SEO title="Home" />
        <ArticleSlideshow articles={this.getArticlesForSlideshow()} />
        <Container fluid={true} id="main-container" className={"page-padding"}>
          <Row>
            <Col xs={12} md={8} lg={9}>
              <img src={telegramImg} className={"margin-bottom-base"} />

              <IndexCurrenciesSection
                sectionName="Kryptowaluty"
                articles={this.getArticlesForCryptocurrenciesSection()}
              />

              <IndexAcademySection
                sectionName="Akademia"
                articles={this.getArticlesForAcademySection()}
              />

              <IndexMarketAnalysisSection
                sectionName="Analizy"
                articles={this.getArticlesForMarketAnalysisSection()}
              />

              {restArticles.length > 0 && (
                <IndexRestSection
                  sectionName="Pozostałe"
                  articles={restArticles}
                />
              )}
            </Col>
            <Col xs={12} md={4} lg={3}>
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
                fluid(maxWidth: 1920) {
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
