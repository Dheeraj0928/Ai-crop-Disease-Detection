@echo off
echo Installing dependencies... > npm_status.txt
rem call npm install >> npm_status.txt 2>&1
echo Starting Web Page... >> npm_status.txt
set PORT=3006
call npm start >> start.log 2>&1
