"""Training metrics plots."""
from pathlib import Path

import matplotlib.pyplot as plt
import seaborn as sns


def plot_training_history(history, plots_dir: Path) -> Path:
    plots_dir.mkdir(parents=True, exist_ok=True)
    h = history.history

    plt.figure(figsize=(10, 4))
    plt.subplot(1, 2, 1)
    plt.plot(h["accuracy"], label="train")
    plt.plot(h["val_accuracy"], label="val")
    plt.title("Accuracy")
    plt.xlabel("Epoch")
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(h["loss"], label="train")
    plt.plot(h["val_loss"], label="val")
    plt.title("Loss")
    plt.xlabel("Epoch")
    plt.legend()

    plt.tight_layout()
    path = plots_dir / "training_history.png"
    plt.savefig(path, dpi=150)
    plt.close()
    return path


def plot_confusion_matrix(cm, class_names: list[str], plots_dir: Path) -> Path:
    plots_dir.mkdir(parents=True, exist_ok=True)
    plt.figure(figsize=(max(8, len(class_names)), max(6, len(class_names) * 0.6)))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=class_names, yticklabels=class_names)
    plt.title("Confusion Matrix")
    plt.ylabel("True label")
    plt.xlabel("Predicted label")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    path = plots_dir / "confusion_matrix.png"
    plt.savefig(path, dpi=150)
    plt.close()
    return path
