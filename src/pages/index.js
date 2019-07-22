import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import IndexArticle from "../components/index/indexArticle"
import IndexArticleWithCategory from "../components/index/IndexArticleWithCategory"
import IndexRightArticle from "../components/index/IndexSmallArticle"

import { Row, Col } from "react-bootstrap"

import "../styles/index/index.scss"
import IndexSection from "../components/index/indexSection"
import IndexAcademySection from "../components/index/indexAcademySection"
import IndexMiniArticle from "../components/index/indexMiniArticle"
import IndexICOSection from "../components/index/indexICOSection"
import IndexAnalizaRynkowSection from "../components/index/indexAnalizaRynkowSection"

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section
          className={"border-grey-bottom-dotted section-margin-and-padding"}
        >
          <Row>
            <Col
              lg={{ order: 1, span: 3 }}
              xs={{ order: 2, span: 12 }}
              sm={{ order: 2, span: 6 }}
            >
              <IndexArticleWithCategory />
              <IndexMiniArticle dateAlignRight={true} />
              <IndexMiniArticle dateAlignRight={true} />
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
        </section>

        {/* Index cryptocurrencies component */}
        <IndexSection sectionName="Kryptowaluty" />

        {/* Index academy component */}
        <IndexAcademySection sectionName="Akademia" />

        {/* Index ICO/Mining component */}
        <IndexICOSection sectionName="ICO / Mining" />

        {/* Index AT component */}
        <IndexAnalizaRynkowSection sectionName="Analiza rynków" />
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
