const dns = require('dns');

// Force Node.js to use reliable DNS servers.
// This helps fix MongoDB Atlas "querySrv ECONNREFUSED" errors.
dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Doctor = require('./models/Doctor');
const Service = require('./models/Service');
const Meta = require('./models/Meta');
const defaultDoctors = require('./data/defaultDoctors');
const defaultServices = require('./data/defaultServices');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceAppointmentRoutes = require('./routes/serviceAppointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ttsRoutes = require('./routes/ttsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ================================
// Middleware
// ================================

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      process.env.ADMIN_URL || 'http://localhost:5174'
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// Routes
// ================================

app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-appointments', serviceAppointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/tts', ttsRoutes);

// ================================
// Health Check
// ================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Satya-Hospitals API is running'
  });
});

// ================================
// 404 Handler
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// ================================
// Global Error Handler
// ================================

app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  res.status(500).json({
    success: false,
    error: 'Something went wrong on the server'
  });
});

// ================================
// MongoDB Connection
// ================================

// ================================
// Auto-seed default doctors & services
// Runs every time the server starts. Both only ADD records
// that don't already exist (matched by name) — they never
// delete or overwrite anything (appointments are never
// touched), so restarting the server is always safe.
// This means the Doctors and Services pages fill in
// automatically with no need to run a separate script.
// ================================

// ================================
// One-time auto-clear of services
// Runs automatically on the next startup and wipes out any
// existing services (e.g. ones left over from earlier seed
// runs) — no need to run a script by hand. It only ever
// does this ONCE: it sets a flag in the database after
// clearing, so future restarts leave the Services page
// (and anything you add to it via the admin panel) alone.
// ================================

const clearServicesOnce = async () => {
  try {
    const alreadyCleared = await Meta.findOne({ key: 'servicesClearedOnce' });
    if (alreadyCleared) return;

    const { deletedCount } = await Service.deleteMany({});
    await Meta.create({ key: 'servicesClearedOnce', value: true });
    console.log(`🗑️  Auto-cleared ${deletedCount} existing service(s) (one-time)`);
  } catch (error) {
    console.error('⚠️  Could not auto-clear services:', error.message);
  }
};

const seedDefaultDoctors = async () => {
  try {
    const existingNames = new Set(
      (await Doctor.find({}, 'name')).map((d) => d.name)
    );

    const toInsert = defaultDoctors
      .filter((doc) => !existingNames.has(doc.name))
      .map((doc) => ({
        ...doc,
        doctorid: `DOC_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      }));

    if (toInsert.length) {
      await Doctor.insertMany(toInsert);
      console.log(`👨‍⚕️ Auto-seeded ${toInsert.length} new doctor(s)`);
    } else {
      console.log('👨‍⚕️ Doctors already up to date');
    }
  } catch (error) {
    console.error('⚠️  Could not auto-seed doctors:', error.message);
  }
};

const seedDefaultServices = async () => {
  try {
    const existingNames = new Set(
      (await Service.find({}, 'name')).map((s) => s.name)
    );

    const toInsert = defaultServices
      .filter((svc) => !existingNames.has(svc.name))
      .map((svc) => ({
        ...svc,
        serviceid: `SRV_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      }));

    if (toInsert.length) {
      await Service.insertMany(toInsert);
      console.log(`🏥 Auto-seeded ${toInsert.length} new service(s)`);
    } else {
      console.log('🏥 Services already up to date');
    }
  } catch (error) {
    console.error('⚠️  Could not auto-seed services:', error.message);
  }
};

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        'MONGO_URI is missing. Please add MONGO_URI to backend/.env'
      );
    }

    console.log('🔄 Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('✅ MongoDB Connected');

    await seedDefaultDoctors();
    await clearServicesOnce();
    // Auto-seeds any services from data/defaultServices.js that
    // aren't already in the database (matched by name), every
    // time the server starts — no manual script needed.
    await seedDefaultServices();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:');
    console.error(error.message);

    process.exit(1);
  }
};

connectDB();