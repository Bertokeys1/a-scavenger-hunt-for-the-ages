const { Schema, model } = require('mongoose');
const challengeSchema = require('./Challenge')
const huntSchema = new Schema ({
    huntName: {
        type: String,
        required: true,
        trim: true,
    },
    challenges: [challengeSchema],
});

const Hunt = model('Hunt', huntSchema);

module.exports = Hunt;