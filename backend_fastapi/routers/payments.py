from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, func
from database import get_session
from models import Payment, MilkCollection
from pydantic import BaseModel

router = APIRouter()

class PaymentRequest(BaseModel):
    usercode: str
    date: str
    Amount: float
    username: str

@router.post("/add")
def add_payment(req: PaymentRequest, session: Session = Depends(get_session)):
    # Original logic checks if user exists in milkcollection
    exists = session.exec(select(MilkCollection).where(MilkCollection.usercode == req.usercode, MilkCollection.username == req.username)).first()
    if not exists:
        return {"submit": False, "message": "User not found in collection records"}
    
    payment = Payment(
        usercode=req.usercode,
        date=req.date,
        amount=req.Amount,
        username=req.username
    )
    session.add(payment)
    session.commit()
    return {"submit": True}

@router.get("/user/{usercode}")
def get_user_payments(usercode: str, session: Session = Depends(get_session)):
    payments = session.exec(select(Payment).where(Payment.usercode == usercode)).all()
    if not payments:
        return {"submit": False, "message": "No data found"}
    return {"submit": True, "paydetails": payments}

@router.post("/search")
def search_payments(req: dict, session: Session = Depends(get_session)):
    usercode = req.get("searchvalue")
    username = req.get("username") # Need to pass this from frontend now
    payments = session.exec(select(Payment).where(Payment.usercode == usercode, Payment.username == username)).all()
    if not payments:
        return {"submit": False, "message": "No data found"}
    return {"submit": True, "resultset": payments}
