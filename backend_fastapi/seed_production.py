import os
import random
from datetime import datetime, timedelta
from sqlmodel import Session, create_engine, select
from dotenv import load_dotenv
from models import Admin, Seller, MilkCollection, Payment, RateChart

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

def seed_production_data():
    print("🚀 Starting Production Data Seeding...")
    with Session(engine) as session:
        # 1. Admin
        admin = session.exec(select(Admin).where(Admin.username == "admin")).first()
        if not admin:
            admin = Admin(username="admin", password="password123", name="System Admin")
            session.add(admin)
            print("✅ Admin created.")

        # 2. Sellers (15 Total)
        villages = ["Milkpur", "Green Valley", "Hilltop", "Riverbank", "Sunny Farm"]
        seller_names = [
            "Rajesh Kumar", "Sunita Devi", "Amit Singh", "Priya Sharma", "Vijay Varma",
            "Anil Kapur", "Meena Kumari", "Suresh Raina", "Kavita Rao", "Mohan Lal",
            "Sita Ram", "Arjun Das", "Rani Singh", "Balu Mama", "Chitra Lekha"
        ]
        
        sellers = []
        existing_sellers = session.exec(select(Seller.usercode)).all()
        for i, name in enumerate(seller_names):
            usercode = f"SL-{100 + i}"
            if usercode not in existing_sellers:
                new_seller = Seller(
                    usercode=usercode,
                    name=name,
                    email=f"{name.lower().replace(' ', '.')}@example.com",
                    username=usercode.lower(),
                    password="password123",
                    phoneno=f"98765{random.randint(10000, 99999)}",
                    street="Main St",
                    village=random.choice(villages),
                    mandal="Dairy Mandal",
                    District="Milk District",
                    state="State",
                    zipcode="500001",
                    gender="Male" if i % 2 == 0 else "Female"
                )
                session.add(new_seller)
                sellers.append(new_seller)
                print(f"✅ Seller {usercode} added.")
        
        session.commit()
        # Fetch all sellers including existing ones
        all_sellers = session.exec(select(Seller)).all()

        # 3. Rate Chart (Seed if empty)
        if not session.exec(select(RateChart)).first():
            for f in [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]:
                rc = RateChart(fat=f, r870=f*8.0, r880=f*8.1, r890=f*8.2, r900=f*8.3)
                session.add(rc)
            print("✅ Rate Chart seeded.")

        # 4. Milk Collections (150+ records over 30 days)
        print("📊 Adding more Milk Collection records...")
        for day in range(15): # Add for 15 more days
            date_str = (datetime.now() - timedelta(days=day)).strftime("%Y-%m-%d")
            daily_sellers = random.sample(all_sellers, k=random.randint(8, 12))
            for seller in daily_sellers:
                for timing in ["Morning", "Evening"]:
                    fat = round(random.uniform(3.5, 9.5), 1)
                    snf = round(random.uniform(7.5, 9.0), 1)
                    qty = round(random.uniform(10.0, 45.0), 1)
                    price = round(fat * 9.2, 2)
                    amount = round(qty * price, 2)

                    collection = MilkCollection(
                        usercode=seller.usercode,
                        date=date_str,
                        timings=timing,
                        milktype=random.choice(["Cow", "Buffalo"]),
                        fat=fat,
                        snf=snf,
                        quantity=qty,
                        price=price,
                        Amount=amount,
                        username="admin"
                    )
                    session.add(collection)
        
        session.commit()

        # 5. Payments (Add fresh payments)
        print("💰 Adding more Payment records...")
        for seller in all_sellers:
            p = Payment(
                usercode=seller.usercode,
                date=datetime.now().strftime("%Y-%m-%d"),
                amount=round(random.uniform(1000, 5000), 2),
                username="admin"
            )
            session.add(p)
        
        session.commit()
        print("🎊 Production seeding complete! 200+ rows added.")

from sqlalchemy import func

if __name__ == "__main__":
    seed_production_data()
