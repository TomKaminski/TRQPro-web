import React, { Component } from "react"
import Modal from "../modal"
import InputWithTitle from "./inputWithTitle"
import { Row, Col } from "react-bootstrap"
import Dropdown from "react-dropdown"

import "react-dropdown/style.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { FormErrors } from "./formErrors"
import Loader from "react-loader-spinner"
import { ApiResponse } from "./apiResponse"
import { apiUrl } from "../../statics"
import CheckboxWithTitle from "./checkboxWithTitle"

const axios = require("axios")

//TODO: Validate only on submit? :)

export default class LeagueModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nearestLeague: null,
      leagueOptions: [],
      isActive: props.isActive,
      isLoading: false,
      lastApiResponse: null,
      formData: {
        nickname: "",
        email: "",
        apiKey: "",
        apiSecret: "",
        saveForAllLeaguesAtCurrentQuarter: false,
        league: null,
      },
      validation: {
        nickValid: false,
        emailValid: false,
        apiKeyValid: false,
        apiSecretValid: false,
        leagueValid: false,
        formValid: false,
      },
      formErrors: {
        nickname: "",
        email: "",
        apiKey: "",
        apiSecret: "",
        league: "",
      },
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getData() {
    let endpoint = apiUrl + "league/comingLeagues"
    axios
      .get(endpoint)
      .then(response => {
        this.setState({
          rawLeaguesData: response.data,
          nearestLeague: response.data[0],
          leagueOptions: this.processLeagueOptions(response.data),
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  processLeagueOptions(data) {
    return data.map(val => {
      return {
        label: val.name,
        value: val.id,
      }
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      isActive: props.isActive,
    })
  }

  componentDidMount() {
    this.getData()
  }

  handleSubmit(event) {
    this.setState({ isLoading: true })
    event.preventDefault()

    let {
      nickname,
      email,
      apiKey,
      apiSecret,
      saveForAllLeaguesAtCurrentQuarter,
    } = this.state.formData
    axios
      .post(apiUrl + "League/joinLeague", {
        nickname,
        email,
        apiKey,
        apiSecret,
        saveForAllLeaguesAtCurrentQuarter,
        league: this.state.formData.league.value,
      })
      .then(response => {
        let joinedLeague = this.state.rawLeaguesData.find(item => {
          return item.id === this.state.formData.league.value
        })

        if (this.props.onParticipantAdded) {
          let username = this.state.formData.nickname
          this.props.onParticipantAdded({ username })
        }

        if (response.data.isValid) {
          this.setState({
            isLoading: false,
            joinedLeague: joinedLeague,
            lastApiResponse: response.data,
            formData: {
              nickname: "",
              email: "",
              apiKey: "",
              apiSecret: "",
              saveForAllLeaguesAtCurrentQuarter: false,
              league: null,
            },
            validation: {
              nickValid: false,
              emailValid: false,
              apiKeyValid: false,
              apiSecretValid: false,
              leagueValid: false,
              formValid: false,
            },
          })
        } else {
          this.setState({
            isLoading: false,
            lastApiResponse: response.data,
          })
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          lastApiResponse: {
            isValid: false,
            error: error,
          },
        })

        console.log(error)
      })
  }

  getNearestLeagueStartDate() {
    if (this.state.nearestLeague != null) {
      return new Date(this.state.nearestLeague.startDate)
    }
    return null
  }

  render() {
    if (!this.state.isActive) {
      return <div></div>
    }

    let date = this.getNearestLeagueStartDate()
    return (
      <Modal>
        <div
          className={"modal-overlay"}
          onClick={e => {
            if (e.target.className === "modal-overlay") {
              this.setState({
                isActive: false,
                isLoading: false,
                joinedLeague: null,
                lastApiResponse: null,
                formData: {
                  nickname: "",
                  email: "",
                  apiKey: "",
                  apiSecret: "",
                  saveForAllLeaguesAtCurrentQuarter: false,
                  league: null,
                },
                validation: {
                  nickValid: false,
                  emailValid: false,
                  apiKeyValid: false,
                  apiSecretValid: false,
                  leagueValid: false,
                  formValid: false,
                },
              })
            }
          }}
        >
          {date === null ? (
            <div className={"modal-content"}>
              <h3>
                Brak nadchodzących rozgrywek, sprawdź w późniejszym terminie.
              </h3>
            </div>
          ) : (
            <div className={"modal-content"}>
              <h3>Chcesz dołączyć do ligi? Zapisz się juz teraz!</h3>
              <br />
              <p>
                Najbliższa liga rozpoczyna się{" "}
                <b>
                  <u>{date.toLocaleDateString()}</u>
                </b>
                , wystarczy podać swoje api do odczytu stanu konta ligowego (jak
                to zrobić?*). <br />
                Ostateczny termin zapisów:{" "}
                {new Date(
                  this.state.nearestLeague.signingLimitDate
                ).toLocaleString()}
                .
              </p>

              {this.state.isLoading ? (
                <Loader
                  type="Grid"
                  color="rebeccapurple"
                  height={100}
                  style={{ margin: "20px auto 30px" }}
                  width={100} //3 secs
                />
              ) : (
                <div>
                  <ApiResponse
                    response={this.state.lastApiResponse}
                    leagueData={this.state.joinedLeague}
                  />
                  <FormErrors formErrors={this.state.formErrors} />
                  {this.state.lastApiResponse != null &&
                  this.state.lastApiResponse.isValid ? (
                    <div></div>
                  ) : (
                    <form
                      className={"margin-bottom-40"}
                      onSubmit={this.handleSubmit}
                    >
                      <Row>
                        <Col xs={12} md={6}>
                          <InputWithTitle
                            title={"Nick z telegrama"}
                            name={"nickname"}
                            value={this.state.formData.nickname}
                            onChange={e => {
                              let name = e.target.name
                              let value = e.target.value
                              this.setState(
                                {
                                  formData: {
                                    ...this.state.formData,
                                    nickname: value,
                                  },
                                },
                                () => {
                                  this.validateField(name, value)
                                }
                              )
                            }}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <InputWithTitle
                            title={"adres email"}
                            name="email"
                            value={this.state.formData.email}
                            onChange={e => {
                              let name = e.target.name
                              let value = e.target.value
                              this.setState(
                                {
                                  formData: {
                                    ...this.state.formData,
                                    email: value,
                                  },
                                },
                                () => {
                                  this.validateField(name, value)
                                }
                              )
                            }}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <InputWithTitle
                            title={"API key"}
                            name="apiKey"
                            value={this.state.formData.apiKey}
                            onChange={e => {
                              let name = e.target.name
                              let value = e.target.value
                              this.setState(
                                {
                                  formData: {
                                    ...this.state.formData,
                                    apiKey: value,
                                  },
                                },
                                () => {
                                  this.validateField(name, value)
                                }
                              )
                            }}
                          />
                        </Col>

                        <Col xs={12} md={6}>
                          <InputWithTitle
                            title={"API secret"}
                            name="apiSecret"
                            value={this.state.formData.apiSecret}
                            onChange={e => {
                              let name = e.target.name
                              let value = e.target.value
                              this.setState(
                                {
                                  formData: {
                                    ...this.state.formData,
                                    apiSecret: value,
                                  },
                                },
                                () => {
                                  this.validateField(name, value)
                                }
                              )
                            }}
                          />
                        </Col>
                        <Col
                          style={{ display: "flex", alignItems: "center" }}
                          xs={{ order: 12 }}
                          md={{ order: 1 }}
                        >
                          <input
                            type="submit"
                            disabled={!this.state.validation.formValid}
                            className={"form-submit-button"}
                            value="Dołącz do ligi"
                          />
                        </Col>
                        <Col xs={12} md={{ order: 12 }}>
                          <div className={"input-with-title"}>
                            <p>Liga</p>
                            <Dropdown
                              options={this.state.leagueOptions}
                              onChange={opt => {
                                this.setState(
                                  {
                                    formData: {
                                      ...this.state.formData,
                                      league: opt,
                                    },
                                  },
                                  () => {
                                    this.validateField("league", opt)
                                  }
                                )
                              }}
                              value={this.state.formData.league}
                              placeholder="Wybierz ligę"
                            />
                          </div>
                          <CheckboxWithTitle
                            title={
                              "Zapisz mnie na wszystkie pozostałe ligi w tym kwartale"
                            }
                            name="saveForAllLeaguesAtCurrentQuarter"
                            checked={
                              this.state.formData
                                .saveForAllLeaguesAtCurrentQuarter
                            }
                            onChange={e => {
                              let value = e.target.checked
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  saveForAllLeaguesAtCurrentQuarter: value,
                                },
                              })
                            }}
                          />
                        </Col>
                      </Row>
                    </form>
                  )}
                </div>
              )}

              <p>
                * Idź do{" "}
                <a
                  href="https://www.bitmex.com/app/apiKeys"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.bitmex.com/app/apiKeys
                </a>{" "}
                i postępuj zgodnie z instrukcją:
              </p>
              <ol>
                <li>W polu Name wpisz "nick-z-telegrama" np. "Janusz",</li>
                <li>CID - to pole pozostawiamy puste,</li>
                <li>
                  Key Permissions - tutaj wybieramy (-), nie jest wymagane ani
                  "Order", ani "Order cancel",
                </li>
                <li>Pole "Withdraw" pozostawiamy puste, bez zmian,</li>
                <li>
                  Utwórz klucz i przepisz dla nas klucz "ID" oraz "Secret"
                  (zapisz "Secret" w bezpiecznym miejscu, widzisz go tylko
                  podczas tworzenia klucza!).
                </li>
              </ol>
            </div>
          )}
        </div>
      </Modal>
    )
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error"
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let validation = this.state.validation

    switch (fieldName) {
      case "email":
        validation.emailValid = value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        )
        fieldValidationErrors.email = validation.emailValid
          ? ""
          : "Adres email jest niepoprawny"
        break
      case "nickname":
        validation.nickValid = value.length > 0
        fieldValidationErrors.nickname = validation.nickValid
          ? ""
          : "Nick jest wymagany"
        break
      case "apiKey":
        validation.apiKeyValid = value.length > 0
        fieldValidationErrors.apiKey = validation.apiKeyValid
          ? ""
          : "Klucz API jest wymagany"
        break
      case "apiSecret":
        validation.apiSecretValid = value.length > 0
        fieldValidationErrors.apiSecret = validation.apiSecretValid
          ? ""
          : "API Secret jest wymagany"
        break
      case "league":
        validation.leagueValid = value != null
        fieldValidationErrors.league = validation.leagueValid
          ? ""
          : "Liga jest wymagana"
        break
      default:
        break
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        validation,
      },
      this.validateForm
    )
  }

  validateForm() {
    this.setState({
      validation: {
        ...this.state.validation,
        formValid:
          this.state.validation.emailValid &&
          this.state.validation.nickValid &&
          this.state.validation.apiKeyValid &&
          this.state.validation.leagueValid &&
          this.state.validation.apiSecretValid,
      },
    })
  }
}
