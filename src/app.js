const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/scheme');

const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`);
});
