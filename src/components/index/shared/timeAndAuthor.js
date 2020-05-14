import React from "react"
import { injectIntl, Link } from "gatsby-plugin-intl"

const formatDate = (dateString) => {
  let date = new Date(dateString)
  return date.toLocaleString()
}

const TimeAndAuthor = (props) => {
  return (
    <div className={"time-and-author"}>
      <Link
        to={`/autor/${props.author.id}`}
        className={"underlined-black-text " + props.textClass}
      >
        {props.author.username}
      </Link>
      <span> &bull; </span>
      <span className={props.textClass}>{formatDate(props.date)}</span>
    </div>
  )
}

export default injectIntl(TimeAndAuthor)
