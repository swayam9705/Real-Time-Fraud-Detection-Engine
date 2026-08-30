import asyncio
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Real-time Fraud Detection Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

model = joblib.load("fraud_model.pkl")
explainer = joblib.load("shap_explainer.pkl")
feature_names = ["amount", "distance_from_home", "time_since_last_tx", "is_foreign", "failed_pin_attempts"]

class TransactionPayLoad(BaseModel):
    amount: float
    distance_from_home: float
    time_since_last_tx: float
    is_foreign: int
    failed_pin_attempts: int


def analyze_transaction(data: dict):
    input_df = pd.DataFrame([data])
    fraud_probability = float(model.predict_proba(input_df)[0][1])

    shap_values = explainer.shap_values(input_df)

    if isinstance(shap_values, list):
        vals = shap_values[1][0]
    else:
        vals = shap_values[0]

    attributions = [
        {
            "feature": name, "impact": float(val)
        }
        for name, val in zip(feature_names, vals)
    ]

    attributions.sort(key=lambda x: abs(x["impact"]), reverse=True)

    return {
        "fraud_probability": round(fraud_probability, 4),
        "is_flagged": fraud_probability > 0.65,
        "feature_attributions": attributions
    }

@app.post("/api/predict")
async def predict(payload: TransactionPayLoad):
    return analyze_transaction(payload.model_dump())

@app.websocket("/ws/stream")
async def stream_transactions(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            mock_tx = {
                "amount": round(float(np.random.exponential(scale=120)), 2),
                "distance_from_home": round(float(np.random.gamma(shape=2, scale=6)), 2),
                "time_since_last_tx": round(float(np.random.exponential(scale=25)), 2),
                "is_foreign": int(np.random.choice([0, 1], p=[0.93, 0.07])),
                "failed_pin_attempts": int(np.random.choice([0, 1, 2, 3], p=[0.88, 0.08, 0.03, 0.01]))
            }
            analysis = analyze_transaction(mock_tx)
            
            await websocket.send_json({
                "transaction": mock_tx,
                "analysis": analysis
            })
            await asyncio.sleep(3.0)
    except WebSocketDisconnect:
        print("Client disconnected from WebSocket stream.")