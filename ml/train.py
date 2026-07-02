"""
Train a ResNet50 crop-disease classifier.

Usage:
  python -m ml.train --data /path/to/class_folders
"""
import argparse
import json
import sys
from pathlib import Path

import tensorflow as tf

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ml.config import (  # noqa: E402
    BEST_CHECKPOINT,
    CHECKPOINTS_DIR,
    EARLY_STOPPING_PATIENCE,
    EPOCHS,
    LEARNING_RATE,
    LR_REDUCE_FACTOR,
    LR_REDUCE_PATIENCE,
    METRICS_DIR,
    MIN_LR,
    MODEL_PATH,
    PLOTS_DIR,
)
from ml.data import load_datasets, prepare_datasets  # noqa: E402
from ml.logger import setup_logger  # noqa: E402
from ml.model import build_model, save_class_names, save_model  # noqa: E402
from ml.plots import plot_training_history  # noqa: E402

logger = setup_logger("crop_disease.train")


def build_callbacks() -> list:
    CHECKPOINTS_DIR.mkdir(parents=True, exist_ok=True)
    METRICS_DIR.mkdir(parents=True, exist_ok=True)
    return [
        tf.keras.callbacks.ModelCheckpoint(
            str(BEST_CHECKPOINT),
            monitor="val_accuracy",
            mode="max",
            save_best_only=True,
            verbose=1,
        ),
        tf.keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=EARLY_STOPPING_PATIENCE,
            restore_best_weights=True,
            verbose=1,
        ),
        tf.keras.callbacks.ReduceLROnPlateau(
            monitor="val_loss",
            factor=LR_REDUCE_FACTOR,
            patience=LR_REDUCE_PATIENCE,
            min_lr=MIN_LR,
            verbose=1,
        ),
        tf.keras.callbacks.CSVLogger(str(METRICS_DIR / "training_log.csv")),
    ]


def main() -> None:
    parser = argparse.ArgumentParser(description="Train crop disease classifier")
    parser.add_argument("--data", required=True, help="Root folder with one subdir per class")
    parser.add_argument("--epochs", type=int, default=EPOCHS)
    parser.add_argument("--out", default=str(MODEL_PATH))
    args = parser.parse_args()

    data_path = Path(args.data)
    if not data_path.is_dir():
        logger.error("Data directory not found: %s", data_path)
        sys.exit(1)

    gpus = tf.config.list_physical_devices("GPU")
    logger.info("GPUs available: %d", len(gpus))

    train_ds, val_ds, class_names = load_datasets(str(data_path))
    train_ds, val_ds = prepare_datasets(train_ds, val_ds)

    model = build_model(len(class_names))
    model.compile(
        optimizer=tf.keras.optimizers.Adam(LEARNING_RATE),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )

    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=args.epochs,
        callbacks=build_callbacks(),
    )

    save_class_names(class_names)
    save_model(model, args.out)

    plot_path = plot_training_history(history, PLOTS_DIR)
    summary = {
        "best_val_accuracy": float(max(history.history["val_accuracy"])),
        "best_val_loss": float(min(history.history["val_loss"])),
        "epochs_run": len(history.history["loss"]),
        "num_classes": len(class_names),
        "class_names": class_names,
        "model_path": args.out,
        "plot_path": str(plot_path),
    }
    (METRICS_DIR / "training_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    logger.info("Training complete — best val_accuracy: %.2f%%", summary["best_val_accuracy"] * 100)


if __name__ == "__main__":
    main()
