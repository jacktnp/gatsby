import React from "react"
import { graphql } from "gatsby"
import PostLink from "../components/post-link"
import Layout from "../components/layout"
import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  }
}) => {
  const Posts = edges
    .filter(edges => !!edges.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
        {Posts}<br/>
    </Layout>);
}

export default IndexPage

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1000
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        path
                        title
                    }
                }
            }
        }
    }
`