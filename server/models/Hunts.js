const { Schema, model } = require('mongoose');

const huntsSchema = new Schema ({
    huntname: {
        type: String,
        required: true,
        trim: true,
    },
    challenges: {
        Schemas: 
    },
});

const Hunts = model('Hunts', huntsSchema);

module.exports = Hunts;