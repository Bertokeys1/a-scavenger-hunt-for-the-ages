const { Schema, model } = require('mongoose');

const huntsSchema = new Schema ({

});

const Hunts = model('Hunts', huntsSchema);

module.exports = Hunts;