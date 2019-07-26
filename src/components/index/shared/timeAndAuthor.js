import React from "react"

const formatDate = dateString => {
  let date = new Date(dateString)
  return date.toLocaleString()
}

const TimeAndAuthor = props => {
  return (
    <div className={"time-and-author"}>
      <span className={"underlined-black-text " + props.textClass}>
        {formatDate(props.date)}
      </span>
      <span> &bull; {props.author}</span>
    </div>
  )
}

export default TimeAndAuthor
