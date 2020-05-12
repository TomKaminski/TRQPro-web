import React from "react"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

function render(response, leagueData) {
  if (response != null) {
    if (response.isValid) {
      if (leagueData != null && leagueData !== undefined) {
        return (
          <p className={"api-message-success"}>
            <FormattedMessage id="league-api-response.success-part-1" />{" "}
            {new Date(leagueData.startDate).toLocaleString()}{" "}
            <FormattedMessage id="league-api-response.success-part-2" />{" "}
            {new Date(leagueData.endDate).toLocaleString()}.{" "}
            <b>
              <FormattedMessage id="league-api-response.success-part-3" />
            </b>
          </p>
        )
      } else {
        return (
          <p className={"api-message-success"}>
            <FormattedMessage id="league-api-response.success-alternate" />
          </p>
        )
      }
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

const ApiResponse = ({ response, leagueData }) => render(response, leagueData)

export default injectIntl(ApiResponse)
