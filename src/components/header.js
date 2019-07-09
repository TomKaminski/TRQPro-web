import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = ({ siteTitle }) => (
  <Navbar bg="white" expand="lg" className="header">
    <Navbar.Brand href="#home">{siteTitle}</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Nav>
        <Nav.Link href="#about">O nas</Nav.Link>
        <Nav.Link href="#partners">Partnerzy</Nav.Link>
        <Nav.Link href="#contacts">Kontakt</Nav.Link>
        <Nav.Link href="#fb">
          <FontAwesomeIcon icon={["fab", "facebook-f"]} />
        </Nav.Link>
        <Nav.Link href="#fb">
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </Nav.Link>
        <Nav.Link href="#fb">
          <FontAwesomeIcon icon={["fab", "youtube"]} />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
