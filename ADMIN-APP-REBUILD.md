# Standalone `admin/` App — Rebuilt (this update)

`ADMIN-DASHBOARD-CHANGES.md` (previous update) noted that the standalone
`admin/` folder wasn't runnable — no `package.json`/`App.jsx`/`main.jsx`/
`index.html`, and its component files were incomplete fragments (logic and
JSX snippets with no imports/exports wrapping them).

This update rebuilds `admin/` from scratch into its own working Vite +
React app, independent from `frontend/`'s built-in `/admin` dashboard
(that one is untouched and still works exactly as before).

## What was added

- `package.json`, `vite.config.js` (dev server on port **5174**, matching
  `backend/server.js`'s `ADMIN_URL` CORS entry), `index.html`, `main.jsx`,
  `index.css`, `.env.example`, `.gitignore`, `eslint.config.js`
- `src/utils/api.js` — axios instance, base URL from `VITE_API_URL`
- `src/utils/auth.js` — client-side admin login/session, same convention
  and default credentials as `frontend/src/utils/auth.js`
- `src/utils/format.js` — shared currency/date/status-badge helpers
- Rebuilt page components (all now complete, working React components):
  `Login`, `Navbar`, `App` (routing + route protection), `DashboardPage`,
  `AddPage` + `ListPage` (doctors), `AppointmentsPage`, `AddService` +
  `ListServicePage` (services), `ServiceAppointmentsPage`,
  `ServiceDashboard` (repurposed as the Payments page)

## Why the fields differ from the old fragments

The old `AddPage.jsx` fragment referenced fields like `password`,
`schedule`, `success`, and `patients` for doctors, and expected an image
*file* upload. None of that exists in the real backend: `backend/models/Doctor.js`
has no such fields, and no controller/route in `backend/` handles
`multipart/form-data` or file uploads. The rebuilt forms only use fields
that actually exist in `backend/models/*.js` and are actually read by
`backend/controllers/*.js`, so every add/edit/delete action in this admin
app works against the real API instead of silently failing.

## Verified

- `npm install` and `npm run build` succeed with no errors.
- Dev server boots and serves all routes.
- Every API call (add/edit/delete doctor, add/edit/delete service, update
  appointment status, update service-appointment status, mark cash payment
  collected) was exercised against a mock server that mirrors the real
  controllers' request/response shapes exactly — all passed.
- Full end-to-end testing against a live MongoDB Atlas instance wasn't
  possible in this environment (no outbound network access to MongoDB), so
  do a final check with `cd admin && npm install && npm run dev` alongside
  a running `cd backend && npm install && npm start` before deploying.

## Run

```bash
cd backend && npm install && npm start      # http://localhost:5000
cd admin && npm install && npm run dev      # http://localhost:5174
cd frontend && npm install && npm run dev   # http://localhost:5173
```

Admin login: `satya@gmail.com` / `Satya@123569` (see `admin/README.md`).
