import React from "react"

import "../../../styles/index/articleSlideshow.scss"
import ArticleSlideshowItem from "./article_slideshow_item"

export default class ArticleSlideshow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.articles)
  }

  render() {
    return (
      <div id="article-slideshow" className={"page-padding"}>
        <ArticleSlideshowItem article={this.props.articles[1]} />
        <div className={"bg"}></div>
      </div>
    )
  }
}
