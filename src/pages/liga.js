import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import "../styles/liga.scss"

const axios = require("axios")

class LeaguePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
      error: null,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    let url = process.env.DEPLOY_URL
      ? "https://cms.trqpro.pl/"
      : "https://cms.trqpro.pl/"
    let endpoint = url + "league/lastReading"
    axios
      .get(endpoint)
      .then(response => {
        if (response.data.leagueUniqueIdentifier) {
          this.setState({
            data: response.data,
            loading: false,
            error: null,
          })
        } else {
          this.setState({
            data: null,
            loading: false,
            error: "Nie udało się załadować danych ligi.",
          })
        }
      })
      .catch(error => {
        this.setState({
          data: null,
          loading: false,
          error: "Nie udało się załadować danych ligi.",
        })
      })
  }

  render() {
    return (
      <Layout>
        <SEO title="Liga" />
        <h2>
          Chcesz dolaczyc do ligi? zapisz się i zapoznaj się z{" "}
          <Link to={"/liga-regulamin"}>regulaminem</Link>
        </h2>

        {this.state.loading ? <div>Loading...</div> : this.renderLeague()}
      </Layout>
    )
  }

  getRoeColored(roe) {
    if (roe !== null) {
      if (roe > 0) {
        return <div className={"color-green"}>{roe.toFixed(2)}%</div>
      } else if (roe < 0) {
        return <div className={"color-red"}>{roe.toFixed(2)}%</div>
      } else {
        return <div>{roe.toFixed(2)}%</div>
      }
    } else {
      return <div>-</div>
    }
  }

  renderLeague() {
    if (this.state.data === null) {
      return (
        <Container>
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            Brak aktywnej ligi lub brak pierwszego odczytu (12:05 UTC).
          </h4>
        </Container>
      )
    }
    return (
      <div>
        <Container fluid={true} className={"margin-top-40 margin-bottom-40"}>
          <Row>
            <Col>
              <p className={"align-text-center league-stat"}>
                Data rozpoczęcia:{" "}
                {new Date(this.state.data.startDate).toLocaleString()}
              </p>
            </Col>
            <Col>
              <p className={"align-text-center league-stat"}>
                Data zakończenia:{" "}
                {new Date(this.state.data.endDate).toLocaleString()}
              </p>
            </Col>
            <Col>
              <p className={"align-text-center league-stat"}>
                Ilość uczestników: {this.state.data.participants.length}
              </p>
            </Col>
          </Row>
        </Container>
        <table
          className={"table table-hover margin-bottom-40 table-responsive-md"}
          id="liga-table"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nick</th>
              <th scope="col">Kapitał startowy</th>
              <th scope="col">Kapitał obecny</th>
              <th scope="col">Obecne roe</th>
              <th scope="col">1d</th>
              <th scope="col">3d</th>
              <th scope="col">7d</th>
              <th scope="col">14d</th>
              <th scope="col">end</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data.participants).map((key, index) => {
              const {
                username,
                roeCurrent,
                roe1d,
                roe3d,
                roe7d,
                roe14d,
                roeEnd,
                balance,
                startingBalance,
              } = this.state.data.participants[key]
              return (
                <tr className={"margin-top-base margin-bottom-base"}>
                  <th scope="row">{index + 1}</th>
                  <td>{username}</td>
                  <td>{startingBalance}</td>
                  <td>{balance}</td>
                  <td>{this.getRoeColored(roeCurrent)}</td>
                  <td>{this.getRoeColored(roe1d)}</td>
                  <td>{this.getRoeColored(roe3d)}</td>
                  <td>{this.getRoeColored(roe7d)}</td>
                  <td>{this.getRoeColored(roe14d)}</td>
                  <td>{this.getRoeColored(roeEnd)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default LeaguePage
