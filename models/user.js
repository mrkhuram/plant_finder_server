var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// User Schema
var User = new Schema({
  fullname: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  coordinates: {

    latitude: {
      type: Number,
      required: false
    },

    longitude: {
      type: Number,
      required: false
    }
  },
  type: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', User);

