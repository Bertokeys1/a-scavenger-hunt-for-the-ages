const { Schema, Types } = require("mongoose");
const addressSchema = require("./Address");

const challengeSchema = new Schema(
  {
    challengeName: {
      type: String,
      required: true,
      trim: true,
      allowNull: false
    },

    location: addressSchema,

    todo: {
      type: String,
      required: false,
    },

    check: {
      type: Boolean,
    },
  }
);

module.exports = challengeSchema;
