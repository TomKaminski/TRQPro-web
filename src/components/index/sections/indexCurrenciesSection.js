import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexMiniArticle from "../shared/indexMiniArticle"
import { Link } from "gatsby"

const IndexSectionVertical = props => {
  return (
    <section className={"section-margin-and-padding"}>
      <Row>
        <Col>
          <div className={"section"}>
            <div className={"section-title-container"}>
              <Link
                to={`/kategoria/cat-cryptocurrency`}
                state={{ categoryName: props.sectionName }}
              >
                <h2 className={"section-title"}>{props.sectionName}</h2>
              </Link>
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

export default IndexSectionVertical
