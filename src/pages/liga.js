import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import redCard from "../images/red-card.svg"
import rekt from "../images/dead.svg"

import "../styles/liga.scss"

import { Line } from "react-chartjs-2"

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
    let url = process.env.DEPLOY_URL
      ? "https://cms.trqpro.pl/"
      : "http://localhost:1337/"
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
        <h3>Chcesz dołączyć do ligi? zapisz się i zapoznaj z regulaminem</h3>
        <p>
          <Link to={"/liga-regulamin"}>przejdź do regulaminu</Link>
        </p>

        {this.state.loading ? (
          <Container>
            <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
              Ładowanie danych...
            </h4>
          </Container>
        ) : (
          this.renderLeague()
        )}
      </Layout>
    )
  }

  getRoeColored(roe, isRekt, isRetarded) {
    if (isRetarded) {
      return <div>-</div>
    }

    if (isRekt) {
      return <div>-</div>
    }

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

  getRoeCurrent(roe, isRekt, isRetarded) {
    if (isRetarded) {
      return (
        <div>
          <img src={redCard} />
        </div>
      )
    }

    if (isRekt) {
      return (
        <div>
          <img src={rekt} />
        </div>
      )
    }

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

  getRoe1d(roe, isRekt, isRetarded) {
    if (isRetarded) {
      return <div>DIS</div>
    }

    if (isRekt) {
      return <div>REKT</div>
    }

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
        <Container fluid={true} className={"league-stat-container"}>
          <Row>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>Data rozpoczęcia:</p>
              <p className={"league-stat"}>
                {new Date(this.state.data.startDate).toLocaleString()}
              </p>
            </Col>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>Data zakończenia:</p>
              <p className={"league-stat"}>
                {new Date(this.state.data.endDate).toLocaleString()}
              </p>
            </Col>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>Następny odczyt:</p>
              <p className={"league-stat"}>
                {new Date(this.state.data.nextReadingDate).toLocaleString()}
              </p>
            </Col>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>Ilość uczestników:</p>
              <p className={"league-stat"}>
                {this.state.data.participants.length}
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
                roeEnd,
                balance,
                startingBalance,
                isRekt,
                isRetarded,
                roes,
              } = this.state.data.participants[key]
              return (
                <tr className={"margin-top-base margin-bottom-base"}>
                  <th scope="row">{index + 1}</th>
                  <td>{username}</td>
                  <td>{startingBalance}</td>
                  <td>{balance}</td>
                  <td>{this.getRoeCurrent(roeCurrent, isRekt, isRetarded)}</td>
                  <td>{this.getRoe1d(roe1d, isRekt, isRetarded)}</td>
                  <td>{this.getRoeColored(roe3d, isRekt, isRetarded)}</td>
                  <td>{this.getRoeColored(roe7d, isRekt, isRetarded)}</td>
                  <td>{this.getRoeColored(roe14d, isRekt, isRetarded)}</td>
                  <td>{this.getRoeColored(roeEnd, isRekt, isRetarded)}</td>
                  <td className={"roe-chart"}>
                    {isRekt || isRetarded ? (
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
    callbacks: {
      label: function(tooltipItem, data) {
        return null
      },
      title: function(tooltipItems, data) {
        return null
      },
      footer: function(tooltipItems, data) {
        var sum = 0

        tooltipItems.forEach(function(tooltipItem) {
          sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
        })
        return sum + "%"
      },
    },
  },
}

const legend = {
  display: false,
}

export default LeaguePage
