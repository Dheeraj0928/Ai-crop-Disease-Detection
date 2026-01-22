@echo off
echo Installing dependencies... > install_status.txt
call pip install -r requirements.txt >> install_status.txt 2>&1
echo dependencies installed >> install_status.txt
echo Checking TensorFlow... >> install_status.txt
python -c "import tensorflow; print('TF OK')" >> install_status.txt 2>&1
echo Starting Server... >> install_status.txt
call uvicorn main:app --reload --host 0.0.0.0 >> server.log 2>&1
