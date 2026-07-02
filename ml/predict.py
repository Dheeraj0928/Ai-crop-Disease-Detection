"""
Run inference on one image or a folder of images.

Usage:
  python -m ml.predict --image path/to/leaf.jpg
  python -m ml.predict --dir path/to/images/
"""
import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ml.classes import load_class_names  # noqa: E402
from ml.config import ALLOWED_EXTENSIONS, MODEL_PATH  # noqa: E402
from ml.logger import setup_logger  # noqa: E402
from ml.model import load_model  # noqa: E402
from ml.inference import ModelClassMismatchError, format_prediction, validate_class_alignment  # noqa: E402
from ml.preprocess import PreprocessError, file_to_model_input  # noqa: E402

logger = setup_logger("crop_disease.predict")


def predict_image(model, image_path: Path, class_names: list[str]) -> dict:
    batch = file_to_model_input(image_path)
    preds = model.predict(batch, verbose=0)
    result = format_prediction(preds[0], class_names)
    result["file"] = str(image_path)
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="Predict crop disease from images")
    parser.add_argument("--image", help="Single image path")
    parser.add_argument("--dir", help="Folder of images")
    parser.add_argument("--model", default=str(MODEL_PATH))
    parser.add_argument("--out", help="Optional JSON output file")
    args = parser.parse_args()

    if not args.image and not args.dir:
        parser.error("Provide --image or --dir")

    model = load_model(args.model, compile_model=False)
    class_names = load_class_names()
    validate_class_alignment(model, class_names)
    results = []

    paths: list[Path] = []
    if args.image:
        paths.append(Path(args.image))
    if args.dir:
        folder = Path(args.dir)
        paths.extend(p for p in folder.iterdir() if p.suffix.lower() in ALLOWED_EXTENSIONS)

    for path in paths:
        try:
            result = predict_image(model, path, class_names)
            results.append(result)
            logger.info("%s -> %s (%.1f%%)", path.name, result["pred_class"], result["pred_conf"] * 100)
        except (PreprocessError, FileNotFoundError) as exc:
            logger.error("Skipped %s: %s", path, exc)

    output = json.dumps(results if len(results) != 1 else results[0], indent=2)
    print(output)
    if args.out:
        Path(args.out).write_text(output, encoding="utf-8")


if __name__ == "__main__":
    main()
