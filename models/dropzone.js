const mongoose = require('mongoose')

const dropzoneSchema = new mongoose.Schema({
    name: String,
    gridId: String,
    gridX: String,
    gridY: String
}, {
    timestamps: true
})
  
  
  module.exports = mongoose.model('Dropzone', dropzoneSchema)