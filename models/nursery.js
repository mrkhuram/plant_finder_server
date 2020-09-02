var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var User = new Schema({
  nursery_name: {
    type: String,
    required: true,

  },
  nursery_description: {
    type: String,
    required: true
  },
  mobile_number: {
    type: String,
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

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Nursery', User)

