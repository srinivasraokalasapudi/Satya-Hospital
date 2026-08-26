const ServiceAppointment = require('../models/ServiceAppointment');
const { generateMultilingualBrief } = require('../utils/aiBrief');

async function generateAIServiceBrief(servicename, category, age, gender) {
  const cleanService = String(servicename || "").trim();
  if (!cleanService) return { english: "", telugu: "", hindi: "" };

  const systemPrompt = `Create a clear, friendly brief for a patient's booked diagnostic/medical service appointment card. Explain what the service is, what it is used for, what the patient should expect during the visit, and any simple, general preparation tips relevant to this specific service (for example fasting, wearing loose clothing, bringing prior reports or a valid ID, arriving early) - only mention tips that genuinely apply to this service. Do not diagnose or give medical advice beyond general preparation. Keep each language to about 4-6 clear sentences. English must be natural English, Telugu must be natural Telugu script, and Hindi must be natural Hindi (Devanagari). In every language end by saying that the brief is informational and not medical advice.`;
  const prompt = `Service: ${cleanService}; category: ${category || "Diagnostic"}; patient age: ${age || "not provided"}; gender: ${gender || "not provided"}`;

  return generateMultilingualBrief(systemPrompt, prompt);
}

exports.getAllServiceAppointments = async (req, res) => {
  try {
    const appointments = await ServiceAppointment.find().sort({ appointmentdate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getServiceAppointmentById = async (req, res) => {
  try {
    const appointment = await ServiceAppointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createServiceAppointment = async (req, res) => {
  let aiBrief = "";
  let aiBriefTelugu = "";
  let aiBriefHindi = "";
  let aiBriefStatus = "ready";
  try {
    const briefs = await generateAIServiceBrief(req.body.servicename, req.body.category, req.body.age, req.body.gender);
    aiBrief = briefs.english;
    aiBriefTelugu = briefs.telugu;
    aiBriefHindi = briefs.hindi;
  } catch (error) {
    aiBriefStatus = "failed";
    aiBrief = "AI brief could not be generated. Check the backend Groq configuration and try again.";
  }

  const appointment = new ServiceAppointment({
    serviceappointmentid: `SAPT_${Date.now()}`,
    patientname: req.body.patientname,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    servicename: req.body.servicename,
    category: req.body.category,
    appointmentdate: req.body.appointmentdate,
    appointmenttime: req.body.appointmenttime,
    price: req.body.price || 0,
    notes: req.body.notes || "",
    aiBrief,
    aiBriefTelugu: aiBriefTelugu || "",
    aiBriefHindi: aiBriefHindi || "",
    aiBriefStatus,
  });
  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.regenerateAIServiceBrief = async (req, res) => {
  try {
    const appointment = await ServiceAppointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Service appointment not found" });
    if (!appointment.servicename) return res.status(400).json({ error: "This appointment has no service name to summarize." });

    const briefs = await generateAIServiceBrief(appointment.servicename, appointment.category, appointment.age, appointment.gender);
    appointment.aiBrief = briefs.english;
    appointment.aiBriefTelugu = briefs.telugu;
    appointment.aiBriefHindi = briefs.hindi;
    appointment.aiBriefStatus = "ready";
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(502).json({
      error: "AI brief generation failed",
      details: error.message,
      code: error.code || "GROQ_REQUEST_FAILED"
    });
  }
};
exports.updateServiceAppointment = async (req, res) => {
  try {
    const appointment = await ServiceAppointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ error: 'Not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteServiceAppointment = async (req, res) => {
  try {
    const appointment = await ServiceAppointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearAllServiceAppointments = async (req,res) => { try { const result=await ServiceAppointment.deleteMany({}); res.json({message:'All service appointments cleared',deletedCount:result.deletedCount}); } catch(error){ res.status(500).json({error:error.message}); } };
