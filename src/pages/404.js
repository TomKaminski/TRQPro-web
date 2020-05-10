import React from "react"

import SEO from "../components/seo"
import { Container } from "react-bootstrap"
import errorImg from "../images/error-404.svg"
import logoImg from "../images/brand_logo.png"
import "../styles/404.scss"

import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

const NotFoundPage = () => (
  <Container>
    <SEO title="404: Nie znaleziono" />
    <img src={logoImg} alt="logo" className={"logo"} />
    <div className={"container-inner"}>
      <img src={errorImg} alt="404" className={"error"} />
      <h4>What on TRQPro are you doing here?!</h4>
      <p>
        <FormattedMessage id="not-found.title" />
      </p>
      <Link to="/">
        <FormattedMessage id="not-found.take-me-away" />
      </Link>
    </div>
  </Container>
)

export default injectIntl(NotFoundPage)
