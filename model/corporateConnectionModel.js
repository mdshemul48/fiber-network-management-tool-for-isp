const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const corporateConnectionSchema = new Schema({
  parentType: {
    type: String,
    default: 'pointToPoint',
  },
  parent: { type: ObjectId, refPath: 'parentType' },

  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    default: 'corporate',
  },

  coreColor: {
    type: String,
    required: true,
  },

  portNo: {
    type: Number,
    required: true,
  },

  location: {
    type: {
      type: String,
      default: 'LineString',
    },
    coordinates: {
      type: [[Number]],
      required: true,
    },
  },
});

module.exports = model('corporate', corporateConnectionSchema);
