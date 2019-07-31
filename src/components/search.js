import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"

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
          {this.renderResults()}
        </div>
      </div>
    )
  }

  renderResults() {
    if (this.state.results.length === 0) {
      return <div></div>
    }
    return (
      <div className={"search-result-container"}>
        <div className={"search-result-header-container"}>
          <h5>Znalezione artykuły</h5>
          <a
            href=""
            onClick={e => {
              e.preventDefault()
              this.setState({
                query: ``,
                results: [],
              })
            }}
          >
            zamknij
          </a>
        </div>

        <ul className={"result-list"}>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/article/" + page.id} className={"result"}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
