import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"

class PrivacyPolicyPage extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: "Polityka prywatności",
        content: "Ładowanie...",
      }
    }
  }

  render() {
    let data = this.guardData()
    return (
      <Layout>
        <SEO title="Polityka prywatności" />
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

export default PrivacyPolicyPage

export const pageQuery = graphql`
  query PrivacyPolicyQuery {
    allStrapiStatic(filter: { key: { eq: "polityka" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
