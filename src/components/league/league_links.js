import React from "react"
import { Row, Col } from "react-bootstrap"
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

function LeagueLinks() {
  return (
    <Row className="league-link-container">
      <Col xs={6} md={3} className="margin-top-base">
        <Link to={"/liga-regulamin"}>
          <FormattedMessage id="league-links.rules" />
        </Link>
      </Col>
      <Col xs={6} md={3} className="margin-top-base">
        <Link to={"/liga-historia"}>
          <FormattedMessage id="league-links.history" />
        </Link>
      </Col>
      <Col xs={6} md={3} className="margin-top-base">
        <Link to={"/liga-ranking"}>
          <FormattedMessage id="league-links.ranking" />
        </Link>
      </Col>
      <Col xs={6} md={3}></Col>
    </Row>
  )
}

export default injectIntl(LeagueLinks)
