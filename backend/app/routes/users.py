from fastapi import APIRouter, HTTPException, Request
from typing import List
from ..config import MONGO_COLLECTION
from pydantic import BaseModel

router = APIRouter(prefix="/api/customers", tags=["customers"])

class CustomerOut(BaseModel):
    id: str | int | None = None
    fullname: str | None = None
    email: str | None = None
    type: str | None = None
    discount: float | None = None
    totalSale: float | None = None


@router.get("/", response_model=List[CustomerOut])
async def list_customers(request: Request):
    db = request.app.state.db
    if db is None:
        raise HTTPException(status_code=500, detail="DB not initialized")
    cursor = db[MONGO_COLLECTION].find()
    docs = await cursor.to_list(length=1000)
    users = []
    for d in docs:
        users.append(CustomerOut(
            id=d.get("id") if d.get("id") is not None else str(d.get("_id")),
            fullname=d.get("fullName") or d.get("fullname") or d.get("name") or d.get("full_name"),
            email=d.get("email"),
            type=d.get("type"),
            discount=d.get("discount"),
            totalSale=d.get("totalSale")
        ))
    return users
