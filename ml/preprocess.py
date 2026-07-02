"""OpenCV image preprocessing for inference."""
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ml.config import ALLOWED_EXTENSIONS, IMG_SIZE


class PreprocessError(ValueError):
    """Raised when an image cannot be decoded or preprocessed."""


def bytes_to_model_input(raw: bytes) -> np.ndarray:
    if not raw:
        raise PreprocessError("Empty image payload")
    buf = np.frombuffer(raw, dtype=np.uint8)
    bgr = cv2.imdecode(buf, cv2.IMREAD_COLOR)
    if bgr is None:
        raise PreprocessError("Unable to decode image bytes")
    return array_to_model_input(bgr)


def file_to_model_input(path: str | Path) -> np.ndarray:
    path = Path(path)
    if path.suffix.lower() not in ALLOWED_EXTENSIONS:
        raise PreprocessError(f"Unsupported extension: {path.suffix}")
    bgr = cv2.imread(str(path))
    if bgr is None:
        raise PreprocessError(f"Unable to read image: {path}")
    return array_to_model_input(bgr)


def array_to_model_input(bgr: np.ndarray) -> np.ndarray:
    # Return raw 0-255 RGB. Models rescale internally (Rescaling layer), so we must
    # NOT divide by 255 here — doing so double-rescales and collapses predictions.
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    rgb = cv2.resize(rgb, (IMG_SIZE, IMG_SIZE), interpolation=cv2.INTER_AREA)
    return np.expand_dims(rgb.astype(np.float32), axis=0)


if __name__ == "__main__":
    ok, buf = cv2.imencode(".jpg", np.full((10, 10, 3), 200, dtype=np.uint8))
    assert ok
    out = bytes_to_model_input(buf.tobytes())
    assert out.shape == (1, IMG_SIZE, IMG_SIZE, 3)
    assert out.max() > 1.0, "expected raw 0-255 pixel values"
    print("preprocess ok")
