import React from "react"
import { Title, Link, Meta } from "react-head"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, title, pathname, image: metaImage, isArticle }) => {
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

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}/` : null
  const metaDescription = description || site.siteMetadata.description
  const image =
    metaImage && metaImage.src
      ? `${site.siteMetadata.siteUrl}${metaImage.src}`
      : null

  return (
    <>
      <Title>
        {title} | {site.siteMetadata.title} | Trading, Analizy, Liga
      </Title>
      <Link rel="canonical" href={canonical} />
      <Meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />
      <Meta name="description" content={metaDescription} />
      <Meta
        name="keywords"
        content="trq, trqpro, liga trq, bitcoin trq, altcoin trq, liga bitmex, liga binance, liga bybit, trading trq, trq telegram, trq pro, społeczność trq, analizy krypto, analizy forex, analizy trq, forex, kryptowaluty, altcoin"
      />
      {/* Facebook og tags */}
      {/* <Meta property="og:url" content={canonical} /> */}
      {isArticle ? (
        <Meta property="og:type" content="article" />
      ) : (
        <Meta property="og:type" content="website" />
      )}
      {metaImage ? <Meta property="og:image" content={image} /> : null}
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={metaDescription} />
      <Meta property="fb:app_id" content="568172334057098" />
      {/* Twitter Card tags */}
      <Meta
        name="twitter:card"
        content={metaImage ? "summary_large_image" : "summary"}
      />
      <Meta name="twitter:creator" content="@TRQPro" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={metaDescription} />
      {metaImage ? <Meta name="twitter:image" content={image} /> : null}
    </>
  )
}

export default SEO
