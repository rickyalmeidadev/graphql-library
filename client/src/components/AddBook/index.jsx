import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const AddBook = ({ data }) => {
  const renderOptions = () => {
    if (data.loading) {
      return <option disabled>Loading...</option>;
    }

    if (data.error) {
      return <option disabled>Failed to load authors</option>;
    }

    return data.authors.map(author => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ));
  };

  return (
    <form className="form">
      <div className="form__group">
        <label htmlFor="name" className="label">
          Book name:
          <input type="text" id="name" name="name" className="input" />
        </label>
      </div>
      <div className="form__group">
        <label htmlFor="genre" className="label">
          Genre:
          <input type="text" id="genre" name="genre" className="input" />
        </label>
      </div>
      <div className="form__group">
        <label htmlFor="author" className="label">
          Author:
          <select name="author" id="author" className="input input--select">
            {renderOptions()}
          </select>
        </label>
      </div>
      <button type="submit" className="btn">+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
