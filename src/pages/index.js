import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import IndexArticle from "../components/index/indexArticle"
import IndexLeftArticle from "../components/index/IndexLeftArticle"
import IndexRightArticle from "../components/index/IndexRightArticle"

import { Row, Col } from "react-bootstrap"

import "../styles/index/index.scss"

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        {/* Index News component */}
        <Row>
          <Col
            lg={{ order: 1, span: 3 }}
            xs={{ order: 2, span: 12 }}
            sm={{ order: 2, span: 6 }}
          >
            <IndexLeftArticle />
            <IndexLeftArticle />
            <IndexLeftArticle />
          </Col>
          <Col
            xs={{ order: 1, span: 12 }}
            lg={{ order: 2, span: 6 }}
            sm={{ order: 1, span: 12 }}
          >
            {this.props.data.allStrapiArticle.edges.map(document => (
              <div key={document.node.id} className="index-item">
                <IndexArticle article={document.node} />
              </div>
            ))}
          </Col>
          <Col
            lg={{ order: 3, span: 3 }}
            xs={{ order: 3, span: 12 }}
            sm={{ order: 3, span: 6 }}
          >
            <IndexRightArticle />
            <IndexRightArticle />
            <IndexRightArticle />
          </Col>
        </Row>

        {/* Index cryptocurrencies component */}
        <Row></Row>

        {/* Index academy component */}
        <Row></Row>

        {/* Index ICO/Mining component */}
        <Row></Row>

        {/* Index AT component */}
        <Row></Row>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle(limit: 1) {
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
