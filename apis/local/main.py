# importing packages
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
import numpy as np
import uvicorn
import tensorflow as tf

app = FastAPI()  # creating FastAPI instance

# allowing requests from port 3000 and 3006
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3002",   # 🔥 ADD THIS
    "http://localhost:3006"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# Load model locally
MODEL = tf.keras.models.load_model("../../models/tomato-disease-detection-model.h5", compile=False)
MODEL.predict(np.zeros((1, 224, 224, 3), dtype=np.float32))
print("🔥 Model ready for inference")


# declaring class names
class_names = ['Bacterial-spot', 'Early-blight', 'Healthy', 'Late-blight',
               'Leaf-mold', 'Mosaic-virus', 'Septoria-leaf-spot', 'Yellow-leaf-curl-virus']


# testing connection
@app.get('/ping')
async def ping():  # asynchronous and non-blocking
    return 'Ready!'


# predicting image

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    file_bytes = await file.read()

    # Load + preprocess image
    img = Image.open(BytesIO(file_bytes)).convert("RGB")
    img = img.resize((224, 224))  # MUST match training
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_batch = np.expand_dims(img_array, axis=0)

    # Predict
    preds = MODEL.predict(img_batch)
    class_index = int(np.argmax(preds[0]))
    confidence = float(np.max(preds[0]))

    return {
        "predicted_class": class_names[class_index],
        "confidence": confidence
    }



if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)
