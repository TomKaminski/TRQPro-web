import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class LeagueRulesPage extends React.Component {
  render() {
    return (
      <StaticPageContent data={this.props.data} title={"Liga - regulamin"} />
    )
  }
}

export default LeagueRulesPage

export const leagueRulesPageQuery = graphql`
  query LeagueRulesQuery {
    allStrapiStatic(filter: { key: { eq: "leaguerules" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
