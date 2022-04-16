const { Schema, Types } = require("mongoose");
const addressSchema = require("./Address");

const challengeSchema = new Schema(
  {
    challengeId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    challengeName: {
      type: String,
      required: true,
      trim: true,
    },

    location: [addressSchema],

    todo: {
      type: String,
      required: false,
    },

    check: {
      type: Boolean,
    },
  },
  {
    id: false,
  }
);

module.exports = challengeSchema;
