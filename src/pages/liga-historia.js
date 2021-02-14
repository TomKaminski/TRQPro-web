import React from "react"
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import redCard from "../images/red-card.svg"
import rekt from "../images/dead.svg"
import winner from "../images/winner.svg"

import "../styles/liga.scss"

import { Line } from "react-chartjs-2"
import Dropdown from "react-dropdown"

import { apiUrl } from "../statics"

import bitmex_logo from "../images/bitmex_logo.png"
import bybit_logo from "../images/bybit_logo.png"
import binance_logo from "../images/binance_logo.png"

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
    let endpoint = apiUrl + "leaguehistory/selectorData"
    axios
      .get(endpoint)
      .then((response) => {
        this.setState(
          {
            leagueOptions: this.processLeagueOptions(response.data),
            selectedLeague: response.data[response.data.length - 1],
          },
          () => {
            this.getData()
          }
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  processLeagueOptions(data) {
    return data.map((val) => {
      return {
        label: val.substring(0, val.length - 5),
        value: val,
      }
    })
  }

  getExchangeImage(exchange) {
    if (exchange === "bybit") {
      return (
        <img
          src={bybit_logo}
          style={{ height: "20px" }}
          alt="league bybit logo"
        />
      )
    } else if (exchange === "binance") {
      return (
        <img
          src={binance_logo}
          style={{ height: "20px" }}
          alt="league binance logo"
        />
      )
    } else {
      return (
        <img
          src={bitmex_logo}
          style={{ height: "18px" }}
          alt="league bitmex logo"
        />
      )
    }
  }

  getChartData(roes) {
    return {
      labels: roes.map((item, index) => index.toString()),
      datasets: [
        {
          label: null,
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(21, 101, 216, 0.1)",
          borderColor: "rgba(21, 101, 216, 0.8)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(21, 101, 216, 1)",
          pointBackgroundColor: "rgba(21, 101, 216, 1)",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(21, 101, 216, 1)",
          pointHoverBorderColor: "rgba(21, 101, 216, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: roes,
        },
      ],
    }
  }

  getData() {
    let endpoint =
      apiUrl + "leaguehistory/leagueData?id=" + this.state.selectedLeague
    axios
      .get(endpoint)
      .then((response) => {
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
            error: this.props.intl.formatMessage({ id: "league.common-error" }),
          })
        }
      })
      .catch((error) => {
        this.setState({
          data: null,
          loading: false,
          error: this.props.intl.formatMessage({ id: "league.common-error" }),
        })
      })
  }

  render() {
    return (
      <Layout>
        <SEO title="Liga - historia rozgrywek" pathname={`/liga-historia`} />
        <div className={"join-league-container"}>
          <h1>
            <FormattedMessage id="league-history.header" />
          </h1>
        </div>
        <h5>
          <FormattedMessage id="league-history.description" />
        </h5>
        <br></br>
        <Col xs={12} md={6} style={{ paddingLeft: 0, marginBottom: "20px" }}>
          <p style={{ marginBottom: "2px" }}>
            <FormattedMessage id="league-dialog.form-title-league-placeholder" />
          </p>
          <Dropdown
            options={this.state.leagueOptions}
            onChange={(opt) => {
              this.setState(
                {
                  selectedLeague: opt.value,
                },
                () => {
                  this.getData()
                }
              )
            }}
            value={this.state.selectedLeague}
            placeholder="-"
          />
        </Col>

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
            <Link to={"/liga-ranking"}>
              <FormattedMessage id="league-links.ranking" />
            </Link>
          </Col>
          <Col xs={6} md={3}></Col>
        </Row>

        {!this.state.loading ? this.renderLeague() : null}
      </Layout>
    )
  }

  getRoeColored(roe, isRekt, isRetarded, tooLowBalance) {
    if (isRetarded || isRekt || tooLowBalance) {
      return <div>-</div>
    }

    return this.displayRoeBase(roe)
  }

  getRoeCurrent(roe, isRekt, isRetarded, tooLowBalance, isZombie) {
    if (isRetarded) {
      return (
        <div>
          <img src={redCard} alt="redCard" />
        </div>
      )
    }

    if (isRekt || isZombie) {
      return (
        <div>
          <img src={rekt} alt="rekt" />
        </div>
      )
    }

    if (tooLowBalance) {
      return (
        <div>
          <img src={redCard} alt="redCard" />
        </div>
      )
    }

    return this.displayRoeBase(roe)
  }

  displayRoeBase(roe) {
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

  getRoe1d(roe, isRekt, isRetarded, tooLowBalance, isZombie) {
    if (isRetarded) {
      return <div>DSQ</div>
    }

    if (isRekt) {
      return <div>LIQ</div>
    }

    if (tooLowBalance) {
      return <div>DNS</div>
    }

    if (isZombie) {
      return <div>ZOMBIE</div>
    }

    return this.displayRoeBase(roe)
  }

  convertSatoshiToBTC(satoshi) {
    return satoshi / 100000000.0
  }

  getBalanceContent(isRekt, isRetarded, tooLowBalance, exchange, balance) {
    if (exchange !== "bitmex") {
      return (
        <span>
          {isRekt || isRetarded || tooLowBalance ? 0 : balance.toFixed(2)} USDT
        </span>
      )
    } else {
      return (
        <span>
          {isRekt || isRetarded || tooLowBalance
            ? 0
            : this.convertSatoshiToBTC(balance)}{" "}
          BTC
        </span>
      )
    }
  }

  renderLeague() {
    if (this.state.data === null) {
      return (
        <Container>
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            <FormattedMessage id="league-history.error" />
          </h4>
        </Container>
      )
    }
    return (
      <div>
        <Container fluid={true} className={"league-stat-container"}>
          <Row>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>
                <FormattedMessage id="league.start-date" />
              </p>
              <p className={"league-stat"}>
                {new Date(this.state.data.startDate).toLocaleString()}
              </p>
            </Col>
            <Col xs={6} md={3}>
              <div>
                <p className={"league-stat-header"}>
                  <FormattedMessage id="league.end-date" />
                </p>
                <p className={"league-stat"}>
                  {new Date(this.state.data.endDate).toLocaleString()}
                </p>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>
                <FormattedMessage id="league.participants" />
              </p>
              <p className={"league-stat"}>
                {this.state.data.participants.length +
                  this.state.data.totallyEmptyAccounts.length}
              </p>
            </Col>
            <Col xs={6} md={3} style={{ display: "flex", alignItems: "end" }}>
              <div>
                <p className={"league-stat-header"}>
                  <FormattedMessage id="league.winner" />
                </p>
                <p className={"league-stat"}>
                  <span style={{ color: "green" }}>
                    {this.state.data.participants[0].username}
                  </span>
                </p>
              </div>
              <img src={winner} alt="" />
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
              <th scope="col">
                <FormattedMessage id="league-table.column-starting-balance" />
              </th>
              <th scope="col">
                <FormattedMessage id="league-table.column-ending-balance" />
              </th>
              <th scope="col">
                <FormattedMessage id="league-table.column-ending-roe" />
              </th>
              <th scope="col">1d</th>
              <th scope="col">3d</th>
              <th scope="col">7d</th>
              <th scope="col">14d</th>
              <th scope="col">graph</th>
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
                balance,
                startingBalance,
                isRekt,
                isRetarded,
                tooLowBalance,
                exchange,
                isZombie,
                roes,
              } = this.state.data.participants[key]
              return (
                <tr
                  className={"margin-top-base margin-bottom-base"}
                  key={index}
                >
                  <th scope="row">{index + 1}</th>
                  <td>
                    <span>
                      {this.getExchangeImage(exchange)} {username}
                    </span>
                  </td>
                  <td>
                    {exchange === "bitmex" ? (
                      <span>
                        {this.convertSatoshiToBTC(startingBalance)} BTC
                      </span>
                    ) : (
                      <span>{startingBalance.toFixed(2)} USDT</span>
                    )}
                  </td>
                  <td>
                    {this.getBalanceContent(
                      isRekt,
                      isRetarded,
                      tooLowBalance,
                      exchange,
                      balance
                    )}
                  </td>
                  <td>
                    {this.getRoeCurrent(
                      roeCurrent,
                      isRekt,
                      isRetarded,
                      tooLowBalance,
                      isZombie
                    )}
                  </td>
                  <td>
                    {this.getRoe1d(roe1d, isRekt, isRetarded, tooLowBalance)}
                  </td>
                  <td>
                    {this.getRoeColored(
                      roe3d,
                      isRekt,
                      isRetarded,
                      tooLowBalance,
                      isZombie
                    )}
                  </td>
                  <td>
                    {this.getRoeColored(
                      roe7d,
                      isRekt,
                      isRetarded,
                      tooLowBalance
                    )}
                  </td>
                  <td>
                    {this.getRoeColored(
                      roe14d,
                      isRekt,
                      isRetarded,
                      tooLowBalance
                    )}
                  </td>
                  <td className={"roe-chart"}>
                    {isRetarded || tooLowBalance ? (
                      <div></div>
                    ) : (
                      <Line
                        data={this.getChartData(roes)}
                        width={120}
                        height={40}
                        options={options}
                        legend={legend}
                      />
                    )}
                  </td>
                </tr>
              )
            })}

            {this.state.data.totallyEmptyAccounts.map((item, index) => {
              const { username } = item
              return (
                <tr
                  className={"margin-top-base margin-bottom-base"}
                  key={index + this.state.data.participants.length}
                >
                  <th scope="row">
                    {index + 1 + this.state.data.participants.length}
                  </th>
                  <td>{username}</td>
                  <td>0 BTC</td>
                  <td>0 BTC</td>
                  <td>
                    <div>
                      <img src={redCard} alt="redCard" />
                    </div>
                  </td>
                  <td>
                    <div>DNS</div>
                  </td>
                  <td>
                    <div>-</div>
                  </td>
                  <td>
                    <div>-</div>
                  </td>
                  <td>
                    <div>-</div>
                  </td>
                  <td className={"roe-chart"}>
                    <div></div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const options = {
  layout: {
    padding: 10,
  },
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  tooltips: {
    footerFontSize: 14,
    footerAlign: "center",
    footerFontFamily: "'Montserrat', 'Arial', sans-serif",
    callbacks: {
      label: function () {
        return null
      },
      title: function () {
        return null
      },
      footer: function (tooltipItems, data) {
        var sum = 0

        tooltipItems.forEach(
          (tooltipItem) =>
            (sum +=
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
        )
        return sum + " %"
      },
    },
  },
}

const legend = {
  display: false,
}

export default injectIntl(LeaguePage)
