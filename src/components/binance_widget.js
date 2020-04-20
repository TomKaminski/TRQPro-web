import React, { useEffect, useRef } from "react"
import { Widget, unloadWidget } from "binance-fiat-widget"

const BinanceWidget = () => {
  const r = useRef(null)
  const options = {
    locale: "en",
    theme: "dark",
    urlParmas: {
      ref: "37243377",
      utm_source: "TRQPro",
    },
  }

  useEffect(() => {
    if (r?.current) {
      Widget(r.current, options)
    }

    return () => {
      unloadWidget()
    }
  }, [r])

  return <div ref={r}></div>
}

export default BinanceWidget
