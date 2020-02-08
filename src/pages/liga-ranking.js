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
        <SEO title="Liga" />
        <div>
          <h2>Ranking</h2>
          <p>
            W tym miejscu mozesz śledzić poczynania uczestników Ligi w ujęciu
            kwartalno-rocznym. Najlepsi zawodnicy zostaną nagrodzeni :).
          </p>
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
  }

  renderLadder() {
    if (this.state.data === null) {
      return (
        <Container>
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            Brak rankingu na wybrany rok.
          </h4>
        </Container>
      )
    }
    return (
      <div>
        {this.state.data.map(ladder => {
          let colLength = Math.ceil((ladder.participants.length - 3) / 3)
          return (
            <div>
              <p className="categoryTagResults">{ladder.ladder_public_name}</p>
              <Row>
                {ladder.participants.slice(0, 3).map((element, i) => {
                  return (
                    <Col xs={12}>
                      <p key={"user_" + i} className={"ladder-user-" + i}>
                        {this.getMedalByIndex(i)} {element.username} (
                        {element.points} pkt., ROE{" "}
                        {element.overallRoe.toFixed(2)}%)
                      </p>
                    </Col>
                  )
                })}
              </Row>
              <Row>
                <Col xs={12} md={6} lg={4}>
                  {ladder.participants
                    .slice(3, colLength + 3)
                    .map((element, i) => {
                      return (
                        <p key={"user_" + i}>
                          {i + 4}. {element.username} ({element.points} pkt.,
                          ROE {element.overallRoe.toFixed(2)}%)
                        </p>
                      )
                    })}
                </Col>
                <Col
                  xs={12}
                  md={{ span: 6, order: 12 }}
                  lg={{ span: 4, order: 1 }}
                >
                  {ladder.participants
                    .slice(colLength + 3, colLength * 2 + 3)
                    .map((element, i) => {
                      return (
                        <p key={"user_" + i}>
                          {i + 4 + colLength}. {element.username} (
                          {element.points} pkt., ROE{" "}
                          {element.overallRoe.toFixed(2)}%)
                        </p>
                      )
                    })}
                </Col>
                <Col
                  xs={12}
                  md={{ span: 6, order: 1 }}
                  lg={{ span: 4, order: 12 }}
                >
                  {ladder.participants
                    .slice(colLength * 2 + 3, colLength * 3 + 3)
                    .map((element, i) => {
                      return (
                        <p key={"user_" + i}>
                          {i + 4 + colLength * 2}. {element.username} (
                          {element.points} pkt., ROE{" "}
                          {element.overallRoe.toFixed(2)}%)
                        </p>
                      )
                    })}
                </Col>
              </Row>
            </div>
          )
        })}
      </div>
    )
  }
}

export default LeaguePage
