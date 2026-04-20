from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from database import get_session
from models import Admin, Seller
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

class SellerLoginRequest(BaseModel):
    usercode: str
    password: str

@router.post("/admin-login")
def admin_login(req: LoginRequest, session: Session = Depends(get_session)):
    admin = session.exec(select(Admin).where(Admin.username == req.username, Admin.password == req.password)).first()
    if not admin:
        return {"submit": False, "message": "Invalid credentials"}
    return {"submit": True, "data": admin.name}

@router.post("/seller-login")
def seller_login(req: SellerLoginRequest, session: Session = Depends(get_session)):
    seller = session.exec(select(Seller).where(Seller.usercode == req.usercode, Seller.password == req.password)).first()
    if not seller:
        return {"submit": False, "message": "Invalid usercode or password"}
    return {
        "submit": True, 
        "data": [seller], 
        "name": seller.name, 
        "usercode": seller.usercode
    }
