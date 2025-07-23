const PaymentList = require('../../models/PaymentList');

const createPayment = async (req, res) => {
  try {
    const { images } = req.body;
    const newPayment = new PaymentList({ images });
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
    payment.images = req.body.images || payment.images;
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

const removePaymentImageByIndex = async (req, res) => {
  try {
    const { id, index } = req.params;
    const payment = await PaymentList.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    if (!Array.isArray(payment.images) || index < 0 || index >= payment.images.length) {
      return res.status(400).json({ message: 'Image index out of range' });
    }
    payment.images.splice(index, 1);
    await payment.save();
    res.status(200).json({ message: 'Image removed from payment successfully', data: payment });
  } catch (error) {
    res.status(500).json({ message: 'Error removing image from payment', error: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePayment,
  deletePayment,
  removePaymentImageByIndex,
}; 