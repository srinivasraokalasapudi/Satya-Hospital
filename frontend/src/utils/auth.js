import { useState, useEffect } from 'react';

// --- Simple admin login (kept client-side; swap for a real backend-verified login before production) ---
const ADMIN_SESSION_KEY = 'satya_hospitals_admin_session';
export function getAdminSession() { try { return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY)) } catch { return null } }
export function setAdminSession(a) { localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(a)); window.dispatchEvent(new StorageEvent('storage', { key: ADMIN_SESSION_KEY })) }
export function clearAdminSession() { localStorage.removeItem(ADMIN_SESSION_KEY); window.dispatchEvent(new StorageEvent('storage', { key: ADMIN_SESSION_KEY })) }
export function useAdminSession() {
  const [a, setA] = useState(getAdminSession());
  useEffect(() => { const f = () => setA(getAdminSession()); addEventListener('storage', f); return () => removeEventListener('storage', f) }, []);
  return a;
}
export function checkAdminCredentials(email, password) {
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'satya@gmail.com').trim().toLowerCase();
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Satya@123569';
  return email.trim().toLowerCase() === adminEmail && password === adminPassword;
}

// --- Simple patient sign in / sign up (kept client-side; swap for a real backend + hashed passwords before production) ---
const USERS_KEY = 'satya_hospitals_patients';
const SESSION_KEY = 'satya_hospitals_patient_session';
export function getUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] } catch { return [] } }
export function saveUsers(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)) }
export function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null } }
export function setSession(u) { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); window.dispatchEvent(new StorageEvent('storage', { key: SESSION_KEY })) }
export function clearSession() { localStorage.removeItem(SESSION_KEY); window.dispatchEvent(new StorageEvent('storage', { key: SESSION_KEY })) }
export function usePatientSession() {
  const [u, setU] = useState(getSession());
  useEffect(() => { const f = () => setU(getSession()); addEventListener('storage', f); return () => removeEventListener('storage', f) }, []);
  return u;
}
