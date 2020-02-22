import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Container, Row, Col } from "react-bootstrap"
import TimeAndAuthor from "../shared/timeAndAuthor"
import removeMd from "remove-markdown"

export default class ArticleSlideshowItem extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col
            xs={{ order: 12, span: 12 }}
            md={{ order: 1, span: 6 }}
            className="slide-content-container"
          >
            <p className={"slide-category"}>
              {this.props.article.category.name}
            </p>
            <Link to={`/${this.props.article.fields.slug}`}>
              <h5 className={"link-title white-text"}>
                {this.props.article.title}
              </h5>
            </Link>
            <p className={"description"}>
              {removeMd(
                this.props.article.content.substring(0, 250).concat("...")
              )}
            </p>
            <TimeAndAuthor
              author={this.props.article.author}
              date={this.props.article.publishedAt}
              textClass={"time-and-author-link"}
            />
          </Col>
          <Col
            xs={{ order: 1, span: 12 }}
            md={{ order: 12, span: 6 }}
            lg={{ span: 5, offset: 1 }}
            className="slide-image-container"
          >
            <Img
              fluid={this.props.article.image.childImageSharp.fluid}
              className="slide-image"
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
