const Appointment = require('../models/Appointment');
const { generateMultilingualBrief } = require('../utils/aiBrief');

async function generateAIProblemBrief(problem, age, gender) {
  const cleanProblem = String(problem || "").trim();
  if (!cleanProblem) return { english: "", telugu: "", hindi: "" };

  const systemPrompt = `Create a clear, cautious patient-problem brief for a doctor's appointment card. Do not diagnose. Explain the reported problem, useful details to tell the doctor, and relevant urgent red flags. Keep each language to about 4-6 clear sentences. English must be natural English, Telugu must be natural Telugu script, and Hindi must be natural Hindi (Devanagari). In every language end by saying that the AI brief is informational and is not a diagnosis.`;
  const prompt = `Patient age: ${age || "not provided"}; gender: ${gender || "not provided"}; problem/symptoms: ${cleanProblem}`;

  return generateMultilingualBrief(systemPrompt, prompt);
}

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createAppointment = async (req, res) => {
  let aiBrief = "";
  let aiBriefTelugu = "";
  let aiBriefHindi = "";
  let aiBriefStatus = "ready";
  try {
    const briefs = await generateAIProblemBrief(req.body.problem, req.body.age, req.body.gender);
    aiBrief = briefs.english;
    aiBriefTelugu = briefs.telugu;
    aiBriefHindi = briefs.hindi;
  } catch (error) {
    aiBriefStatus = "failed";
    aiBrief = "AI brief could not be generated. Check the backend Groq configuration and try again.";
  }

  const appointment = new Appointment({
    appointmentid: `APT_${Date.now()}`,
    patientname: req.body.patientname,
    problem: req.body.problem,
    aiBrief,
    aiBriefTelugu: aiBriefTelugu || "",
    aiBriefHindi: aiBriefHindi || "",
    aiBriefStatus,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    doctorname: req.body.doctorname,
    specialization: req.body.specialization,
    appointmentdate: req.body.appointmentdate,
    appointmenttime: req.body.appointmenttime,
    notes: req.body.notes || "",
  });
  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.regenerateAIProblemBrief = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    if (!appointment.problem) return res.status(400).json({ error: "This appointment has no patient problem to summarize." });

    const briefs = await generateAIProblemBrief(appointment.problem, appointment.age, appointment.gender);
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

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearAllAppointments = async (req, res) => {
  try {
    const result = await Appointment.deleteMany({});
    res.json({ message: 'All appointments cleared', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
