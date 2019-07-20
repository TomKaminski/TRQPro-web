import React from "react"
export default class IndexRightArticle extends React.Component {
  render() {
    return (
      <div className={"index-right-article"}>
        <h3 className={"title"}>FOREX</h3>
        <p className={"small-underlined-text"}>29 minut temu</p>
        <p className={"description"}>
          Less than a day ago, the profile of the mysterious Bitcoin investor
          Satoshi Nakamoto returned to life for the first time since 2010. On
          the P2P Foundation online portal, the author...
        </p>
        <a href="#" className={"small-underlined-text"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
