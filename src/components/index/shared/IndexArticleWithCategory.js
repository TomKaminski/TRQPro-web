import React from "react"
import { Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"
import Img from "gatsby-image"
import { Link } from "gatsby"
import removeMd from "remove-markdown"

export default class IndexArticleWithCategory extends React.Component {
  render() {
    let textClass = this.props.darkMode === true ? " white-text" : ""
    return (
      <div
        className={`index-left-article article-padding ${
          this.props.isLast ? "no-border" : ""
        }`}
      >
        <Img fluid={this.props.article.image.childImageSharp.fluid} />
        <Row className={"upper-text-container" + textClass}>
          <Col className={"upper-text-note"}>
            {this.props.article.category.name}
          </Col>
          <Col xs={8} className={"align-text-right"}>
            <TimeAndAuthor
              author={this.props.article.author}
              date={this.props.article.created_at}
              textClass={textClass}
            />
          </Col>
        </Row>

        <Link to={`/${this.props.article.fields.slug}`}>
          <h5 className={"link-title" + textClass}>
            {this.props.article.title}
          </h5>
        </Link>
        <p className={"description" + textClass}>
          {removeMd(this.props.article.content.substring(0, 350).concat("..."))}
        </p>
        <Link
          className={"underlined-black-text" + textClass}
          to={`/${this.props.article.fields.slug}`}
        >
          Czytaj dalej
        </Link>
      </div>
    )
  }
}
