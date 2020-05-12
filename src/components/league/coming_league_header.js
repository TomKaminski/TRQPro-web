import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

const ComingLeagueHeader = ({
  startDate,
  endDate,
  signingLimitDate,
  participantsLength,
}) => {
  return (
    <Container fluid={true} className={"league-stat-container"}>
      <Row>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>
            <FormattedMessage id="league.start-date" />:
          </p>
          <p className={"league-stat"}>
            {new Date(startDate).toLocaleString()}
          </p>
        </Col>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>
            <FormattedMessage id="league.end-date" />:
          </p>
          <p className={"league-stat"}>{new Date(endDate).toLocaleString()}</p>
        </Col>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>
            <FormattedMessage id="league.sign-until" />:
          </p>
          <p className={"league-stat"}>
            {new Date(signingLimitDate).toLocaleString()}
          </p>
        </Col>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>
            <FormattedMessage id="league.participants" />:
          </p>
          <p className={"league-stat"}>{participantsLength}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default injectIntl(ComingLeagueHeader)
