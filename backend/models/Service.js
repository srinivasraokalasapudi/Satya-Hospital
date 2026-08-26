const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
  serviceid: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "" },
  price: { type: Number, required: true },
  duration: { type: String, default: "1 hour" },
  imageUrl: { type: String, default: null },
  availability: { type: String, enum: ["Available", "Unavailable"], default: "Available" },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model('Service', serviceSchema);
