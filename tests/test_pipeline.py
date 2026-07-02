"""Tests for crop disease detection pipeline."""
import json
import sys
from pathlib import Path

import cv2
import numpy as np
import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from ml.classes import FALLBACK_CLASS_NAMES, load_class_names
from ml.config import CLASS_NAMES_PATH, IMG_SIZE, MODEL_PATH
from ml.inference import ModelClassMismatchError, format_prediction, validate_class_alignment
from ml.model import load_model
from ml.preprocess import PreprocessError, bytes_to_model_input, file_to_model_input


def test_preprocess_bytes():
    ok, buf = cv2.imencode(".jpg", np.full((20, 20, 3), 200, dtype=np.uint8))
    assert ok
    out = bytes_to_model_input(buf.tobytes())
    assert out.shape == (1, IMG_SIZE, IMG_SIZE, 3)
    # Raw 0-255 range (model rescales internally); must not be pre-divided by 255.
    assert out.max() > 1.0


def test_preprocess_empty_raises():
    with pytest.raises(PreprocessError):
        bytes_to_model_input(b"")


def test_load_class_names_fallback():
    names = load_class_names()
    assert isinstance(names, list)
    assert len(names) >= 2


def test_class_names_json_exists():
    assert CLASS_NAMES_PATH.is_file()
    data = json.loads(CLASS_NAMES_PATH.read_text())
    assert data == FALLBACK_CLASS_NAMES or len(data) >= 2


def test_model_file_exists():
    assert MODEL_PATH.is_file(), f"Missing model at {MODEL_PATH}"


def test_predict_on_synthetic_image(tmp_path):
    if not MODEL_PATH.is_file():
        pytest.skip("Model not present")
    img_path = tmp_path / "leaf.jpg"
    cv2.imwrite(str(img_path), np.random.randint(0, 255, (128, 128, 3), dtype=np.uint8))
    batch = file_to_model_input(img_path)
    assert batch.shape == (1, IMG_SIZE, IMG_SIZE, 3)


def test_model_class_alignment():
    if not MODEL_PATH.is_file():
        pytest.skip("Model not present")
    model = load_model(str(MODEL_PATH), compile_model=False)
    names = load_class_names()
    validate_class_alignment(model, names)


def test_format_prediction_rejects_mismatched_labels():
    preds = np.array([0.1, 0.7, 0.2])
    with pytest.raises(ModelClassMismatchError):
        format_prediction(preds, ["only-one-label"])
