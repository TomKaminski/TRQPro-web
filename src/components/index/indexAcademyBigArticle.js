import React from "react"
import TimeAndAuthor from "../shared/timeAndAuthor"
import image from "../../images/img1.png"

export default class IndexAcademyBigArticle extends React.Component {
  render() {
    return (
      <div className={"index-left-article article-padding"}>
        {image != null ? <img src={image} alt="image" /> : null}
        <div className={"upper-text-container"}>
          <TimeAndAuthor />
        </div>
        <a href="#" className={"link-title"}>
          Not for the Grumpy Ones: Another Collection of 20 Crypto Jokes
        </a>
        <p className={"description"}>
          Less than a day ago, the profile of the mysterious Bitcoin investor
          Satoshi Nakamoto returned to life for the first time since 2010. On
          the P2P Foundation online portal, the author. Less than a day ago, the
          profile of the mysterious Bitcoin investor Satoshi Nakamoto returned
          to life for the first time since 2010. On the P2P Foundation online
          portal, the author...
        </p>
        <a href="#" className={"underlined-black-text"}>
          Czytaj dalej
        </a>
      </div>
    )
  }
}
