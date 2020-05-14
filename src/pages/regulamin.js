import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class RulesPage extends React.Component {
  render() {
    return (
      <StaticPageContent
        data={this.props.data}
        title={"TRQPro - Regulamin"}
        titlepath={"regulamin"}
      />
    )
  }
}

export default RulesPage

export const rulesPageQuery = graphql`
  query RulesQuery($isDefaultLanguage: Boolean!) {
    allStrapiStatic(filter: { key: { eq: "regulamin" } }, limit: 1) {
      nodes {
        title @include(if: $isDefaultLanguage)
        title_en @skip(if: $isDefaultLanguage)
        content @include(if: $isDefaultLanguage)
        content_en @skip(if: $isDefaultLanguage)
      }
    }
  }
`
