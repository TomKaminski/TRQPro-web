import React from "react"

const TimeAndAuthor = props => {
  return (
    <div className={"time-and-author"}>
      <span className={"underlined-black-text " + props.textClass}>
        29 minut temu
      </span>{" "}
      &bull; User
    </div>
  )
}

export default TimeAndAuthor
