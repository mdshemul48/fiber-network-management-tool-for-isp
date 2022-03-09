const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const resellerConnectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    default: 'reseller',
  },

  portNo: {
    type: Number,
    required: true,
  },

  oltType: {
    type: String,
    required: true,
    enum: ['epon', 'gpon'],
  },

  oltSerialNumber: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },

  connectionLimit: {
    type: Number,
    required: true,
    enum: [64, 128],
  },
});
