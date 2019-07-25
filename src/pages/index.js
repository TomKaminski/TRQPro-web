import React from "react"
import Layout from "../components/layout"

import "../styles/index/index.scss"
import IndexMainSection from "../components/index/main/indexMainSection"
import IndexSection from "../components/index/currencies/indexCurrenciesSection"
import IndexAcademySection from "../components/index/academy/indexAcademySection"
import IndexICOSection from "../components/index/ico_mining/indexICOSection"
import IndexMarketAnalysisSection from "../components/index/market_analysis/indexMarketAnalysisSection"

export default class IndexPage extends React.Component {
  getNewestArticle() {
    var computingArray = []
    this.props.data.allStrapiArticle.group.forEach(groupOfArticles => {
      console.log(groupOfArticles.fieldValue)
      groupOfArticles.edges.forEach(article => {
        computingArray.push(article)
      })
    })

    return computingArray[0]
  }

  render() {
    return (
      <Layout>
        <IndexMainSection mainArticle={this.getNewestArticle()} />

        {/* Index cryptocurrencies component */}
        <IndexSection sectionName="Kryptowaluty" />

        {/* Index academy component */}
        <IndexAcademySection sectionName="Akademia" />

        {/* Index ICO/Mining component */}
        <IndexICOSection sectionName="ICO / Mining" />

        {/* Index AT component */}
        <IndexMarketAnalysisSection sectionName="Analiza rynków" />
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
