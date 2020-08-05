import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../../queries/queries';

const BookDetails = ({ data }) => {
  if (data.loading) {
    return <span className="loading">Loading...</span>;
  }

  if (data.book) {
    return <div>{data.book.name}</div>;
  }

  return (
    <div>
      Book details go here...
    </div>
  );
};

export default graphql(getBookQuery, {
  options: ({ bookId }) => ({
    variables: {
      id: bookId,
    },
  }),
})(BookDetails);
