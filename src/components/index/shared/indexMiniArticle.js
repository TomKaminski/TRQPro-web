import React from "react"
import { Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"

export default class IndexMiniArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding"}>
        <Row className={"upper-text-container"}>
          <Col className={this.props.dateAlignRight ? "align-text-right" : ""}>
            <TimeAndAuthor />
          </Col>
        </Row>
        <a href="#" className={"link-title"}>
          Not for the Grumpy Ones: Another Collection of 20 Crypto Jokes
        </a>
        <p className={"description"}>
          Less than a day ago, the profile of the mysterious Bitcoin investor
          Satoshi Nakamoto returned to life for the first time since 2010. On
          the P2P Foundation online portal, the author...
        </p>
        <a href="#" className={"underlined-black-text"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
