const { Schema, model } = require('mongoose');

const huntSchema = new Schema ({
    huntName: {
        type: String,
        required: true,
        trim: true,
    },
    challenges: [{
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
    }],
});

const Hunt = model('Hunts', huntSchema);

module.exports = Hunt;