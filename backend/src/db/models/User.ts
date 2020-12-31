export {};
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  notes: {
    type: [{
      title: String,
      content: String
    }]
  }
});

module.exports = mongoose.model("user", UserSchema);
