const dns = require('dns');
const mongoose = require('mongoose');
const path = require('path');

// =====================================================
// DNS Configuration
// Fixes MongoDB Atlas querySrv ECONNREFUSED problem
// =====================================================

dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

// =====================================================
// Load .env
// =====================================================

require('dotenv').config({
  path: path.join(__dirname, '.env')
});

// =====================================================
// Models
// =====================================================

const Doctor = require('./models/Doctor');
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');
const defaultDoctors = require('./data/defaultDoctors');
const defaultServices = require('./data/defaultServices');

// =====================================================
// Doctors & Services
// These now come from the shared ./data/defaultDoctors.js
// and ./data/defaultServices.js files (the same ones used
// by server.js to auto-seed on startup, and by
// addServices.js), so there is a single, merged list of
// services/doctors instead of separate copies drifting out
// of sync. Unique ids are generated fresh each run.
// =====================================================

const sampleDoctors = defaultDoctors.map((d, i) => ({
  ...d,
  doctorid: `DOC_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 8)}`
}));

const sampleServices = defaultServices.map((s, i) => ({
  ...s,
  serviceid: `SRV_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 8)}`
}));


// =====================================================
// Sample Appointments
// =====================================================

const sampleAppointments = [
  {
    appointmentid: `APT_${Date.now()}_1`,
    patientname: "John Doe",
    email: "john@example.com",
    phone: "9999999999",
    doctorname: "Dr. Arjun Mehta",
    specialization: "Cardiology",
    appointmentdate: new Date(Date.now() + 86400000),
    appointmenttime: "10:00",
    status: "confirmed",
    isPaid: true,
    notes: "Regular checkup for heart condition"
  },
  {
    appointmentid: `APT_${Date.now()}_2`,
    patientname: "Sarah Smith",
    email: "sarah@example.com",
    phone: "8888888888",
    doctorname: "Dr. Ananya Kapoor",
    specialization: "Dermatology",
    appointmentdate: new Date(Date.now() + 172800000),
    appointmenttime: "14:30",
    status: "confirmed",
    isPaid: true,
    notes: "Skin consultation for acne treatment"
  },
  {
    appointmentid: `APT_${Date.now()}_3`,
    patientname: "Michael Johnson",
    email: "michael@example.com",
    phone: "7777777777",
    doctorname: "Dr. Karan Patel",
    specialization: "Orthopedics",
    appointmentdate: new Date(Date.now() + 259200000),
    appointmenttime: "11:00",
    status: "confirmed",
    isPaid: false,
    notes: "Knee pain consultation and treatment plan"
  },
  {
    appointmentid: `APT_${Date.now()}_4`,
    patientname: "Emily Brown",
    email: "emily@example.com",
    phone: "6666666666",
    doctorname: "Dr. Rohan Sharma",
    specialization: "Pediatrics",
    appointmentdate: new Date(Date.now() + 345600000),
    appointmenttime: "09:00",
    status: "pending",
    isPaid: false,
    notes: "Child health checkup and vaccination"
  },
  {
    appointmentid: `APT_${Date.now()}_5`,
    patientname: "David Wilson",
    email: "david@example.com",
    phone: "5555555555",
    doctorname: "Dr. Vikram Rao",
    specialization: "Neurology",
    appointmentdate: new Date(Date.now() + 432000000),
    appointmenttime: "15:30",
    status: "pending",
    isPaid: false,
    notes: "Headache and migraine management"
  }
];

// =====================================================
// Connect to MongoDB and Seed Database
// =====================================================

async function addData() {
  try {
    // Check environment variable
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing. Please check backend/.env"
      );
    }

    // Connect
    console.log("\n📡 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("✅ MongoDB Connected\n");

    // =================================================
    // Clear old data
    // =================================================

    console.log("🗑️ Clearing existing data...");

    await Doctor.deleteMany({});
    await Service.deleteMany({});
    await Appointment.deleteMany({});

    console.log("✅ Existing data cleared\n");

    // =================================================
    // Doctors
    // =================================================

    console.log("👨‍⚕️ Adding Doctors...");

    const addedDoctors = await Doctor.insertMany(
      sampleDoctors
    );

    console.log(
      `✅ ${addedDoctors.length} Doctors added successfully\n`
    );

    // =================================================
    // Services
    // =================================================

    console.log("🏥 Adding Services...");

    const addedServices = await Service.insertMany(
      sampleServices
    );

    console.log(
      `✅ ${addedServices.length} Services added successfully\n`
    );

    // =================================================
    // Appointments
    // =================================================

    console.log("📅 Adding Appointments...");

    const addedAppointments =
      await Appointment.insertMany(
        sampleAppointments
      );

    console.log(
      `✅ ${addedAppointments.length} Appointments added successfully\n`
    );

    // =================================================
    // Summary
    // =================================================

    console.log("=".repeat(50));
    console.log("📊 DATA SUMMARY");
    console.log("=".repeat(50));

    console.log(
      `\n✅ Total Doctors Added: ${addedDoctors.length}`
    );

    addedDoctors.forEach((doctor, index) => {
      console.log(
        `   ${index + 1}. ${doctor.name} (${doctor.specialization}) - ₹${doctor.fee}`
      );
    });

    console.log(
      `\n✅ Total Services Added: ${addedServices.length}`
    );

    addedServices.forEach((service, index) => {
      console.log(
        `   ${index + 1}. ${service.name} - ₹${service.price}`
      );
    });

    console.log(
      `\n✅ Total Appointments Added: ${addedAppointments.length}`
    );

    addedAppointments.forEach(
      (appointment, index) => {
        console.log(
          `   ${index + 1}. ${appointment.patientname} with ${appointment.doctorname}`
        );
      }
    );

    console.log("\n" + "=".repeat(50));
    console.log("🎉 ALL DATA ADDED SUCCESSFULLY!");
    console.log("=".repeat(50));

    console.log("\n✅ Database is ready to use!");
    console.log(
      "✅ Start the frontend and open http://localhost:5173\n"
    );

  } catch (error) {
    console.error("\n❌ Error adding data:");
    console.error(error.message);

  } finally {
    // Always close MongoDB cleanly
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed");
    }

    process.exit();
  }
}

// =====================================================
// Run Seeder
// =====================================================

addData();