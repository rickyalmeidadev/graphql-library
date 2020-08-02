import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BooksList from './components/BooksList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>GraphQL Library</h1>
      <AddBook />
      <BooksList />
    </div>
  </ApolloProvider>
);

export default App;
