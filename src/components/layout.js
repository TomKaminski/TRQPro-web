import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"

import Header from "./header"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../styles/layout.scss"
import { Container } from "react-bootstrap"
import CryptoRoller from "./cryptoRoller"
import Footer from "./footer"

library.add(fab, faSortUp, faSortDown)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <Header siteTitle={data.site.siteMetadata.title} />
      <CryptoRoller style="overflow:hidden" />

      <Container fluid={true} id="main-container">
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
