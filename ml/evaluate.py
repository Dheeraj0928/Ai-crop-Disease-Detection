"""
Evaluate a trained model on the validation split.

Usage:
  python -m ml.evaluate --data /path/to/class_folders
  python -m ml.evaluate --data /path/to/class_folders --model models/crop-disease-model.h5
"""
import argparse
import json
import sys
from pathlib import Path

import numpy as np
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ml.config import BATCH_SIZE, IMG_SIZE, METRICS_DIR, MODEL_PATH, PLOTS_DIR, SEED, VALIDATION_SPLIT  # noqa: E402
from ml.logger import setup_logger  # noqa: E402
from ml.model import load_model  # noqa: E402
from ml.plots import plot_confusion_matrix  # noqa: E402

logger = setup_logger("crop_disease.evaluate")


def collect_predictions(model, dataset):
    y_true, y_pred = [], []
    for images, labels in dataset:
        preds = model.predict(images, verbose=0)
        y_pred.extend(np.argmax(preds, axis=1).tolist())
        y_true.extend(labels.numpy().tolist())
    return y_true, y_pred


def main() -> None:
    parser = argparse.ArgumentParser(description="Evaluate crop disease classifier")
    parser.add_argument("--data", required=True, help="Root folder with one subdir per class")
    parser.add_argument("--model", default=str(MODEL_PATH))
    args = parser.parse_args()

    data_path = Path(args.data)
    if not data_path.is_dir():
        logger.error("Data directory not found: %s", data_path)
        sys.exit(1)

    val_ds = tf.keras.utils.image_dataset_from_directory(
        args.data,
        image_size=(IMG_SIZE, IMG_SIZE),
        batch_size=BATCH_SIZE,
        validation_split=VALIDATION_SPLIT,
        subset="validation",
        seed=SEED,
        shuffle=False,
    )
    class_names = val_ds.class_names
    # Raw 0-255 pixels; model rescales internally.
    val_ds = val_ds.prefetch(tf.data.AUTOTUNE)

    model = load_model(args.model, compile_model=False)
    y_true, y_pred = collect_predictions(model, val_ds)

    cm = confusion_matrix(y_true, y_pred)
    report = classification_report(y_true, y_pred, target_names=class_names, output_dict=True)
    accuracy = float(report["accuracy"])

    METRICS_DIR.mkdir(parents=True, exist_ok=True)
    (METRICS_DIR / "classification_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    np.savetxt(METRICS_DIR / "confusion_matrix.csv", cm, fmt="%d", delimiter=",")
    plot_path = plot_confusion_matrix(cm, class_names, PLOTS_DIR)

    logger.info("Validation accuracy: %.2f%%", accuracy * 100)
    logger.info("Confusion matrix plot: %s", plot_path)
    print(classification_report(y_true, y_pred, target_names=class_names))


if __name__ == "__main__":
    main()
