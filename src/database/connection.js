const { connect } = require('mongoose');

module.exports = (async () => {
  try {
    const responseFromDb = await connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const { name } = responseFromDb.connections[0];
    console.log(`DB connection: ${name}`);
  } catch (error) {
    console.error('failed to connect to DB', error);
  }
})();
