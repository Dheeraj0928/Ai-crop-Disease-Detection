"""Class label loading — dataset-independent."""
import json

from ml.config import CLASS_NAMES_PATH

FALLBACK_CLASS_NAMES = [
    "Bacterial-spot",
    "Early-blight",
    "Healthy",
    "Late-blight",
    "Leaf-mold",
    "Mosaic-virus",
    "Septoria-leaf-spot",
    "Yellow-leaf-curl-virus",
]


def load_class_names() -> list[str]:
    if CLASS_NAMES_PATH.is_file():
        return json.loads(CLASS_NAMES_PATH.read_text(encoding="utf-8"))
    return FALLBACK_CLASS_NAMES.copy()
