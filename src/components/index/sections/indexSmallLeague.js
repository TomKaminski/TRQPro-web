import React from "react"
import { Link } from "gatsby"

import { apiUrl } from "../../../statics"
import redCard from "../../../images/red-card.svg"
import rekt from "../../../images/dead.svg"
const axios = require("axios")

export default class IndexSmallLeague extends React.Component {
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
    let endpoint = apiUrl + "league/smallLastReading"
    axios
      .get(endpoint)
      .then(response => {
        this.setState({
          data: response.data,
          loading: false,
          error: null,
        })
      })
      .catch(() => {
        this.setState({
          data: null,
          loading: false,
          error: "Błąd ładowania danych.",
        })
      })
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

  render() {
    return (
      <section className={"section-margin-and-padding"}>
        <div className={"section"}>
          <div className={"section-title-container"}>
            <Link to={`/liga`}>
              <h2 className={"section-title"}>Liga</h2>
            </Link>
          </div>
        </div>
        {this.state.loading ? (
          <h4 className={"margin-top-40 margin-bottom-40 center-margin"}>
            Ładowanie danych...
          </h4>
        ) : (
          this.renderLeague()
        )}
      </section>
    )
  }

  renderLeague() {
    if (!this.state.data.isLeagueData) {
      return (
        <div>
          <p>Zapraszamy do zapisów na kolejną ligę.</p>
          <p>
            Aktualnie zapisanych uczestników:{" "}
            {this.state.data.participantsCount}
          </p>
          <Link to={`/liga`}>Przejdź do zapisów</Link>
        </div>
      )
    }
    return (
      <div>
        <p>
          {this.state.data.hasEnded
            ? "Wyniki ostatniej ligi"
            : "Aktualne rozgrywki ligowe"}
        </p>
        <table
          className={"table margin-bottom-40 table-responsive-md"}
          id="liga-table"
        >
          <tbody>
            {Object.keys(this.state.data.participants).map((key, index) => {
              const {
                name,
                roe,
                isRekt,
                isRetarded,
                tooLowBalance,
              } = this.state.data.participants[key]
              return (
                <tr
                  className={"margin-top-base margin-bottom-base"}
                  key={index}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{name}</td>
                  <td>
                    {this.getRoeCurrent(roe, isRekt, isRetarded, tooLowBalance)}
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
