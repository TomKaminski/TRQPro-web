import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import "../styles/brands.scss"

import binance from "../images/brands/binance.png"
import bitmex from "../images/brands/bitmex.png"
import brave from "../images/brands/brave.png"
import deribit from "../images/brands/deribit.png"
import icmarkets from "../images/brands/icmarkets.png"
import kucoin from "../images/brands/kucoin.png"
import maklerska from "../images/brands/maklerska.png"
import bitbay from "../images/brands/bitbay.png"
import bybit from "../images/brands/bybit.png"
import binanceFutures from "../images/brands/binance_futures_logo.svg"
import dpm from "../images/brands/dpm.png"

const Brands = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <div id="brands">
            <a
              href="https://www.binance.com/en/register?ref=37243377"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={binance} alt="trq binance refferal link" />
            </a>
            <a
              href="https://www.binance.com/en/futures/ref/trqpro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={binanceFutures}
                alt="trq binance futures refferal link"
              />
            </a>
            <a
              href="https://www.bitmex.com/register/kiQKAa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={bitmex} alt="trq bitmex refferal link" />
            </a>
            <a
              href="https://www.bybit.com/en?affiliate_id=5089&group_id=0&group_type=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={bybit} alt="trq bybit refferal link" />
            </a>
            <a
              href="https://auth.bitbay.net/ref/ZXC3YqpQXZ2C"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={bitbay} alt="trq bitbay refferal link" />
            </a>
            <a
              href="https://brave.com/trq647"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={brave} alt="trq brave refferal link" />
            </a>
            <a
              href="https://www.deribit.com/reg-7152.7312"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={deribit} alt="trq deribit refferal link" />
            </a>
            <a
              href="https://www.icmarkets.com/?camp=23195"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icmarkets} alt="trq icmarkets refferal link" />
            </a>
            <a
              href="https://www.kucoin.com/?rcode=tJeRc4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={kucoin} alt="trq kucoin refferal link" />
            </a>
            <a
              href="https://deepmarketlevel.com/register?ref=a1546f23f5eb5adc56f1bb7d698ef467c46e4796"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={dpm} alt="trq dpm refferal link" />
            </a>
            <a
              href="https://maklerska.pl/ref/TRQPro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={maklerska} alt="trq maklerska refferal link" />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Brands
