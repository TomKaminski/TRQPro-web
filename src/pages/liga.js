import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
        {this.state.loading ? <div>Loading...</div> : this.renderLeague()}
      </Layout>
    )
  }

  renderLeague() {
    if (this.state.data === null) {
      return (
        <div>Brak aktywnej ligi lub brak pierwszego odczytu (12:05 UTC).</div>
      )
    }
    return (
      <table class="table table-hover">
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
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{username}</td>
                <td>{startingBalance}</td>
                <td>{balance}</td>
                <td>{roeCurrent}%</td>
                <td>{roe1d !== null ? roe1d + "%" : "-"}</td>
                <td>{roe3d !== null ? roe3d + "%" : "-"}</td>
                <td>{roe7d !== null ? roe7d + "%" : "-"}</td>
                <td>{roe14d !== null ? roe14d + "%" : "-"}</td>
                <td>{roeEnd !== null ? roeEnd + "%" : "-"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default LeaguePage
