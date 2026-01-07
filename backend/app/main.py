from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .routes import users
from .db import connect_to_mongo, close_mongo_connection
from .config import HOST, PORT

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await connect_to_mongo()
    from . import db as db_module
    app.state.db = db_module.db
    print(f"App startup: db={app.state.db}")
    yield
    # shutdown
    await close_mongo_connection()
    print("App shutdown")

app = FastAPI(title="Users Service", lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)


@app.get("/")
async def root():
    return {"status": "ok", "service": "users"}


@app.get("/api/")
async def api_root(request: Request):
    """Convenience endpoint: returns the customers JSON so you can open /api/ in the browser."""
    return await users.list_customers(request)


if __name__ == "__main__":

    import uvicorn

    uvicorn.run(app, host=HOST, port=PORT)
