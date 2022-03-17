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
});

const HomeConnection = model('HomeConnection', homeConnectionSchema);
