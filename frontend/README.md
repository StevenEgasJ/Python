# Frontend (Vite + React + Tailwind)

1. Install dependencies

   npm install

2. Run dev server

   npm run dev

3. Notes

- Vite is configured to proxy `/api` to `http://127.0.0.1:8000` so the frontend can call `/api/users/` during development.
- In production, set the environment variable `VITE_API_URL` to the backend base URL (e.g. `https://api.example.com`) so the app fetches from the correct server.
- Tailwind is already configured; edit `src/index.css` to customize tokens.
