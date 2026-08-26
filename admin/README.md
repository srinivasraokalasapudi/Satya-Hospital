# Satya-Hospitals — Admin Dashboard

A standalone React (Vite) admin app for managing doctors, services,
appointments, and payments. Talks to the same Express/MongoDB backend used
by `../backend`.

## Setup

```bash
cd admin
npm install
cp .env.example .env   # edit if your backend runs somewhere other than :5000
npm run dev
```

Runs on **http://localhost:5174** by default (the backend's CORS config in
`backend/server.js` already allows this origin via `ADMIN_URL`).

## Login

Default credentials (also the fallback baked into `frontend/`'s own `/admin`
login, so both stay in sync):

```
Email:    satya@gmail.com
Password: Satya@123569
```

Override via `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` in `admin/.env`.
This is a simple client-side check (see `GOOGLE-AUTH-ADMIN-SETUP.md` at the
project root) — fine for a prototype, but move it to a real backend-verified
login with hashed passwords before a public launch.

## What's included

- **Dashboard** — live counts (doctors, services, appointments, service
  appointments) and total payments collected, plus recent appointments.
- **Doctors** — add, inline-edit (specialization/phone/fee/availability),
  and delete doctors.
- **Appointments** — search/filter by status, change status
  (pending → confirmed → completed / cancelled), view the AI problem brief,
  delete.
- **Services** — add, inline-edit (category/duration/price/availability),
  and delete services.
- **Service Appointments** — same management flow as Appointments, for
  service bookings.
- **Payments** — doctor vs. service payments, with a "Mark Received" action
  for cash ("Pay at Clinic") bookings that are still pending.

## Notes

- All fields map 1:1 to the real Mongoose schemas in `backend/models/`
  (`Doctor`, `Service`, `Appointment`, `ServiceAppointment`, `Payment`) — no
  invented fields (no image upload, no per-doctor password/schedule; those
  don't exist in the backend).
- Images are set via a plain URL field (`imageUrl`), since the backend has
  no file-upload endpoint.
- `node_modules` isn't included — run `npm install` before `npm run dev`.
