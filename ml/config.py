"""Central configuration for the crop disease detection pipeline."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODELS_DIR = ROOT / "models"
OUTPUTS_DIR = ROOT / "outputs"
CHECKPOINTS_DIR = OUTPUTS_DIR / "checkpoints"
PLOTS_DIR = OUTPUTS_DIR / "plots"
METRICS_DIR = OUTPUTS_DIR / "metrics"
LOGS_DIR = OUTPUTS_DIR / "logs"

MODEL_PATH = MODELS_DIR / "crop-disease-model.h5"
CLASS_NAMES_PATH = MODELS_DIR / "class_names.json"
BEST_CHECKPOINT = CHECKPOINTS_DIR / "best_model.keras"

IMG_SIZE = 256
BATCH_SIZE = 32
EPOCHS = 25
VALIDATION_SPLIT = 0.2
SEED = 42
LEARNING_RATE = 1e-4
DROPOUT = 0.5
L2_REG = 1e-4
EARLY_STOPPING_PATIENCE = 5
LR_REDUCE_PATIENCE = 3
LR_REDUCE_FACTOR = 0.5
MIN_LR = 1e-7

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
