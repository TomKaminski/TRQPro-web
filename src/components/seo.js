import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({
  description,
  lang,
  title,
  pathname,
  image: metaImage,
  isArticle,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            url
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null
  const metaDescription = description || site.siteMetadata.description
  const image =
    metaImage && metaImage.src
      ? `${site.siteMetadata.siteUrl}${metaImage.src}`
      : null

  return (
    <Helmet
      defer={false}
      defaultTitle={title}
      titleTemplate={`%s | ${site.siteMetadata.title} | Trading, Analizy, Liga`}
    >
      <html lang={lang} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content="trq, trqpro, liga trq, bitcoin trq, altcoin trq, liga bitmex, liga binance, liga bybit, trading trq, trq telegram, trq pro, społeczność trq, analizy krypto, analizy forex, analizy trq, forex, kryptowaluty, altcoin"
      />

      {/* Facebook og tags */}
      <meta property="og:url" content={canonical} />
      {isArticle ? <meta property="og:type" content="article" /> : null}
      {metaImage ? <meta property="og:image" content={image} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />

      {/* Twitter Card tags */}
      <meta
        name="twitter:card"
        content={metaImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:creator" content="@TRQPro" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage ? <meta name="twitter:image" content={image} /> : null}
    </Helmet>
  )
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }),
  pathname: PropTypes.string,
}

export default SEO
