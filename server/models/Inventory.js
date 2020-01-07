const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InventorySchema = new Schema({
  itemId: {
    type: String,
    required: true,
    index:true
  },
  quantity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    index:true
  }
});

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
