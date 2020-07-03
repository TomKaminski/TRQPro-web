import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactDOM from "react-dom"

import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

import "../styles/mobile-sidebar.scss"

class MobileSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement("div")
  }

  componentDidMount() {
    document.getElementById("sidebar-root").appendChild(this.el)
  }

  componentWillUnmount() {
    document.getElementById("sidebar-root").remove(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      <div className={this.props.expanded ? "search-result-overlay" : ""}>
        <div
          id="mobile-sidebar"
          className={this.props.expanded ? "expanded" : ""}
        >
          <ul>
            <li className={"sidebar-title"}>
              <FormattedMessage
                id="common.common-title"
                defaultMessage="Ogólne"
              />
            </li>
            <li>
              <Link to={`/`}>
                <FormattedMessage
                  id="header.home-title"
                  defaultMessage="Strona główna"
                  description="Header home title"
                />
              </Link>
            </li>
            <li>
              <Link to={`/liga`}>
                <FormattedMessage
                  id="common.league"
                  defaultMessage="Liga"
                  description="Header league category title"
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li className={"sidebar-title"}>
              <FormattedMessage
                id="common.informations-title"
                defaultMessage="Informacje"
              />
            </li>
            <li>
              <Link
                to={`/kategoria/cat-cryptocurrency`}
                state={{ categoryName: "Kryptowaluty" }}
              >
                <FormattedMessage
                  id="common.cryptocurrency"
                  defaultMessage="Kryptowaluty"
                />
              </Link>
            </li>
            <li>
              <Link
                to={`/kategoria/cat-at`}
                state={{ categoryName: "Analizy" }}
              >
                <FormattedMessage id="common.at" defaultMessage="Analizy" />
              </Link>
            </li>
            <li>
              <Link
                to={`/kategoria/cat-academy`}
                state={{ categoryName: "Akademia" }}
              >
                <FormattedMessage
                  id="common.academy"
                  defaultMessage="Akademia"
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li className={"sidebar-title"}>Social</li>
            <li>
              <a
                href="https://www.facebook.com/TRQPro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "facebook-f"]} size={"lg"} />{" "}
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/TRQPro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "twitter"]} size={"lg"} />{" "}
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://t.me/TRQProAnalizy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "telegram"]} size={"lg"} />{" "}
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>,
      this.el
    )
  }
}

export default injectIntl(MobileSidebar)
