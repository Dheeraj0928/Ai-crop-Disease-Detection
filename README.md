# 🍅 Tomato Disease Detection

A comprehensive full-stack web application that uses deep learning to detect and classify tomato plant diseases. This project combines a trained TensorFlow/Keras model with a modern React web interface and FastAPI backend to provide farmers and agricultural enthusiasts with an intelligent disease detection tool.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Model Information](#model-information)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Supported Disease Classes](#supported-disease-classes)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🎯 Overview

The Tomato Disease Detection system is an intelligent agricultural tool that leverages machine learning to identify diseases in tomato plants. Users can upload images of tomato leaves or plants, and the system will analyze them using a pre-trained deep learning model to detect and classify various diseases. The application features:

- **Web-based Interface**: Easy-to-use React application for uploading and analyzing images
- **REST API**: FastAPI backend for image processing and disease prediction
- **Pre-trained Model**: TensorFlow/Keras model trained to recognize 8 different disease classes
- **Real-time Predictions**: Instant disease detection with confidence scores
- **Responsive Design**: Mobile-friendly interface built with Material-UI

---

## ✨ Features

- 🖼️ **Image Upload & Analysis**: Upload tomato plant images for instant disease detection
- 🎯 **Multi-class Classification**: Detects 8 different disease types and healthy plants
- 📊 **Confidence Scores**: Get probability predictions for each disease class
- 🌐 **Responsive Web Interface**: Works on desktop, tablet, and mobile devices
- 🔐 **CORS-Enabled API**: Secure cross-origin requests support
- ⚡ **Fast Predictions**: Optimized model inference for quick results
- 📱 **Modern UI/UX**: Built with React and Material-UI for superior user experience
- 🚀 **Production Ready**: Includes both local and Google Cloud Function deployments

---

## 📁 Project Structure

```
tomato-disease-detection/
├── apis/
│   ├── local/                    # Local API deployment
│   │   ├── main.py              # FastAPI application
│   │   ├── requirements.txt      # Python dependencies
│   │   ├── run_api.bat           # Windows batch script to run API
│   │   └── __pycache__/          # Python cache
│   └── gcf/                      # Google Cloud Function deployment
│       ├── main.py              # Cloud function handler
│       └── requirements.txt      # Cloud dependencies
├── models/
│   ├── tomato-disease-detection-model.h5  # Pre-trained Keras model
│   ├── 1/                        # TensorFlow SavedModel format (version 1)
│   │   ├── keras_metadata.pb
│   │   ├── saved_model.pb
│   │   └── variables/
│   └── 2/                        # TensorFlow SavedModel format (version 2)
│       ├── keras_metadata.pb
│       ├── saved_model.pb
│       └── variables/
├── web-page/                     # React frontend application
│   ├── public/
│   │   ├── index.html           # Main HTML file
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js               # Main React component
│   │   ├── App.test.js          # Tests
│   │   ├── index.js             # React entry point
│   │   ├── index.css            # Global styles
│   │   ├── home.js              # Home page
│   │   ├── reportWebVitals.js
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   └── Footer.js        # Footer component
│   │   └── pages/               # Page components
│   │       ├── Home.js          # Home page
│   │       ├── Detect.js        # Disease detection page
│   │       ├── About.js         # About page
│   │       ├── Contact.js       # Contact page
│   │       └── HowItWorks.js    # How it works page
│   ├── package.json             # NPM dependencies
│   ├── run_web.bat              # Windows batch script to run frontend
│   └── npm_status.txt           # NPM installation status
├── config-files/
│   ├── all-models.config        # Configuration for all models
│   └── target-models.config     # Configuration for target models
├── Tomato-Disease-Detection-Model.ipynb  # Jupyter notebook with model training
├── README.md                    # This file
└── LICENSE                      # MIT License

```

---

## 🛠️ Technologies Used

### Backend

- **FastAPI**: Modern Python web framework for building APIs
- **TensorFlow/Keras**: Deep learning framework for the ML model
- **Pillow (PIL)**: Image processing library
- **NumPy**: Numerical computing
- **Uvicorn**: ASGI server for FastAPI
- **Python**: Programming language

### Frontend

- **React 17**: JavaScript library for building user interfaces
- **React Router v6**: Client-side routing
- **Material-UI**: Component library for modern UI
- **Axios**: HTTP client for API requests
- **Material-UI Dropzone**: File upload component
- **CSS3**: Styling

### Machine Learning

- **TensorFlow**: ML framework
- **Keras**: High-level API for neural networks
- **Deep Learning Model**: CNN-based architecture for image classification

### Deployment

- **Google Cloud Functions**: Serverless deployment option
- **Local Server**: Development and testing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### System Requirements

- **Windows 10/11** (or Linux/macOS with similar tools)
- **Git** (for version control)

### Software Requirements

- **Python 3.8+** - Download from [python.org](https://www.python.org/)
- **Node.js 14+** - Download from [nodejs.org](https://nodejs.org/)
- **npm 6+** (comes with Node.js)

### Verification

```bash
# Check Python version
python --version

# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## 🚀 Installation & Setup

### Backend Setup

#### Step 1: Navigate to the Backend Directory

```bash
cd apis/local
```

#### Step 2: Create a Python Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### Step 3: Install Python Dependencies

```bash
pip install -r requirements.txt
```

**Note**: The `requirements.txt` includes:

- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `tensorflow` - ML framework
- `pillow` - Image processing
- `numpy` - Numerical operations
- `python-multipart` - File upload support

### Frontend Setup

#### Step 1: Navigate to the Frontend Directory

```bash
cd web-page
```

#### Step 2: Install Node.js Dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`:

- React and React DOM
- React Router for navigation
- Material-UI components and icons
- Axios for HTTP requests
- Material-UI Dropzone for file uploads

---

## ▶️ Running the Application

### Option 1: Using Batch Scripts (Windows)

#### Start the Backend API

```bash
cd apis/local
run_api.bat
```

The API will start on `http://localhost:8000`

#### Start the Frontend (in a new terminal)

```bash
cd web-page
run_web.bat
```

The web application will open at `http://localhost:3000`

### Option 2: Manual Setup

#### Terminal 1 - Start Backend

```bash
cd apis/local

# Activate virtual environment
venv\Scripts\activate

# Run the API
uvicorn main:app --reload --port 8000
```

#### Terminal 2 - Start Frontend

```bash
cd web-page

# Start the React development server
npm start
```

### Verification

Once both are running, you should see:

- **Backend**: FastAPI interactive docs at `http://localhost:8000/docs`
- **Frontend**: React app at `http://localhost:3000`

The console will show:

```
🔥 Model ready for inference
Uvicorn running on http://127.0.0.1:8000
```

---

## 🤖 Model Information

### Model Architecture

- **Type**: Convolutional Neural Network (CNN)
- **Framework**: TensorFlow/Keras
- **Input Size**: 224x224 RGB images
- **Output**: 8-class classification with confidence scores

### Model Files

- **HDF5 Format**: `models/tomato-disease-detection-model.h5`
- **SavedModel Format v1**: `models/1/` (TensorFlow 1.x compatible)
- **SavedModel Format v2**: `models/2/` (TensorFlow 2.x compatible)

### Model Performance

The model has been trained on a dataset of tomato leaf images and can classify:

- 8 disease classes
- Healthy plants
- Confidence scores for each prediction

### Image Input Requirements

- **Format**: PNG, JPG, JPEG
- **Size**: Recommended 224x224 (will be resized automatically)
- **Color Space**: RGB
- **Quality**: Clear images work best for accurate predictions

---

## 📡 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

#### 1. Health Check

```http
GET /ping
```

**Response**:

```json
"Ready!"
```

#### 2. Disease Prediction

```http
POST /predict
Content-Type: multipart/form-data

file: <image_file>
```

**Parameters**:

- `file` (required): Image file (PNG, JPG, JPEG)

**Response**:

```json
{
  "disease": "Early-blight",
  "confidence": 0.95,
  "predictions": {
    "Bacterial-spot": 0.02,
    "Early-blight": 0.95,
    "Healthy": 0.01,
    "Late-blight": 0.01,
    "Leaf-mold": 0.005,
    "Mosaic-virus": 0.003,
    "Septoria-leaf-spot": 0.002,
    "Yellow-leaf-curl-virus": 0.001
  }
}
```

### Interactive API Documentation

Access Swagger UI at: `http://localhost:8000/docs`

---

## 📸 Usage Guide

### How to Use the Web Application

1. **Open the Application**
   - Navigate to `http://localhost:3000` in your web browser

2. **Go to Detect Page**
   - Click on "Detect" in the navigation menu or use the detection button

3. **Upload an Image**
   - Drag and drop a tomato plant image, or click to select a file
   - Supported formats: PNG, JPG, JPEG

4. **View Results**
   - The model will analyze the image and display:
     - Detected disease/condition
     - Confidence percentage
     - Individual confidence scores for all 8 classes

5. **Learn More**
   - Check the "How It Works" section to understand the technology
   - Read the "About" page for project information
   - Use the "Contact" page for inquiries

### Tips for Best Results

- Use clear, well-lit images
- Focus on the affected area
- Ensure the image is in focus
- Include multiple leaves if possible
- Remove hands/objects from the image

---

## 🌾 Supported Disease Classes

The model can detect and classify the following tomato plant conditions:

1. **Bacterial Spot** - Caused by _Xanthomonas_ bacteria
   - Symptoms: Small dark spots with yellowing halos
2. **Early Blight** - Caused by _Alternaria_ fungi
   - Symptoms: Brown spots with concentric rings
3. **Healthy** - No disease detected
   - Characteristics: Normal green foliage
4. **Late Blight** - Caused by _Phytophthora_ fungus
   - Symptoms: Water-soaked lesions, white mold on undersides
5. **Leaf Mold** - Caused by _Passalora_ fungus
   - Symptoms: Yellow patches, gray-white mold underneath
6. **Mosaic Virus** - Caused by Mosaic virus
   - Symptoms: Mottled yellow-green leaves, distorted growth
7. **Septoria Leaf Spot** - Caused by _Septoria_ fungi
   - Symptoms: Circular spots with dark borders and gray centers
8. **Yellow Leaf Curl Virus** - Caused by whitefly-transmitted virus
   - Symptoms: Upward curling of leaves, yellowing, stunted growth

---

## 📝 Configuration Files

### all-models.config

Configuration file for all available models (model versions 1 and 2)

### target-models.config

Configuration file for the specific target model(s) used in production

---

## 🔌 CORS Configuration

The API is configured to accept requests from:

- `http://localhost`
- `http://localhost:3000`
- `http://localhost:3002`
- `http://localhost:3006`

To add more origins, modify the `origins` list in `apis/local/main.py`:

```python
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3002",
    "http://localhost:3006"
    # Add more origins here
]
```

---

## 🧠 Training & Model Development

The Jupyter notebook `Tomato-Disease-Detection-Model.ipynb` contains:

- Data loading and preprocessing
- Model architecture definition
- Training pipeline
- Evaluation metrics
- Prediction examples

To run the notebook:

```bash
jupyter notebook Tomato-Disease-Detection-Model.ipynb
```

---

## 🐛 Troubleshooting

### Issue: Port 8000 already in use

**Solution**: Change the port in the API startup command

```bash
uvicorn main:app --reload --port 8001
```

### Issue: Port 3000 already in use

**Solution**: Set a different port before starting React

```bash
# On Windows (PowerShell)
$env:PORT=3001
npm start

# On Windows (Command Prompt)
set PORT=3001
npm start
```

### Issue: Model not found error

**Solution**: Ensure you're in the correct directory and the model file exists

```bash
# Check if model exists
dir models/
```

### Issue: Module not found (Python)

**Solution**: Ensure virtual environment is activated and dependencies are installed

```bash
venv\Scripts\activate
pip install -r requirements.txt
```

### Issue: npm install fails

**Solution**: Clear npm cache and try again

```bash
npm cache clean --force
npm install
```

### Issue: Image upload fails

**Solution**:

- Ensure the image format is supported (PNG, JPG, JPEG)
- Check file size (very large files may timeout)
- Verify the backend API is running

---

## 📚 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Python Image Processing with PIL](https://pillow.readthedocs.io/)

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Copyright © 2022 George Muriithi Murage**

### License Summary

- ✅ You can use this project commercially
- ✅ You can modify the code
- ✅ You can distribute the code
- ✅ You can use privately
- ❌ Liability is not accepted
- ❌ Warranty is not provided

---

## 👨‍💻 Author

**George Muriithi Murage**

- GitHub: [GitHub Profile](https://github.com)
- Email: Contact via the Contact page

---

## 🚀 Deployment

### Google Cloud Functions

To deploy to Google Cloud Functions, use the files in `apis/gcf/`:

1. Update `main.py` with your GCP-specific configurations
2. Deploy using `gcloud functions deploy`
3. Set up Cloud Storage bucket for models

### Production Deployment Checklist

- [ ] Set `debug=False` in production
- [ ] Use environment variables for configuration
- [ ] Set up proper logging
- [ ] Configure HTTPS
- [ ] Add authentication if needed
- [ ] Set up monitoring and alerts
- [ ] Test with production data

---

## 📧 Support & Contact

For issues, feature requests, or questions:

1. Use the Contact page in the application
2. Create an issue in the GitHub repository
3. Check the How It Works section for technical details

---

## 🎯 Future Enhancements

- [ ] Support for other crop diseases
- [ ] Real-time camera feed detection
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Disease treatment recommendations
- [ ] Multi-image batch processing
- [ ] User accounts and history tracking
- [ ] Model versioning and updates

---

## 📊 Statistics

- **Disease Classes**: 8
- **Model Input Size**: 224x224 pixels
- **API Response Time**: <1 second
- **Supported Formats**: PNG, JPG, JPEG
- **Backend**: Python 3.8+
- **Frontend**: React 17+
- **License**: MIT

---

**Last Updated**: January 2026

**Status**: ✅ Production Ready

---

**Thank you for using Tomato Disease Detection! Happy farming! 🌾**
