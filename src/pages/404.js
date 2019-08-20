import React from "react"

import SEO from "../components/seo"
import { Link } from "gatsby"
import { Container } from "react-bootstrap"
import errorImg from "../images/error-404.svg"
import logoImg from "../images/brand_logo.png"
import "../styles/404.scss"

const NotFoundPage = () => (
  <Container>
    <SEO title="404: Nie znaleziono" />
    <img src={logoImg} alt="logo" className={"logo"} />
    <div className={"container-inner"}>
      <img src={errorImg} alt="404" className={"error"} />
      <h4>What on TRQPro are you doing here?!</h4>
      <p>
        Dziwne.. Wygląda na to, ze strona którą próbujesz otworzyć nie istnieje.
      </p>
      <Link to="/">zabierz mnie stąd</Link>
    </div>
  </Container>
)

export default NotFoundPage
