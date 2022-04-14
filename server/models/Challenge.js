const { Schema, model } = require('mongoose');

const challengeSchema = new Schema ({
    challengeName: {
    type: String,
    required: true,
    trim: true,
    },

    location: {
        type: [String],
        required: false,
    },

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