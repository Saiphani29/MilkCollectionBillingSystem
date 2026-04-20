import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routers import auth, sellers, milk, payments

app = FastAPI(title="Milk Collection Billing System API")

# Configure allowed origins for production
# In Vercel/Render, set ALLOWED_ORIGINS=https://your-app.vercel.app
origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to Milk Collection Billing System API"}

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(sellers.router, prefix="/sellers", tags=["Sellers"])
app.include_router(milk.router, prefix="/milk", tags=["Milk Collection"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
