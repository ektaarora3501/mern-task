const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  data: { type: String, required: true },
  array_data: { type: Array, required: true },
});

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
