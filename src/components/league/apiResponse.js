import React from "react"

function render(response, leagueData) {
  if (response != null) {
    if (response.isValid) {
      return (
        <p className={"api-message-success"}>
          Dziękujemy za zapisanie się do ligi. Najblizsza liga jest rozgrywana w
          dniach od {new Date(leagueData.startDate).toLocaleString()} do{" "}
          {new Date(leagueData.endDate).toLocaleString()}. <b>Powodzenia!</b>
        </p>
      )
    } else {
      return (
        <p style={{ color: "red", textDecoration: "underline" }}>
          {response.error}
        </p>
      )
    }
  } else {
    return <div></div>
  }
}

export const ApiResponse = ({ response, leagueData }) =>
  render(response, leagueData)
