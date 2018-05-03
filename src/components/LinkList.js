import React, { Component } from "react";
import { graphql } from "react-apollo"; // hoc to add actual query to component
import gql from "graphql-tag"; // used to create a gql query

import Link from "./Link";

class LinkList extends Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    // 1
    const data = store.readQuery({ query: FEED_QUERY });

    // 2
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    // 3
    store.writeQuery({ query: FEED_QUERY, data });
  };

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
      <div>
        {linksToRender.map((link, index) => (
          <Link
            key={link.id}
            updateStoreAfterVote={this._updateCacheAfterVote}
            index={index}
            link={link}
          />
        ))}
      </div>
    );
  }
}

export const FEED_QUERY = gql`
  # Graphql comments can be used with a hash
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
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
