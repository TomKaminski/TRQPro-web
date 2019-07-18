import React from "react"
import Swiper from "react-id-swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../../node_modules/react-id-swiper/lib/styles/css/swiper.css"
import "../styles/crypto-roller.scss"

const axios = require("axios")

const params = {
  slidesPerView: "auto",
  spaceBetween: 60,
  loop: true,
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
      elements: [
        {
          name: "Bitcoin",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "Ethereum",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "Litecoin",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "Bitcoin Cash",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "EOS",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "NEO",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "Waves",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "Fantom",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
        {
          name: "LINK",
          current_price: 0,
          price_change_percentage_24h: 0,
        },
      ],
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  getData() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=PLN&ids=bitcoin%2Cethereum%2Cbitcoin-cash%2Clitecoin%2Cwaves%2Clink%2Cfantom%2Cneo%2Cbinance-coin%2Ceos&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then(response => {
        this.setState({
          elements: response.data,
        })
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(() => {
        this.timeoutId = setTimeout(
          function() {
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
        <span className={"value"}>{item.current_price} PLN</span>
        {item.price_change_percentage_24h < 0 ? (
          <FontAwesomeIcon icon="sort-down" className={"arrow-down"} />
        ) : (
          <FontAwesomeIcon icon="sort-up" className={"arrow-up"} />
        )}
        {item.price_change_percentage_24h < 0 ? (
          <span className={"percentage red"}>
            {item.price_change_percentage_24h}%
          </span>
        ) : (
          <span className={"percentage green"}>
            {item.price_change_percentage_24h}%
          </span>
        )}
      </div>
    )
  }

  render() {
    var currencyList = this.state.elements.map(item => {
      return this.renderItem(item)
    })

    return <Swiper {...params}>{currencyList}</Swiper>
  }
}
