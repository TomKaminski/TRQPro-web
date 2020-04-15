import React from "react"

import { Row, Col } from "react-bootstrap"
import bitmex_logo from "../../images/bitmex_logo.png"
import bybit_logo from "../../images/bybit_logo.png"
import binance_logo from "../../images/binance_logo.png"

const LeagueSignList = ({ participants }) => {
  let colLength = Math.ceil(participants.length / 3)

  return (
    <Row>
      <Col xs={12} md={6} lg={4}>
        {participants.slice(0, colLength).map((element, i) => {
          return (
            <p key={"user_" + i}>
              {i + 1}. {getExchangeImage(element.exchange)} {element.username}
            </p>
          )
        })}
      </Col>
      <Col xs={12} md={{ span: 6, order: 12 }} lg={{ span: 4, order: 1 }}>
        {participants.slice(colLength, colLength * 2).map((element, i) => {
          return (
            <p key={"user_" + i}>
              {i + 1 + colLength}. {getExchangeImage(element.exchange)}{" "}
              {element.username}
            </p>
          )
        })}
      </Col>
      <Col xs={12} md={{ span: 6, order: 1 }} lg={{ span: 4, order: 12 }}>
        {participants.slice(colLength * 2, colLength * 3).map((element, i) => {
          return (
            <p key={"user_" + i}>
              {i + 1 + colLength * 2}. {getExchangeImage(element.exchange)}{" "}
              {element.username}
            </p>
          )
        })}
      </Col>
    </Row>
  )
}

function getExchangeImage(exchange) {
  if (exchange === "bybit") {
    return (
      <img
        src={bybit_logo}
        style={{ height: "20px" }}
        alt="league bybit logo"
      />
    )
  } else if (exchange === "binance") {
    return (
      <img
        src={binance_logo}
        style={{ height: "20px" }}
        alt="league binance logo"
      />
    )
  } else {
    return (
      <img
        src={bitmex_logo}
        style={{ height: "18px" }}
        alt="league bitmex logo"
      />
    )
  }
}

export default LeagueSignList
