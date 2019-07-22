import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IndexPager = props => {
  return (
    <ul className={"pager"}>
      <li className={"page-item"}>
        <FontAwesomeIcon icon={"chevron-left"} />
      </li>
      <li className={"page-item noselect"}>1</li>
      <li className={"page-item noselect"}>2</li>
      <li className={"page-item active noselect"}>3</li>
      <li className={"page-item noselect"}>4</li>
      <li className={"page-item noselect"}>5</li>
      <li className={"page-item noselect"}>6</li>
      <li className={"page-item noselect"}>
        <FontAwesomeIcon icon={"chevron-right"} />
      </li>
    </ul>
  )
}

export default IndexPager
