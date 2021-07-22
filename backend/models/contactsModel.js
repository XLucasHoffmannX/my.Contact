const mongoose = require('mongoose');

const contatctSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String
  },
  description: {
    type: String
  },
  colection: {
    type: String,
  },
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  images: {
    type: Object
  },
  numberContacts: [{
    number: ""
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Contacts = mongoose.model('Contacts', contatctSchema);

module.exports = Contacts;