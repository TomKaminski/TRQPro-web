import React from "react"

import "../../../styles/index/articleSlideshow.scss"
import ArticleSlideshowItem from "./article_slideshow_item"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

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
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          transitionTime={1000}
          interval={4000}
          swipeable={true}
          autoPlay={true}
          emulateTouch
        >
          <ArticleSlideshowItem article={this.props.articles[0]} />
          <ArticleSlideshowItem article={this.props.articles[1]} />
          <ArticleSlideshowItem article={this.props.articles[2]} />
          <ArticleSlideshowItem article={this.props.articles[3]} />
          <ArticleSlideshowItem article={this.props.articles[4]} />
        </Carousel>
        <div className={"bg"}></div>
      </div>
    )
  }
}
