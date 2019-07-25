import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexArticleWithCategory from "../shared/IndexArticleWithCategory"
import IndexMiniArticle from "../shared/indexMiniArticle"
import IndexRightArticle from "../shared/IndexSmallArticle"
import IndexArticle from "../shared/indexArticle"

export default class IndexMainSection extends React.Component {
  render() {
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
            <IndexArticleWithCategory />
            <IndexMiniArticle dateAlignRight={true} />
            <IndexMiniArticle dateAlignRight={true} />
          </Col>
          <Col
            xs={{ order: 1, span: 12 }}
            lg={{ order: 2, span: 6 }}
            sm={{ order: 1, span: 12 }}
          >
            <div key={this.props.mainArticle.node.id} className="index-item">
              <IndexArticle article={this.props.mainArticle.node} />
            </div>
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
    )
  }
}
