import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class ContactPage extends React.Component {
  render() {
    return (
      <StaticPageContent
        data={this.props.data}
        title={"TRQPro - Kontakt"}
        titlepath={"kontakt"}
      />
    )
  }
}

export default ContactPage

export const contatPageQuery = graphql`
  query ContactQuery($isDefaultLanguage: Boolean!) {
    allStrapiStatic(filter: { key: { eq: "kontakt" } }, limit: 1) {
      nodes {
        title @include(if: $isDefaultLanguage)
        title_en @skip(if: $isDefaultLanguage)
        content @include(if: $isDefaultLanguage)
        content_en @skip(if: $isDefaultLanguage)
      }
    }
  }
`
