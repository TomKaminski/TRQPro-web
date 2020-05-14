import React from "react"
import { Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"
import { injectIntl, Link } from "gatsby-plugin-intl"
import removeMd from "remove-markdown"

class IndexMiniArticle extends React.Component {
  render() {
    let containerClass = this.props.removeBorder
      ? ""
      : "index-left-article article-padding"
    return (
      <div className={containerClass}>
        <Row className={"upper-text-container"}>
          <Col className={this.props.dateAlignRight ? "align-text-right" : ""}>
            <TimeAndAuthor
              author={this.props.article.author}
              date={this.props.article.publishedAt}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <Link to={`/${this.props.article.fields.slug}`}>
              <h5 className={"link-title"}>
                {this.props.intl.locale === "en"
                  ? this.props.article.title_en
                  : this.props.article.title}
              </h5>
            </Link>
          </Col>
          <Col xs={12} md={6} lg={8}>
            <p className={"description"}>
              {this.props.intl.locale === "en"
                ? removeMd(
                    this.props.article.content_en
                      .substring(0, this.props.articleLength || 250)
                      .concat("...")
                  )
                : removeMd(
                    this.props.article.content.substring(
                      0,
                      this.props.articleLength || 250
                    )
                  )}
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default injectIntl(IndexMiniArticle)
