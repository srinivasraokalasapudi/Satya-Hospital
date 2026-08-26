// =====================================================
// Default / seed services shown on the Services page.
// Both addServices.js and server.js (on startup) use this
// same list so new services show up automatically without
// needing to run a separate script.
//
// Prices/images are sourced from the Fixed Hospital Tariff 2026
// and the Satya-Hospital Service Catalogue (Batches 1-5, services 1-100).
// =====================================================

const defaultServices = [
  {
    name: "General Physician Consultation",
    description: "In-person consultation with a general physician for common health concerns, illnesses and routine check-ups.",
    category: "Consultation",
    price: 800,
    duration: "20 minutes",
    imageUrl: "/services/general-physician-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Internal Medicine Consultation",
    description: "Consultation with an internal medicine specialist for diagnosis and management of adult illnesses.",
    category: "Consultation",
    price: 1000,
    duration: "20 minutes",
    imageUrl: "/services/internal-medicine-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Family Medicine",
    description: "Comprehensive primary care consultation for patients of all ages and ongoing health needs.",
    category: "Consultation",
    price: 700,
    duration: "20 minutes",
    imageUrl: "/services/family-medicine.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Specialist Consultation",
    description: "Focused, one-on-one consultation with an experienced specialist for accurate diagnosis and a tailored treatment plan.",
    category: "Consultation",
    price: 1200,
    duration: "30 minutes",
    imageUrl: "/services/specialist-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Follow-up Consultation",
    description: "Short follow-up visit to review progress, test results and adjust an ongoing treatment plan.",
    category: "Consultation",
    price: 500,
    duration: "15 minutes",
    imageUrl: "/services/follow-up-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "ECG",
    description: "Electrocardiogram that records your heart's electrical activity to detect rhythm and cardiac abnormalities.",
    category: "Diagnostic",
    price: 500,
    duration: "15 minutes",
    imageUrl: "/services/ecg.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "2D Echo",
    description: "Ultrasound-based imaging of the heart's chambers, valves and pumping function.",
    category: "Diagnostic",
    price: 3500,
    duration: "30 minutes",
    imageUrl: "/services/2d-echo.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "TMT (Stress Test)",
    description: "Treadmill stress test to evaluate heart function and blood flow under physical exertion.",
    category: "Diagnostic",
    price: 4500,
    duration: "45 minutes",
    imageUrl: "/services/tmt-stress-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Holter Monitoring",
    description: "Continuous 24-hour ECG monitoring to detect intermittent heart rhythm abnormalities.",
    category: "Diagnostic",
    price: 4500,
    duration: "24 hours",
    imageUrl: "/services/holter-monitoring.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Cardiac Consultation",
    description: "Expert consultation with a cardiologist for heart health concerns, chest pain and cardiac risk assessment.",
    category: "Cardiology",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/cardiology-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "PFT",
    description: "Pulmonary Function Test to measure lung capacity and airflow for respiratory conditions.",
    category: "Diagnostic",
    price: 2000,
    duration: "20 minutes",
    imageUrl: "/services/pft.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Nebulization",
    description: "Nebulizer treatment to deliver inhaled medication directly to the lungs for breathing relief.",
    category: "Therapy",
    price: 500,
    duration: "15 minutes",
    imageUrl: "/services/nebulization.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Asthma Consultation",
    description: "Specialist consultation for diagnosis, management and control of asthma symptoms.",
    category: "Consultation",
    price: 1200,
    duration: "20 minutes",
    imageUrl: "/services/asthma-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Sleep Study",
    description: "Overnight polysomnography to diagnose sleep disorders such as sleep apnea.",
    category: "Diagnostic",
    price: 15000,
    duration: "Overnight",
    imageUrl: "/services/sleep-study.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "EEG",
    description: "Electroencephalogram to record electrical activity of the brain for neurological evaluation.",
    category: "Diagnostic",
    price: 3500,
    duration: "45 minutes",
    imageUrl: "/services/eeg.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "EMG & NCV",
    description: "Electromyography and nerve conduction velocity study to assess nerve and muscle function.",
    category: "Diagnostic",
    price: 6500,
    duration: "45 minutes",
    imageUrl: "/services/emg-ncv.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Stroke Evaluation",
    description: "Comprehensive neurological evaluation to assess stroke risk, symptoms and follow-up care.",
    category: "Diagnostic",
    price: 8000,
    duration: "1 hour",
    imageUrl: "/services/stroke-evaluation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Neurology Consultation",
    description: "Consultation with a neurologist for disorders of the brain, spine and nervous system.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/neurology-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Bone Fracture Treatment",
    description: "Diagnosis and treatment of bone fractures, including casting and reduction procedures.",
    category: "Orthopedics",
    price: 15000,
    duration: "Varies",
    imageUrl: "/services/bone-fracture-treatment.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Joint Replacement Consultation",
    description: "Orthopedic consultation to evaluate suitability and planning for joint replacement surgery.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/joint-replacement-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Sports Injury Consultation",
    description: "Consultation for diagnosis and management of sports-related injuries.",
    category: "Consultation",
    price: 1200,
    duration: "20 minutes",
    imageUrl: "/services/sports-injury-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Spine Consultation",
    description: "Specialist consultation for back pain, spinal disorders and related conditions.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/orthopedic-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Physiotherapy (Session)",
    description: "One-on-one physiotherapy session for pain relief, mobility and post-injury or post-surgery recovery.",
    category: "Therapy",
    price: 1000,
    duration: "45 minutes",
    imageUrl: "/services/physiotherapy-session.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Child Consultation",
    description: "Child-focused consultation with a pediatrician for growth, immunization and common illnesses.",
    category: "Pediatrics",
    price: 800,
    duration: "20 minutes",
    imageUrl: "/services/pediatric-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Child Vaccination",
    description: "Routine childhood immunizations administered as per the recommended vaccination schedule.",
    category: "Preventive",
    price: 2500,
    duration: "15 minutes",
    imageUrl: "/services/child-vaccination.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Growth Monitoring",
    description: "Regular tracking of a child's height, weight and developmental milestones.",
    category: "Pediatrics",
    price: 700,
    duration: "15 minutes",
    imageUrl: "/services/growth-monitoring.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Newborn Care",
    description: "Specialized care and check-ups for newborns in the first weeks of life.",
    category: "Pediatrics",
    price: 1500,
    duration: "20 minutes",
    imageUrl: "/services/newborn-care.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Pregnancy Checkup",
    description: "Routine prenatal checkup to monitor the health of mother and baby during pregnancy.",
    category: "Women's Health",
    price: 1200,
    duration: "20 minutes",
    imageUrl: "/services/pregnancy-checkup.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Antenatal Care",
    description: "Ongoing prenatal care programme covering screenings and monitoring throughout pregnancy.",
    category: "Women's Health",
    price: 1800,
    duration: "30 minutes",
    imageUrl: "/services/antenatal-care.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Fertility Consultation",
    description: "Consultation to evaluate fertility concerns and discuss treatment options.",
    category: "Women's Health",
    price: 2000,
    duration: "30 minutes",
    imageUrl: "/services/fertility-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Pap Smear",
    description: "Screening test to detect abnormal cervical cells and early signs of cervical cancer.",
    category: "Women's Health",
    price: 1500,
    duration: "15 minutes",
    imageUrl: "/services/pap-smear.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Menopause Clinic",
    description: "Specialized consultation for management of menopause symptoms and related health concerns.",
    category: "Women's Health",
    price: 1200,
    duration: "20 minutes",
    imageUrl: "/services/menopause-clinic.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Hernia Surgery",
    description: "Surgical repair of a hernia to relieve pain and prevent complications.",
    category: "Surgery",
    price: 120000,
    duration: "1-2 hours",
    imageUrl: "/services/hernia-surgery.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Appendix Surgery",
    description: "Surgical removal of the appendix (appendectomy) for acute appendicitis.",
    category: "Surgery",
    price: 130000,
    duration: "1-2 hours",
    imageUrl: "/services/appendix-surgery.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Gallbladder Surgery",
    description: "Surgical removal of the gallbladder (cholecystectomy) for gallstones and related conditions.",
    category: "Surgery",
    price: 150000,
    duration: "2-3 hours",
    imageUrl: "/services/gallbladder-surgery.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Minor Surgery",
    description: "Outpatient minor surgical procedures performed under local anaesthesia.",
    category: "Surgery",
    price: 20000,
    duration: "30-60 minutes",
    imageUrl: "/services/minor-surgery.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Digital X-Ray",
    description: "Digital X-ray imaging for bones, chest and joints with fast turnaround and expert reporting.",
    category: "Diagnostic",
    price: 800,
    duration: "15 minutes",
    imageUrl: "/services/x-ray.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Ultrasound",
    description: "High-precision ultrasound imaging for abdominal, pelvic and other organ examinations.",
    category: "Diagnostic",
    price: 2500,
    duration: "30 minutes",
    imageUrl: "/services/ultrasound-scan.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Doppler",
    description: "Doppler ultrasound to assess blood flow through arteries and veins.",
    category: "Diagnostic",
    price: 3500,
    duration: "30 minutes",
    imageUrl: "/services/doppler.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "CT Scan",
    description: "Detailed cross-sectional CT imaging for fast, accurate diagnosis of internal conditions and injuries.",
    category: "Diagnostic",
    price: 5000,
    duration: "30 minutes",
    imageUrl: "/services/ct-scan.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "MRI Scan",
    description: "High-resolution MRI imaging for detailed evaluation of soft tissue, brain, spine and joints.",
    category: "Diagnostic",
    price: 9000,
    duration: "45 minutes",
    imageUrl: "/services/mri-scan.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Mammography",
    description: "Breast imaging screening to detect early signs of breast cancer.",
    category: "Diagnostic",
    price: 3500,
    duration: "20 minutes",
    imageUrl: "/services/mammography.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "CBC",
    description: "Complete Blood Count test that evaluates your overall health and helps detect a wide range of disorders.",
    category: "Diagnostic",
    price: 500,
    duration: "15 minutes",
    imageUrl: "/services/blood-test-cbc.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Blood Sugar",
    description: "Fasting or random blood glucose test to monitor, diagnose and manage diabetes.",
    category: "Diagnostic",
    price: 200,
    duration: "10 minutes",
    imageUrl: "/services/blood-sugar-test.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Lipid Profile",
    description: "Cholesterol and triglyceride panel to assess cardiovascular risk.",
    category: "Diagnostic",
    price: 900,
    duration: "10 minutes",
    imageUrl: "/services/lipid-profile-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "LFT",
    description: "Liver Function Test panel to assess liver health and detect abnormalities.",
    category: "Diagnostic",
    price: 800,
    duration: "15 minutes",
    imageUrl: "/services/lft.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "KFT",
    description: "Kidney Function Test panel to assess renal health and detect abnormalities.",
    category: "Diagnostic",
    price: 800,
    duration: "15 minutes",
    imageUrl: "/services/kft.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Thyroid Profile",
    description: "TSH, T3 and T4 blood test to evaluate thyroid gland function.",
    category: "Diagnostic",
    price: 900,
    duration: "10 minutes",
    imageUrl: "/services/thyroid-profile-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Urine Analysis",
    description: "Routine urinalysis to screen for infections, kidney issues and other health markers.",
    category: "Diagnostic",
    price: 250,
    duration: "10 minutes",
    imageUrl: "/services/urine-analysis.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "COVID RT-PCR",
    description: "Gold-standard RT-PCR test for accurate COVID-19 detection, with home sample collection available.",
    category: "Testing",
    price: 800,
    duration: "24 hours",
    imageUrl: "/services/covid-19-rt-pcr.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dengue Test",
    description: "Blood test to detect dengue infection through antigen and antibody screening.",
    category: "Diagnostic",
    price: 1500,
    duration: "24 hours",
    imageUrl: "/services/dengue-test.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Malaria Test",
    description: "Rapid blood test to detect malaria parasite infection.",
    category: "Diagnostic",
    price: 500,
    duration: "1 hour",
    imageUrl: "/services/malaria-test.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dental Checkup",
    description: "Routine dental checkup to assess oral health and detect issues early.",
    category: "Dental",
    price: 500,
    duration: "20 minutes",
    imageUrl: "/services/dental-checkup.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Teeth Cleaning",
    description: "Professional scaling and polishing to remove plaque, tartar and surface stains.",
    category: "Dental",
    price: 2500,
    duration: "30 minutes",
    imageUrl: "/services/teeth-cleaning.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Root Canal",
    description: "Root canal treatment to remove infected pulp and save a damaged tooth.",
    category: "Dental",
    price: 8000,
    duration: "60 minutes",
    imageUrl: "/services/root-canal.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dental Filling",
    description: "Tooth-coloured or amalgam filling to restore a tooth affected by decay.",
    category: "Dental",
    price: 2000,
    duration: "30 minutes",
    imageUrl: "/services/dental-filling.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Tooth Extraction",
    description: "Safe removal of a damaged, decayed or impacted tooth.",
    category: "Dental",
    price: 2500,
    duration: "20 minutes",
    imageUrl: "/services/tooth-extraction.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dental Braces",
    description: "Orthodontic braces treatment to correct teeth alignment and bite issues.",
    category: "Dental",
    price: 60000,
    duration: "Ongoing",
    imageUrl: "/services/dental-braces.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Eye Checkup",
    description: "Comprehensive vision and eye health screening, including refraction test and pressure check.",
    category: "Diagnostic",
    price: 800,
    duration: "20 minutes",
    imageUrl: "/services/eye-checkup.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Cataract Surgery",
    description: "Surgical removal of a cloudy lens and replacement with an artificial intraocular lens.",
    category: "Surgery",
    price: 50000,
    duration: "30-45 minutes",
    imageUrl: "/services/cataract-surgery.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "LASIK Consultation",
    description: "Pre-surgical consultation to evaluate eligibility for LASIK vision correction surgery.",
    category: "Consultation",
    price: 1000,
    duration: "20 minutes",
    imageUrl: "/services/lasik-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Glaucoma Screening",
    description: "Screening test to detect glaucoma and assess intraocular pressure.",
    category: "Diagnostic",
    price: 2500,
    duration: "20 minutes",
    imageUrl: "/services/glaucoma-screening.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Hearing Test",
    description: "Audiometry test to assess hearing ability and detect hearing loss.",
    category: "Diagnostic",
    price: 1500,
    duration: "20 minutes",
    imageUrl: "/services/hearing-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Sinus Treatment",
    description: "ENT consultation and treatment for sinus infections and related symptoms.",
    category: "Consultation",
    price: 3000,
    duration: "20 minutes",
    imageUrl: "/services/sinus-treatment.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Tonsil Surgery",
    description: "Surgical removal of the tonsils (tonsillectomy) for recurrent infections or obstruction.",
    category: "Surgery",
    price: 90000,
    duration: "45-60 minutes",
    imageUrl: "/services/tonsil-surgery.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Endoscopy",
    description: "Minimally invasive procedure to examine the digestive tract using a flexible camera.",
    category: "Diagnostic",
    price: 5000,
    duration: "30 minutes",
    imageUrl: "/services/endoscopy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Emergency Consultation",
    description: "Immediate medical consultation for urgent, non-scheduled health concerns.",
    category: "Emergency",
    price: 1500,
    duration: "Immediate",
    imageUrl: "/services/emergency-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Trauma Care",
    description: "Emergency trauma management for accidents and serious injuries.",
    category: "Emergency",
    price: 25000,
    duration: "Varies",
    imageUrl: "/services/trauma-care.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Ambulance",
    description: "Emergency ambulance service with trained staff for patient transport.",
    category: "Emergency",
    price: 2500,
    duration: "On-call",
    imageUrl: "/services/ambulance.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "ICU (Per Day)",
    description: "Intensive Care Unit stay with round-the-clock monitoring and critical care support.",
    category: "Inpatient",
    price: 20000,
    duration: "1 day",
    imageUrl: "/services/icu-per-day.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "General Ward (Day)",
    description: "Shared general ward accommodation with standard nursing care.",
    category: "Inpatient",
    price: 3500,
    duration: "1 day",
    imageUrl: "/services/general-ward-day.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Semi-Private Room",
    description: "Shared room accommodation with two beds and attached amenities.",
    category: "Inpatient",
    price: 5500,
    duration: "1 day",
    imageUrl: "/services/semi-private-room.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Private Room",
    description: "Single-occupancy private room with attached bathroom and standard amenities.",
    category: "Inpatient",
    price: 8000,
    duration: "1 day",
    imageUrl: "/services/private-room.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Deluxe Room",
    description: "Premium single-occupancy room with enhanced comfort and amenities.",
    category: "Inpatient",
    price: 12000,
    duration: "1 day",
    imageUrl: "/services/deluxe-room.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "ICU Admission Deposit",
    description: "Refundable admission deposit required prior to ICU admission.",
    category: "Inpatient",
    price: 50000,
    duration: "One-time",
    imageUrl: "/services/icu-admission-deposit.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Vaccination",
    description: "Adult and child vaccination services, including routine immunizations and travel vaccines. Price varies by vaccine.",
    category: "Preventive",
    price: 1500,
    duration: "15 minutes",
    imageUrl: "/services/vaccination.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Executive Health Checkup",
    description: "Comprehensive executive health screening package covering key diagnostic tests.",
    category: "Preventive",
    price: 7000,
    duration: "2 hours",
    imageUrl: "/services/health-checkup-package.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Diabetes Screening",
    description: "Screening panel to detect and monitor diabetes and pre-diabetic conditions.",
    category: "Preventive",
    price: 1500,
    duration: "15 minutes",
    imageUrl: "/services/diabetes-screening.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Cancer Screening",
    description: "Preventive screening package to detect early signs of common cancers.",
    category: "Preventive",
    price: 6000,
    duration: "1 hour",
    imageUrl: "/services/cancer-screening.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Senior Citizen Package",
    description: "Health checkup package tailored to the screening needs of senior citizens.",
    category: "Preventive",
    price: 5000,
    duration: "2 hours",
    imageUrl: "/services/senior-citizen-package.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Nephrology Consultation",
    description: "Consultation with a nephrologist for kidney health concerns and disorders.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/nephrology-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Urology Consultation",
    description: "Consultation with a urologist for urinary tract and related concerns.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/urology-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Oncology Consultation",
    description: "Consultation with an oncologist for cancer diagnosis, treatment and follow-up care.",
    category: "Consultation",
    price: 2000,
    duration: "30 minutes",
    imageUrl: "/services/oncology-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Gastroenterology Consultation",
    description: "Consultation with a gastroenterologist for digestive system concerns.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/gastroenterology-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dermatology Consultation",
    description: "Skin, hair and nail consultation with a dermatologist for diagnosis and personalized treatment.",
    category: "Consultation",
    price: 1000,
    duration: "20 minutes",
    imageUrl: "/services/dermatology-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Psychiatry Consultation",
    description: "Consultation with a psychiatrist for mental health assessment and treatment.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/psychiatry-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Psychology Counseling",
    description: "One-on-one counseling session with a psychologist for emotional and mental wellbeing.",
    category: "Therapy",
    price: 1500,
    duration: "45 minutes",
    imageUrl: "/services/psychology-counseling.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Rheumatology Consultation",
    description: "Consultation with a rheumatologist for joint, muscle and autoimmune conditions.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/rheumatology-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Endocrinology Consultation",
    description: "Consultation with an endocrinologist for hormonal and metabolic disorders.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/endocrinology-consultation.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "24x7 Pharmacy",
    description: "Round-the-clock in-house pharmacy for prescribed medicines, priced as per MRP.",
    category: "Pharmacy",
    price: 0,
    duration: "Always open",
    imageUrl: "/services/24x7-pharmacy.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Home Medicine Delivery",
    description: "Doorstep delivery of prescribed medicines from the hospital pharmacy.",
    category: "Support",
    price: 100,
    duration: "Same day",
    imageUrl: "/services/home-medicine-delivery.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Equipment Rental (Day)",
    description: "Daily rental of medical equipment such as wheelchairs, oxygen concentrators and hospital beds.",
    category: "Support",
    price: 1000,
    duration: "1 day",
    imageUrl: "/services/equipment-rental-day.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dietician Consultation",
    description: "Personalized diet and nutrition planning with a certified dietician for weight and lifestyle goals.",
    category: "Consultation",
    price: 1000,
    duration: "30 minutes",
    imageUrl: "/services/dietician-consultation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Nutrition Counseling",
    description: "Guided nutrition counseling session to support health goals and manage medical conditions.",
    category: "Consultation",
    price: 1500,
    duration: "30 minutes",
    imageUrl: "/services/nutrition-counseling.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Blood Bank (1 Unit)",
    description: "Provision of one unit of screened blood from the hospital blood bank.",
    category: "Support",
    price: 2500,
    duration: "As needed",
    imageUrl: "/services/blood-bank-1-unit.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Home Sample Collection",
    description: "Convenient at-home collection of samples for laboratory diagnostic tests.",
    category: "Diagnostic",
    price: 200,
    duration: "15 minutes",
    imageUrl: "/services/home-sample-collection.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Telemedicine",
    description: "Remote video or phone consultation with a doctor from the comfort of home.",
    category: "Consultation",
    price: 700,
    duration: "15 minutes",
    imageUrl: "/services/telemedicine.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Insurance Assistance",
    description: "Assistance with insurance paperwork, claims and cashless hospitalization support, free of charge.",
    category: "Support",
    price: 0,
    duration: "Varies",
    imageUrl: "/services/insurance-assistance.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Medical Records Copy",
    description: "Certified copy of medical records, reports and discharge summaries.",
    category: "Support",
    price: 200,
    duration: "Same day",
    imageUrl: "/services/medical-records-copy.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Home Nursing Care (Day)",
    description: "Daily home nursing care service provided by qualified nursing staff.",
    category: "Support",
    price: 2000,
    duration: "1 day",
    imageUrl: "/services/home-nursing-care-day.svg",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Diabetes Management",
    description: "Blood sugar monitoring, diet plan and medication review.",
    category: "Diagnostic",
    price: 900,
    duration: "20-30 minutes",
    imageUrl: "/services/diabetes-management.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Vitamin D Test",
    description: "Checks vitamin D level for bone and immune health.",
    category: "Diagnostic",
    price: 1200,
    duration: "20-30 minutes",
    imageUrl: "/services/vitamin-d-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Vitamin B12 Test",
    description: "Detects vitamin B12 deficiency and related conditions.",
    category: "Diagnostic",
    price: 900,
    duration: "20-30 minutes",
    imageUrl: "/services/vitamin-b12-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Stool Routine Examination",
    description: "Examination for infections, parasites and digestive issues.",
    category: "Diagnostic",
    price: 300,
    duration: "20-30 minutes",
    imageUrl: "/services/stool-routine-examination.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "PSA Test (Prostate Specific Antigen)",
    description: "Blood test for prostate health in men.",
    category: "Diagnostic",
    price: 900,
    duration: "20-30 minutes",
    imageUrl: "/services/psa-test-prostate-specific-antigen.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "HbA1c Test",
    description: "Average blood sugar level for last 2-3 months.",
    category: "Diagnostic",
    price: 700,
    duration: "20-30 minutes",
    imageUrl: "/services/hba1c-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Sweat Chloride Test",
    description: "Diagnostic test for cystic fibrosis and salt loss disorders.",
    category: "Diagnostic",
    price: 2000,
    duration: "20-30 minutes",
    imageUrl: "/services/sweat-chloride-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Allergy Test (IgE Total)",
    description: "Detects allergy causing substances in the body.",
    category: "Diagnostic",
    price: 1500,
    duration: "20-30 minutes",
    imageUrl: "/services/allergy-test-ige-total.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Colonoscopy",
    description: "Examination of colon and large intestine.",
    category: "Diagnostic",
    price: 5500,
    duration: "20-30 minutes",
    imageUrl: "/services/colonoscopy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Bronchoscopy",
    description: "Evaluation of airways and lungs using a bronchoscope.",
    category: "Diagnostic",
    price: 5000,
    duration: "20-30 minutes",
    imageUrl: "/services/bronchoscopy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "ERCP",
    description: "Endoscopic procedure to treat bile duct and pancreatic conditions.",
    category: "Diagnostic",
    price: 7500,
    duration: "20-30 minutes",
    imageUrl: "/services/ercp.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Capsule Endoscopy",
    description: "Pill camera to examine small intestine.",
    category: "Diagnostic",
    price: 6000,
    duration: "20-30 minutes",
    imageUrl: "/services/capsule-endoscopy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Laparoscopy",
    description: "Minimally invasive surgery for diagnostic and therapeutic use.",
    category: "Diagnostic",
    price: 12000,
    duration: "20-30 minutes",
    imageUrl: "/services/laparoscopy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Hysteroscopy",
    description: "Examination of uterus using a hysteroscope.",
    category: "Diagnostic",
    price: 6000,
    duration: "20-30 minutes",
    imageUrl: "/services/hysteroscopy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Cystoscopy",
    description: "Examination of urinary bladder and urethra.",
    category: "Diagnostic",
    price: 4000,
    duration: "20-30 minutes",
    imageUrl: "/services/cystoscopy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Lithotripsy (ESWL)",
    description: "Non-invasive treatment for kidney stones using shock waves.",
    category: "Diagnostic",
    price: 8000,
    duration: "20-30 minutes",
    imageUrl: "/services/lithotripsy-eswl.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Dialysis Session",
    description: "Hemodialysis for patients with kidney failure.",
    category: "Diagnostic",
    price: 2500,
    duration: "30-45 minutes",
    imageUrl: "/services/dialysis-session.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Chemotherapy (Per Session)",
    description: "Cancer treatment using chemotherapy drugs.",
    category: "Oncology",
    price: 6000,
    duration: "30-45 minutes",
    imageUrl: "/services/chemotherapy-per-session.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Radiotherapy (Per Session)",
    description: "High energy radiation treatment for cancer.",
    category: "Oncology",
    price: 5000,
    duration: "30-45 minutes",
    imageUrl: "/services/radiotherapy-per-session.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Immunotherapy (Per Session)",
    description: "Advanced treatment that boosts body's immune system.",
    category: "Oncology",
    price: 25000,
    duration: "30-45 minutes",
    imageUrl: "/services/immunotherapy-per-session.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Bone Marrow Aspiration",
    description: "Collection of bone marrow sample for analysis.",
    category: "Diagnostic",
    price: 4000,
    duration: "20-30 minutes",
    imageUrl: "/services/bone-marrow-aspiration.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Bone Marrow Biopsy",
    description: "Bone marrow tissue biopsy for diagnosis.",
    category: "Diagnostic",
    price: 6000,
    duration: "20-30 minutes",
    imageUrl: "/services/bone-marrow-biopsy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "PET-CT Scan",
    description: "Advanced scan for accurate cancer detection and staging.",
    category: "Diagnostic",
    price: 15000,
    duration: "30-45 minutes",
    imageUrl: "/services/pet-ct-scan.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "SPECT Scan",
    description: "Nuclear imaging test for functional information.",
    category: "Diagnostic",
    price: 9000,
    duration: "30-45 minutes",
    imageUrl: "/services/spect-scan.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "DSA (Digital Subtraction Angiography)",
    description: "Imaging of blood vessels and blood flow.",
    category: "Diagnostic",
    price: 12000,
    duration: "20-30 minutes",
    imageUrl: "/services/dsa-digital-subtraction-angiography.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Angioplasty",
    description: "Procedure to open blocked blood vessels.",
    category: "Surgery",
    price: 120000,
    duration: "1-3 hours",
    imageUrl: "/services/angioplasty.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Angiography",
    description: "X-ray imaging of blood vessels using contrast dye.",
    category: "Diagnostic",
    price: 8000,
    duration: "20-30 minutes",
    imageUrl: "/services/angiography.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Peripheral Angiography",
    description: "Imaging of blood vessels in arms or legs to detect blockages.",
    category: "Diagnostic",
    price: 12000,
    duration: "20-30 minutes",
    imageUrl: "/services/peripheral-angiography.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Aortic Aneurysm Screening",
    description: "Screening test for abdominal aortic aneurysm.",
    category: "Diagnostic",
    price: 6000,
    duration: "20-30 minutes",
    imageUrl: "/services/aortic-aneurysm-screening.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Transesophageal Echocardiography (TEE)",
    description: "Detailed ultrasound of heart using esophagus for better clarity.",
    category: "Diagnostic",
    price: 8000,
    duration: "20-30 minutes",
    imageUrl: "/services/transesophageal-echocardiography-tee.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Electrophysiology Study (EPS)",
    description: "Study of heart's electrical system to diagnose rhythm problems.",
    category: "Diagnostic",
    price: 18000,
    duration: "20-30 minutes",
    imageUrl: "/services/electrophysiology-study-eps.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Pacemaker Implantation",
    description: "Implantation of pacemaker to regulate abnormal heart rhythm.",
    category: "Surgery",
    price: 65000,
    duration: "1-3 hours",
    imageUrl: "/services/pacemaker-implantation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "ICD Implantation",
    description: "Implantable device to prevent sudden cardiac arrest.",
    category: "Surgery",
    price: 150000,
    duration: "1-3 hours",
    imageUrl: "/services/icd-implantation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "EECP Therapy",
    description: "Non-invasive treatment to improve heart function and circulation.",
    category: "Therapy",
    price: 4500,
    duration: "30-45 minutes",
    imageUrl: "/services/eecp-therapy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Pulmonary Rehabilitation",
    description: "Program to improve lung strength and breathing efficiency.",
    category: "Diagnostic",
    price: 3000,
    duration: "20-30 minutes",
    imageUrl: "/services/pulmonary-rehabilitation.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Allergy Skin Prick Test",
    description: "Test to identify allergens causing reactions.",
    category: "Diagnostic",
    price: 1200,
    duration: "20-30 minutes",
    imageUrl: "/services/allergy-skin-prick-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Immunoglobulin E (IgE) Test",
    description: "Blood test to measure IgE level for allergies.",
    category: "Diagnostic",
    price: 1000,
    duration: "20-30 minutes",
    imageUrl: "/services/immunoglobulin-e-ige-test.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Speech Therapy",
    description: "Therapy to improve speech, language and communication.",
    category: "Therapy",
    price: 1000,
    duration: "30-45 minutes",
    imageUrl: "/services/speech-therapy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Occupational Therapy",
    description: "Helps improve daily living skills and motor coordination.",
    category: "Therapy",
    price: 1000,
    duration: "30-45 minutes",
    imageUrl: "/services/occupational-therapy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Retinal Laser Treatment",
    description: "Laser treatment for retinal tears, diabetic retinopathy and other conditions.",
    category: "Diagnostic",
    price: 6000,
    duration: "20-30 minutes",
    imageUrl: "/services/retinal-laser-treatment.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "LASIK Eye Surgery",
    description: "Laser vision correction to reduce or eliminate glasses.",
    category: "Surgery",
    price: 28000,
    duration: "1-3 hours",
    imageUrl: "/services/lasik-eye-surgery.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Adenoidectomy",
    description: "Removal of enlarged adenoids to improve breathing.",
    category: "Surgery",
    price: 8000,
    duration: "1-3 hours",
    imageUrl: "/services/adenoidectomy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Septoplasty",
    description: "Surgery to correct deviated nasal septum.",
    category: "Surgery",
    price: 15000,
    duration: "1-3 hours",
    imageUrl: "/services/septoplasty.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Nasal Polyp Surgery",
    description: "Endoscopic removal of nasal polyps for better breathing.",
    category: "Surgery",
    price: 12000,
    duration: "1-3 hours",
    imageUrl: "/services/nasal-polyp-surgery.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Typhoid Vaccine",
    description: "Vaccination to protect against typhoid fever.",
    category: "Preventive",
    price: 600,
    duration: "10 minutes",
    imageUrl: "/services/typhoid-vaccine.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Hepatitis B Vaccine",
    description: "Vaccine to protect against Hepatitis B infection.",
    category: "Preventive",
    price: 700,
    duration: "10 minutes",
    imageUrl: "/services/hepatitis-b-vaccine.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Flu Vaccine",
    description: "Annual vaccination to protect against influenza (flu).",
    category: "Preventive",
    price: 450,
    duration: "10 minutes",
    imageUrl: "/services/flu-vaccine.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "COVID-19 Vaccination",
    description: "Protection against COVID-19 infection and complications.",
    category: "Preventive",
    price: 800,
    duration: "10 minutes",
    imageUrl: "/services/covid-19-vaccination.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Health Check-up - Basic",
    description: "Basic health screening for early detection of diseases.",
    category: "Preventive",
    price: 1999,
    duration: "20-30 minutes",
    imageUrl: "/services/health-check-up-basic.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Health Check-up - Premium",
    description: "Comprehensive health screening for complete wellness.",
    category: "Preventive",
    price: 4999,
    duration: "20-30 minutes",
    imageUrl: "/services/health-check-up-premium.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Physiotherapy - Back Pain",
    description: "Treatment to relieve lower back pain and improve mobility.",
    category: "Therapy",
    price: 1000,
    duration: "30-45 minutes",
    imageUrl: "/services/physiotherapy-back-pain.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Physiotherapy - Neck Pain",
    description: "Therapy for neck pain and stiffness relief.",
    category: "Therapy",
    price: 1000,
    duration: "30-45 minutes",
    imageUrl: "/services/physiotherapy-neck-pain.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "IV Fluid Therapy",
    description: "Intravenous fluids for hydration and electrolyte balance.",
    category: "Therapy",
    price: 800,
    duration: "30-45 minutes",
    imageUrl: "/services/iv-fluid-therapy.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Vitamin B12 Injection",
    description: "Injection to treat Vitamin B12 deficiency and weakness.",
    category: "Treatment",
    price: 350,
    duration: "10 minutes",
    imageUrl: "/services/vitamin-b12-injection.png",
    availability: "Available",
    rating: 4.6
  },
  {
    name: "Nebulization (Steam Inhalation)",
    description: "Inhalation therapy for asthma, cold, cough and breathing issues.",
    category: "Diagnostic",
    price: 500,
    duration: "20-30 minutes",
    imageUrl: "/services/nebulization-steam-inhalation.png",
    availability: "Available",
    rating: 4.6
  }
];

module.exports = defaultServices;
