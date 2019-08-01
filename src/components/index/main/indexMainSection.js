import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexArticleWithCategory from "../shared/IndexArticleWithCategory"
import IndexMiniArticle from "../shared/indexMiniArticle"
import IndexRightArticle from "../shared/IndexSmallArticle"
import IndexArticle from "../shared/indexArticle"

export default class IndexMainSection extends React.Component {
  renderLeftColumn(leftSideArticles) {
    return leftSideArticles.map((element, i) => {
      if (i === 0) {
        return <IndexArticleWithCategory article={element} key={i} />
      } else {
        return (
          <IndexMiniArticle dateAlignRight={true} article={element} key={i} />
        )
      }
    })
  }

  renderRightColumn(rightSideArticles) {
    return rightSideArticles.map((element, i) => (
      <IndexRightArticle article={element} key={i} />
    ))
  }

  render() {
    if (this.props.articles && this.props.articles.length > 0) {
      let mainArticle = this.props.articles[0]
      let leftSideArticles = this.props.articles.slice(1, 4)
      let rightSideArticles = this.props.articles.slice(4, 7)

      return (
        <section
          className={"border-grey-bottom-dotted section-margin-and-padding"}
        >
          <Row>
            <Col
              lg={{ order: 1, span: 3 }}
              xs={{ order: 2, span: 12 }}
              sm={{ order: 2, span: 6 }}
            >
              {this.renderLeftColumn(leftSideArticles)}
            </Col>
            <Col
              xs={{ order: 1, span: 12 }}
              lg={{ order: 2, span: 6 }}
              sm={{ order: 1, span: 12 }}
            >
              <div key={mainArticle.strapiId} className="index-item">
                <IndexArticle article={mainArticle} />
              </div>
            </Col>
            <Col
              lg={{ order: 3, span: 3 }}
              xs={{ order: 3, span: 12 }}
              sm={{ order: 3, span: 6 }}
            >
              {this.renderRightColumn(rightSideArticles)}
            </Col>
          </Row>
        </section>
      )
    } else {
      return <div></div>
    }
  }
}
