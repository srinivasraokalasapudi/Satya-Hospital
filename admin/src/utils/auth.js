import { useEffect, useState } from "react";

// Simple client-side admin login, matching the same convention used by the
// patient-facing frontend's /admin login (frontend/src/utils/auth.js).
// Swap this for a real backend-verified login before production.
const ADMIN_SESSION_KEY = "satya_hospitals_admin_session";

export function getAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
  } catch {
    return null;
  }
}

export function setAdminSession(admin) {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin));
  window.dispatchEvent(new StorageEvent("storage", { key: ADMIN_SESSION_KEY }));
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.dispatchEvent(new StorageEvent("storage", { key: ADMIN_SESSION_KEY }));
}

export function useAdminSession() {
  const [admin, setAdmin] = useState(getAdminSession());
  useEffect(() => {
    const f = () => setAdmin(getAdminSession());
    addEventListener("storage", f);
    return () => removeEventListener("storage", f);
  }, []);
  return admin;
}

export function checkAdminCredentials(email, password) {
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || "satya@gmail.com")
    .trim()
    .toLowerCase();
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "Satya@123569";
  return (
    (email || "").trim().toLowerCase() === adminEmail && password === adminPassword
  );
}
