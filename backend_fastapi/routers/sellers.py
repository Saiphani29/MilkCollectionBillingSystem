from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Seller
from typing import List

router = APIRouter()

@router.post("/register")
def register_seller(seller: Seller, session: Session = Depends(get_session)):
    try:
        session.add(seller)
        session.commit()
        return {"submit": True}
    except Exception as e:
        return {"submit": False, "message": str(e)}

@router.get("/list", response_model=List[Seller])
def list_sellers(session: Session = Depends(get_session)):
    sellers = session.exec(select(Seller)).all()
    return sellers

@router.get("/{usercode}")
def get_seller(usercode: str, session: Session = Depends(get_session)):
    seller = session.exec(select(Seller).where(Seller.usercode == usercode)).first()
    if not seller:
        return {"success": False, "message": "no data found!!!.."}
    return {"data": [seller]}

@router.delete("/delete/{usercode}")
def delete_seller(usercode: str, session: Session = Depends(get_session)):
    seller = session.exec(select(Seller).where(Seller.usercode == usercode)).first()
    if not seller:
        return {"submit": False, "message": "User not found"}
    session.delete(seller)
    session.commit()
    return {"submit": True, "message": "deleted successfull"}

@router.put("/update/{usercode}")
def update_seller(usercode: str, updated_seller: Seller, session: Session = Depends(get_session)):
    db_seller = session.exec(select(Seller).where(Seller.usercode == usercode)).first()
    if not db_seller:
        return {"submit": False, "message": "User not found"}
    
    seller_data = updated_seller.dict(exclude_unset=True)
    for key, value in seller_data.items():
        setattr(db_seller, key, value)
    
    session.add(db_seller)
    session.commit()
    session.refresh(db_seller)
    return {"submit": True}
