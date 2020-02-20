import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexBigArticle from "../shared/indexBigArticle"
import IndexMiniArticle from "../shared/indexMiniArticle"
import IndexSectionHeader from "./indexSectionHeader"

const IndexAcademySection = props => {
  if (props.articles) {
    return (
      <section className={"section-margin-and-padding"}>
        <IndexSectionHeader
          url={`/kategoria/cat-academy`}
          sectionName={props.sectionName}
        />
        <Row>
          {props.articles.length > 0 && (
            <Col xs={12} md={6}>
              <IndexBigArticle article={props.articles[0]} />
            </Col>
          )}

          {props.articles.length > 1 && (
            <Col xs={12} md={6}>
              <IndexBigArticle article={props.articles[1]} />
            </Col>
          )}
        </Row>
        {props.articles.length > 2 && (
          <Row>
            <Col xs={12}>
              <IndexMiniArticle article={props.articles[2]} />
            </Col>
          </Row>
        )}
      </section>
    )
  }
  return <div></div>
}

export default IndexAcademySection
