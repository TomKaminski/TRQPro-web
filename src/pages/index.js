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
import IndexSmallLeague from "../components/index/sections/indexSmallLeague"

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
            <Col xs={12} md={4} className={"margin-bottom-base"}>
              <a
                href="https://t.me/TRQProAnalizy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={telegramImg} alt="Analizy telegram TRQPro" />
              </a>
            </Col>
            <Col xs={12} md={4} className={"margin-bottom-base"}>
              <a
                href="https://t.me/TRQProBTC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={telegramImg} alt="BTC telegram TRQPro" />
              </a>
            </Col>
            <Col xs={12} md={4} className={"margin-bottom-base"}>
              <a
                href="https://t.me/TRQProAlty"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={telegramImg} alt="Alty telegram TRQPro" />
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={9}>
              <IndexCurrenciesSection
                sectionName="Kryptowaluty"
                articles={this.getArticlesForCryptocurrenciesSection()}
              />
            </Col>
            <Col xs={12} lg={3} className="d-none d-lg-block">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="trqpro"
                placeholder={<p>Ładuję tweety...</p>}
                lang="pl"
                noFooter
                options={{ height: 700 }}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} lg={9}>
              <IndexAcademySection
                sectionName="Akademia"
                articles={this.getArticlesForAcademySection()}
              />
            </Col>
            <Col xs={12} lg={3} className="d-none d-lg-block">
              <IndexSmallLeague />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
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
          </Row>

          <Row>
            <Col xs={6} className="d-block d-lg-none">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="trqpro"
                lang="pl"
                noFooter
                placeholder={<p>Ładuję tweety...</p>}
                options={{ height: 700 }}
              />
            </Col>
            <Col xs={6} className="d-block d-lg-none">
              <IndexSmallLeague />
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
