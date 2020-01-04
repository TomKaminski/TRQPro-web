import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "gatsby"

export default class IndexSmallLeague extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <section className={"section-margin-and-padding"}>
        <Row>
          <Col>
            <div className={"section"}>
              <div className={"section-title-container"}>
                <Link to={`/liga`}>
                  <h2 className={"section-title"}>Liga</h2>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    )
  }
}
