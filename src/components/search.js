import React, { Component } from "react"
import { Index } from "elasticlunr"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IndexMiniArticle from "./index/shared/indexMiniArticle"
import { Link, navigate } from "gatsby"
import Modal from "./modal"

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Wyszukaj.."
            name="search"
            className="mr-sm-2 input-field"
            value={this.state.query}
            onChange={this.search}
          />
          <FontAwesomeIcon icon="search" className={"icon"} />
        </div>
        {this.renderResults()}
      </div>
    )
  }

  getArticles() {
    let articles = this.state.results.filter(element =>
      element.id.startsWith("Article_")
    )
    return articles.slice(articles.length - 3, articles.length)
  }

  getCategories() {
    return this.state.results.filter(element =>
      element.id.startsWith("Category_")
    )
  }

  getTags() {
    return this.state.results.filter(element => element.id.startsWith("Tag_"))
  }

  renderResults() {
    if (this.state.query === "") {
      return <div></div>
    }
    let categories = this.getCategories()
    let tags = this.getTags()
    return (
      <Modal>
        <div className={"search-result-overlay"}>
          <div className={"search-result-container"}>
            <div className={"search-result-header-container"}>
              <FontAwesomeIcon icon="search" className={"icon"} />
              <input
                type="text"
                placeholder="Wyszukaj.."
                name="search"
                className="mr-sm-2 modal-input-field"
                value={this.state.query}
                onChange={this.search}
              />
              <FontAwesomeIcon
                icon="times"
                className={"icon"}
                onClick={() =>
                  this.setState({
                    query: "",
                  })
                }
              />
            </div>

            <ul className={"result-list"}>
              {this.getArticles().map(page => (
                <li key={page.id}>
                  <IndexMiniArticle article={page} />
                </li>
              ))}
            </ul>

            {categories.length > 0 ? (
              <div className={"search-category-tag"}>
                <h5>KATEGORIE</h5>
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
              <div className={"search-category-tag"}>
                <h5>TAGI</h5>
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
            <a
              href={"/wyszukaj?fraza=${this.state.query}"}
              className={"search-all"}
              onClick={e => {
                e.preventDefault()
                navigate(`/wyszukaj?fraza=${this.state.query}`)
                this.setState({
                  query: "",
                })
              }}
            >
              Znajdź wszystko dla: {this.state.query}
            </a>
          </div>
        </div>
      </Modal>
    )
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
