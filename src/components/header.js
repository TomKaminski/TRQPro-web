import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StaticQuery, graphql, Link } from "gatsby"

import "../styles/header.scss"
import logoImg from "../images/brand_logo.png"
import Search from "./search"

const Header = () => (
  <Navbar expand="lg" bg="white" sticky="top">
    <Link to={`/`}>
      <Navbar.Brand>
        <img src={logoImg} id="brand-logo" alt="logo" />
      </Navbar.Brand>
    </Link>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className={"justify-content-end"}>
      <Nav>
        <Link to={`/`} className={"nav-link-black nav-link"}>
          Home
        </Link>
        <Link
          to={`/category/cat-cryptocurrency`}
          className={"nav-link-black nav-link"}
          state={{ categoryName: "Kryptowaluty" }}
        >
          Kryptowaluty
        </Link>
        <Link
          to={`/category/cat-forex`}
          className={"nav-link-black nav-link"}
          state={{ categoryName: "Forex" }}
        >
          Forex
        </Link>
        <Link
          to={`/category/cat-ico`}
          className={"nav-link-black nav-link"}
          state={{ categoryName: "ICO" }}
        >
          ICO
        </Link>
        <Link
          to={`/category/cat-mining`}
          className={"nav-link-black nav-link"}
          state={{ categoryName: "Mining" }}
        >
          Mining
        </Link>
        <Link
          to={`/category/cat-academy`}
          className={"nav-link-black nav-link"}
          state={{ categoryName: "Szkolenia" }}
        >
          Szkolenia
        </Link>
        <Link to={`/liga`} className={"nav-link-black nav-link"}>
          Liga
        </Link>
        <Nav.Link
          href="https://www.facebook.com/TRQPro/"
          className={"nav-link-black"}
          target="_blank"
        >
          <FontAwesomeIcon icon={["fab", "facebook-f"]} />
        </Nav.Link>
        <Nav.Link href="#fb" className={"nav-link-black"}>
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </Nav.Link>
        <Nav.Link href="#fb" className={"nav-link-black"}>
          <FontAwesomeIcon icon={["fab", "youtube"]} />
        </Nav.Link>
        <StaticQuery
          query={graphql`
            query SearchIndexQuery {
              siteSearchIndex {
                index
              }
            }
          `}
          render={data => <Search searchIndex={data.siteSearchIndex.index} />}
        />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
