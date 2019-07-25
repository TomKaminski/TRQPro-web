import React from "react"
import { Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"
import { Link } from "gatsby"

export default class IndexMiniArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding"}>
        <Row className={"upper-text-container"}>
          <Col className={this.props.dateAlignRight ? "align-text-right" : ""}>
            <TimeAndAuthor />
          </Col>
        </Row>
        <Link className={"link-title"} to={`/article/${this.props.article.id}`}>
          {this.props.article.title}
        </Link>
        <p className={"description"}>
          {this.props.article.content.substring(0, 350).concat("...")}
        </p>
        <a href="#" className={"underlined-black-text"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
