import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexBigArticle from "../shared/indexBigArticle"
import { Link } from "gatsby"

const IndexMarketAnalysisSection = props => {
  if (props.articles) {
    return (
      <section className={"section-margin-and-padding"}>
        <Row>
          <Col>
            <div className={"section"}>
              <div className={"section-title-container"}>
                <Link
                  to={`/kategoria/cat-at`}
                  state={{ categoryName: props.sectionName }}
                >
                  <h2 className={"section-title"}>{props.sectionName}</h2>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
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
      </section>
    )
  } else {
    return <div></div>
  }
}

export default IndexMarketAnalysisSection
