const { Schema, model } = require('mongoose');
const Address = require('./Address')

const challengeSchema = new Schema ({
    challengeName: {
    type: String,
    required: true,
    trim: true,
    },

    location: [Address.schema],

    todo: {
        type: String,
        required: false,
    },

    check: {
        type: Boolean,
    }

});

const Challenge = model('Challenge', challengeSchema);

module.exports = Challenge;