import React from "react"
import TimeAndAuthor from "./timeAndAuthor"
import Img from "gatsby-image"
import { Link } from "gatsby"
import removeMd from "remove-markdown"

export default class IndexBigArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding no-border"}>
        <Img
          fluid={this.props.article.image.childImageSharp.fluid}
          imgStyle={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          className={"index-article-image"}
        />
        <div className={"upper-text-container"}>
          <TimeAndAuthor
            author={this.props.article.author}
            date={this.props.article.publishedAt}
          />
        </div>
        <Link to={`/${this.props.article.fields.slug}`}>
          <h5 className="link-title">{this.props.article.title}</h5>
        </Link>
        <p className={"description"}>
          {removeMd(this.props.article.content.substring(0, 400).concat("..."))}
        </p>
      </div>
    )
  }
}
