import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"

class WorkWithUsPage extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: "Pracuj z nami",
        content: "Ładowanie...",
      }
    }
  }

  render() {
    let data = this.guardData()
    return (
      <Layout>
        <SEO title="Pracuj z nami" />
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

export default WorkWithUsPage

export const pageQuery = graphql`
  query WorkWithUsQuery {
    allStrapiStatic(filter: { key: { eq: "pracujznami" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
