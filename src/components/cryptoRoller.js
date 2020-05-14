import React from "react"
import Swiper from "react-id-swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../../node_modules/swiper/src/swiper.scss"
import "../styles/crypto-roller.scss"

const axios = require("axios")

const params = {
  slidesPerView: "auto",
  shouldSwiperUpdate: true,
  spaceBetween: 60,
  loopMode: true,
  containerClass: "crypto-roller-container swiper-container",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
}

export default class CryptoRoller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2Cethereum%2Cripple%2Ctether%2Cbitcoin-cash%2Clitecoin%2Ceos%2Cbinancecoin%2Cbitcoin-cash-sv%2Cstellar&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        this.setState({
          elements: response.data,
        })
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(() => {
        this.timeoutId = setTimeout(
          function () {
            this.getData()
          }.bind(this),
          60000
        )
      })
  }

  renderItem(item) {
    return (
      <div className={"element"} key={item.name}>
        <span className={"title"}>{item.name}</span>
        <span className={"value"}>
          {Math.round(item.current_price * 100) / 100} USD
        </span>
        {item.price_change_percentage_24h < 0 ? (
          <FontAwesomeIcon icon="sort-down" className={"arrow-down"} />
        ) : (
          <FontAwesomeIcon icon="sort-up" className={"arrow-up"} />
        )}
        {item.price_change_percentage_24h < 0 ? (
          <span className={"percentage red"}>
            {Math.round(item.price_change_percentage_24h * 100) / 100}%
          </span>
        ) : (
          <span className={"percentage green"}>
            {Math.round(item.price_change_percentage_24h * 100) / 100}%
          </span>
        )}
      </div>
    )
  }

  render() {
    var currencyList = this.state.elements.map((item) => {
      return this.renderItem(item)
    })

    return <Swiper {...params}>{currencyList}</Swiper>
  }
}
