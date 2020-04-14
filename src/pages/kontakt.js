import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class ContactPage extends React.Component {
  render() {
    return (
      <StaticPageContent
        data={this.props.data}
        title={"Kontakt"}
        titlepath={"kontakt"}
      />
    )
  }
}

export default ContactPage

export const contatPageQuery = graphql`
  query ContactQuery {
    allStrapiStatic(filter: { key: { eq: "kontakt" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
