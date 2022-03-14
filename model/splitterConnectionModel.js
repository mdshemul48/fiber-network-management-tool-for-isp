const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const splitterConnectionModel = new Schema(
  {
    parentType: {
      type: String,
      enum: ['reseller', 'splitter', 'localFiber'],
      required: true,
    },

    parent: { type: ObjectId, refPath: 'parentType' },

    reseller: {
      type: ObjectId,
      ref: 'reseller',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'splitter',
    },

    splitterLimit: {
      type: Number,
      required: true,
    },

    splitterUsed: {
      type: Number,
      default: 0,
      required: () => {
        return this.splitterUsed < this.splitterLimit;
      },
    },

    portNo: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: false,
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

    childrens: [
      {
        color: {
          type: String,
          required: true,
        },
        connectionType: {
          type: String,
          required: true,
          enum: ['home', 'splitter'],
        },
        child: {
          type: ObjectId,
          required: true,
          refPath: 'connectionType',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Splitter', splitterConnectionModel);
