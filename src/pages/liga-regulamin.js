import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class LeagueRulesPage extends React.Component {
  render() {
    return (
      <StaticPageContent
        data={this.props.data}
        title={"Liga TRQPro - regulamin rozgrywek"}
        pathname={`/liga-regulamin`}
      />
    )
  }
}

export default LeagueRulesPage

export const leagueRulesPageQuery = graphql`
  query LeagueRulesQuery($isDefaultLanguage: Boolean!) {
    allStrapiStatic(filter: { key: { eq: "leaguerules" } }, limit: 1) {
      nodes {
        title @include(if: $isDefaultLanguage)
        title_en @skip(if: $isDefaultLanguage)
        content @include(if: $isDefaultLanguage)
        content_en @skip(if: $isDefaultLanguage)
      }
    }
  }
`
