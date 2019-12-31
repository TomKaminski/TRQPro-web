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
  faBars,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons"

import Header from "../header"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../styles/layout.scss"
import CryptoRoller from "../cryptoRoller"
import Footer from "../footer"

library.add(
  faTimes,
  faBars,
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

const LayoutIndex = ({ children }) => {
  return (
    <div>
      <div id="modal-root"></div>
      <div id="sidebar-root"></div>
      <Header />
      <CryptoRoller />
      <main className={"page-content"}>{children}</main>
      <Footer />
    </div>
  )
}

LayoutIndex.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutIndex
