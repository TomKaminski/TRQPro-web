import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import "../styles/article/article.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DiscussionEmbed } from "disqus-react"
import SEO from "../components/seo"
import { Row, Col } from "react-bootstrap"

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
          {data.metadata.map(meta => (
            <Col className={"meta-container"} key={meta.name} xs={6} lg={3}>
              <div className={"meta-title"}>{meta.name}</div>
              <div className={"meta-value"}>{meta.value}</div>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

const renderArticleNavigation = () => {
  return (
    <div className={"article-right-navigation"}>
      <a href="#">Wstępny opis</a>
      <a href="#">Kilka słów o projekcie</a>
      <a href="#" className={"selected"}>
        Jaki jest roadmap?
      </a>
      <a href="#">Social</a>
      <a href="#">Kto tworzy projekt</a>
      <a href="#">Podsumowanie</a>
    </div>
  )
}

const ArticleTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.strapiArticle.title} />
    <div>
      <Img
        fluid={{
          ...data.strapiArticle.image.childImageSharp.fluid,
          aspectRatio: 2.7,
        }}
        fit="cover"
      />
    </div>

    <Row>
      <Col lg={2}>{renderArticleNavigation()}</Col>
      <Col>
        <div id="article-content">
          <h1 id="article-title">{data.strapiArticle.title}</h1>
          <div className="article-meta-container">
            <Link
              to={`/category/${data.strapiArticle.category.key}`}
              className={"article-meta"}
            >
              {data.strapiArticle.category.name.toUpperCase()}
            </Link>
            <p className={"article-meta"}>
              <FontAwesomeIcon icon="calendar" />{" "}
              {new Date(data.strapiArticle.created_at).toLocaleString()}
            </p>
            <Link
              to={`/author/${data.strapiArticle.author.id}`}
              className={"article-meta"}
            >
              {data.strapiArticle.author.username}
            </Link>
            <p className={"article-meta"}>
              <FontAwesomeIcon icon="hashtag" />{" "}
              {data.strapiArticle.tags.map(tag => (
                <Link to={`/tag/${tag.key}`} key={tag.key}>
                  {tag.name}
                </Link>
              ))}
            </p>

            <p className={"article-meta"}>
              <FontAwesomeIcon icon="share-alt" /> <a href="/">udostępnij</a>
            </p>
          </div>
          {renderMeta(data.strapiArticle)}
          <Reactmarkdown source={data.strapiArticle.content} />
        </div>
      </Col>
    </Row>

    <DiscussionEmbed
      {...disqusConfig(data.strapiArticle.id, data.strapiArticle.title)}
    />
  </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      id
      title
      content
      created_at
      metadata {
        name
        value
      }
      image {
        childImageSharp {
          fluid(maxHeight: 400) {
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
    }
  }
`
