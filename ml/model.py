"""ResNet50 model builder and loader."""
import json
from pathlib import Path

import tensorflow as tf
from tensorflow.keras import layers, models, regularizers
from tensorflow.keras.applications import ResNet50

from ml.config import CLASS_NAMES_PATH, DROPOUT, IMG_SIZE, L2_REG, MODEL_PATH
from ml.logger import setup_logger

logger = setup_logger("crop_disease.model")


def build_model(num_classes: int, trainable_base: bool = False) -> tf.keras.Model:
    base = ResNet50(
        weights="imagenet",
        include_top=False,
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
    )
    base.trainable = trainable_base
    # Inputs are raw 0-255 pixels; rescale inside the model so inference preprocessing
    # (ml/preprocess.py) stays a single, consistent contract across all models.
    inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x = layers.Rescaling(1.0 / 255)(inputs)
    x = base(x)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(DROPOUT)(x)
    outputs = layers.Dense(
        num_classes,
        activation="softmax",
        kernel_regularizer=regularizers.l2(L2_REG),
    )(x)
    model = models.Model(inputs, outputs)
    logger.info("Built ResNet50 model with %d output classes", num_classes)
    return model


def load_model(path: str | None = None, compile_model: bool = False) -> tf.keras.Model:
    model_path = Path(path) if path else MODEL_PATH
    if not model_path.is_file():
        raise FileNotFoundError(f"Model not found: {model_path}")
    model = tf.keras.models.load_model(str(model_path), compile=compile_model)
    logger.info("Loaded model from %s", model_path)
    return model


def save_class_names(class_names: list[str]) -> None:
    CLASS_NAMES_PATH.parent.mkdir(parents=True, exist_ok=True)
    CLASS_NAMES_PATH.write_text(json.dumps(class_names, indent=2), encoding="utf-8")
    logger.info("Saved %d class names to %s", len(class_names), CLASS_NAMES_PATH)


def save_model(model: tf.keras.Model, path: str | None = None) -> None:
    out = Path(path) if path else MODEL_PATH
    out.parent.mkdir(parents=True, exist_ok=True)
    model.save(str(out))
    logger.info("Saved model to %s", out)
