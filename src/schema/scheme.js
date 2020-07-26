const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', author_id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', author_id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', author_id: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', author_id: '2' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', author_id: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', author_id: '3' },
];

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id === parent.author_id);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.author_id === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find(book => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
