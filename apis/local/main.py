from pathlib import Path
import sys

import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ml.classes import load_class_names  # noqa: E402
from ml.config import IMG_SIZE, MODEL_PATH  # noqa: E402
from ml.inference import ModelClassMismatchError, format_prediction, validate_class_alignment  # noqa: E402
from ml.logger import setup_logger  # noqa: E402
from ml.model import load_model  # noqa: E402
from ml.preprocess import PreprocessError, bytes_to_model_input  # noqa: E402

logger = setup_logger("crop_disease.api")
app = FastAPI(
    title="Crop Disease Detection API",
    description="ResNet50-based crop leaf disease classification",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:3002",
        "http://localhost:3006",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3006",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    MODEL = load_model(str(MODEL_PATH), compile_model=False)
    MODEL.predict(np.zeros((1, IMG_SIZE, IMG_SIZE, 3), dtype=np.float32), verbose=0)
    CLASS_NAMES = load_class_names()
    validate_class_alignment(MODEL, CLASS_NAMES)
    logger.info("Model ready — %d classes", len(CLASS_NAMES))
except (FileNotFoundError, ModelClassMismatchError) as exc:
    logger.error("Startup failed: %s", exc)
    raise


@app.get("/ping")
async def ping():
    return {"status": "ready", "classes": len(CLASS_NAMES)}


@app.get("/classes")
async def classes():
    return {"classes": CLASS_NAMES}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    allowed = file.content_type and (
        file.content_type.startswith("image/") or file.content_type == "application/octet-stream"
    )
    if not allowed:
        raise HTTPException(status_code=400, detail="Upload must be an image file")
    try:
        raw = await file.read()
        img_batch = bytes_to_model_input(raw)
        preds = MODEL.predict(img_batch, verbose=0)
        return format_prediction(preds[0], CLASS_NAMES)
    except PreprocessError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except ModelClassMismatchError as exc:
        logger.error("Class alignment error: %s", exc)
        raise HTTPException(status_code=500, detail="Model configuration error") from exc
    except Exception as exc:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=500, detail="Prediction failed") from exc


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
