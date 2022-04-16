const { Schema, Types } = require("mongoose");

const addressSchema = new Schema(
  {
    addressId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
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
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
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
