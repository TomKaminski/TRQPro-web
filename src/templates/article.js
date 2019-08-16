import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import "../styles/article/article.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DiscussionEmbed } from "disqus-react"
import SEO from "../components/seo"
import { Row, Col } from "react-bootstrap"
import marked from "marked"
import tocbot from "tocbot"

const disqusConfig = (slug, title) => {
  return {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  }
}

const renderMeta = data => {
  if (data.metadata) {
    return (
      <div className={"article-metadata"}>
        <h5>Podstawowe informacje</h5>
        <Row>
          {data.metadata.meta.map((meta, i) => (
            <Col className={"meta-container"} key={i} xs={6} lg={3}>
              <div className={"meta-title"}>{meta.name}</div>
              {meta.type == "Link" ? (
                <a className={"meta-value"} href={meta.val} target="__blank">
                  {meta.val}
                </a>
              ) : (
                <div className={"meta-value"}>{meta.val}</div>
              )}
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

const renderArticleNavigation = () => {
  return <div className={"article-toc"}></div>
}

class ArticleTemplate extends React.Component {
  componentDidMount() {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".article-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
    })
  }

  render() {
    return (
      <Layout>
        <SEO title={this.props.data.strapiArticle.title} />
        <div>
          <Img
            fluid={{
              ...this.props.data.strapiArticle.image.childImageSharp.fluid,
              aspectRatio: 2.7,
            }}
            fit="cover"
          />
        </div>

        <Row>
          <Col lg={2}>{renderArticleNavigation()}</Col>
          <Col lg={10} xl={8}>
            <div id="article-content">
              <h1 id="article-title">{this.props.data.strapiArticle.title}</h1>
              <div className="article-meta-container">
                <Link
                  to={`/category/${this.props.data.strapiArticle.category.key}`}
                  className={"article-meta"}
                  state={{
                    categoryName: this.props.data.strapiArticle.category.name,
                  }}
                >
                  {this.props.data.strapiArticle.category.name.toUpperCase()}
                </Link>
                <p className={"article-meta"}>
                  <FontAwesomeIcon icon="calendar" />{" "}
                  {new Date(
                    this.props.data.strapiArticle.created_at
                  ).toLocaleString()}
                </p>
                <Link
                  to={`/author/${this.props.data.strapiArticle.author.id}`}
                  className={"article-meta"}
                >
                  {this.props.data.strapiArticle.author.username}
                </Link>
                <p className={"article-meta"}>
                  <FontAwesomeIcon icon="hashtag" />{" "}
                  {this.props.data.strapiArticle.tags.map(tag => (
                    <Link
                      to={`/tag/${tag.key}`}
                      key={tag.key}
                      state={{ tagName: tag.name }}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </p>

                <p className={"article-meta"}>
                  <FontAwesomeIcon icon="share-alt" />{" "}
                  <a href="/">udostępnij</a>
                </p>
              </div>
              {renderMeta(this.props.data.strapiArticle)}
              <div
                className={"js-toc-content"}
                dangerouslySetInnerHTML={{
                  __html: marked(this.props.data.strapiArticle.content),
                }}
              ></div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={2} xl={0}></Col>
          <Col lg={10} xl={8}>
            <DiscussionEmbed
              {...disqusConfig(
                this.props.data.strapiArticle.id,
                this.props.data.strapiArticle.title
              )}
            />
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      id
      title
      content
      created_at
      metadata {
        meta {
          name
          val
          type
        }
      }
      image {
        childImageSharp {
          fluid(maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      category {
        name
        key
      }
      author {
        id
        username
      }
      tags {
        key
        name
      }
    }
  }
`
