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
  if (data.loading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <ul>
        {data.books.map(book => (
          <li key={book.id}>
            <h2>{book.name}</h2>
            <small>{book.author.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BooksList);
