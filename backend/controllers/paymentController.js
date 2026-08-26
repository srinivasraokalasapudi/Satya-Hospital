const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');
const ServiceAppointment = require('../models/ServiceAppointment');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.createOrder = async (req, res) => {
  try {
    const { appointmentId, serviceAppointmentId, amount, patientEmail, patientPhone, description } = req.body;
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      description: description,
    });
    const payment = new Payment({
      paymentId: `PAY_${Date.now()}`,
      orderId: razorpayOrder.id,
      appointmentId: appointmentId || null,
      serviceAppointmentId: serviceAppointmentId || null,
      patientEmail,
      patientPhone,
      amount,
      paymentMethod: 'online',
      razorpayOrderId: razorpayOrder.id,
      description,
    });
    await payment.save();
    res.json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID,
      order: razorpayOrder,
      payment: payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Records a "pay at clinic / lab" booking as a cash payment so it shows up
// alongside online payments in the admin Payments dashboard, and confirms
// the linked appointment / service appointment.
exports.recordCashPayment = async (req, res) => {
  try {
    const { appointmentId, serviceAppointmentId, amount, patientEmail, patientPhone, description } = req.body;
    if (!amount || amount < 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    if (!appointmentId && !serviceAppointmentId) {
      return res.status(400).json({ error: 'appointmentId or serviceAppointmentId is required' });
    }
    const syntheticId = `CASH_${Date.now()}`;
    const payment = new Payment({
      paymentId: `PAY_${Date.now()}`,
      orderId: syntheticId,
      appointmentId: appointmentId || null,
      serviceAppointmentId: serviceAppointmentId || null,
      patientEmail,
      patientPhone,
      amount,
      paymentMethod: 'cash',
      status: 'pending',
      razorpayOrderId: syntheticId,
      description,
    });
    await payment.save();
    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, { status: 'confirmed' });
    }
    if (serviceAppointmentId) {
      await ServiceAppointment.findByIdAndUpdate(serviceAppointmentId, { status: 'confirmed' });
    }
    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lets the admin mark a "pay at clinic" cash payment as collected once the
// patient has actually paid in person.
exports.markCashCollected = async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.paymentId });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    if (payment.paymentMethod !== 'cash') {
      return res.status(400).json({ error: 'Only cash payments can be marked as collected' });
    }
    payment.status = 'completed';
    await payment.save();
    if (payment.appointmentId) {
      await Appointment.findByIdAndUpdate(payment.appointmentId, { isPaid: true });
    }
    if (payment.serviceAppointmentId) {
      await ServiceAppointment.findByIdAndUpdate(payment.serviceAppointmentId, { isPaid: true });
    }
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
    const isValid = expectedSignature === razorpay_signature;
    if (!isValid) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    payment.status = 'completed';
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    await payment.save();
    if (payment.appointmentId) {
      await Appointment.findByIdAndUpdate(payment.appointmentId, { isPaid: true, status: 'confirmed' });
    }
    if (payment.serviceAppointmentId) {
      await ServiceAppointment.findByIdAndUpdate(payment.serviceAppointmentId, { isPaid: true, status: 'confirmed' });
    }
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.paymentId });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
