import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class RulesPage extends React.Component {
  render() {
    return <StaticPageContent data={this.props.data} title={"Regulamin"} />
  }
}

export default RulesPage

export const rulesPageQuery = graphql`
  query RulesQuery {
    allStrapiStatic(filter: { key: { eq: "regulamin" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
