import React from "react"

export default class CheckboxWithTitle extends React.Component {
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
        <input
          class="form-check-input"
          type="checkbox"
          checked={this.state.value}
          onChange={this.props.onChange}
          name={this.props.name}
          id={this.props.name}
        />
        <label class="form-check-label" for={this.props.name}>
          {this.props.title}
        </label>
      </div>
    )
  }
}
