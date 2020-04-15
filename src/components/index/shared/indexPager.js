import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default class IndexPager extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activePageIndex: props.activePageIndex }
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
      <li className={className} key={index}>
        <button onClick={() => this.onPageChange(index)}>{index + 1}</button>
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
    if (this.state.activePageIndex !== pageIndex) {
      this.setState({
        activePageIndex: pageIndex,
      })
      this.props.onPageChangeCallback(pageIndex)
    }
  }

  render() {
    return (
      <ul className={"pager"}>
        <li className={"page-item"} key="decrement">
          <button onClick={() => this.guardDecrementPage()}>
            <FontAwesomeIcon icon={"chevron-left"} />
          </button>
        </li>
        {this.renderPages()}
        <li key="increment" className={"page-item noselect"}>
          <button onClick={() => this.guardIncrementPage()}>
            <FontAwesomeIcon icon={"chevron-right"} />
          </button>
        </li>
      </ul>
    )
  }
}
