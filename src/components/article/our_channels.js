import React from "react"
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

const OurChannels = ({ intl }) => {
  return (
    <div className="margin-bottom-30 margin-top-20">
      <h4 className="title">
        <b>
          <FormattedMessage id="our-channels.header" />
        </b>
      </h4>
      <ul className="unstyled-list">
        <li>
          <FormattedMessage id="our-channels.crypto" />{" "}
          <a
            href="https://t.me/TRQProAnalizy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProAnalizy
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.btc" />{" "}
          <a
            href="https://t.me/TRQProBTC"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProBTC
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.league" />{" "}
          <a
            href="https://t.me/TRQProligalewar"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProligalewar
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.mining" />{" "}
          <a
            href="https://t.me/TRQProMining"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProMining
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.airdrop" />{" "}
          <a
            href="https://t.me/TRQProICO"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProICO
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.news" />{" "}
          <a
            href="https://t.me/TRQProNews"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProNews
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.alts" />{" "}
          <a
            href="https://t.me/TRQProAlty"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProAlty
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.forex" />{" "}
          <a
            href="https://t.me/TRQProForex"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProForex
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.social" />{" "}
          <a
            href="https://t.me/TRQProSocial"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProSocial
          </a>
        </li>
        <li>
          <FormattedMessage id="our-channels.at" />{" "}
          <a
            href="https://t.me/TRQProAT"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/TRQProAT
          </a>
        </li>
      </ul>
      <ul className="unstyled-list">
        <li>
          Facebook:{" "}
          <a
            href="https://www.facebook.com/TRQPro/?tn-str=k*F"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.facebook.com/TRQPro/?tn-str=k*F
          </a>
        </li>
        <li>
          Grupa na Facebooku:{" "}
          <a
            href="https://www.facebook.com/groups/TRQPro/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.facebook.com/groups/TRQPro/
          </a>
        </li>
        <li>
          Twitter:{" "}
          <a
            href="https://twitter.com/TRQPro"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://twitter.com/TRQPro
          </a>
        </li>
      </ul>
      <p className="call-to-join-channels">
        <b>
          <FormattedMessage id="our-channels.footer" />
        </b>
      </p>
    </div>
  )
}

export default injectIntl(OurChannels)
