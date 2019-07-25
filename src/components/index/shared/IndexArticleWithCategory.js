import React from "react"
import { Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"
import Img from "gatsby-image"
import { Link } from "gatsby"

export default class IndexArticleWithCategory extends React.Component {
  render() {
    let textClass = this.props.darkMode == true ? " white-text" : ""
    return (
      <div className={"index-left-article article-padding"}>
        <Img fluid={this.props.article.image.childImageSharp.fluid} />
        <Row className={"upper-text-container" + textClass}>
          <Col className={"upper-text-note"}>forex</Col>
          <Col className={"align-text-right"}>
            <TimeAndAuthor textClass={textClass} />
          </Col>
        </Row>

        <Link
          className={"link-title" + textClass}
          to={`/article/${this.props.article.id}`}
        >
          {this.props.article.title}
        </Link>
        <p className={"description" + textClass}>
          {this.props.article.content.substring(0, 350).concat("...")}
        </p>
        <a href="#" className={"underlined-black-text" + textClass}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
