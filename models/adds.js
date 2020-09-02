var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var User = new Schema({
  plant_title: {
    type: String,
    required: true,

  },
  plant_category: {
    type: String,
    required: true,

  },
  plant_description: {
    type: String,
    required: true
  },
  mobile_number: {
    type: String,
    required: true
  },
  price_plant: {
    type: Number,
    required: true
  },
  posted_by: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: false
  },
  nursery_name: {
    type: String,
    required: false
  },
  images: [String]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Plants', User);

