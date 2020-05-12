import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class PrivacyPolicyPage extends React.Component {
  render() {
    return (
      <StaticPageContent
        data={this.props.data}
        title={"TRQPro - Polityka prywatności"}
        titlepath={"polityka-prywatnosci"}
      />
    )
  }
}

export default PrivacyPolicyPage

export const privacyPolicyPageQuery = graphql`
  query PrivacyPolicyQuery($isDefaultLanguage: Boolean!) {
    allStrapiStatic(filter: { key: { eq: "polityka" } }, limit: 1) {
      nodes {
        title @include(if: $isDefaultLanguage)
        title_en @skip(if: $isDefaultLanguage)
        content @include(if: $isDefaultLanguage)
        content_en @skip(if: $isDefaultLanguage)
      }
    }
  }
`
