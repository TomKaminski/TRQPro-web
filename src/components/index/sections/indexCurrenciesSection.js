import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexMiniArticle from "../shared/indexMiniArticle"
import { Link } from "gatsby"
import IndexSectionHeader from "./indexSectionHeader"

const IndexSectionVertical = props => {
  return (
    <section className={"section-margin-and-padding"}>
      <IndexSectionHeader
        url={`/kategoria/cat-cryptocurrency`}
        sectionName={props.sectionName}
      />
      <Row>
        {props.articles.map((element, i) => {
          return (
            <Col xs={12} key={i} style={{ minHeight: "150px" }}>
              <IndexMiniArticle article={element} />
            </Col>
          )
        })}
      </Row>
    </section>
  )
}

export default IndexSectionVertical
