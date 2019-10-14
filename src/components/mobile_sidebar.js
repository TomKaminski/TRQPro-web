import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactDOM from "react-dom"

import "../styles/mobile-sidebar.scss"

export default class MobileSidebar extends React.Component {
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
            <li className={"sidebar-title"}>Ogólne</li>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/liga`}>Liga</Link>
            </li>
          </ul>
          <ul>
            <li className={"sidebar-title"}>Informacje</li>
            <li>
              <Link
                to={`/kategoria/cat-cryptocurrency`}
                state={{ categoryName: "Kryptowaluty" }}
              >
                Kryptowaluty
              </Link>
            </li>
            <li>
              <Link
                to={`/kategoria/cat-forex`}
                state={{ categoryName: "Forex" }}
              >
                Forex
              </Link>
            </li>
            <li>
              <Link to={`/kategoria/cat-ico`} state={{ categoryName: "ICO" }}>
                ICO
              </Link>
            </li>
            <li>
              <Link
                to={`/kategoria/cat-mining`}
                state={{ categoryName: "Mining" }}
              >
                Mining
              </Link>
            </li>
            <li>
              <Link
                to={`/kategoria/cat-academy`}
                state={{ categoryName: "Szkolenia" }}
              >
                Szkolenia
              </Link>
            </li>
          </ul>
          <ul>
            <li className={"sidebar-title"}>Social</li>
            <li>
              <a href="https://www.facebook.com/TRQPro/">
                <FontAwesomeIcon icon={["fab", "facebook-f"]} /> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/TRQPro/">
                <FontAwesomeIcon icon={["fab", "twitter"]} /> Twitter
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/TRQPro/">
                <FontAwesomeIcon icon={["fab", "youtube"]} /> Youtube
              </a>
            </li>
          </ul>
        </div>
      </div>,
      this.el
    )
  }
}
