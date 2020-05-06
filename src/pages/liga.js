import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { Container } from "react-bootstrap"

import next from "../images/next.svg"

import "../styles/liga.scss"

import LeagueModal from "../components/league/league_modal"
import LeagueTable from "../components/league/league_table"
import ComingLeagueHeader from "../components/league/coming_league_header"
import OngoingLeagueHeader from "../components/league/ongoing_league_header"
import LeagueSignList from "../components/league/league_sign_list"
import LeagueLinks from "../components/league/league_links"

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

  getData() {
    let endpoint = apiUrl + "league/lastReading"
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
            error: "Nie udało się załadować danych ligi.",
          })
        }
      })
      .catch((error) => {
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
        <SEO title="Liga" pathname={`/liga`} />
        <div className={"join-league-container"}>
          <h1>Liga TRQPro - Bitmex, Binance, Bybit</h1>
          <button
            className={"form-submit-button"}
            onClick={(e) => {
              this.setState({ showModal: true })
            }}
          >
            <img
              src={next}
              style={{ paddingRight: "8px" }}
              alt="join league button"
            />{" "}
            Dołącz do ligi!
          </button>
        </div>
        <h4>Chcesz dołączyć do ligi? zapisz się i zapoznaj z regulaminem</h4>

        <LeagueLinks />

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
      ...this.state.data.totallyEmptyAccounts.map((item) => {
        return {
          balance: 0,
          account: 0,
          deposit: {},
          username: item.username,
          exchange: item.exchange,
          isZombie: false,
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
    if (this.state.data === null) {
      return (
        <Container>
          <LeagueModal isActive={this.state.showModal} />
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            Brak aktywnej ligi lub brak pierwszego odczytu (12:30 UTC).
          </h4>
        </Container>
      )
    }

    if (this.state.data.isComingLeague) {
      return (
        <div>
          <LeagueModal
            isActive={this.state.showModal}
            onParticipantAdded={(participant) =>
              this.onParticipantAdded(participant)
            }
          />
          <ComingLeagueHeader
            startDate={this.state.data.startDate}
            endDate={this.state.data.endDate}
            signingLimitDate={this.state.data.signingLimitDate}
            participantsLength={this.state.data.participants.length}
          />
          <p className="categoryTagResults">Zapisani uczestnicy</p>
          <LeagueSignList participants={this.state.data.participants} />
        </div>
      )
    }

    const mergedData = this.mergeData()

    return (
      <div>
        <LeagueModal isActive={this.state.showModal} />
        <OngoingLeagueHeader
          startDate={this.state.data.startDate}
          endDate={this.state.data.endDate}
          nextReadingDate={this.state.data.nextReadingDate}
          hasEnded={this.state.data.hasEnded}
          participantsLength={this.state.data.participants.length}
        />
        <LeagueTable leagueData={mergedData} />
      </div>
    )
  }
}

export default LeaguePage
