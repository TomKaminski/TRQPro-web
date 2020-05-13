import React, { Component } from "react"
import Modal from "../modal"
import InputWithTitle from "./inputWithTitle"
import { Row, Col } from "react-bootstrap"
import Dropdown from "react-dropdown"

import "react-dropdown/style.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { FormErrors } from "./formErrors"
import Loader from "react-loader-spinner"
import ApiResponse from "./apiResponse"
import { apiUrl } from "../../statics"
import CheckboxWithTitle from "./checkboxWithTitle"

import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

const axios = require("axios")

class LeagueModal extends React.Component {
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
        exchangeValid: false,
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
      .then((response) => {
        this.setState({
          rawLeaguesData: response.data,
          nearestLeague: response.data[0],
          leagueOptions: this.processLeagueOptions(response.data),
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  processLeagueOptions(data) {
    return data.map((val) => {
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
      exchange,
      league,
    } = this.state.formData
    axios
      .post(apiUrl + "League/joinLeague", {
        nickname,
        email,
        apiKey,
        apiSecret,
        saveForAllLeaguesAtCurrentQuarter,
        league: league.value,
        exchange: exchange.value,
      })
      .then((response) => {
        let joinedLeague = this.state.rawLeaguesData.find((item) => {
          return item.id === this.state.formData.league.value
        })

        if (response.data.isValid) {
          if (this.props.onParticipantAdded) {
            let username = this.state.formData.nickname
            let exchange = this.state.formData.exchange.value
            this.props.onParticipantAdded({ username, exchange })
          }

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
              exchangeValid: false,
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
      .catch((error) => {
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
          onClick={(e) => {
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
                  exchangeValid: false,
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
                <FormattedMessage
                  id="league-dialog.no-upcoming-leagues"
                  defaultMessage="Brak nadchodzących rozgrywek, sprawdź w późniejszym terminie."
                />
              </h3>
            </div>
          ) : (
            <div className={"modal-content"}>
              <h3>
                <FormattedMessage id="league-dialog.title" />
              </h3>
              <div>
                <FormattedMessage id="league-dialog.ref-requirements" />
                <br />
                <ul>
                  <li>
                    <a
                      href="https://www.bitmex.com/register/kiQKAa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bitmex
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.bybit.com/app/register?affiliate_id=5089&language=en&group_id=0&group_type=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bybit
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.binance.com/en/futures/ref/trqpro"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Binance Futures
                    </a>
                  </li>
                </ul>
              </div>
              <p>
                <FormattedMessage id="league-dialog.league-desc-1" />
                <b>
                  <u>{date.toLocaleDateString()}</u>
                </b>
                <FormattedMessage id="league-dialog.league-desc-2" />
                <br />
                <FormattedMessage id="league-dialog.league-desc-3" />
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
                            title={this.props.intl.formatMessage({
                              id: "league-dialog.form-title-nick",
                            })}
                            name={"nickname"}
                            value={this.state.formData.nickname}
                            onChange={(e) => {
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
                            title={this.props.intl.formatMessage({
                              id: "league-dialog.form-title-email",
                            })}
                            name="email"
                            value={this.state.formData.email}
                            onChange={(e) => {
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
                            title={this.props.intl.formatMessage({
                              id: "league-dialog.form-title-apikey",
                            })}
                            name="apiKey"
                            value={this.state.formData.apiKey}
                            onChange={(e) => {
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
                            title={this.props.intl.formatMessage({
                              id: "league-dialog.form-title-apisecret",
                            })}
                            name="apiSecret"
                            value={this.state.formData.apiSecret}
                            onChange={(e) => {
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
                        <Col xs={12} md={6}>
                          <div className={"input-with-title"}>
                            <p>
                              <FormattedMessage id="league-dialog.form-title-exchange" />
                            </p>
                            <Dropdown
                              options={[
                                {
                                  label: "Bitmex",
                                  value: "bitmex",
                                },
                                {
                                  label: "Binance",
                                  value: "binance",
                                },
                                {
                                  label: "Bybit",
                                  value: "bybit",
                                },
                              ]}
                              onChange={(opt) => {
                                this.setState(
                                  {
                                    formData: {
                                      ...this.state.formData,
                                      exchange: opt,
                                    },
                                  },
                                  () => {
                                    this.validateField("exchange", opt)
                                  }
                                )
                              }}
                              value={this.state.formData.exchange}
                              placeholder={this.props.intl.formatMessage({
                                id:
                                  "league-dialog.form-title-exchange-placeholder",
                              })}
                            />
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className={"input-with-title"}>
                            <p>
                              <FormattedMessage id="common.league" />
                            </p>
                            <Dropdown
                              options={this.state.leagueOptions}
                              onChange={(opt) => {
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
                              placeholder={this.props.intl.formatMessage({
                                id:
                                  "league-dialog.form-title-league-placeholder",
                              })}
                            />
                          </div>
                          <CheckboxWithTitle
                            title={this.props.intl.formatMessage({
                              id:
                                "league-dialog.form-all-quarter-leagues-checkbox",
                            })}
                            name="saveForAllLeaguesAtCurrentQuarter"
                            checked={
                              this.state.formData
                                .saveForAllLeaguesAtCurrentQuarter
                            }
                            onChange={(e) => {
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
                        <Col
                          style={{ display: "flex", alignItems: "center" }}
                          xs={{ order: 12 }}
                          md={{ order: 1 }}
                        >
                          <input
                            type="submit"
                            disabled={!this.state.validation.formValid}
                            className={"form-submit-button"}
                            value={this.props.intl.formatMessage({
                              id: "league.join-league-shout",
                            })}
                          />
                        </Col>
                      </Row>
                    </form>
                  )}
                </div>
              )}

              <h3>
                <FormattedMessage id="league-dialog.bitmex-tutorial-header" />
              </h3>
              <p>
                <FormattedMessage id="league-dialog.tutorial-exchanges-go-to" />{" "}
                <a
                  href="https://www.bitmex.com/app/apiKeys"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.bitmex.com/app/apiKeys
                </a>{" "}
                <FormattedMessage id="league-dialog.tutorial-exchanges-go-to-suffix" />
              </p>
              <ol>
                <li>
                  <FormattedMessage id="league-dialog.bitmex-tutorial-rule-1" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bitmex-tutorial-rule-2" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bitmex-tutorial-rule-3" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bitmex-tutorial-rule-4" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bitmex-tutorial-rule-5" />
                </li>
              </ol>

              <h3>
                <FormattedMessage id="league-dialog.bybit-tutorial-header" />
              </h3>
              <p>
                <FormattedMessage id="league-dialog.tutorial-exchanges-go-to" />{" "}
                <a
                  href="https://www.bybit.com/app/user/api-management"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.bybit.com/app/user/api-management
                </a>{" "}
                <FormattedMessage id="league-dialog.tutorial-exchanges-go-to-suffix" />
              </p>
              <ol>
                <li>
                  <FormattedMessage id="league-dialog.bybit-tutorial-rule-1" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bybit-tutorial-rule-2" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bybit-tutorial-rule-3" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bybit-tutorial-rule-4" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bybit-tutorial-rule-5" />
                </li>
                <li>
                  <b>
                    <FormattedMessage id="league-dialog.bybit-tutorial-rule-6" />
                  </b>
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bybit-tutorial-rule-7" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.bybit-tutorial-rule-8" />
                </li>
              </ol>

              <h3>
                <FormattedMessage id="league-dialog.binance-tutorial-header" />
              </h3>
              <p>
                <FormattedMessage id="league-dialog.tutorial-exchanges-go-to" />{" "}
                <a
                  href="https://www.binance.com/en/usercenter/settings/api-management"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.binance.com/en/usercenter/settings/api-management
                </a>{" "}
                <FormattedMessage id="league-dialog.tutorial-exchanges-go-to-suffix" />
              </p>
              <ol>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-1" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-2" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-3" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-4" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-5" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-6" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-7" />
                </li>
                <li>
                  <FormattedMessage id="league-dialog.binance-tutorial-rule-8" />
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
          : this.props.intl.formatMessage({
              id: "league-dialog.form-title-email-error",
            })
        break
      case "nickname":
        validation.nickValid = value.length > 0
        fieldValidationErrors.nickname = validation.nickValid
          ? ""
          : this.props.intl.formatMessage({
              id: "league-dialog.form-title-nick-error",
            })
        break
      case "apiKey":
        validation.apiKeyValid = value.length > 0
        fieldValidationErrors.apiKey = validation.apiKeyValid
          ? ""
          : this.props.intl.formatMessage({
              id: "league-dialog.form-title-apikey-error",
            })
        break
      case "apiSecret":
        validation.apiSecretValid = value.length > 0
        fieldValidationErrors.apiSecret = validation.apiSecretValid
          ? ""
          : this.props.intl.formatMessage({
              id: "league-dialog.form-title-apisecret-error",
            })
        break
      case "league":
        validation.leagueValid = value != null
        fieldValidationErrors.league = validation.leagueValid
          ? ""
          : this.props.intl.formatMessage({
              id: "league-dialog.form-title-league-error",
            })
        break
      case "exchange":
        validation.exchangeValid = value != null
        fieldValidationErrors.exchange = validation.exchangeValid
          ? ""
          : this.props.intl.formatMessage({
              id: "league-dialog.form-title-exchange-error",
            })
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
          this.state.validation.exchangeValid &&
          this.state.validation.apiSecretValid,
      },
    })
  }
}

export default injectIntl(LeagueModal)
