const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const pointToPointConnectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'pointToPoint',
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
        portNo: {
          type: Number,
          required: true,
        },
        connectionType: {
          type: String,
          required: true,
          enum: ['reseller', 'corporate'],
        },
        child: {
          type: ObjectId,
          required: true,
          refPath: 'connectionType',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('pointToPoint', pointToPointConnectionSchema);
