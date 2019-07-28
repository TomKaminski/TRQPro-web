import React from "react"
import { Row, Col } from "react-bootstrap"
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
        {props.articles.map((element, i) => {
          return (
            <Col xs={12} sm={6} lg={3} className={i === 0 ? "black-bg" : ""}>
              <IndexArticleWithCategory article={element} darkMode={i === 0} />
            </Col>
          )
        })}
      </Row>
    </section>
  )
}

export default IndexSection