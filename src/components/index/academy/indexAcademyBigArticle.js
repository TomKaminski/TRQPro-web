import React from "react"
import TimeAndAuthor from "../shared/timeAndAuthor"
import Img from "gatsby-image"
import { Link } from "gatsby"
import removeMd from "remove-markdown"

export default class IndexAcademyBigArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding no-border"}>
        <Img fluid={this.props.article.image.childImageSharp.fluid} />
        <div className={"upper-text-container"}>
          <TimeAndAuthor
            author={this.props.article.author}
            date={this.props.article.created_at}
          />
        </div>
        <Link to={`/wpisy/${this.props.article.slug}`}>
          <h5 className="link-title">{this.props.article.title}</h5>
        </Link>
        <p className={"description"}>
          {removeMd(this.props.article.content.substring(0, 700).concat("..."))}
        </p>
        <Link
          className={"underlined-black-text"}
          to={`/wpisy/${this.props.article.slug}`}
        >
          Czytaj dalej
        </Link>
      </div>
    )
  }
}
