# Bird Migration Tracker - Minimal Fullstack Prototype

## Overview
This prototype is a minimal fullstack scaffold to visualize bird migration data on Google Maps.
Frontend: React + Google Maps JS API
Backend: Flask (provides a small REST API)
Database: Mocked JSON seed (replace with MongoDB/PostGIS as needed)

## Setup (Backend)
1. Navigate to `backend/`
2. Create a virtual env and install requirements:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # or .venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
3. Run the Flask app:
   ```bash
   export FLASK_APP=app.py
   flask run --port=5000
   ```
   (Or: `python app.py`)

## Setup (Frontend)
1. Navigate to `frontend/`
2. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```
3. In `frontend/public/index.html` add your Google Maps API key where indicated:
   `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,visualization"></script>`

## Notes
- This is a minimal scaffold. Replace mock data with real datasets (e.g., eBird API) and connect to a real DB.
- For production, secure API keys, enable CORS carefully, and deploy with proper servers.
