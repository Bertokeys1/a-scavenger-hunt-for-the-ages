const { Schema, model } = require('mongoose');

const addressSchema = new Schema ({
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
}
});

const Address = model('Address', addressSchema);

module.exports = Address;