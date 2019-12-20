import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FacebookShareButton, TwitterShareButton } from "react-share"

class Share extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  render() {
    return (
      <div
        className={`article-meta share ${
          this.state.expanded ? " share-expanded" : ""
        }`}
      >
        <button
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            this.setState({
              expanded: !this.state.expanded,
            })
          }}
        >
          <FontAwesomeIcon icon="share-alt" size={"1x"} />{" "}
          {this.state.expanded ? "" : "udostępnij"}
        </button>
        {this.state.expanded ? (
          <div className="post-social">
            <FacebookShareButton
              url={this.props.socialConfig.config.url}
              className="button is-outlined is-rounded facebook"
            >
              <span className="icon">
                <FontAwesomeIcon icon={["fab", "facebook-f"]} size={"1x"} />
              </span>
              <span className="text">Facebook</span>
            </FacebookShareButton>
            <TwitterShareButton
              url={this.props.socialConfig.config.url}
              className="button is-outlined is-rounded twitter"
              title={this.props.socialConfig.config.title}
              via={this.props.socialConfig.twitterHandle.split("@").join("")}
            >
              <span className="icon">
                <FontAwesomeIcon icon={["fab", "twitter"]} size={"1x"} />
              </span>
              <span className="text">Twitter</span>
            </TwitterShareButton>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}

export default Share
