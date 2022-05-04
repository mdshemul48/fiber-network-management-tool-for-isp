const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const homeConnectionSchema = Schema(
  {
    parentType: {
      type: String,
      enum: ["splitter"],
      required: true,
    },

    parent: {
      type: ObjectId,
      refPath: "parentType",
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "home",
    },

    onuNo: {
      type: String,
      required: true,
    },

    totalCore: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    locations: {
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

module.exports = model("home", homeConnectionSchema);
