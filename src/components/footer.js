import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import "../styles/footer.scss"

const Footer = () => {
  return (
    <footer>
      <Container fluid={true} className={"page-padding"}>
        <Row>
          <Col md={3} sm={6} xs={12}>
            <p>O nas</p>
            <ul className="nav-list">
              <li>
                <Link to={"/polityka-prywatnosci"}>Polityka prywatności</Link>
              </li>
              <li>
                <Link to={"/regulamin"}>Regulamin</Link>
              </li>
              <li>
                <Link to={"/kontakt"}>Kontakt</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <p>Informacje</p>
            <ul className="nav-list">
              <li>
                <Link to={"/pracuj-z-nami"}>Pracuj z nami</Link>
              </li>
              {/* <li>
                <Link to={"/wyslij-nam-tips"}>Wyślij nam tips</Link>
              </li> */}
              <li>
                <Link to={"/liga-regulamin"}>Liga - zasady</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6} xs={12}>
            {/* <p>Partnerzy</p>
            <ul className="nav-list">
              <li>
                <a
                  href="https://skyrocket.trade/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SkyRocket
                </a>
              </li>
            </ul> */}
          </Col>
          <Col md={3} sm={6} xs={12}>
            <p>Wsparcie</p>
            <ul className="nav-list">
              <li>
                Jeśli masz jakiekolwiek problemy i chcesz się z nami
                skontaktowac, nie wahaj się i wyślij wiadomosc.
              </li>
              <li>
                <a
                  href="https://www.facebook.com/TRQPro/"
                  className={"social-icon"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "facebook-f"]}
                    style={{ fontSize: "18px" }}
                  />
                </a>
                <a
                  href="https://www.twitter.com/TRQPro/"
                  className={"social-icon"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "twitter"]}
                    style={{ fontSize: "18px" }}
                  />
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
