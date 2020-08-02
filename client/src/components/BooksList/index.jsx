import React, { Component } from 'react';

export default class BooksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const books = [
      { id: 1, title: 'Clean Code', author: 'Uncle Bob' },
    ];
    this.setState({ books });
  }

  render() {
    const { books } = this.state;
    return (
      <div>
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
