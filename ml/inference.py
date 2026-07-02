"""Shared inference helpers."""
import numpy as np
import tensorflow as tf


class ModelClassMismatchError(ValueError):
    """Model output dimension does not match configured class labels."""


def output_class_count(model: tf.keras.Model) -> int:
    shape = model.output_shape
    if not shape or shape[-1] is None:
        raise ValueError(f"Cannot determine model output class count from shape {shape!r}")
    return int(shape[-1])


def validate_class_alignment(model: tf.keras.Model, class_names: list[str]) -> None:
    if not class_names:
        raise ModelClassMismatchError("No class names configured")
    expected = output_class_count(model)
    if len(class_names) != expected:
        raise ModelClassMismatchError(
            f"class_names.json has {len(class_names)} labels but model outputs {expected} classes"
        )


def format_prediction(preds_row: np.ndarray, class_names: list[str]) -> dict:
    idx = int(np.argmax(preds_row))
    if idx >= len(class_names):
        raise ModelClassMismatchError(
            f"Model predicted class index {idx} but only {len(class_names)} labels exist"
        )
    return {
        "pred_class": class_names[idx],
        "pred_conf": float(np.max(preds_row)),
        "all_scores": {class_names[i]: float(preds_row[i]) for i in range(len(class_names))},
    }
