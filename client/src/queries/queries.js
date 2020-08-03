import { gql } from 'apollo-boost';

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

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $author: ID!) {
    addBook(name: $name, genre: $genre, author: $author) {
      id
      name
      author {
        name
      }
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };
