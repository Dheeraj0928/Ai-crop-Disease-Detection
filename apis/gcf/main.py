import sys
from pathlib import Path

import tensorflow as tf
from google.cloud import storage

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ml.classes import load_class_names  # noqa: E402
from ml.logger import setup_logger  # noqa: E402
from ml.inference import ModelClassMismatchError, format_prediction, validate_class_alignment  # noqa: E402
from ml.preprocess import PreprocessError, bytes_to_model_input  # noqa: E402
logger = setup_logger("crop_disease.gcf")

model = None
BUCKET_NAME = "crop-disease-models"
CLASS_NAMES = load_class_names()


def download_blob(bucket_name: str, source: str, destination: str) -> None:
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    bucket.blob(source).download_to_filename(destination)


def predict(request):
    global model
    try:
        if model is None:
            path = "/tmp/crop-disease-model.h5"
            download_blob(BUCKET_NAME, "models/crop-disease-model.h5", path)
            model = tf.keras.models.load_model(path, compile=False)
            logger.info("GCF model loaded")

        img_batch = bytes_to_model_input(request.files["file"].read())
        pred = model.predict(img_batch, verbose=0)
        validate_class_alignment(model, CLASS_NAMES)
        result = format_prediction(pred[0], CLASS_NAMES)
        return result
    except PreprocessError as exc:
        return {"error": str(exc)}, 400
    except ModelClassMismatchError as exc:
        logger.error("Class alignment error: %s", exc)
        return {"error": "Model configuration error"}, 500
    except Exception:
        logger.exception("GCF prediction failed")
        return {"error": "Prediction failed"}, 500
