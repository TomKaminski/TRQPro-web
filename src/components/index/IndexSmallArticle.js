import React from "react"
import TimeAndAuthor from "../shared/timeAndAuthor"

export default class IndexRightArticle extends React.Component {
  render() {
    return (
      <div className={"index-right-article border-grey-bottom article-padding"}>
        <h3 className={"title"}>forex</h3>
        <TimeAndAuthor />
        <p className={"description margin-top-base"}>
          Less than a day ago, the profile of the mysterious Bitcoin investor
          Satoshi Nakamoto returned to life for the first time since 2010. On
          the P2P Foundation online portal, the author...
        </p>
        <a href="#" className={"underlined-black-text"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
