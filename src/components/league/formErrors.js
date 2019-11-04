import React from "react"

export const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    <ul>
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return <li key={i}>{formErrors[fieldName]}</li>
        } else {
          return ""
        }
      })}
    </ul>
  </div>
)
