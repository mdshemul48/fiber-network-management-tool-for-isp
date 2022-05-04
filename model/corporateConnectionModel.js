const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const corporateConnectionSchema = new Schema(
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
      default: "corporate",
    },

    color: {
      type: String,
      required: true,
    },

    portNo: {
      type: Number,
      required: true,
    },

    totalCore: {
      type: Number,
      required: true,
    },

    length: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = model("corporate", corporateConnectionSchema);
