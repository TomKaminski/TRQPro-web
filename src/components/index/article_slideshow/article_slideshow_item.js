import React from "react"
import { Link } from "gatsby"

import "../../../styles/index/articleSlideshow.scss"

export default class ArticleSlideshowItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.article)
  }

  render() {
    return <div>{this.props.article.title}</div>
  }
}
