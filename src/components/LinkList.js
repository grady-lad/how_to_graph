import React, { Component } from "react";
import { graphql } from "react-apollo"; // hoc to add actual query to component
import gql from "graphql-tag"; // used to create a gql query

import Link from "./Link";

class LinkList extends Component {
  render() {
    // 1
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>;
    }

    // 2
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>;
    }

    // 3
    const linksToRender = this.props.feedQuery.feed.links;

    return (
      <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
    );
  }
}

const FEED_QUERY = gql`
  # Graphql comments can be used with a hash
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

/**
 * The object with name is the name of the prop that Apollo injects
 * into the LinkList component. If you didn’t specify it here,
 * the injected prop would be called data by default.
 */
export default graphql(FEED_QUERY, { name: "feedQuery" })(LinkList);
