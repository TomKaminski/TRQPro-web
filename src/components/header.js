import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StaticQuery, graphql } from "gatsby"

import "../styles/header.scss"
import logoImg from "../images/brand_logo.png"
import Search from "./search"
import MobileSidebar from "./mobile_sidebar"

import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sidebarExpanded: false, searchActive: false }
  }

  render() {
    return (
      <Navbar expand="lg" sticky="top">
        <Container fluid={true} className={"page-padding"}>
          <Link to={`/`}>
            <Navbar.Brand>
              <img src={logoImg} id="brand-logo" alt="trq logo" />
            </Navbar.Brand>
          </Link>
          <Nav className={"always-row-directed"}>
            <Nav.Link
              href="#"
              className={"nav-link-black d-block d-lg-none"}
              onClick={() => {
                this.setState({
                  searchActive: true,
                  sidebarExpanded: false,
                })
              }}
            >
              <FontAwesomeIcon icon="search" className={"icon"} />
            </Nav.Link>
            <Nav.Link
              href="#"
              className={"nav-link-black d-block d-lg-none"}
              onClick={() =>
                this.setState({
                  sidebarExpanded: !this.state.sidebarExpanded,
                  searchActive: false,
                })
              }
            >
              <FontAwesomeIcon
                icon={this.sidebarExpanded ? "close" : "bars"}
                className={"icon"}
              />
            </Nav.Link>
          </Nav>

          <Navbar.Collapse className={"justify-content-end"}>
            <Nav>
              <Link to={`/`} className={"nav-link-black nav-link"}>
                <FormattedMessage
                  id="header.home-title"
                  defaultMessage="Strona główna"
                  description="Header home title"
                />
              </Link>
              <Link
                to={`/kategoria/cat-cryptocurrency`}
                className={"nav-link-black nav-link"}
                state={{ categoryName: "Kryptowaluty" }}
              >
                <FormattedMessage
                  id="header.cryptocurrency-title"
                  defaultMessage="Kryptowaluty"
                  description="Header cryptocurrency category title"
                />
              </Link>
              <Link
                to={`/kategoria/cat-at`}
                className={"nav-link-black nav-link"}
                state={{ categoryName: "Analizy" }}
              >
                <FormattedMessage
                  id="header.at-title"
                  defaultMessage="Analizy"
                  description="Header technical analysis category title"
                />
              </Link>
              <Link
                to={`/kategoria/cat-academy`}
                className={"nav-link-black nav-link"}
                state={{ categoryName: "Akademia" }}
              >
                <FormattedMessage
                  id="header.academy-title"
                  defaultMessage="Akademia"
                  description="Header academy category title"
                />
              </Link>
              <Link to={`/liga`} className={"nav-link-black nav-link"}>
                <FormattedMessage
                  id="header.league-title"
                  defaultMessage="Liga"
                  description="Header league category title"
                />
              </Link>
              <Nav.Link
                href="https://www.facebook.com/TRQPro/"
                className={"nav-link-black"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "facebook-f"]} size={"lg"} />
              </Nav.Link>
              <Nav.Link
                href="https://www.twitter.com/TRQPro/"
                className={"nav-link-black"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "twitter"]} size={"lg"} />
              </Nav.Link>
              <StaticQuery
                query={graphql`
                  query SearchIndexQuery {
                    siteSearchIndex {
                      index
                    }
                  }
                `}
                render={(data) => (
                  <Search
                    searchIndex={data.siteSearchIndex.index}
                    searchActive={this.state.searchActive}
                  />
                )}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>

        {typeof document !== "undefined" && (
          <MobileSidebar expanded={this.state.sidebarExpanded} />
        )}
      </Navbar>
    )
  }
}

export default injectIntl(Header)
