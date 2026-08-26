# Satya-Hospitals Merged Final

This project merges the richer Satya-Hospitals Site UI/admin/doctor-dashboard project with the complete Express/MongoDB backend.

## Structure

- The main frontend/admin files come from `MediCare-Site-main(2)`.
- `backend/` comes from `MediCare-Complete-Final` because it contains the runnable Express server, routes, models, controllers, and payment support.
- `backend-site-original/` preserves the original partial backend from the richer site project so its controllers/models can be referenced while integrating any remaining UI features.

## Important

1. Do **not** commit `.env` files or `node_modules` to GitHub.
2. Install dependencies separately in each folder containing `package.json`.
3. Review frontend/admin API base URLs and make sure they point to the merged backend.
4. Configure MongoDB and payment credentials locally in the backend environment file.

## Typical local setup

### Backend
```bash
cd backend
npm install
npm start
```

If the backend package uses a development script instead:
```bash
npm run dev
```

### Frontend / Admin
Open the relevant folder containing its `package.json`, then:
```bash
npm install
npm run dev
```

If it is a Create React App project, use:
```bash
npm start
```

## Security

Before publishing to GitHub, add `.env` and `node_modules/` to `.gitignore`.
