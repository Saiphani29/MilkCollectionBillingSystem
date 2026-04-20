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
    if req.Amount <= 0:
        return {"submit": False, "message": "Payment amount must be greater than zero"}

    # Ensure seller exists
    from models import Seller
    seller = session.exec(select(Seller).where(Seller.usercode == req.usercode)).first()
    if not seller:
        return {"submit": False, "message": "Seller not found in database"}
    
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
