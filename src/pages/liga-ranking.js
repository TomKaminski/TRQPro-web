import React from "react"
import { Link } from "gatsby"

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
    // let endpoint = apiUrl + "leaguehistory/selectorData"
    // axios
    //   .get(endpoint)
    //   .then(response => {
    //     this.setState(
    //       {
    //         leagueOptions: this.processLeagueOptions(response.data),
    //         selectedLeague: response.data[response.data.length - 1],
    //       },
    //       () => {
    //         this.getData()
    //       }
    //     )
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  // processLeagueOptions(data) {
  //   return data.map(val => {
  //     return {
  //       label: val.substring(0, val.length - 5),
  //       value: val,
  //     }
  //   })
  // }

  getData() {
    let endpoint = apiUrl + "league/getLadderForYear?year=2020"
    axios
      .get(endpoint)
      .then(response => {
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
            error: "Nie udało się załadować rankingu",
          })
        }
      })
      .catch(error => {
        this.setState({
          data: null,
          loading: false,
          error: "Nie udało się załadować rankingu",
        })
      })
  }

  render() {
    return (
      <Layout>
        <SEO title="Liga - ranking" pathname={`/liga-ranking`} />
        <div>
          <h1>Liga TRQPro - ranking rozgrywek</h1>
          <h5>
            W tym miejscu znajdziesz tabele z punktacją kwartalną oraz roczną.
          </h5>
        </div>
        {/* 
        <Col xs={12} md={6} style={{ paddingLeft: 0, marginBottom: "20px" }}>
          <p style={{ marginBottom: "2px" }}>Wybierz ligę</p>
          <Dropdown
            options={this.state.leagueOptions}
            onChange={opt => {
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
        </Col> */}

        <Row className="league-link-container">
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-regulamin"}>przejdź do regulaminu ligi</Link>
          </Col>
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga"}>przejdź do aktualnej ligi</Link>
          </Col>
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-historia"}>przejdź do historii rozgrywek</Link>
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
    if (this.state.data === null) {
      return (
        <Container>
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            Nie znaleziono danych wybranego roku.
          </h4>
        </Container>
      )
    }

    return (
      <div>
        {this.state.data.map(ladder => {
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
                    <th scope="col">Punkty</th>
                    <th scope="col">Średnie roe</th>
                    <th scope="col">Najwyższe roe</th>
                    <th scope="col">Rozegrane ligi</th>
                    <th scope="col">Łączny kapitał startowy</th>
                    <th scope="col">Łączny kapitał końcowy</th>
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

export default LeaguePage
