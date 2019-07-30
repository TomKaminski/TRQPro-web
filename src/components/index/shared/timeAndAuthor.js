import React from "react"
import { Link } from "gatsby"

const formatDate = dateString => {
  let date = new Date(dateString)
  return date.toLocaleString()
}

const TimeAndAuthor = props => {
  return (
    <div className={"time-and-author"}>
      <span className={props.textClass}>{formatDate(props.date)}</span>
      <span> &bull; </span>
      <Link
        to={`/author/User_${props.author.id}`}
        className={"underlined-black-text"}
      >
        {props.author.username}
      </Link>
    </div>
  )
}

export default TimeAndAuthor
