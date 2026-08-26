const mongoose = require('mongoose');

const metaSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, default: true }
});

module.exports = mongoose.model('Meta', metaSchema);
