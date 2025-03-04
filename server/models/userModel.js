const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema for user collection
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  subscribedChannels: [String],
  ownedChannels: [String],
});

//create a model based on the schema
module.exports = mongoose.model("User", userSchema);
