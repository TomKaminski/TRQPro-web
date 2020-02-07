import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import "../styles/liga.scss"

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
        <div className={"join-league-container"}>
          <h2>Ranking</h2>
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
            <Link to={"/liga-regulamin"}>przejdź do regulaminu</Link>
          </Col>
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga"}>przejdź do aktualnej ligi</Link>
          </Col>
          <Col xs={6} md={3} className="margin-top-base">
            <Link to={"/liga-historia"}>przejdź do historii</Link>
          </Col>
          <Col xs={6} md={3}></Col>
        </Row>

        {!this.state.loading ? this.renderLadder() : null}
      </Layout>
    )
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
        {this.state.data.forEach(ladder => {
          return <p className="categoryTagResults">Zapisani uczestnicy</p>
        })}

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
}

export default LeaguePage
