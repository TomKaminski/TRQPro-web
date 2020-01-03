import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexMiniArticle from "../shared/indexMiniArticle"

const IndexRestSection = props => {
  return (
    <section className={"section-margin-and-padding"}>
      <Row>
        <Col>
          <div className={"section"}>
            <div className={"section-title-container"}>
              <h2 className={"section-title"}>{props.sectionName}</h2>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {props.articles.map((element, i) => {
          return (
            <Col xs={12} key={i}>
              <IndexMiniArticle article={element} isLast={true} />
            </Col>
          )
        })}
      </Row>
    </section>
  )
}

export default IndexRestSection
