import React from "react"
import { Container, Row, Col } from "react-bootstrap"

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
          <p className={"league-stat-header"}>Data rozpoczęcia:</p>
          <p className={"league-stat"}>
            {new Date(startDate).toLocaleString()}
          </p>
        </Col>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>Data zakończenia:</p>
          <p className={"league-stat"}>{new Date(endDate).toLocaleString()}</p>
        </Col>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>Zapisy do:</p>
          <p className={"league-stat"}>
            {new Date(signingLimitDate).toLocaleString()}
          </p>
        </Col>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>Ilość uczestników:</p>
          <p className={"league-stat"}>{participantsLength}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default ComingLeagueHeader
