import React from "react"
import TimeAndAuthor from "../shared/timeAndAuthor"
import Img from "gatsby-image"
import { Link } from "gatsby"

export default class IndexAcademyBigArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding"}>
        <Img fluid={this.props.article.image.childImageSharp.fluid} />
        <div className={"upper-text-container"}>
          <TimeAndAuthor
            author={this.props.article.author.username}
            date={this.props.article.created_at}
          />
        </div>
        <Link className="link-title" to={`/article/${this.props.article.id}`}>
          {this.props.article.title}
        </Link>
        <p className={"description"}>
          {this.props.article.content.substring(0, 700).concat("...")}
        </p>
        <Link
          className={"underlined-black-text"}
          to={`/article/${this.props.article.id}`}
        >
          Czytaj dalej
        </Link>
      </div>
    )
  }
}