const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  name: String,
  genre: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
});

module.exports = model('Book', bookSchema);
