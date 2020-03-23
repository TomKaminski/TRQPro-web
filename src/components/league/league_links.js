import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "gatsby"

export default () => (
  <Row className="league-link-container">
    <Col xs={6} md={3} className="margin-top-base">
      <Link to={"/liga-regulamin"}>przejdź do regulaminu</Link>
    </Col>
    <Col xs={6} md={3} className="margin-top-base">
      <Link to={"/liga-historia"}>przejdź do archiwum rozgrywek</Link>
    </Col>
    <Col xs={6} md={3} className="margin-top-base">
      <Link to={"/liga-ranking"}>przejdź do rankingu</Link>
    </Col>
    <Col xs={6} md={3}></Col>
  </Row>
)
