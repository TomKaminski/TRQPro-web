import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"

export default class StaticPageContent extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: this.props.title,
        content: "Ładowanie...",
      }
    }
  }

  render() {
    let data = this.guardData()
    console.log(data.content)
    return (
      <Layout>
        <SEO title={this.props.title} />
        <h1>{this.props.title}</h1>

        <div
          dangerouslySetInnerHTML={{
            __html: marked(data.content),
          }}
        ></div>
      </Layout>
    )
  }
}
