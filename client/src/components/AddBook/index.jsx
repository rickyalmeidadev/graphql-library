import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../../queries/queries';

const initialValues = {
  name: '',
  genre: '',
  author: '',
};

const AddBook = ({ data }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };

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
            {renderOptions()}
          </select>
        </label>
      </div>
      <button type="submit" className="btn">+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
