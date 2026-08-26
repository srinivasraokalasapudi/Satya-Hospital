const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  doctorid: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialization: { type: String, default: "" },
  imageUrl: { type: String, default: null },
  experience: { type: String, default: "" },
  qualifications: { type: String, default: "" },
  location: { type: String, default: "" },
  about: { type: String, default: "" },
  fee: { type: Number, default: 500 },
  availability: { type: String, enum: ["Available", "Unavailable"], default: "Available" },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model('Doctor', doctorSchema);
