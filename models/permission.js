const mongoose = require('mongoose');


const permissionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: {
        type: String,
        enum: ['admin', 'dz organizer']
    }, 
    grantedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true
  });

module.exports = mongoose.model('Permission', permissionSchema);