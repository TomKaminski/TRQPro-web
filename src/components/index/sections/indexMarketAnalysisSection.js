import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexBigArticle from "../shared/indexBigArticle"
import IndexSectionHeader from "./indexSectionHeader"

const IndexMarketAnalysisSection = props => {
  if (props.articles) {
    return (
      <section className={"section-margin-and-padding"}>
        <IndexSectionHeader
          url={`/kategoria/cat-at`}
          sectionName={props.sectionName}
        />
        <Row>
          {props.articles.map((art, i) => {
            return (
              <Col xs={12} md={6} key={i}>
                <IndexBigArticle article={art} />
              </Col>
            )
          })}
        </Row>
      </section>
    )
  } else {
    return <div></div>
  }
}

export default IndexMarketAnalysisSection
