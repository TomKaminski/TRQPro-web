import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "url-search-params-polyfill"
import { Index } from "elasticlunr"
import { Link, navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IndexMiniArticle from "../components/index/shared/indexMiniArticle"
import "../styles/wyszukaj/wyszukaj.scss"

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.searchPhrase = new URLSearchParams(this.props.location.search).get(
      "fraza"
    )
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.data.siteSearchIndex.index)

  prepareDocs = () => {
    this.index = this.getOrCreateIndex()
    console.log(this.index)
    this.results = this.index
      .search(this.searchPhrase, { expand: true })
      .map(({ ref }) => this.index.documentStore.getDoc(ref))
  }

  getArticles() {
    return this.results.filter(element => element.id.startsWith("Article_"))
  }

  getCategories() {
    return this.results.filter(element => element.id.startsWith("Category_"))
  }

  getTags() {
    return this.results.filter(element => element.id.startsWith("Tag_"))
  }

  render() {
    this.prepareDocs()
    let categories = this.getCategories()
    let tags = this.getTags()
    return (
      <Layout>
        <SEO title={`Wyszukaj - ${this.searchPhrase}`} />
        <h2 className={"margin-top-base margin-bottom-40"}>
          Wyniki wyszukiwania dla "{this.searchPhrase}"
        </h2>

        {categories.length > 0 ? (
          <div
            className={"search-category-tag margin-top-base margin-bottom-40"}
          >
            <h5>Znalezione kategorie</h5>
            <div className={"search-category-tag-flex-container"}>
              {categories.map(category => (
                <div className={"category-tag"} key={category.key}>
                  <FontAwesomeIcon icon="folder" className={"icon"} />
                  <Link
                    to={`/category/${category.key}`}
                    className={"underlined-black-text"}
                    key={category.key}
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}

        {tags.length > 0 ? (
          <div
            className={"search-category-tag margin-top-base margin-bottom-40"}
          >
            <h5>Znalezione tagi</h5>
            <div className={"search-category-tag-flex-container"}>
              {tags.map(tag => (
                <div className={"category-tag"} key={tag.key}>
                  <FontAwesomeIcon icon="hashtag" className={"icon"} />

                  <Link
                    to={`/tag/${tag.key}`}
                    className={"underlined-black-text"}
                    key={tag.key}
                  >
                    {tag.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}

        <h5>Wszystkie artykuły</h5>
        <ul className={"search-result-list"}>
          {this.getArticles().map(page => (
            <li key={page.id}>
              <IndexMiniArticle article={page} />
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query WyszukajIndexQuery {
    siteSearchIndex {
      index
    }
  }
`
