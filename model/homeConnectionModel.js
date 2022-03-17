const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const homeConnectionSchema = Schema({
  parentType: {
    type: String,
    enum: ['home'],
    required: true,
  },

  parent: {
    type: ObjectId,
    refPath: 'parentType',
  },

  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    default: 'home',
  },

  onuNo: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },
});

const HomeConnection = model('home', homeConnectionSchema);
