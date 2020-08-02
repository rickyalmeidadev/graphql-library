import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      id
      name
      author {
        name
      }
    }
  }
`;

const BooksList = ({ data }) => {
  const displayBooks = () => {
    if (data.loading) {
      return <span>Loading...</span>;
    }

    if (data.error) {
      return <span>Failed to get books</span>;
    }

    return data.books.map(book => (
      <li key={book.id}>
        <h2>{book.name}</h2>
        <small>{book.author.name}</small>
      </li>
    ));
  };

  return (
    <div>
      <ul>
        {displayBooks()}
      </ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BooksList);
