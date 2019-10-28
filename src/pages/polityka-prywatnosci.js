import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class PrivacyPolicyPage extends React.Component {
  render() {
    return (
      <StaticPageContent
        data={this.props.data}
        title={"Polityka prywatności"}
      />
    )
  }
}

export default PrivacyPolicyPage

export const pageQuery = graphql`
  query PrivacyPolicyQuery {
    allStrapiStatic(filter: { key: { eq: "polityka" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
