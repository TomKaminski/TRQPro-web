import React, { Component } from "react"
import { Index } from "elasticlunr"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IndexMiniArticle from "./index/shared/indexMiniArticle"

import Modal from "./modal"
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      searchActive: false,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      searchActive: props.searchActive,
    })
  }

  render() {
    return (
      <a
        className={"nav-link icon nav-link-black"}
        onClick={() => {
          this.setState({
            searchActive: true,
          })
        }}
      >
        <FontAwesomeIcon icon="search" size={"lg"} />
        {this.renderResults()}
      </a>
    )
  }

  getArticles() {
    let articles = this.state.results.filter((element) =>
      element.id.startsWith("Article_")
    )
    return articles.slice(articles.length - 3, articles.length)
  }

  getCategories() {
    return this.state.results.filter((element) =>
      element.id.startsWith("Category_")
    )
  }

  getTags() {
    return this.state.results.filter((element) => element.id.startsWith("Tag_"))
  }

  renderResults() {
    if (!this.state.searchActive) {
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
                placeholder={this.props.intl.formatMessage({
                  id: "common.search",
                })}
                name="search"
                className="mr-sm-2 modal-input-field"
                value={this.state.query}
                onChange={(e) => {
                  e.stopPropagation()
                  this.search(e)
                }}
              />
              <FontAwesomeIcon
                icon="times"
                className={"icon"}
                onClick={(e) => {
                  e.stopPropagation()
                  this.setState({
                    query: "",
                    searchActive: false,
                  })
                }}
              />
            </div>

            <ul className={"result-list"}>
              {this.getArticles().map((page) => (
                <li key={page.id}>
                  <IndexMiniArticle article={page} />
                </li>
              ))}
            </ul>

            {categories.length > 0 ? (
              <div className={"search-category-tag"}>
                <h5>
                  <FormattedMessage id="search.categories" />
                </h5>
                <div className={"search-category-tag-flex-container"}>
                  {categories.map((category) => (
                    <div className={"category-tag"} key={category.key}>
                      <FontAwesomeIcon icon="folder" className={"icon"} />
                      <Link
                        to={`/kategoria/${category.key}`}
                        className={"underlined-black-text"}
                        key={category.key}
                        state={{
                          categoryName:
                            this.props.intl.locale === "en"
                              ? category.name_en
                              : category.name,
                        }}
                      >
                        {this.props.intl.locale === "en"
                          ? category.name_en
                          : category.name}
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
                <h5>
                  <FormattedMessage id="search.tags" />
                </h5>
                <div className={"search-category-tag-flex-container"}>
                  {tags.map((tag) => (
                    <div className={"category-tag"} key={tag.key}>
                      <FontAwesomeIcon icon="hashtag" className={"icon"} />

                      <Link
                        to={`/tag/${tag.key}`}
                        className={"underlined-black-text"}
                        key={tag.key}
                        state={{
                          tagName:
                            this.props.intl.locale === "en"
                              ? tag.name_en
                              : tag.name,
                        }}
                      >
                        {this.props.intl.locale === "en"
                          ? tag.name_en
                          : tag.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div />
            )}
            <Link
              to={`/wyszukaj?fraza=${this.state.query}`}
              className={"search-all"}
            >
              {this.state.query !== "" ? (
                <div>
                  <FormattedMessage id="search.find-all-for" />{" "}
                  {this.state.query}
                </div>
              ) : (
                <div></div>
              )}
            </Link>
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

  search = (evt) => {
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

export default injectIntl(Search)
