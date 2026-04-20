from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import date as date_type

class Admin(SQLModel, table=True):
    username: str = Field(primary_key=True)
    password: str
    name: str

class Seller(SQLModel, table=True):
    __tablename__ = "sellerregistration"
    usercode: str = Field(primary_key=True)
    name: str
    email: str
    username: str
    password: str
    phoneno: str
    street: str
    village: str
    mandal: str
    District: str
    state: str
    zipcode: str
    gender: str

class MilkCollection(SQLModel, table=True):
    __tablename__ = "milkcollection"
    id: Optional[int] = Field(default=None, primary_key=True)
    usercode: str
    date: str  # Original uses string date
    timings: str
    milktype: str
    fat: float
    snf: float
    quantity: float
    price: float
    Amount: float
    username: str

class Payment(SQLModel, table=True):
    __tablename__ = "payments"
    id: Optional[int] = Field(default=None, primary_key=True)
    usercode: str
    date: str
    amount: float
    username: str

class RateChart(SQLModel, table=True):
    __tablename__ = "ratechart"
    id: Optional[int] = Field(default=None, primary_key=True)
    fat: float
    r870: float = Field(alias="8.70")
    r880: float = Field(alias="8.80")
    r890: float = Field(alias="8.90")
    r900: float = Field(alias="9.00")

class Enquiry(SQLModel, table=True):
    __tablename__ = "enquired"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: str
    message: str
