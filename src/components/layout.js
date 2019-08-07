import React from "react"
import PropTypes from "prop-types"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
  faHashtag,
  faCalendar,
  faShareAlt,
  faSortUp,
  faSortDown,
  faChevronRight,
  faChevronLeft,
  faSearch,
  faTimes,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons"

import Header from "./header"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../styles/layout.scss"
import { Container } from "react-bootstrap"
import CryptoRoller from "./cryptoRoller"
import Footer from "./footer"

library.add(
  faTimes,
  fab,
  faSortUp,
  faSortDown,
  faChevronLeft,
  faChevronRight,
  faCalendar,
  faHashtag,
  faShareAlt,
  faSearch,
  faFolderOpen
)

const Layout = ({ children }) => {
  return (
    <div>
      <div id="modal-root"></div>

      <Header />
      <CryptoRoller />
      <Container fluid={true} id="main-container" className={"page-padding"}>
        <main className={"page-content"}>{children}</main>
      </Container>

      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
