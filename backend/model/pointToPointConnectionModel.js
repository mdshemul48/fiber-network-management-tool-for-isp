const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const pointToPointConnectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "pointToPoint",
    },

    totalCore: {
      type: Number,
      required: true,
    },

    length: {
      type: Number,
      required: true,
    },

    totalConnected: {
      type: Number,
      default: 0,
      required: () => this.totalConnected < this.totalCore,
    },

    markers: [
      {
        totalConnected: {
          type: Number,
          default: 1,
        },
        type: {
          type: String,
          default: "Point",
        },
        location: {
          coordinates: {
            type: [Number],
            required: true,
          },
        },
      },
    ],

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
        color: {
          type: String || Number,
          required: false,
        },
        portNo: {
          type: Number,
          required: true,
        },
        connectionType: {
          type: String,
          required: true,
          enum: ["reseller", "corporate"],
        },
        child: {
          type: ObjectId,
          required: true,
          refPath: "connectionType",
        },
      },
    ],
  },
  { timestamps: true }
);

pointToPointConnectionSchema.index({ location: "2dsphere" });

module.exports = model("pointToPoint", pointToPointConnectionSchema);
