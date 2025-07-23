const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  updatePayment,
  deletePayment,
  removePaymentImageByIndex,
} = require("../controllers/Dashboard/PaymentListController");

router.post("/paymentlist", createPayment);
router.get("/paymentlist", getAllPayments);
router.put("/paymentlist/:id", updatePayment);
router.put("/paymentlist/:id/:index", removePaymentImageByIndex);
router.delete("/paymentlist/:id", deletePayment);

module.exports = router; 