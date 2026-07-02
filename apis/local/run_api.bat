@echo off
cd /d %~dp0
echo Starting Crop Disease Detection API on http://localhost:8000
uvicorn main:app --reload --host 0.0.0.0 --port 8000
