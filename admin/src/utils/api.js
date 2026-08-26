import axios from "axios";

// Same convention as the patient-facing frontend: VITE_API_URL, falling
// back to the backend's default local port.
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

export default api;
