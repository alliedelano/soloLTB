const mongoose = require('mongoose');

const jumpersSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userAvatar: String,
}, {
    timestamps: true
})

const jumpSchema = new mongoose.Schema({
    name: String,
    date: Date,
    // disciplines: [{}],
    slots: Number,
    description: String,
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    jumpers: [jumpersSchema],
    dropzone: {type: mongoose.Schema.Types.ObjectId, ref: 'Dropzone'}
}, {
    timestamps: true
})

module.exports = mongoose.model('Jump', jumpSchema);