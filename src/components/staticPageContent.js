import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import marked from "marked"
import { injectIntl } from "gatsby-plugin-intl"

class StaticPageContent extends React.Component {
  guardData() {
    if (this.props.data.allStrapiStatic.nodes.length > 0) {
      return this.props.data.allStrapiStatic.nodes[0]
    } else {
      return {
        title: this.props.title,
        content: "Ładowanie...",
        content_en: "Loading...",
      }
    }
  }

  render() {
    let data = this.guardData()
    return (
      <Layout>
        <SEO title={this.props.title} pathname={`/${this.props.titlepath}`} />
        <h1>{this.props.title}</h1>

        <div
          dangerouslySetInnerHTML={{
            __html: marked(
              this.props.intl.locale == "en" ? data.content_en : data.content
            ),
          }}
        ></div>
      </Layout>
    )
  }
}

export default injectIntl(StaticPageContent)
