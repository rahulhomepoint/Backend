const mongoose = require("mongoose");

const PaymentListSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  method: {
    type: String,
  },
  reference: {
    type: String,
  },
});

module.exports = mongoose.model("PaymentList", PaymentListSchema); 