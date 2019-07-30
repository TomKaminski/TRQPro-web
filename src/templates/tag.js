import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"

const TagTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiTag.name}</h1>
    <ul>
      {data.strapiTag.articles.map(article => (
        <li key={article.id}>
          <h2>
            <Link to={`/article/Article_${article.id}`}>{article.title}</Link>
          </h2>
          <Reactmarkdown source={article.content} />
        </li>
      ))}
    </ul>
  </Layout>
)

export default TagTemplate

export const query = graphql`
  query TagTemplate($key: String!) {
    strapiTag(key: { eq: $key }) {
      articles {
        content
        id
        title
      }
      id
      key
      name
    }
  }
`
