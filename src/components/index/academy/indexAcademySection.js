import React from "react"
import { Row, Col } from "react-bootstrap"
import IndexAcademyBigArticle from "./indexAcademyBigArticle"
import IndexMiniArticle from "../shared/indexMiniArticle"
import { Link } from "gatsby"

const IndexAcademySection = props => {
  if (props.articles && props.articles.length > 0) {
    let mainArticle = props.articles[0]
    let miniArticles = props.articles.slice(1, 4)

    return (
      <section
        className={"border-grey-bottom-dotted section-margin-and-padding"}
      >
        <Row>
          <Col>
            <div className={"section"}>
              <div className={"section-title-container"}>
                <h3 className={"section-title"}>{props.sectionName}</h3>
                <Link
                  to={`/kategoria/cat-academy`}
                  className={"section-show-all"}
                  state={{ categoryName: props.sectionName }}
                >
                  zobacz wszystkie
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} lg={9} md={8}>
            <IndexAcademyBigArticle article={mainArticle} />
          </Col>
          <Col xs={12} sm={12} lg={3} md={4}>
            {miniArticles.map((element, i) => (
              <IndexMiniArticle article={element} isLast={true} key={i} />
            ))}
          </Col>
        </Row>
      </section>
    )
  } else {
    return <div></div>
  }
}

export default IndexAcademySection
