import React from "react"

import { injectIntl, FormattedMessage, Link } from "gatsby-plugin-intl"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import "../styles/liga.scss"
import "../styles/liga-ranking.scss"

import { apiUrl } from "../statics"

const axios = require("axios")

class LeaguePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
      error: null,
      leagueOptions: [],
      selectedLeague: null,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    let endpoint = apiUrl + "league/getLadderForYear?year=" + new Date().getFullYear();
    axios
      .get(endpoint)
      .then((response) => {
        if (response.data) {
          this.setState({
            data: response.data,
            loading: false,
            error: null,
          })
        } else {
          this.setState({
            data: null,
            loading: false,
            error: this.props.intl.formatMessage({
              id: "league-ranking.loading-error",
            }),
          })
        }
      })
      .catch((error) => {
        this.setState({
          data: null,
          loading: false,
          error: this.props.intl.formatMessage({
            id: "league-ranking.loading-error",
          }),
        })
      })
  }

  render() {
    return (
      <Layout>
        <SEO title="Liga - ranking" pathname={`/liga-ranking`} />
        <div>
          <h1>
            <FormattedMessage id="league-ranking.header" />
          </h1>
          <h5>
            <FormattedMessage id="league-ranking.description" />
          </h5>
        </div>

        <Row className="league-link-container">
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-regulamin"}>
              <FormattedMessage id="league-links.rules" />
            </Link>
          </Col>
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga"}>
              <FormattedMessage id="league-links.actual-league" />
            </Link>
          </Col>
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-historia"}>
              <FormattedMessage id="league-links.history" />
            </Link>
          </Col>
          <Col xs={6} md={3}></Col>
        </Row>

        {!this.state.loading ? this.renderLadder() : null}
      </Layout>
    )
  }

  getRoeOverall(roe) {
    if (roe !== null) {
      if (roe > 0) {
        return <div className={"color-green"}>{roe.toFixed(2)}%</div>
      } else if (roe < 0) {
        return <div className={"color-red"}>{roe.toFixed(2)}%</div>
      } else {
        return <div>0%</div>
      }
    } else {
      return <div>-</div>
    }
  }

  getMedalByIndex(index) {
    if (index === 0) {
      return "🥇"
    }

    if (index === 1) {
      return "🥈"
    }

    if (index === 2) {
      return "🥉"
    }

    return index + 1
  }

  convertSatoshiToBTC(satoshi) {
    return satoshi / 100000000.0
  }

  renderLadder() {
    if (this.state.data === null || this.state.data == {}) {
      return (
        <Container>
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            <FormattedMessage id="league-ranking.no-data-for-year" />
          </h4>
        </Container>
      )
    }

    return (
      <div>
        {this.state.data.map((ladder) => {
          return (
            <div>
              <p className="categoryTagResults">{ladder.ladder_public_name}</p>
              <table
                className={
                  "table table-hover margin-bottom-40 table-responsive-md"
                }
              >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nick</th>
                    <th scope="col">
                      <FormattedMessage id="league-ranking.column-points" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="league-ranking.column-average-roe" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="league-ranking.column-highest-roe" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="league-ranking.column-leagues-count" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="league-ranking.column-overall-starting-balance" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="league-ranking.column-overall-ending-balance" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ladder.participants.map((participant, index) => {
                    const {
                      username,
                      points,
                      startingBalanceSum,
                      endingBalanceSum,
                      startingBalanceSumUSD,
                      endingBalanceSumUSD,
                      leagues,
                      overallRoe,
                      bestRoe,
                    } = participant
                    return (
                      <tr key={index}>
                        <th scope="row">{this.getMedalByIndex(index)}</th>
                        <td>{username}</td>
                        <td>{points}</td>
                        <td>{this.getRoeOverall(overallRoe)}</td>
                        <td>{this.getRoeOverall(bestRoe)}</td>
                        <td>{leagues}</td>
                        <td>
                          {startingBalanceSum !== 0 && (
                            <span>
                              {this.convertSatoshiToBTC(startingBalanceSum)} BTC
                            </span>
                          )}
                          {startingBalanceSumUSD !== 0 &&
                            startingBalanceSum !== 0 && <br />}
                          {startingBalanceSumUSD !== 0 && (
                            <span>{startingBalanceSumUSD.toFixed(2)} USD</span>
                          )}
                        </td>
                        <td>
                          {endingBalanceSum !== 0 && (
                            <span>
                              {this.convertSatoshiToBTC(endingBalanceSum)} BTC
                            </span>
                          )}
                          {endingBalanceSumUSD !== 0 &&
                            endingBalanceSum !== 0 && <br />}
                          {endingBalanceSumUSD !== 0 && (
                            <span>{endingBalanceSumUSD.toFixed(2)} USD</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    )
  }
}

export default injectIntl(LeaguePage)
