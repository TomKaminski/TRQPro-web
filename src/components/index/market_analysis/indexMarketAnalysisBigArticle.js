import React from "react"
import TimeAndAuthor from "../shared/timeAndAuthor"
import Img from "gatsby-image"
import { Link } from "gatsby"

export default class IndexMarketAnalysisBigArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding"}>
        <Img fluid={this.props.article.image.childImageSharp.fluid} />
        <div className={"upper-text-container"}>
          <TimeAndAuthor />
        </div>
        <Link className="link-title" to={`/article/${this.props.article.id}`}>
          {this.props.article.title}
        </Link>
        <p className={"description"}>
          {this.props.article.content.substring(0, 700).concat("...")}
        </p>
        <a href="#" className={"underlined-black-text"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
