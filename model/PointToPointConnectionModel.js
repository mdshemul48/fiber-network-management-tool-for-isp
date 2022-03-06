const { Schema, model } = require('mongoose');

const pointToPointConnectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      default: 'PTP',
    },
    totalCore: {
      type: Number,
      required: true,
    },
    totalConnected: {
      type: Number,
      default: 0,
    },

    location: {
      type: {
        type: String,
        default: 'LineString',
      },
      coordinates: Array,
    },

    childrenConnection: [
      {
        color: {
          type: String,
          required: true,
        },
        connectionType: {
          type: String,
          required: true,
          enum: ['reseller', 'corporate'],
        },
        child: {
          type: mongoose.Types.ObjectId,
          required: true,
          refPath: 'connectionType',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('PointToPointConnection', pointToPointConnectionSchema);
