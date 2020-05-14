import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import winner from "../../images/winner.svg"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

const OngoingLeagueHeader = ({
  startDate,
  endDate,
  nextReadingDate,
  participantsLength,
  hasEnded,
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
            <FormattedMessage id="league.next-reading" />:
          </p>
          <p className={"league-stat"}>
            {hasEnded ? (
              <span style={{ color: "green" }}>
                <FormattedMessage id="league.finished" />:
              </span>
            ) : (
              new Date(nextReadingDate).toLocaleString()
            )}
          </p>
        </Col>
        <Col xs={6} md={3} style={{ display: "flex", alignItems: "end" }}>
          <div>
            <p className={"league-stat-header"}>
              <FormattedMessage id="league.end-date" />:
            </p>
            <p className={"league-stat"}>
              {new Date(endDate).toLocaleString()}
            </p>
          </div>
          <img src={winner} alt="winner" />
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

export default injectIntl(OngoingLeagueHeader)
