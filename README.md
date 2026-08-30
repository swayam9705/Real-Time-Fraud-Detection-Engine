# Real-Time Credit Card Fraud Detection Dashboard

Hey there! 👋 This is a full-stack machine learning project I built to move beyond basic static batch models (like simple churn prediction notebooks) and work on real-time streaming ML architecture.

It simulates a live stream of financial transactions over WebSockets, feeds them through a trained LightGBM model in FastAPI, computes SHAP (SHapley Additive exPlanations) values on the fly to explain why a transaction was flagged, and visualizes the risk metrics in a custom React dashboard.

## 🚀 Features

1. Streaming WebSockets Pipeline: Simulates incoming transaction telemetry every 1.5s using FastAPI async WebSockets.

2. Low-Latency XGBoost/LightGBM Inference: Quick classification handling imbalanced datasets (uses scale_pos_weight for rare fraud cases).

3. Local Explainable AI (XAI): Uses TreeExplainer to calculate exact feature contribution scores for every single streaming transaction.

4. Vanilla JS & Custom CSS Frontend: Built without heavyweight CSS frameworks like Tailwind to learn pure CSS variables, modular flex/grid layouts, and reusable component structure.

5. Interactive Data Visualization: Uses Recharts to display real-time SHAP feature impact horizontal bar charts.

## 🛠️ Tech Stack

### Backend:

- Python
- FastAPI
- LightGBM & Scikit-Learn
- SHAP (Model Explainability)
- Pandas & NumPy

### Frontend:
- React
- JavaScript
- Recharts

### 📂 Project Structure
```
fraud-detection-app/
├── backend/
│   ├── app.py                 # FastAPI server & WebSocket endpoint
│   ├── train_model.py          # Synthetic dataset generator & model training
│   ├── fraud_model.pkl         # Trained LightGBM model
│   ├── shap_explainer.pkl      # Pre-calculated SHAP TreeExplainer
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/         
    │   │   ├── MetricCard.jsx
    │   │   ├── TransactionCard.jsx
    │   │   └── VisualizerChart.jsx
    │   ├── styles/             
    │   │   ├── variables.css
    │   │   └── components.css
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## How to Run

### Setup the Backend

```bash
# 1. Go to root directory
cd backend

# 2. Create and activate virtual environment

python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4.  Train the model and generate the .pkl artifacts
python train_model.py

# 5. Start the FastAPI WebSocket backend
uvicorn main:app --reload --port 8000
```

### Setup Frontend

```bash
# 1. Go to frontend directory
cd frontend

# 2. Install Node dependencies
npm install

# 3. Start the dev server and open in browser
npm run dev
```