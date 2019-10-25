import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"

class RulesPage extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: "Regulamin",
        content: "Ładowanie...",
      }
    }
  }

  render() {
    let data = this.guardData()
    return (
      <Layout>
        <SEO title="Regulamin" />
        <h2>{data.title}</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: marked(data.content),
          }}
        ></p>
      </Layout>
    )
  }
}

export default RulesPage

export const pageQuery = graphql`
  query RulesQuery {
    allStrapiStatic(filter: { key: { eq: "regulamin" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
