const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;