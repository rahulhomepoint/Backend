const mongoose = require("mongoose");

const AssociateDeveloperSchema = new mongoose.Schema({
  images: [{
    type: String,
    required: true,
  }],
});

module.exports = mongoose.model("AssociateDeveloper", AssociateDeveloperSchema); 