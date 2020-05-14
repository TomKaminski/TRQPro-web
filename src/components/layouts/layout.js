import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-intl"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
  faHashtag,
  faCalendar,
  faShareAlt,
  faSort,
  faSortUp,
  faSortDown,
  faChevronRight,
  faChevronLeft,
  faSearch,
  faTimes,
  faBars,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons"

import Header from "../header"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../styles/layout.scss"
import { Container } from "react-bootstrap"
import CryptoRoller from "../cryptoRoller"
import Footer from "../footer"

library.add(
  faTimes,
  faBars,
  fab,
  faSort,
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
      <div id="sidebar-root"></div>
      <Header />
      <CryptoRoller />
      <Container
        fluid={true}
        id="main-container"
        className={"page-padding margin-top-20"}
      >
        <main className={"page-content"}>{children}</main>
      </Container>

      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default injectIntl(Layout)
