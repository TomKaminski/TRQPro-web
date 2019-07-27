import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import "../styles/article/article.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DiscussionEmbed } from "disqus-react"

const disqusConfig = (slug, title) => {
  return {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  }
}

const ArticleTemplate = ({ data }) => (
  <Layout>
    <div>
      <Img
        fluid={{
          ...data.strapiArticle.image.childImageSharp.fluid,
          aspectRatio: 2.7,
        }}
        fit="cover"
      />
    </div>
    <div id="article-content">
      <h1 id="article-title">{data.strapiArticle.title}</h1>
      <div className="article-meta-container">
        <p className={"article-meta"}>FOREX</p>
        <p className={"article-meta"}>
          <FontAwesomeIcon icon="calendar" />{" "}
          {new Date(data.strapiArticle.created_at).toLocaleString()}
        </p>
        <Link
          to={`/author/User_${data.strapiArticle.author.id}`}
          className={"article-meta"}
        >
          {data.strapiArticle.author.username}
        </Link>
        <p className={"article-meta"}>
          <FontAwesomeIcon icon="hashtag" />{" "}
          {"tags: satoshi, bitcoin,cryptocurency"}
        </p>
        <a href="#" className={"article-meta"}>
          <FontAwesomeIcon icon="share-alt" /> udostępnij
        </a>
      </div>

      <Reactmarkdown source={data.strapiArticle.content} />
      <DiscussionEmbed
        {...disqusConfig(data.strapiArticle.id, data.strapiArticle.title)}
      />
    </div>
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
      image {
        childImageSharp {
          fluid(maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      author {
        id
        username
      }
    }
  }
`
