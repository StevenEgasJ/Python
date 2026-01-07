# Backend (FastAPI)

1. Create a virtualenv and install:

   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt

2. Copy or edit `.env` to set `MONGO_URI`, `MONGO_DB` (e.g., `oop`), and `MONGO_COLLECTION` (default: `Customers`).

3. Run:

   uvicorn app.main:app --reload --port 8000

API endpoints:
- GET /api/users/ — returns list of users
- GET / — health check
