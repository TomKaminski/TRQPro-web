import React from "react"
import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import "../../../styles/index/articleSlideshow.scss"
import ArticleSlideshowItem from "./article_slideshow_item"

export default class ArticleSlideshow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.articles)
  }

  render() {
    return (
      <div id="article-slideshow">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              Slideshow
            </Col>
            <Col xs={12} md={6}>
              <ArticleSlideshowItem article={this.props.articles[0]} />
            </Col>
          </Row>
        </Container>
        <div className={"bg"}></div>
      </div>
    )
  }
}
