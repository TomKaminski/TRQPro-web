import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import IndexMiniArticle from "./index/shared/indexMiniArticle"

export default class SearchModal extends React.Component {
  render() {
    return (
      <div className={"search-result-overlay"}>
        <div className={"search-result-container"}>
          <div className={"search-result-header-container"}>
            <FontAwesomeIcon icon="search" className={"icon"} />
            <input
              type="text"
              placeholder="Wyszukaj.."
              name="search"
              className="mr-sm-2 modal-input-field"
              value={this.props.query}
              onChange={this.search}
            />
          </div>

          <ul className={"result-list"}>
            {this.props.results.slice(0, 5).map(page => (
              <li key={page.id}>
                <IndexMiniArticle article={page} />
                {/* <Link to={"/article/" + page.id} className={"result"}>
                  {page.title}
                </Link> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
