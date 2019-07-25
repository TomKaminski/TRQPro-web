import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default class IndexPager extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activePageIndex: 0 }
  }

  renderPages() {
    return Array(this.props.pageCount)
      .fill()
      .map((_, i) => this.renderPage(i))
  }

  renderPage(index) {
    var className = "page-item noselect"
    if (index === this.state.activePageIndex) className += " active"
    return (
      <li
        className={className}
        onClick={() => this.onPageChange(index)}
        key={index}
      >
        {index + 1}
      </li>
    )
  }

  guardDecrementPage = () => {
    if (this.state.activePageIndex > 0) {
      this.onPageChange(this.state.activePageIndex - 1)
    } else {
      return null
    }
  }

  guardIncrementPage = () => {
    if (this.state.activePageIndex < this.props.pageCount - 1) {
      this.onPageChange(this.state.activePageIndex + 1)
    }
  }

  onPageChange = pageIndex => {
    this.setState({
      activePageIndex: pageIndex,
    })
    this.props.onPageChangeCallback(pageIndex)
  }

  render() {
    return (
      <ul className={"pager"}>
        <li
          className={"page-item"}
          onClick={() => this.guardDecrementPage()}
          key="decrement"
        >
          <FontAwesomeIcon icon={"chevron-left"} />
        </li>
        {this.renderPages()}
        <li
          key="increment"
          className={"page-item noselect"}
          onClick={() => this.guardIncrementPage()}
        >
          <FontAwesomeIcon icon={"chevron-right"} />
        </li>
      </ul>
    )
  }
}
