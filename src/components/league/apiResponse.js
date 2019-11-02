import React from "react"

function render(response) {
  if (response != null) {
    if (response.isValid) {
      return (
        <p style={{ color: "green", textDecoration: "underline" }}>
          Dziękujemy za zapisanie się do ligi.
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

export const ApiResponse = ({ response }) => render(response)
