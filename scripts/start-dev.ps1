# Start both backend and frontend for development (Windows PowerShell)
# Run from repository root

Write-Host "Starting backend (uvicorn) in new window..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd backend; .\\.venv\\Scripts\\Activate; uvicorn app.main:app --reload --port 8000"

Start-Process powershell -ArgumentList "-NoExit","-Command","cd frontend; npm run dev"
