# Admin Dashboard Update — What Changed

Your actual working admin app lives inside `frontend/src/App.jsx` (the
`AdminDashboard` function), reachable at `/admin` after `cd frontend && npm
install && npm run dev`. The standalone `admin/` folder in this project has
no `package.json`, `App.jsx`, `main.jsx` or `index.html`, and its component
files are incomplete code fragments (missing imports/exports) — it isn't a
runnable app, so it was left untouched. Everything below was built into the
working `frontend` app instead.

## 1. Admin header (Home / Doctors / Payments)
`/admin` now has its own header (same look as the public site header: logo,
purple pill "Sign Out" button, "Hi, {admin}") with three tabs:
- **Home** → `/admin` — overview stats, recent appointments, doctors list
- **Doctors** → `/admin/doctors`
- **Payments** → `/admin/payments`

## 2. Doctors page
For every doctor you get a card showing **Booked / Pending / Completed**
counts. Click a card to expand the list of that doctor's appointments —
patient name, age/gender, phone, date/time, and the reported problem — each
with a **Mark Completed** button. Clicking it calls the existing
`PUT /api/appointments/:id` endpoint, so the status updates in the admin
Doctors page and on the patient's own `/appointments` page the next time
either page loads data (there's no live push/websocket in this app, so it's
"automatic" on refresh, not instantaneous across open tabs).

## 3. Payments page
Two sections, **Doctors Payment** and **Services Payment**, each listing
patient name, doctor/problem or service, amount, payment method (Online /
Cash), status, and date.

These are populated automatically:
- **Online**: unchanged — a `Payment` row is created when Razorpay checkout
  starts and marked `completed` when verified.
- **Cash ("Confirm Booking" / "Pay at Clinic")**: previously nothing was
  recorded for cash bookings. I added a new endpoint,
  `POST /api/payments/record-cash`, which the patient booking flow now
  calls automatically whenever "Pay at Clinic" is chosen, so cash bookings
  now show up here too (status `pending` until collected). There's a **Mark
  Received** button for cash rows to flip them to `completed`
  (`POST /api/payments/mark-collected/:paymentId`).

## 4. Default admin login
- Email: `satya@gmail.com`
- Password: `Satya@123569`

Set in `frontend/src/utils/auth.js` as the fallback, and reflected in
`frontend/.env.example`. If you have (or create) a `frontend/.env` with
`VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD`, that will override these
defaults — remove or update those lines if you want the new credentials to
take effect.

## Backend changes
- `backend/models/Payment.js`: `razorpayOrderId` is no longer required, so
  cash payments (which have no Razorpay order) can be saved.
- `backend/controllers/paymentController.js`: added `recordCashPayment` and
  `markCashCollected`; `createOrder` now tags online payments with
  `paymentMethod: 'online'`.
- `backend/routes/paymentRoutes.js`: added
  `POST /api/payments/record-cash` and `POST /api/payments/mark-collected/:paymentId`.

## To run
```
cd backend && npm install && npm start
cd frontend && npm install && npm run dev
```
`node_modules` weren't included in this package, so both `npm install`
steps are required.
