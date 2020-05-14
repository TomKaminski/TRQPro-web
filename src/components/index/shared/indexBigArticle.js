import React from "react"
import TimeAndAuthor from "./timeAndAuthor"
import Img from "gatsby-image"
import { injectIntl, Link } from "gatsby-plugin-intl"
import removeMd from "remove-markdown"

class IndexBigArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding no-border"}>
        <Img
          fluid={this.props.article.image.childImageSharp.fluid}
          imgStyle={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          alt="main article image"
          className={"index-article-image"}
        />
        <div className={"upper-text-container"}>
          <TimeAndAuthor
            author={this.props.article.author}
            date={this.props.article.publishedAt}
          />
        </div>
        <Link to={`/${this.props.article.fields.slug}`}>
          <h5 className="link-title">
            {this.props.intl.locale === "en"
              ? this.props.article.title_en
              : this.props.article.title}
          </h5>
        </Link>
        <p className={"description"}>
          {this.props.intl.locale === "en"
            ? removeMd(
                this.props.article.content_en.substring(0, 400).concat("...")
              )
            : removeMd(
                this.props.article.content.substring(0, 400).concat("...")
              )}
        </p>
      </div>
    )
  }
}

export default injectIntl(IndexBigArticle)
