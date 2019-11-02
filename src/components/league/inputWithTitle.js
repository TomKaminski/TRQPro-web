import React from "react"

export default class InputWithTitle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value })
  }

  render() {
    return (
      <div className={"input-with-title"}>
        <p>{this.props.title}</p>
        <input
          autoComplete="off"
          value={this.state.value}
          onChange={this.props.onChange}
          type="text"
          name={this.props.name}
        />
      </div>
    )
  }
}
