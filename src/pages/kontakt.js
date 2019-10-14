import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"

class ContactPage extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: "Kontakt",
        content: "Ładowanie...",
      }
    }
  }

  render() {
    let data = this.guardData()
    return (
      <Layout>
        <SEO title="Kontakt" />
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

export default ContactPage

export const pageQuery = graphql`
  query ContactQuery {
    allStrapiStatic(filter: { key: { eq: "kontakt" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
