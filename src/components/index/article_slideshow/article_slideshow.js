import React from "react"

import "../../../styles/index/articleSlideshow.scss"
import ArticleSlideshowItem from "./article_slideshow_item"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Slider from "react-slick"

const settings = {
  dots: true,
  fade: true,
  autoplay: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ArticleSlideshow = props => {
  return (
    <div id="article-slideshow">
      <Slider
        {...settings}
        className={"page-padding"}
        style={{ margin: "auto" }}
      >
        {props.articles.map((art, i) => (
          <ArticleSlideshowItem article={art} id={i} />
        ))}
      </Slider>
      <div className={"bg"}></div>
    </div>
  )
}

export default ArticleSlideshow
