const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true, required: true },
  orderId: { type: String, required: true },
  appointmentId: { type: String, default: null },
  serviceAppointmentId: { type: String, default: null },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, enum: ['online', 'cash'], default: null },
  razorpayOrderId: { type: String, default: null },
  razorpayPaymentId: { type: String, default: null },
  razorpaySignature: { type: String, default: null },
  description: { type: String, required: true },
  notes: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model('Payment', paymentSchema);
