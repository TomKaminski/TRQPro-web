import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexMiniArticle from "./indexMiniArticle"
import Img from "gatsby-image"

export default class MiniArticleImageWrapper extends React.Component {
  render() {
    return (
      <div className={"article-padding index-left-article"}>
        <Row>
          <Col xs={12} md={5} lg={4}>
            <Img
              fluid={this.props.article.image.childImageSharp.fluid}
              imgStyle={{
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
              className={"index-article-image"}
            />
          </Col>
          <Col xs={12} md={7} lg={8}>
            <IndexMiniArticle
              article={this.props.article}
              articleLength={400}
              removeBorder={true}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
