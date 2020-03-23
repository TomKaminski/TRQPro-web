import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import next from "../images/next.svg"
import winner from "../images/winner.svg"

import "../styles/liga.scss"

import LeagueModal from "../components/league/league_modal"

import { apiUrl } from "../statics"

import LeagueTable from "../components/league/table"

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
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-ranking"}>przejdź do rankingu</Link>
          </Col>
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

  mergeData() {
    const merged = this.state.data.participants
    merged.push(
      ...this.state.data.totallyEmptyAccounts.map(item => {
        return {
          balance: 0,
          account: 0,
          deposit: {},
          username: item.username,
          startingBalance: 0,
          roeCurrent: null,
          roe1d: null,
          roe7d: null,
          roe3d: null,
          roe14d: null,
          roeEnd: null,
          isRekt: false,
          isRetarded: false,
          tooLowBalance: true,
          roes: [],
        }
      })
    )
    return merged
  }

  renderLeague() {
    const mergedData = this.mergeData()
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
      let colLength = Math.ceil(this.state.data.participants.length / 3)
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
            <Col xs={12} md={6} lg={4}>
              {this.state.data.participants
                .slice(0, colLength)
                .map((element, i) => {
                  return (
                    <p key={"user_" + i}>
                      {i + 1}. {element.username}
                    </p>
                  )
                })}
            </Col>
            <Col xs={12} md={{ span: 6, order: 12 }} lg={{ span: 4, order: 1 }}>
              {this.state.data.participants
                .slice(colLength, colLength * 2)
                .map((element, i) => {
                  return (
                    <p key={"user_" + i}>
                      {i + 1 + colLength}. {element.username}
                    </p>
                  )
                })}
            </Col>
            <Col xs={12} md={{ span: 6, order: 1 }} lg={{ span: 4, order: 12 }}>
              {this.state.data.participants
                .slice(colLength * 2, colLength * 3)
                .map((element, i) => {
                  return (
                    <p key={"user_" + i}>
                      {i + 1 + colLength * 2}. {element.username}
                    </p>
                  )
                })}
            </Col>
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
        <LeagueTable leagueData={mergedData} />
      </div>
    )
  }
}

export default LeaguePage
