import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import "../styles/footer.scss"
import logoImg from "../images/comparic_logo.png"
import logoBithubImg from "../images/bithub_logo.png"

import Brands from "./brands"

const Footer = () => {
  return (
    <div>
      <Brands></Brands>
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
                <li>
                  <Link to={"/pracuj-z-nami"}>Pracuj z nami</Link>
                </li>
              </ul>
            </Col>
            <Col md={3} sm={6} xs={12}>
              <p>Liga</p>
              <ul className="nav-list">
                {/* <li>
                <Link to={"/wyslij-nam-tips"}>Wyślij nam tips</Link>
              </li> */}
                <li>
                  <Link to={"/liga-regulamin"}>Regulamin</Link>
                </li>
                <li>
                  <Link to={"/liga"}>Aktualna liga</Link>
                </li>
                <li>
                  <Link to={"/liga-ranking"}>Ranking ligowy</Link>
                </li>
                <li>
                  <Link to={"/liga-historia"}>Historia rozgrywek</Link>
                </li>
              </ul>
            </Col>
            <Col md={3} sm={6} xs={12}></Col>
            <Col md={3} sm={6} xs={12}>
              <p>Patroni informacyjni</p>
              <ul className="nav-list">
                <li>
                  <a
                    href="https://comparic.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={logoImg}
                      id="comparic-logo"
                      className="patron-img"
                      alt="patron comparic"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://bithub.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={logoBithubImg}
                      id="bithub-logo"
                      className="patron-img"
                      alt="patron bithub"
                    />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <Row id="copyright">
            <Col>
              <div>
                © {new Date().getFullYear()} TRQPro. All rights reserved.
              </div>
            </Col>
            <Col>
              <ul className="nav-list social-list">
                <li className="margin-zero">
                  <a
                    href="https://www.facebook.com/TRQPro/"
                    className={"social-icon margin-zero"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon size={"1x"} icon={["fab", "facebook-f"]} />
                  </a>
                  <a
                    href="https://www.twitter.com/TRQPro/"
                    className={"social-icon margin-zero"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon size={"1x"} icon={["fab", "twitter"]} />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer
