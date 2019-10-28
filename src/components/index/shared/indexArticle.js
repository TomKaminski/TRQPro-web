import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import TimeAndAuthor from "./timeAndAuthor"
import marked from "marked"

export default class IndexArticle extends React.Component {
  render() {
    return (
      <div
        key={this.props.article.id}
        className={"article-padding index-main-article"}
      >
        <Img fluid={this.props.article.image.childImageSharp.fluid} />
        <TimeAndAuthor
          author={this.props.article.author}
          date={this.props.article.created_at}
        />
        <Link to={`/${this.props.article.fields.slug}`}>
          <h1 className={"title"}>{this.props.article.title}</h1>
        </Link>
        <div
          className={"index-article-content description"}
          dangerouslySetInnerHTML={{
            __html: marked(
              this.props.article.content.substring(0, 500).concat("...")
            ),
          }}
        ></div>
        <Link
          to={`/${this.props.article.fields.slug}`}
          className="underlined-black-text"
        >
          Czytaj dalej
        </Link>
      </div>
    )
  }
}
