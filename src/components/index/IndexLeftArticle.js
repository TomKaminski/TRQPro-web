import React from "react"
import { Row, Col } from "react-bootstrap"
import image from "../../images/img2.png"
export default class IndexLeftArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article"}>
        {/* {image != null ? <img src={image} alt="image" /> : null} */}
        <Row className={"upper-text-container"}>
          <Col className={"upper-text-note"}>forex</Col>
          <Col className={"upper-text-note right"}>29 min temu by User</Col>
        </Row>
        <a href="#" className={"link-title "}>
          Not for the Grumpy Ones: Another Collection of 20 Crypto Jokes
        </a>
        <p className={"description"}>
          Less than a day ago, the profile of the mysterious Bitcoin investor
          Satoshi Nakamoto returned to life for the first time since 2010. On
          the P2P Foundation online portal, the author...
        </p>
        <a href="#" className={"read-more"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
