import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"

const CategoryTemplate = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <h1>{data.strapiCategory.name}</h1>
      <ul>
        {data.strapiCategory.articles.map(article => (
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
}

export default CategoryTemplate

export const query = graphql`
  query CategoryTemplate($key: String!) {
    strapiCategory(key: { eq: $key }) {
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
