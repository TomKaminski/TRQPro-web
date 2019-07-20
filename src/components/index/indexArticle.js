import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Reactmarkdown from "react-markdown"

export default class IndexArticle extends React.Component {
  render() {
    return (
      <div key={this.props.article.id}>
        <Img fluid={this.props.article.image.childImageSharp.fluid} />

        <h2>
          <Link
            className="article-name"
            to={`/article/${this.props.article.id}`}
          >
            {this.props.article.title}
          </Link>
        </h2>
        <Reactmarkdown
          className={"index-article-content"}
          source={this.props.article.content.substring(0, 500).concat("...")}
          transformImageUri={uri =>
            uri.startsWith("http") ? uri : `${process.env.IMAGE_BASE_URL}${uri}`
          }
        />
        <Link to={`/article/${this.props.article.id}`}>Czytaj dalej</Link>
      </div>
    )
  }
}
