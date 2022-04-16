const { Schema, Types } = require("mongoose");

const addressSchema = new Schema(
  {
    address1: {
      type: String,
      required: false,
      trim: true,
    },
    address2: {
      type: String,
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    state: {
      type: String,
      required: false,
      trim: true,
    },
    zipCode: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    id: false,
  }
);

module.exports = addressSchema;
