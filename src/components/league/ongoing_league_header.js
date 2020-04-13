import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import winner from "../../images/winner.svg"

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
          <p className={"league-stat-header"}>Data rozpoczęcia:</p>
          <p className={"league-stat"}>
            {new Date(startDate).toLocaleString()}
          </p>
        </Col>
        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>Następny odczyt:</p>
          <p className={"league-stat"}>
            {hasEnded ? (
              <span style={{ color: "green" }}>Liga zakończona</span>
            ) : (
              new Date(nextReadingDate).toLocaleString()
            )}
          </p>
        </Col>
        <Col xs={6} md={3} style={{ display: "flex", alignItems: "end" }}>
          <div>
            <p className={"league-stat-header"}>Data zakończenia:</p>
            <p className={"league-stat"}>
              {new Date(endDate).toLocaleString()}
            </p>
          </div>
          <img src={winner} alt="" />
        </Col>

        <Col xs={6} md={3}>
          <p className={"league-stat-header"}>Ilość uczestników:</p>
          <p className={"league-stat"}>{participantsLength}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default OngoingLeagueHeader
