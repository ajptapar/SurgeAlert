# EdgeSystem/ml_model/model_predictor.py
import joblib
import os
import numpy as np
from config.settings import BASE_DIR

class ModelPredictor:
    def __init__(self):
        self.model = None
        model_path = os.path.join(BASE_DIR, 'ml_model', 'trained_models', 'flood_alert_model.joblib')
       
        try:
            self.model = joblib.load(model_path)
            print("AI model loaded successfully.")
        except FileNotFoundError:
            print(f"WARNING: AI model not found at {model_path}. Predictor will return default values.")
        except Exception as e:
            print(f"Error loading AI model: {e}")

    def predict(self, water_level, flow_rate, rise_rate):
        """
        Predicts the alert level using the trained AI model.
        """
        if self.model is None:
            return None

        try:
            # Convert input to numpy array (Standard format for scikit-learn)
            features = np.array([[water_level, flow_rate, rise_rate]])
           
            # prediction = self.model.predict(features)
            # return prediction[0] 
           
            print("AI model is loaded but prediction is currently a placeholder.")
            return None

        except Exception as e:
            print(f"Error during model prediction: {e}")
            return None