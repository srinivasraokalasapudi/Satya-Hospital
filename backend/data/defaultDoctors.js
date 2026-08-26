// =====================================================
// Default / seed doctors shown on the Doctors page.
// server.js auto-seeds this list on startup (only adding
// doctors that don't already exist, matched by name), so
// the Doctors page fills in automatically with no need to
// run a separate script by hand.
// =====================================================

const defaultDoctors = [
  {
    name: "Dr. Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "9876543210",
    specialization: "Cardiology",
    imageUrl: null,
    experience: "15 years",
    qualifications: "MD, DM Cardiology",
    location: "Hyderabad",
    about: "Expert cardiologist with 15 years of experience in treating heart diseases.",
    fee: 500,
    availability: "Available",
    rating: 4.8
  },
  {
    name: "Dr. Ananya Kapoor",
    email: "ananya.kapoor@example.com",
    phone: "9876543211",
    specialization: "Dermatology",
    imageUrl: null,
    experience: "10 years",
    qualifications: "MD Dermatology, FAAD",
    location: "Hyderabad",
    about: "Specialized in skin diseases and cosmetic procedures with innovative treatments.",
    fee: 400,
    availability: "Available",
    rating: 4.7
  },
  {
    name: "Dr. Karan Patel",
    email: "karan.patel@example.com",
    phone: "9876543212",
    specialization: "Orthopedics",
    imageUrl: null,
    experience: "12 years",
    qualifications: "MD, MRCS Orthopedics",
    location: "Hyderabad",
    about: "Expert in joint replacement and sports medicine with the latest techniques.",
    fee: 450,
    availability: "Available",
    rating: 4.9
  },
  {
    name: "Dr. Rohan Sharma",
    email: "rohan.sharma@example.com",
    phone: "9876543213",
    specialization: "Pediatrics",
    imageUrl: null,
    experience: "8 years",
    qualifications: "MD Pediatrics, FICPD",
    location: "Hyderabad",
    about: "Caring pediatrician focused on child health and wellness with compassion.",
    fee: 350,
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dr. Vikram Rao",
    email: "vikram.rao@example.com",
    phone: "9876543214",
    specialization: "Neurology",
    imageUrl: null,
    experience: "14 years",
    qualifications: "MD, DM Neurology",
    location: "Hyderabad",
    about: "Specialist in neurological disorders with advanced diagnostic skills.",
    fee: 550,
    availability: "Available",
    rating: 4.8
  },
  {
    name: "Dr. Meera Nair",
    email: "meera.nair@example.com",
    phone: "9876543215",
    specialization: "Gynecology",
    imageUrl: null,
    experience: "11 years",
    qualifications: "MD Gynecology, FRCOG",
    location: "Hyderabad",
    about: "Compassionate gynecologist with expertise in women's health management.",
    fee: 400,
    availability: "Available",
    rating: 4.7
  }
];

module.exports = defaultDoctors;
