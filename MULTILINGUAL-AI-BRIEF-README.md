# Multilingual AI Problem Brief

The Doctor Appointments AI Problem Brief now has three tabs:

- English
- Telugu (తెలుగు)
- Hindi (हिन्दी)

Each new doctor appointment asks Groq to create all three versions in one request and saves them in MongoDB. Each tab has its own Listen button. Browser speech synthesis uses en-IN, te-IN, or hi-IN depending on the selected tab.

## Existing appointments
Older MongoDB appointments only contain the English field. Open the appointment and click **Generate English + Telugu + Hindi** once. The backend regenerates and stores all three language versions.

## Run
1. Put your Groq key in `backend/.env` as `GROQ_API_KEY=...`.
2. Backend: `cd backend`, `npm install`, `npm start` (or your existing backend command).
3. Frontend: `cd frontend`, `npm install`, `npm run dev`.
4. Open Appointments -> Doctors Appointments.

## Voice note
Voice playback uses the browser/Windows speech engine. English is normally available by default. For native Telugu/Hindi pronunciation, the corresponding Telugu/Hindi speech voice must be installed/enabled in the operating system/browser.
