import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import "../styles/brands.scss"

import binance from "../images/brands/binance.png"
import bitmex from "../images/brands/bitmex.png"
import brave from "../images/brands/brave.png"
import deribit from "../images/brands/deribit.png"
import icmarkets from "../images/brands/icmarkets.png"
import kucoin from "../images/brands/kucoin.png"
import ledger from "../images/brands/ledger.png"
import maklerska from "../images/brands/maklerska.png"

const Brands = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <div id="brands">
            <a
              href="https://www.binance.com/?ref=37243377"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={binance} alt="logo" />
            </a>
            <a
              href="https://www.bitmex.com/register/kiQKAa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={bitmex} alt="logo" />
            </a>
            <a
              href="https://brave.com/trq647"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={brave} alt="logo" />
            </a>
            <a
              href="https://www.deribit.com/reg-7152.7312"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={deribit} alt="logo" />
            </a>
            <a
              href="https://www.icmarkets.com/?camp=23195"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icmarkets} alt="logo" />
            </a>
            <a
              href="https://www.kucoin.com/?rcode=tJeRc4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={kucoin} alt="logo" />
            </a>
            <a
              href="https://shop.ledger.com/?r=fb95c418f05d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ledger} alt="logo" />
            </a>
            <a
              href="https://maklerska.pl/ref/TRQPro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={maklerska} alt="logo" />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Brands
