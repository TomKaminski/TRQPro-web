import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"

class LeagueRulesPage extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: "Liga - Regulamin",
        content: "Ładowanie...",
      }
    }
  }

  render() {
    let data = this.guardData()
    return (
      <Layout>
        <SEO title="Liga - Regulamin" />
        <p
          dangerouslySetInnerHTML={{
            __html: marked(data.content),
          }}
        ></p>
      </Layout>
    )
  }
}

export default LeagueRulesPage

export const pageQuery = graphql`
  query LeagueRulesQuery {
    allStrapiStatic(filter: { key: { eq: "leaguerules" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
