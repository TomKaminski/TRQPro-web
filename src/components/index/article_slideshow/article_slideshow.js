import React from "react"

import "../../../styles/index/articleSlideshow.scss"
import ArticleSlideshowItem from "./article_slideshow_item"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Slider from "react-slick"

export default class ArticleSlideshow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.articles)
  }

  render() {
    var settings = {
      dots: true,
      fade: true,
      autoplay: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <div id="article-slideshow" className={"page-padding"}>
        <Slider {...settings}>
          <ArticleSlideshowItem article={this.props.articles[0]} />
          <ArticleSlideshowItem article={this.props.articles[1]} />
          <ArticleSlideshowItem article={this.props.articles[2]} />
          <ArticleSlideshowItem article={this.props.articles[3]} />
          <ArticleSlideshowItem article={this.props.articles[4]} />
        </Slider>
        <div className={"bg"}></div>
      </div>
    )
  }
}
