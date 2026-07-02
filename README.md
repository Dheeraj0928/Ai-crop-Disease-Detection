# AI-Based Crop Disease Detection

Production-quality deep learning pipeline for crop leaf disease classification using **ResNet50 transfer learning**, **OpenCV** preprocessing, **TensorFlow/Keras**, and a **FastAPI + React** web application.

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)]()
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.12+-orange.svg)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)]()

---

## Features

| Feature | Description |
|---------|-------------|
| ResNet50 transfer learning | ImageNet backbone + custom classification head |
| Dataset-independent | Any folder-per-class layout (PlantVillage, custom) |
| Data augmentation | Flip, rotation, zoom, contrast |
| Training callbacks | Checkpointing, early stopping, LR scheduler |
| Evaluation | Confusion matrix, classification report, plots |
| CLI prediction | Single image or batch folder inference |
| REST API | FastAPI with OpenCV preprocessing |
| Web UI | React upload interface with confidence scores |
| Logging | Structured logs to `outputs/logs/` |

---

## Project Structure

```
├── ml/
│   ├── config.py          # Paths, hyperparameters
│   ├── data.py            # Dataset loading + augmentation
│   ├── model.py           # ResNet50 builder / loader
│   ├── preprocess.py      # OpenCV inference preprocessing
│   ├── train.py           # Training script
│   ├── evaluate.py        # Validation metrics + plots
│   ├── predict.py         # CLI inference
│   ├── plots.py           # Accuracy/loss + confusion matrix plots
│   ├── classes.py         # Class label loader
│   └── logger.py          # Logging setup
├── apis/
│   ├── local/             # FastAPI server (development)
│   └── gcf/               # Google Cloud Functions handler
├── models/
│   ├── crop-disease-model.h5
│   └── class_names.json
├── outputs/               # Training artifacts (gitignored)
│   ├── checkpoints/
│   ├── plots/
│   ├── metrics/
│   └── logs/
├── tests/
│   └── test_pipeline.py
├── web-page/              # React frontend
├── requirements.txt
└── README.md
```

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/Dheeraj0928/tomato-disease-detection.git
cd tomato-disease-detection
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

### 2. Run API

```bash
cd apis/local
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

### 3. Run frontend

```bash
cd web-page
npm install
npm start
```

App: http://localhost:3000

---

## ML Pipeline

### Train (any class-folder dataset)

```bash
python -m ml.train --data /path/to/dataset --epochs 25
```

Outputs:
- `models/crop-disease-model.h5`
- `models/class_names.json`
- `outputs/plots/training_history.png`
- `outputs/metrics/training_summary.json`

### Evaluate

```bash
python -m ml.evaluate --data /path/to/dataset
```

Outputs:
- `outputs/plots/confusion_matrix.png`
- `outputs/metrics/classification_report.json`

### Predict

```bash
python -m ml.predict --image path/to/leaf.jpg
python -m ml.predict --dir path/to/images/ --out results.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ping` | Health check |
| GET | `/classes` | List disease classes |
| POST | `/predict` | Upload image → prediction |

**Example response:**

```json
{
  "pred_class": "Early-blight",
  "pred_conf": 0.92,
  "all_scores": { "Early-blight": 0.92, "Healthy": 0.05, "...": "..." }
}
```

---

## Dataset Format

```
dataset/
├── Class-A/
│   ├── img001.jpg
│   └── img002.jpg
├── Class-B/
│   └── ...
└── Class-N/
```

Recommended: [PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset) (15,000+ images).

---

## Testing

```bash
pytest tests/ -v
python ml/preprocess.py
python -m compileall ml apis tests
```

---

## Tech Stack

- **ML:** TensorFlow, Keras, ResNet50, OpenCV, scikit-learn
- **Backend:** FastAPI, Uvicorn
- **Frontend:** React 17, Material-UI
- **Deployment:** Google Cloud Functions (optional)

---

## Author

**Dheeraj Kumar Yadav**  
GitHub: [@Dheeraj0928](https://github.com/Dheeraj0928)  
Email: dk.2.yadav28@gmail.com

---

## License

MIT
