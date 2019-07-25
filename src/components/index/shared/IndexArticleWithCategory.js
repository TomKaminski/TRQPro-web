import React from "react"
import { Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"
import image from "../../../images/img2.png"

export default class IndexArticleWithCategory extends React.Component {
  render() {
    let textClass = this.props.darkMode == true ? " white-text" : ""
    return (
      <div className={"index-left-article article-padding"}>
        {image != null ? <img src={image} alt="image" /> : null}
        <Row className={"upper-text-container" + textClass}>
          <Col className={"upper-text-note"}>forex</Col>
          <Col className={"align-text-right"}>
            <TimeAndAuthor textClass={textClass} />
          </Col>
        </Row>
        <a href="#" className={"link-title" + textClass}>
          Not for the Grumpy Ones: Another Collection of 20 Crypto Jokes
        </a>
        <p className={"description" + textClass}>
          Less than a day ago, the profile of the mysterious Bitcoin investor
          Satoshi Nakamoto returned to life for the first time since 2010. On
          the P2P Foundation online portal, the author...
        </p>
        <a href="#" className={"underlined-black-text" + textClass}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
