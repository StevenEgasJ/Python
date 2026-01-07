from motor.motor_asyncio import AsyncIOMotorClient
from .config import MONGO_URI, MONGO_DB
import traceback

client: AsyncIOMotorClient | None = None
db = None

async def connect_to_mongo():
    global client, db
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client[MONGO_DB]
        print(f"Connected to MongoDB database: {MONGO_DB}")
    except Exception as e:
        print("Failed to connect to MongoDB:")
        traceback.print_exc()

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("Closed MongoDB connection")
