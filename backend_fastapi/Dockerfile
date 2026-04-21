# Use a slim Python image for a smaller, faster container
FROM python:3.10-slim

# Set environment variables to ensure Python output is logged immediately
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies (needed for some Python packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Create a writable directory for the SQLite database
RUN mkdir -p /app/data && chmod 777 /app/data

# Tell the app to use the writable directory for the database
ENV DATABASE_URL=sqlite:////app/data/database.db

# Expose the port FastAPI will run on
EXPOSE 10000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
