# Patient & Admin Login Setup

Clerk/Google sign-in has been removed. Both the patient and admin login are now simple email/password logins handled entirely in the frontend.

## 1. Patient login
- Patients create an account at `/signup` (name, email, phone, age, gender, password).
- Accounts are stored in the browser's `localStorage` (key `satya_hospitals_patients`) — this is fine for a prototype but should be replaced with a real backend + hashed passwords before production.
- Signing in at `/login` checks the entered email/password against the stored accounts and, on success, redirects to the home page.

## 2. Admin login
1. Create `frontend/.env` from `frontend/.env.example`.
2. Set the admin credentials:

   VITE_ADMIN_EMAIL=admin@satya-hospitals.com
   VITE_ADMIN_PASSWORD=your-strong-password

3. Restart the Vite frontend after changing `.env`.
4. Visit `/admin` and sign in with those credentials to reach the dashboard (doctor, appointment, service and payment totals, recent appointments, appointment status management, and doctor management).

## 3. Run
Backend:
   cd backend
   npm install
   npm start

Frontend:
   cd frontend
   npm install
   npm run dev

## Security note
Both login flows are currently client-side only, for demo purposes. Before a public production launch, move authentication (and the admin credential check) to the backend, hash passwords, and issue real session tokens.
