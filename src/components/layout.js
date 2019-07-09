import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons"

import Header from "./header"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./layout.css"
import { Container } from "react-bootstrap"
import Subheader from "./subheader"

library.add(fab, faCheckSquare, faCoffee)

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
    <Container fluid={true} id="main-container">
      <Header siteTitle={data.site.siteMetadata.title} />
      <Subheader />
      <main className="page-content">{children}</main>
      <footer>© {new Date().getFullYear()}, TRQPro All Rights Reserved.</footer>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
