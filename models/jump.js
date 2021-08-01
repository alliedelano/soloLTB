const mongoose = require('mongoose');

const jumpSchema = new mongoose.Schema({
    name: String,
    date: Date,
    disciplines: String,
    slots: Number,
    description: String,
    jumpers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    dropzone: {type: mongoose.Schema.Types.ObjectId, ref: 'Dropzone'}
}, {
    timestamps: true
})

module.exports = mongoose.model('Jump', jumpSchema);