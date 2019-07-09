import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import IndexArticle from "../components/index/indexArticle"

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        {this.props.data.allStrapiArticle.edges.map(document => (
          <div key={document.node.id}>
            <IndexArticle article={document.node} />
          </div>
        ))}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          content
        }
      }
    }
  }
`
