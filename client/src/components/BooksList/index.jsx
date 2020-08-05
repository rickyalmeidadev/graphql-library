import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../queries/queries';
import BookDetails from '../BookDetails';

const BooksList = ({ data }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelectBook = (bookId) => {
    setSelectedBook(bookId);
  };

  const renderBooks = () => {
    if (data.loading) {
      return <span className="loading">Loading...</span>;
    }

    if (data.error) {
      return <span className="error">Failed to load books</span>;
    }

    return data.books.map(book => (
      <li
        key={book.id}
        onClick={() => handleSelectBook(book.id)}
        className="books__item"
      >
        {book.name}

      </li>
    ));
  };

  return (
    <section className="books">
      <ul className="books__list">
        {renderBooks()}
      </ul>
      <BookDetails bookId={selectedBook} />
    </section>
  );
};

export default graphql(getBooksQuery)(BooksList);
