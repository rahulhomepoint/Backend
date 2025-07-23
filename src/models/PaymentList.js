const mongoose = require("mongoose");

const PaymentListSchema = new mongoose.Schema({
  images: [{
    type: String,
    required: true,
  }],
});

module.exports = mongoose.model("PaymentList", PaymentListSchema); 