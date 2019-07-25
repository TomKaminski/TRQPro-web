import React from "react"
import TimeAndAuthor from "./timeAndAuthor"

export default class IndexRightArticle extends React.Component {
  render() {
    return (
      <div className={"index-right-article border-grey-bottom article-padding"}>
        <h3 className={"title"}>{this.props.article.title}</h3>
        <TimeAndAuthor />
        <p className={"description margin-top-base"}>
          {this.props.article.content.substring(0, 300).concat("...")}
        </p>
        <a href="#" className={"underlined-black-text"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
