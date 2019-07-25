import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexPager from "../shared/indexPager"
import IndexArticleWithCategory from "../shared/IndexArticleWithCategory"

const IndexSection = props => {
  return (
    <section className={"border-grey-bottom-dotted section-margin-and-padding"}>
      <Row>
        <Col>
          <div className={"section"}>
            <div className={"section-title-container"}>
              <h3 className={"section-title"}>{props.sectionName}</h3>
              <p className={"section-show-all"}>zobacz wszystkie</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className={"black-bg"} xs={12} sm={6} lg={3}>
          <IndexArticleWithCategory darkMode={true} />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <IndexArticleWithCategory />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <IndexArticleWithCategory />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <IndexArticleWithCategory />
        </Col>
      </Row>
    </section>
  )
}

export default IndexSection
