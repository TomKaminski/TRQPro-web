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
  autoplaySpeed: 8000,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ArticleSlideshow = (props) => {
  return (
    <div id="article-slideshow">
      <Slider
        {...settings}
        className={"page-padding"}
        style={{ margin: "auto" }}
      >
        {props.articles.map((art, i) => (
          <ArticleSlideshowItem
            article={art}
            id={i}
            key={`article_slide_${i}`}
          />
        ))}
      </Slider>
      <div className={"bg"}></div>
    </div>
  )
}

export default ArticleSlideshow
