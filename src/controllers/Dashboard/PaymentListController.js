const PaymentList = require('../../models/PaymentList');

const createPayment = async (req, res) => {
  try {
    const { amount, date, method, reference } = req.body;
    const newPayment = new PaymentList({ amount, date, method, reference });
    await newPayment.save();
    res.status(201).json({ message: 'Payment created successfully', data: newPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentList.find();
    res.status(200).json({ message: 'Payments fetched successfully', data: payments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentList.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    payment.amount = req.body.amount || payment.amount;
    payment.date = req.body.date || payment.date;
    payment.method = req.body.method || payment.method;
    payment.reference = req.body.reference || payment.reference;
    await payment.save();
    res.status(200).json({ message: 'Payment updated successfully', data: payment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentList.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
};

// Placeholder: Remove a method by payment ID and method index (if methods were an array)
const removePaymentMethodByIndex = async (req, res) => {
  return res.status(400).json({ message: 'Not implemented: PaymentList does not have an array field to remove by index.' });
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePayment,
  deletePayment,
  removePaymentMethodByIndex, // Exported for future use
}; 