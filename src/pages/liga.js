import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import redCard from "../images/red-card.svg"
import rekt from "../images/dead.svg"
import next from "../images/next.svg"
import winner from "../images/winner.svg"

import "../styles/liga.scss"

import { Line } from "react-chartjs-2"
import LeagueModal from "../components/league/league_modal"

import { apiUrl } from "../statics"

const axios = require("axios")

class LeaguePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
      error: null,
      showModal: false,
    }
  }

  onParticipantAdded(participant) {
    if (this.state.data.isComingLeague) {
      let participants = this.state.data.participants
      participants.push(participant)
      let data = this.state.data
      data.participants = participants
      this.setState({
        data,
      })
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
    let endpoint = apiUrl + "league/lastReading"
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
        <div className={"join-league-container"}>
          <h2>Chcesz dołączyć do ligi? zapisz się i zapoznaj z regulaminem</h2>
          <button
            className={"form-submit-button"}
            onClick={e => {
              this.setState({ showModal: true })
            }}
          >
            <img src={next} style={{ paddingRight: "8px" }} alt="" /> Dołącz do
            ligi!
          </button>
        </div>

        <Row className="league-link-container">
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-regulamin"}>przejdź do regulaminu</Link>
          </Col>
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-historia"}>przejdź do archiwum rozgrywek</Link>
          </Col>
          {/* <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-hist oria"}>przejdź do rankingu</Link>
          </Col> */}
          <Col xs={6} md={3}></Col>
          <Col xs={6} md={3}></Col>
        </Row>

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

  getRoeColored(roe, isRekt, isRetarded, tooLowBalance) {
    if (isRetarded || isRekt || tooLowBalance) {
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

  getRoeCurrent(roe, isRekt, isRetarded, tooLowBalance) {
    if (isRetarded) {
      return (
        <div>
          <img src={redCard} alt="redCard" />
        </div>
      )
    }

    if (isRekt) {
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

  getRoe1d(roe, isRekt, isRetarded, tooLowBalance) {
    if (isRetarded) {
      return <div>DSQ</div>
    }

    if (isRekt) {
      return <div>LIQ</div>
    }

    if (tooLowBalance) {
      return <div>DNS</div>
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

  convertSatoshiToBTC(satoshi) {
    return satoshi / 100000000.0
  }

  renderLeague() {
    if (this.state.data === null) {
      return (
        <Container>
          <LeagueModal isActive={this.state.showModal} />
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            Brak aktywnej ligi lub brak pierwszego odczytu (12:05 UTC).
          </h4>
        </Container>
      )
    }

    if (this.state.data.isComingLeague) {
      return (
        <div>
          <LeagueModal
            isActive={this.state.showModal}
            onParticipantAdded={participant =>
              this.onParticipantAdded(participant)
            }
          />
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
                <p className={"league-stat-header"}>Zapisy do:</p>
                <p className={"league-stat"}>
                  {new Date(this.state.data.signingLimitDate).toLocaleString()}
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
          <p className="categoryTagResults">Zapisani uczestnicy</p>

          <Row>
            {Object.keys(this.state.data.participants).map((key, index) => {
              const { username } = this.state.data.participants[key]
              return (
                <Col xs={12} md={6} lg={4} key={"user_" + index}>
                  <p>
                    {index + 1}. {username}
                  </p>
                </Col>
              )
            })}
          </Row>
        </div>
      )
    }

    return (
      <div>
        <LeagueModal isActive={this.state.showModal} />
        <Container fluid={true} className={"league-stat-container"}>
          <Row>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>Data rozpoczęcia:</p>
              <p className={"league-stat"}>
                {new Date(this.state.data.startDate).toLocaleString()}
              </p>
            </Col>
            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>Następny odczyt:</p>
              <p className={"league-stat"}>
                {this.state.data.hasEnded ? (
                  <span style={{ color: "green" }}>Liga zakończona</span>
                ) : (
                  new Date(this.state.data.nextReadingDate).toLocaleString()
                )}
              </p>
            </Col>
            <Col xs={6} md={3} style={{ display: "flex", alignItems: "end" }}>
              <div>
                <p className={"league-stat-header"}>Data zakończenia:</p>
                <p className={"league-stat"}>
                  {new Date(this.state.data.endDate).toLocaleString()}
                </p>
              </div>
              <img src={winner} alt="" />
            </Col>

            <Col xs={6} md={3}>
              <p className={"league-stat-header"}>Ilość uczestników:</p>
              <p className={"league-stat"}>
                {this.state.data.participants.length +
                  this.state.data.totallyEmptyAccounts.length}
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
                roes,
              } = this.state.data.participants[key]
              return (
                <tr
                  className={"margin-top-base margin-bottom-base"}
                  key={index}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{username}</td>
                  <td>{this.convertSatoshiToBTC(startingBalance)} BTC</td>
                  <td>
                    {isRekt || isRetarded || tooLowBalance
                      ? 0
                      : this.convertSatoshiToBTC(balance)}{" "}
                    BTC
                  </td>
                  <td>
                    {this.getRoeCurrent(
                      roeCurrent,
                      isRekt,
                      isRetarded,
                      tooLowBalance
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
                      tooLowBalance
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
      label: function() {
        return null
      },
      title: function() {
        return null
      },
      footer: function(tooltipItems, data) {
        var sum = 0

        tooltipItems.forEach(
          tooltipItem =>
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

export default LeaguePage
