import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Link from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../styles/footer.scss"

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={3} sm={6} xs={12}>
            <h5>O nas</h5>
            <ul className="nav-list">
              <li>
                <a href="#">Polityka prywatności</a>
              </li>
              <li>
                <a href="#">Warunki usługi</a>
              </li>
              <li>
                <a href="#">Kontakt</a>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>Informacje</h5>
            <ul className="nav-list">
              <li>
                <a href="#">Pracuj z nami</a>
              </li>
              <li>
                <a href="#">Wyślij nam tips</a>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>Partnerzy</h5>
            <ul className="nav-list">
              <li>
                <a href="#">SkyRocket</a>
              </li>
              <li>
                <a href="#">HolidayInn</a>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>Wsparcie</h5>
            <ul className="nav-list">
              <li>
                Jeśli masz jakiekolwiek problemy i chcesz się z nami
                skontaktowac, nie wahaj się i wyślij wiadomosc.
              </li>
              <li>
                <a href="#fb" className={"social-icon"}>
                  <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                </a>
                <a href="#fb" className={"social-icon"}>
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </a>
                <a href="#fb" className={"social-icon"}>
                  <FontAwesomeIcon icon={["fab", "youtube"]} />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row id="copyright">
          <div>© 2019 TRQPro. All rights reserved.</div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
