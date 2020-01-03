import React from "react"
import { Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"
import { Link } from "gatsby"
import removeMd from "remove-markdown"

export default class IndexMiniArticle extends React.Component {
  render() {
    return (
      <div
        className={`border-grey-bottom-dotted index-left-article article-padding`}
      >
        <Row className={"upper-text-container"}>
          <Col className={this.props.dateAlignRight ? "align-text-right" : ""}>
            <TimeAndAuthor
              author={this.props.article.author}
              date={this.props.article.created_at}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <Link to={`/${this.props.article.fields.slug}`}>
              <h5 className={"link-title"}>{this.props.article.title}</h5>
            </Link>
          </Col>
          <Col xs={12} md={6} lg={8}>
            <p className={"description"}>
              {removeMd(
                this.props.article.content.substring(0, 250).concat("...")
              )}
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}
