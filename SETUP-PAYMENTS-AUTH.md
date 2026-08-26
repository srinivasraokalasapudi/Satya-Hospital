# Satya-Hospitals payment + Google sign-in setup

## Backend (`backend/.env`)
Set `MONGO_URI`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET`. Use Razorpay test keys while testing.

## Frontend (`frontend/.env`)
Set `VITE_API_URL=http://localhost:5000` and `VITE_CLERK_PUBLISHABLE_KEY` from your Clerk dashboard. Enable Google as a social connection in Clerk.

## Run
Backend: `cd backend && npm install && npm run dev`
Frontend: `cd frontend && npm install && npm run dev`

Doctor booking supports Online Payment (Razorpay) and Pay at Clinic. Successful Razorpay verification marks the appointment paid and confirmed. The page also includes smooth scrolling and the floating scroll-to-top control.
