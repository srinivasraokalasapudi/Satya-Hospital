const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  appointmentid: { type: String, unique: true, required: true },
  patientname: { type: String, required: true },
  problem: { type: String, required: true, trim: true, maxlength: 1000 },
  aiBrief: { type: String, default: "", trim: true, maxlength: 4000 },
  aiBriefTelugu: { type: String, default: "", trim: true, maxlength: 6000 },
  aiBriefHindi: { type: String, default: "", trim: true, maxlength: 6000 },
  aiBriefStatus: { type: String, enum: ["ready", "failed"], default: "ready" },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  doctorname: { type: String, required: true },
  specialization: { type: String, default: "" },
  appointmentdate: { type: Date, required: true },
  appointmenttime: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  isPaid: { type: Boolean, default: false },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model('Appointment', appointmentSchema);
