const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const homeConnectionSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});
