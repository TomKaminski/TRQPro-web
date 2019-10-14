import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"

class SendATipPage extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: "Wyślij nam tips",
        content: "Ładowanie...",
      }
    }
  }

  render() {
    let data = this.guardData()
    return (
      <Layout>
        <SEO title="Wyślij nam tips" />
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

export default SendATipPage

export const pageQuery = graphql`
  query SendATipQuery {
    allStrapiStatic(filter: { key: { eq: "wyslijnamtips" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
