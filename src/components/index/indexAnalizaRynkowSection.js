import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexPager from "./indexPager"
import IndexMiniArticle from "./indexMiniArticle"
import IndexAnalizaRynkowBigArticle from "./indexAnalizaRynkowBigArticle"

const IndexAnalizaRynkowSection = props => {
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
        <Col xs={12} sm={12} lg={6} md={8}>
          <IndexAnalizaRynkowBigArticle />
        </Col>
        <Col xs={12} sm={12} lg={6} md={4}>
          <IndexMiniArticle />
          <IndexMiniArticle />
          <IndexMiniArticle />
          <IndexMiniArticle />
        </Col>
      </Row>
      <IndexPager />
    </section>
  )
}

export default IndexAnalizaRynkowSection
