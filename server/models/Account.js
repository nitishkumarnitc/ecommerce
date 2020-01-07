const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AccountsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index:true
  },
  date: {
    type: Date,
    default: Date.now,
    index:true
  }
});

module.exports = Account = mongoose.model("accounts", AccountsSchema);
