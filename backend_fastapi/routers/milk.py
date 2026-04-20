from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select, func
from database import get_session
from models import MilkCollection, RateChart, Seller
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class CollectionRequest(BaseModel):
    usercode: str
    date: str
    timings: str
    milktype: str
    fat: float
    snf: float
    quantity: float
    price: float
    Amount: float
    username: str

@router.post("/add")
def add_collection(req: CollectionRequest, session: Session = Depends(get_session)):
    collection = MilkCollection(**req.dict())
    session.add(collection)
    session.commit()
    return {"submit": True}

@router.get("/list", response_model=List[MilkCollection])
def list_collections(session: Session = Depends(get_session)):
    return session.exec(select(MilkCollection)).all()

@router.post("/search")
def search_collections(req: dict, session: Session = Depends(get_session)):
    usercode = req.get("searchvalue")
    username = req.get("username")
    collections = session.exec(select(MilkCollection).where(MilkCollection.usercode == usercode, MilkCollection.username == username)).all()
    if not collections:
        return {"submit": False, "message": "No data found"}
    return {"submit": True, "resultset": collections}

@router.get("/summary/{usercode}")
def get_user_summary(usercode: str, session: Session = Depends(get_session)):
    # Total quantity and amount for a user
    summary = session.exec(
        select(func.sum(MilkCollection.quantity), func.sum(MilkCollection.Amount))
        .where(MilkCollection.usercode == usercode)
    ).first()
    return {"quantity": summary[0] or 0, "amount": summary[1] or 0}
