import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries/queries';

const initialValues = {
  name: '',
  genre: '',
  author: '',
};

const AddBook = ({ authorsData, createBook }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createBook({
      variables: formData,
      refetchQueries: [{ query: getBooksQuery }],
    });

    setFormData(initialValues);
  };

  const renderOptions = () => {
    if (authorsData.loading) {
      return <option disabled>Loading...</option>;
    }

    if (authorsData.error) {
      return <option disabled>Failed to load authors</option>;
    }

    return authorsData.authors.map(author => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="name" className="label">
          Book name:
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
        </label>
      </div>
      <div className="form__group">
        <label htmlFor="genre" className="label">
          Genre:
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="input"
          />
        </label>
      </div>
      <div className="form__group">
        <label htmlFor="author" className="label">
          Author:
          <select
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            className="input input--select"
          >
            <option defaultChecked value="">Select an author</option>
            {renderOptions()}
          </select>
        </label>
      </div>
      <button type="submit" className="btn">+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'authorsData' }),
  graphql(addBookMutation, { name: 'createBook' }),
)(AddBook);
