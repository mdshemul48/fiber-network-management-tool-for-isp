const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const resellerConnectionSchema = new Schema(
  {
    parentType: {
      type: String,
      default: "pointToPoint",
      enum: ["pointToPoint"],
    },
    parent: { type: ObjectId, refPath: "parentType" },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "reseller",
    },

    portNo: {
      type: Number,
      required: true,
    },

    oltType: {
      type: String,
      required: true,
      enum: ["epon", "gpon"],
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

    connectionUsed: {
      type: Number,
      default: 0,
      required: () => this.connectionUsed < this.connectionLimit,
    },

    location: {
      type: {
        type: String,
        default: "LineString",
      },
      coordinates: {
        type: [[Number]],
        required: true,
      },
    },

    childrens: [
      {
        connectionType: {
          type: String,
          required: true,
          enum: ["splitter", "localFiber"],
        },
        portNo: {
          type: Number,
          required: false,
        },
        child: {
          type: ObjectId,
          required: true,
          refPath: "connectionType",
        },
        connectionUsed: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("reseller", resellerConnectionSchema);
