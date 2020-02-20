import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "gatsby"

const IndexSectionHeader = props => {
  return (
    <Row>
      <Col>
        <div className={"section"}>
          <div className={"section-title-container"}>
            <Link to={props.url} state={{ categoryName: props.sectionName }}>
              <h2 className={"section-title"}>{props.sectionName}</h2>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default IndexSectionHeader
