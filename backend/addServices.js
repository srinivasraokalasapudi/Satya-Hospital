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
// Model
// =====================================================

const Service = require('./models/Service');
const newServices = require('./data/defaultServices');


// =====================================================
// Connect to MongoDB and add the services
// (this script only ADDS — it never deletes existing data)
// =====================================================

async function addServices() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Please check backend/.env");
    }

    console.log("\n📡 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log("✅ MongoDB Connected\n");

    console.log("🏥 Adding new priced services...");

    const toInsert = [];
    for (const svc of newServices) {
      const exists = await Service.findOne({ name: svc.name });
      if (exists) {
        console.log(`   ⏭  Skipped (already exists): ${svc.name}`);
        continue;
      }
      toInsert.push({ ...svc, serviceid: `SRV_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` });
    }

    const added = toInsert.length ? await Service.insertMany(toInsert) : [];

    console.log(`\n✅ ${added.length} new services added successfully\n`);
    added.forEach((s, i) => console.log(`   ${i + 1}. ${s.name} — ₹${s.price}`));

    console.log("\n🎉 Done! Refresh the Services page to see them.\n");
  } catch (error) {
    console.error("\n❌ Error adding services:");
    console.error(error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed");
    }
    process.exit();
  }
}

addServices();
