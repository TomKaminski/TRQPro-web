import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Reactmarkdown from "react-markdown"
import TimeAndAuthor from "../shared/timeAndAuthor"

export default class IndexArticle extends React.Component {
  render() {
    return (
      <div
        key={this.props.article.id}
        className={"article-padding index-main-article"}
      >
        <Img fluid={this.props.article.image.childImageSharp.fluid} />
        <TimeAndAuthor />
        <Link className="title" to={`/article/${this.props.article.id}`}>
          {this.props.article.title}
        </Link>
        <Reactmarkdown
          className={"index-article-content description"}
          source={this.props.article.content.substring(0, 700).concat("...")}
          transformImageUri={uri =>
            uri.startsWith("http") ? uri : `${process.env.IMAGE_BASE_URL}${uri}`
          }
        />
        <Link
          to={`/article/${this.props.article.id}`}
          className="underlined-black-text"
        >
          Czytaj dalej
        </Link>
      </div>
    )
  }
}
