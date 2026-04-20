# Milk Collection Billing System

A full-stack application for managing milk collection, seller registrations, and billing.

## 🏗️ Architecture
- **Backend**: FastAPI (Python) with SQLModel & PostgreSQL/SQLite.
- **Frontend**: React (TypeScript) with Vite and Tailwind/Vanilla CSS.

---

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)
Open a terminal in the `backend_fastapi` directory.

```bash
cd backend_fastapi

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```
The backend will be running at `http://127.0.0.1:8000`. You can view the API documentation at `http://127.0.0.1:8000/docs`.

### 2. Frontend Setup (React)
Open a **new** terminal in the `frontend_react` directory.

```bash
cd frontend_react

# Install dependencies
npm install

# Run the development server
npm run dev
```
The frontend will be running at `http://localhost:5173`.

---

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `backend_fastapi` folder (if not already present):
```env
DATABASE_URL=sqlite:///./database.db
# Or for Neon/PostgreSQL:
# DATABASE_URL=postgresql://user:password@host/dbname
```

---

## 🛠️ Features
- **Admin Dashboard**: Overview of collections and sellers.
- **Seller Management**: Register and track sellers.
- **Milk Collection**: Record daily milk entries (Fat, SNF, Quantity).
- **Bill Generation**: Calculate payments based on rate charts.
- **Rate Chart**: Define pricing based on milk quality.
