import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class WorkWithUsPage extends React.Component {
  render() {
    return (
      <StaticPageContent
        data={this.props.data}
        title={"TRQPro - Pracuj z nami"}
        titlepath={"pracuj-z-nami"}
      />
    )
  }
}

export default WorkWithUsPage

export const workWithUsPageQuery = graphql`
  query WorkWithUsQuery {
    allStrapiStatic(filter: { key: { eq: "pracujznami" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
