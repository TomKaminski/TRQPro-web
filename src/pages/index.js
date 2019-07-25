import React from "react"
import Layout from "../components/layout"

import "../styles/index/index.scss"
import IndexMainSection from "../components/index/main/indexMainSection"
import IndexSection from "../components/index/currencies/indexCurrenciesSection"
import IndexAcademySection from "../components/index/academy/indexAcademySection"
import IndexICOSection from "../components/index/ico_mining/indexICOSection"
import IndexMarketAnalysisSection from "../components/index/market_analysis/indexMarketAnalysisSection"

export default class IndexPage extends React.Component {
  getArticlesForMainSection() {
    var computingArray = []
    this.props.data.allStrapiArticle.group.forEach(groupOfArticles => {
      console.log(groupOfArticles.fieldValue)
      groupOfArticles.edges.forEach(article => {
        computingArray.push(article.node)
      })
    })

    computingArray.sort((a, b) => b.strapiId - a.strapiId)

    return computingArray.slice(0, 7)
  }

  getArticlesForCategory(categoryTag) {
    return this.props.data.allStrapiArticle.group
      .find(group => {
        return group.fieldValue === categoryTag
      })
      .edges.map((element, _) => element.node)
  }

  getArticlesForCryptocurrenciesSection() {
    return this.getArticlesForCategory("cat-cryptocurrency").slice(0, 4)
  }

  getArticlesForMarketAnalysisSection() {
    return this.getArticlesForCategory("cat-at")
  }

  getArticlesForICOMiningSection() {
    return this.getArticlesForCategory("cat-ico-mining")
  }

  getArticlesForAcademySection() {
    return this.getArticlesForCategory("cat-academy")
  }

  render() {
    return (
      <Layout>
        <IndexMainSection articles={this.getArticlesForMainSection()} />

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
        <IndexICOSection
          sectionName="ICO / Mining"
          articles={this.getArticlesForICOMiningSection()}
        />

        {/* Index AT component */}
        <IndexMarketAnalysisSection
          sectionName="Analiza rynków"
          articles={this.getArticlesForMarketAnalysisSection()}
        />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle(sort: { fields: id, order: DESC }) {
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
