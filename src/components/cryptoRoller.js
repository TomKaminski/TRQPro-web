import React from "react"
import Swiper from "react-id-swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../../node_modules/react-id-swiper/lib/styles/css/swiper.css"
import "../styles/crypto-roller.scss"

const CryptoRoller = () => {
  const params = {
    slidesPerView: "auto",
    spaceBetween: 60,
    loop: true,
    centeredSlides: true,
    containerClass: "crypto-roller-container",
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  }

  return (
    <Swiper {...params} className={"crypto-roller-container"}>
      <div className={"element"}>
        <span className={"title"}>Bitcoin</span>
        <span className={"value"}>9000$</span>
        <FontAwesomeIcon icon="sort-down" className={"arrow-down"} />
        <span className={"percentage red"}>4.50%</span>
      </div>
      <div className={"element"}>
        <span className={"title"}>Ethereum</span>
        <span className={"value"}>9000$</span>
        <span>
          <FontAwesomeIcon icon="sort-up" className={"arrow-up"} />
        </span>
        <span className={"percentage green"}>4.50%</span>
      </div>
      <div className={"element"}>
        <span className={"title"}>Litecoin</span>
        <span className={"value"}>9000$</span>
        <span>
          <FontAwesomeIcon icon="sort-up" className={"arrow-up"} />
        </span>
        <span className={"percentage green"}>4.50%</span>
      </div>
      <div className={"element"}>
        <span className={"title"}>Bitcoin CASH</span>
        <span className={"value"}>9000$</span>
        <span>
          <FontAwesomeIcon icon="sort-up" className={"arrow-up"} />
        </span>
        <span className={"percentage green"}>4.50%</span>
      </div>
      <div className={"element"}>
        <span className={"title"}>Fantom</span>
        <span className={"value"}>9000$</span>
        <span>
          <FontAwesomeIcon icon="sort-up" className={"arrow-up"} />
        </span>
        <span className={"percentage green"}>4.50%</span>
      </div>
      <div className={"element"}>
        <span className={"title"}>Waves</span>
        <span className={"value"}>9000$</span>
        <span>
          <FontAwesomeIcon icon="sort-up" className={"arrow-up"} />
        </span>
        <span className={"percentage green"}>4.50%</span>
      </div>
    </Swiper>
  )
}

export default CryptoRoller
