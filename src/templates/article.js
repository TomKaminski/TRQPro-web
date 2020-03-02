import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layouts/layout"
import "../styles/article/article.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DiscussionEmbed } from "disqus-react"
import SEO from "../components/seo"
import { Row, Col } from "react-bootstrap"
import marked from "marked"
// import tocbot from "tocbot"
import Share from "../components/share"
import mediumZoom from "medium-zoom"
import OurChannels from "../components/article/our_channels"

// Get reference
const renderer = new marked.Renderer()

// Override function
renderer.image = function(href, title, text) {
  return `<img src="${href}" alt="${text}" data-zoomable>`
}

renderer.link = function(href, title, text) {
  if (href.includes("trqpro.pl")) {
    return `<a href="${href}">${text}</a>`
  } else {
    return `<a href="${href}" target="_blank">${text}</a>`
  }
}

const disqusConfig = (slug, title) => {
  return {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  }
}

const renderMeta = data => {
  if (data.metadata) {
    return (
      <div className={"article-metadata"}>
        <h5>Podstawowe informacje</h5>
        <Row>
          {data.metadata.meta.map((meta, i) => (
            <Col className={"meta-container"} key={i} xs={6} lg={3}>
              <div className={"meta-title"}>{meta.name}</div>
              {meta.type === "Link" ? (
                <a className={"meta-value"} href={meta.val} target="__blank">
                  {meta.val}
                </a>
              ) : (
                <div className={"meta-value"}>{meta.val}</div>
              )}
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

// const renderArticleNavigation = () => {
//   return <div className={"article-toc"}></div>
// }

class ArticleTemplate extends React.Component {
  componentDidMount() {
    // tocbot.init({
    //   tocSelector: ".article-toc",
    //   contentSelector: ".js-toc-content",
    //   headingSelector: "h1",
    //   hasInnerContainers: true,
    // })

    var images = [...document.querySelectorAll("[data-zoomable]")]

    images.push(
      ...document.querySelectorAll(".index-article-image-big > picture > img")
    )

    mediumZoom(images, { margin: 50 })
  }

  render() {
    return (
      <Layout>
        <SEO
          title={this.props.data.strapiArticle.title}
          pathname={this.props.path}
        />
        <Row id="image-big-article">
          <Col lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
            <Img
              fluid={{
                ...this.props.data.strapiArticle.image.childImageSharp.fluid,
              }}
              imgStyle={{
                objectFit: "contain",
              }}
              className={"index-article-image-big"}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={1}></Col>
          <Col lg={10} xl={8}>
            <div id="article-content">
              <h1 id="article-title">{this.props.data.strapiArticle.title}</h1>
              <div className="article-meta-container">
                <div className={"article-meta"}>
                  <Link
                    to={`/kategoria/${this.props.data.strapiArticle.category.key}`}
                    state={{
                      categoryName: this.props.data.strapiArticle.category.name,
                    }}
                  >
                    {this.props.data.strapiArticle.category.name.toUpperCase()}
                  </Link>
                </div>

                <div className={"article-meta"}>
                  <FontAwesomeIcon icon="calendar" size={"1x"} />{" "}
                  {new Date(
                    this.props.data.strapiArticle.publishedAt
                  ).toLocaleString()}
                </div>

                <div className={"article-meta"}>
                  <Link
                    to={`/autor/${this.props.data.strapiArticle.author.id}`}
                  >
                    {this.props.data.strapiArticle.author.username}
                  </Link>
                </div>

                {this.props.data.strapiArticle.tags.length > 0 ? (
                  <div className={"article-meta"}>
                    <FontAwesomeIcon icon="hashtag" size={"1x"} />{" "}
                    {this.props.data.strapiArticle.tags.map(tag => (
                      <Link
                        to={`/tag/${tag.key}`}
                        key={tag.key}
                        state={{ tagName: tag.name }}
                      >
                        {tag.name + ", "}
                      </Link>
                    ))}
                  </div>
                ) : null}

                <Share
                  socialConfig={{
                    twitterHandle: this.props.data.site.siteMetadata
                      .twitterHandle,
                    config: {
                      url: `${this.props.data.site.siteMetadata.url}${this.props.data.strapiArticle.fields.slug}`,
                      title: this.props.data.strapiArticle.title,
                    },
                  }}
                />
              </div>
              {renderMeta(this.props.data.strapiArticle)}
              <div
                //className={"js-toc-content"}
                dangerouslySetInnerHTML={{
                  __html: marked(this.props.data.strapiArticle.content, {
                    renderer: renderer,
                  }),
                }}
              ></div>
            </div>
            <OurChannels />
            <DiscussionEmbed
              {...disqusConfig(
                this.props.data.strapiArticle.id,
                this.props.data.strapiArticle.title
              )}
            />
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const articleQuery = graphql`
  query ArticleTemplate($id: String!) {
    site {
      siteMetadata {
        url
        twitterHandle
      }
    }
    strapiArticle(id: { eq: $id }) {
      id
      title
      content
      publishedAt
      metadata {
        meta {
          name
          val
          type
        }
      }
      image {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      category {
        name
        key
      }
      author {
        id
        username
      }
      tags {
        key
        name
      }
      fields {
        slug
      }
    }
  }
`
