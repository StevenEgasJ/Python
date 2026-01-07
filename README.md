# Customer Management Web Service

A full-stack web application for viewing and managing customer data stored in MongoDB. Built with **FastAPI** (backend) and **React** (frontend).

---

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework for building APIs
- **Uvicorn** - ASGI web server that runs the FastAPI app
- **Motor** - Async MongoDB driver for Python
- **Pydantic** - Data validation using Python type hints
- **Python 3.10+** - Programming language

### Frontend
- **React 18** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and dev server for modern web apps
- **Tailwind CSS** - Utility-first CSS framework for styling
- **JavaScript (ES6+)** - Programming language

### Database
- **MongoDB** - NoSQL document database
- Cloud provider: MongoDB Atlas
- Database name: `oop`
- Collection: `Customers`

---

## Architecture Overview

```
┌─────────────────────────┐
│      Browser (User)     │
└────────────┬────────────┘
             │ HTTP
      ┌──────┴────────┐
      ▼               ▼
  ┌────────┐     ┌──────────┐      ┌─────────┐
  │ React  │────▶│ FastAPI  │─────▶│ MongoDB │
  │Frontend│ JSON│ Backend  │      │ Cloud   │
  │        │     │          │      │         │
  └────────┘     └──────────┘      └─────────┘
  Port 5173      Port 8000
```

---

## How It Works

### 1. **Frontend (React)** - What the user sees
   - Runs on http://localhost:5173
   - Shows a table of customers
   - User can search and sort
   - When page loads, fetches data from backend using `fetch()`

### 2. **Backend (FastAPI)** - The API server
   - Runs on http://127.0.0.1:8000
   - Endpoint: `GET /api/customers/` - returns all customers as JSON
   - Connects to MongoDB database
   - Validates data with Pydantic models

### 3. **Database (MongoDB)** - Stores the data
   - Holds customer documents
   - Each customer has: id, fullname, email, type, discount, totalSale

---

## File Structure

```
WorkTutoria/
├── backend/
│   ├── .env                  # Configuration (MongoDB URL)
│   ├── requirements.txt      # Python packages
│   ├── .venv/                # Virtual environment
│   └── app/
│       ├── main.py           # FastAPI app
│       ├── config.py         # Load settings
│       ├── db.py             # MongoDB connection
│       └── routes/
│           └── users.py      # API endpoints
│
├── frontend/
│   ├── package.json          # NPM packages
│   ├── vite.config.js        # Vite settings
│   ├── tailwind.config.cjs    # Tailwind settings
│   └── src/
│       ├── main.jsx          # React root
│       ├── App.jsx           # Main page
│       ├── index.css         # Styles
│       └── components/
│           └── UserTable.jsx # Table component
│
└── README.md                 # This file
```

---

## Setup & Running

### Backend
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate      # Windows
source .venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Key Concepts

### **REST API**
- A way for programs to communicate over HTTP
- Our endpoint: `GET /api/customers/` returns JSON data
- Example response:
  ```json
  [
    {"id": 1, "fullname": "John Doe", "email": "john@example.com", "type": "Regular", "discount": 5, "totalSale": 100}
  ]
  ```

### **Async Programming (Motor)**
- `async def` and `await` allow the server to handle many requests at once
- While waiting for the database, the server can process other requests
- Makes the app faster and more responsive

### **React Components**
- `App.jsx` - Page layout
- `UserTable.jsx` - Table with search/sort features
- Uses `useState` for state, `useEffect` for fetching data, `useMemo` for performance

### **Tailwind CSS**
- CSS utility framework
- Use predefined classes: `bg-blue-500`, `p-4`, `text-lg`, `rounded-lg`
- No custom CSS needed

---

## What Each Technology Does

| Technology | Purpose | Why Use It |
|------------|---------|-----------|
| FastAPI | Build REST API | Easy, fast, built for async |
| React | Build user interface | Reusable components, efficient |
| Vite | Dev server & bundler | Fast hot reload |
| Tailwind | Styling | Quick styling with utilities |
| Motor | MongoDB async driver | Non-blocking database |
| Pydantic | Data validation | Type-safe responses |

---

## Questions Your Teacher Will Ask

**Q: What is an API?**
A: API (Application Programming Interface) = a set of rules for programs to talk to each other. Our backend provides an API so the frontend can get customer data.

**Q: Why async/await?**
A: It lets the server handle many requests at once without getting stuck waiting for the database.

**Q: Why separate frontend and backend?**
A: **Separation of concerns**. Backend handles data. Frontend handles display. They talk via HTTP/JSON.

**Q: What is Tailwind CSS?**
A: A CSS library with utility classes (like `text-lg`, `bg-white`). Faster than writing CSS from scratch.

**Q: How does data flow?**
A: User opens page → React loads → `useEffect` runs → fetches `/api/customers/` → backend queries MongoDB → returns JSON → React displays table.

---

## Environment Config (.env)

```
MONGO_URI=mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/oop?retryWrites=true&w=majority&appName=Cluster0
MONGO_DB=oop
MONGO_COLLECTION=Customers
HOST=127.0.0.1
PORT=8000
```

---

## Troubleshooting

- Backend won't start → Port 8000 in use or MongoDB URI wrong
- Frontend blank → Backend not running or proxy not working
- No data → Check MongoDB credentials and collection name

---

**Made for education** 🎓
