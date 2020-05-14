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

import telegramBtc from "../images/btc.png"
import telegramAT from "../images/analizy.png"
import telegramForex from "../images/forex.png"

import IndexSmallLeague from "../components/index/sections/indexSmallLeague"
import BinanceWidget from "../components/binance_widget"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

class IndexPage extends React.Component {
  getArticlesForSlideshow() {
    var computingArray = []
    this.props.data.allStrapiArticle.group.forEach((groupOfArticles) => {
      groupOfArticles.edges.forEach((article) => {
        computingArray.push(article.node)
      })
    })

    computingArray.sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1))

    return computingArray.slice(0, 5)
  }

  getArticlesForCategory(categoryTag, take) {
    let articles = this.props.data.allStrapiArticle.group.find((group) => {
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
        <SEO
          title={this.props.intl.formatMessage({ id: "header.home-title" })}
        />
        <ArticleSlideshow articles={this.getArticlesForSlideshow()} />
        <Container fluid={true} id="main-container" className={"page-padding"}>
          <Row style={{ visibility: "hidden", height: "1px" }}>
            <Col>
              <h1>
                <FormattedMessage id="article.trq-header" />
              </h1>
              <p>
                <i>
                  <FormattedMessage id="article.trq-description" />{" "}
                  <FormattedMessage id="article.trq-description-1" />{" "}
                  <FormattedMessage id="article.trq-description-2" />{" "}
                  <FormattedMessage id="article.trq-description-3" />
                </i>
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={9}>
              <Row>
                <Col xs={6} md={12} className={"flex-telegram-title-container"}>
                  <h5>
                    <FormattedMessage id="article.join-us" />
                  </h5>
                </Col>
                <Col
                  xs={6}
                  md={4}
                  className={"flex-telegram-container aligned-left"}
                >
                  <a
                    href="https://t.me/TRQProBTC"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={telegramBtc} alt="BTC telegram TRQPro" />
                  </a>
                </Col>
                <Col
                  xs={6}
                  md={4}
                  className={"flex-telegram-container aligned-right"}
                >
                  <a
                    href="https://t.me/TRQProAnalizy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={telegramAT} alt="Analizy telegram TRQPro" />
                  </a>
                </Col>
                <Col
                  xs={6}
                  md={4}
                  className={"flex-telegram-container aligned-left"}
                >
                  <a
                    href="https://t.me/TRQProForex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={telegramForex} alt="Forex telegram TRQPro" />
                  </a>
                </Col>
              </Row>
              <IndexCurrenciesSection
                sectionName={this.props.intl.formatMessage({
                  id: "common.cryptocurrency",
                })}
                articles={this.getArticlesForCryptocurrenciesSection()}
              />
            </Col>
            <Col xs={12} lg={3} className="d-none d-lg-block">
              <BinanceWidget />
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="trqpro"
                placeholder={
                  <p>
                    <FormattedMessage id="article.tweet-loading" />
                  </p>
                }
                lang="pl"
                noFooter
                options={{ height: 700 }}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} lg={9}>
              <IndexAcademySection
                sectionName={this.props.intl.formatMessage({
                  id: "common.academy",
                })}
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
                sectionName={this.props.intl.formatMessage({
                  id: "common.at",
                })}
                articles={this.getArticlesForMarketAnalysisSection()}
              />

              {restArticles.length > 0 && (
                <IndexRestSection
                  sectionName={this.props.intl.formatMessage({
                    id: "common.rest",
                  })}
                  articles={restArticles}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col className="d-block d-lg-none section-margin-and-padding">
              <BinanceWidget />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="d-block d-lg-none">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="trqpro"
                lang="pl"
                noFooter
                placeholder={
                  <p>
                    <FormattedMessage id="article.join-us" />
                  </p>
                }
                options={{ height: 700 }}
              />
            </Col>
            <Col xs={6} className="d-block d-lg-none">
              <IndexSmallLeague />
            </Col>
          </Row>

          <Row>
            <Col>
              <h1>
                <FormattedMessage id="article.trq-header" />
              </h1>
              <p>
                <i>
                  <FormattedMessage id="article.trq-description" />{" "}
                  <FormattedMessage id="article.trq-description-1" />{" "}
                  <FormattedMessage id="article.trq-description-2" />{" "}
                  <FormattedMessage id="article.trq-description-3" />
                </i>
              </p>
            </Col>
          </Row>
        </Container>
      </LayoutIndex>
    )
  }
}

export default injectIntl(IndexPage)

export const indexQuery = graphql`
  query IndexQuery1($date: Date, $isDefaultLanguage: Boolean!) {
    allStrapiArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: { publishedAt: { lte: $date } }
    ) {
      group(field: category___key, limit: 5) {
        totalCount
        fieldValue
        edges {
          node {
            id
            publishedAt
            strapiId
            title @include(if: $isDefaultLanguage)
            title_en @skip(if: $isDefaultLanguage)
            content @include(if: $isDefaultLanguage)
            content_en @skip(if: $isDefaultLanguage)
            category {
              key
              name @include(if: $isDefaultLanguage)
              name_en @skip(if: $isDefaultLanguage)
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
