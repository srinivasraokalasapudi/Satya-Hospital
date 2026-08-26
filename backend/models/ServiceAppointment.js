const mongoose = require('mongoose');
const serviceAppointmentSchema = new mongoose.Schema({
  serviceappointmentid: { type: String, unique: true, required: true },
  patientname: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  servicename: { type: String, required: true },
  category: { type: String, default: 'Diagnostic' },
  appointmentdate: { type: Date, required: true },
  appointmenttime: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  notes: { type: String, default: "" },
  aiBrief: { type: String, default: "" },
  aiBriefTelugu: { type: String, default: "" },
  aiBriefHindi: { type: String, default: "" },
  aiBriefStatus: { type: String, enum: ["ready", "failed"], default: "ready" },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model('ServiceAppointment', serviceAppointmentSchema);
