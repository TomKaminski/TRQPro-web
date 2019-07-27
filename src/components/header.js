import React from "react"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../styles/header.scss"
import { Link } from "@reach/router"
import logoImg from "../images/brand_logo.png"

const Header = ({ siteTitle }) => (
  <Navbar expand="lg" bg="white" sticky="top">
    <Link to={`/`}>
      <Navbar.Brand>
        <img src={logoImg} id="brand-logo" />
      </Navbar.Brand>
    </Link>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className={"justify-content-end"}>
      <Nav>
        <NavDropdown
          title="Home"
          id="basic-nav-dropdown"
          className={"nav-link-black"}
        >
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#news" className={"nav-link-black"}>
          Newsy
        </Nav.Link>
        <Nav.Link href="#crypto" className={"nav-link-black"}>
          Kryptowaluty
        </Nav.Link>
        <Nav.Link href="#forex" className={"nav-link-black"}>
          Forex
        </Nav.Link>
        <Nav.Link href="#ico" className={"nav-link-black"}>
          ICO
        </Nav.Link>
        <Nav.Link href="#mining" className={"nav-link-black"}>
          Mining
        </Nav.Link>
        <NavDropdown
          title="Szkolenia"
          id="basic-nav-dropdown"
          className={"nav-link-black"}
        >
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#league" className={"nav-link-black"}>
          Liga
        </Nav.Link>
        <Nav.Link href="#fb" className={"nav-link-black"}>
          <FontAwesomeIcon icon={["fab", "facebook-f"]} />
        </Nav.Link>
        <Nav.Link href="#fb" className={"nav-link-black"}>
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </Nav.Link>
        <Nav.Link href="#fb" className={"nav-link-black"}>
          <FontAwesomeIcon icon={["fab", "youtube"]} />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
