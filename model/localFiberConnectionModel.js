const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const localFiberConnectionSchema = new Schema(
  {
    parentType: {
      type: String,
      enum: ['reseller', 'localFiber'],
      required: true,
    },

    parent: { type: ObjectId, refPath: 'parentType' },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'localFiber',
    },

    totalCore: {
      type: Number,
      required: true,
    },

    totalConnected: {
      type: Number,
      default: 0,
      required: () => {
        return this.totalConnected < this.totalCore;
      },
    },

    markers: [
      {
        totalConnected: {
          type: Number,
          default: 1,
        },
        type: {
          type: String,
          default: 'Point',
        },

        coordinates: {
          type: [Number],
          required: true,
        },
      },
    ],

    mainConnection: {
      type: ObjectId,
      required: false,
    },

    locations: [
      {
        type: {
          type: String,
          default: 'LineString',
        },
        coordinates: {
          type: [[Number]],
          required: true,
        },
      },
    ],

    childrens: [
      {
        connectionType: {
          type: String,
          required: true,
          enum: ['splitter'],
        },
        child: {
          type: ObjectId,
          required: true,
          refPath: 'connectionType',
        },
        color: {
          type: String || Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('localFiber', localFiberConnectionSchema);
