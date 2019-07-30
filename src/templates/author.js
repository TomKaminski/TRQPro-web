import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"

const UserTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiUser.username}</h1>
    <ul>
      {data.strapiUser.articles.map(article => (
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

export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      articles {
        id
        title
        content
      }
    }
  }
`
