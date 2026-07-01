# SurgeAlert

**SurgeAlert** is an IoT-enabled flood monitoring and predictive early-warning system designed for the Tullahan River in Barangay Marulas, Valenzuela. By integrating real-time edge sensors (ultrasonic water level, radar flow, and computer-vision-based surface velocity), an XGBoost machine learning model, a Java Spring Boot backend, and an interactive React dashboard, the application provides residents and administrators with real-time telemetry and predictive risk alerts.

---

## 🔗 Live Link

> **Deployed Application:** [https://surgealert-web.pages.dev/](https://surgealert-web.pages.dev/)  

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS v4, Chart.js, Leaflet Maps
* **Backend:** Spring Boot 3 (Java 17), Maven
* **Edge System:** Python, OpenCV (Computer Vision), SQLite
* **Machine Learning:** XGBoost, Scikit-learn, joblib

---

## 🚀 Key Features

* **Real-Time Sensor Fusion:** Collects water levels (ultrasonic), flow velocities (radar), and surface velocity estimates (camera optical flow) on the edge. Telemetry is streamed in real-time via MQTT and rendered as dynamic interactive charts (Chart.js) and maps (Leaflet).
* **Predictive ML Early Warning:** Forecasts river risk levels (Green, Yellow, Orange, Red) and water levels 1 hour ahead based on weather, tide height, and rainfall data.
* **Resilient SMS Dispatch:** Automatically broadcasts warning texts to residents. If the edge device loses internet, it falls back to an offline-first GSM module to broadcast messages directly from the hardware.
* **Edge Synchronization:** Syncs administrative settings, customized SMS alert templates, resident contact directories, and new trained ML model binaries between the backend and the Raspberry Pi.

---

## 💻 My Contributions

I designed, designed the UI, and wrote the code for the web application, backend API, Raspberry Pi runtime, and machine learning models:

### 1. Web Application & UI Design (Designed & Developed)
* **UI/UX Design:** Designed the layout, color-coded warning alert interfaces, and responsive navigation for both the public dashboard and admin consoles.
* **Interactive Mapping & Charts:** Built the dynamic Leaflet map showing evacuation site locations and real-time Chart.js telemetry charts.
* **Admin Functions:** Programmed portals to manage residents' directories, customize SMS warning templates, configure alert parameters, and audit system latency.

### 2. Raspberry Pi Development (Created & Authored all `EdgeSystem` code)
* **Core Runtime:** Authored the complete Python runtime script (`system_main.main_loop`) that manages sensor inputs and schedules data transmissions.
* **Sensor Interfacing:** Wrote drivers to read distance measurements from ultrasonic sensors (via GPIO) and velocity from radar sensors (via serial/USB).
* **Computer Vision:** Created and implemented the optical flow algorithm using **OpenCV** to estimate river surface velocity from camera feeds.
* **Offline Resilience:** Programmed a local SQLite cache on the Pi to log data during internet outages and push them to the backend upon reconnection. Wrote the serial interface to send SMS alerts directly via a hardware GSM module when offline.

### 3. Machine Learning Engineering (Created & Trained)
* **Model Pipeline:** Trained and designed the hybrid XGBoost classification/regression models to predict risk levels and water levels 1 hour in advance.
* **Dataset Preprocessing:** Utilized SMOTE (Synthetic Minority Over-sampling Technique) and custom class weight multipliers to solve extreme class imbalance (rare flood events).
* **Threshold Tuning:** Designed a validation grid search algorithm to tune custom decision boundaries, maximizing model recall and sensitivity.

### 4. Backend & Sync API (Developed)
* **Ingestion Client:** Configured the MQTT client to consume real-time sensor streams and sync them to the database.
* **Multi-DB Adapter:** Built dynamic driver logic allowing the application to connect to PostgreSQL (production) and MySQL (local development) automatically.
* **Sync Security:** Created authenticated API endpoints (`/api/edge/sync/*`) to securely distribute configurations, contact lists, and model binaries to the Pi.

---

## ⚙️ Setup Instructions

### Prerequisites
* **Java 17+** & **Maven**
* **Node.js 18+** & **npm**
* **MySQL** or **PostgreSQL**
* **Python 3.10+**

### 1. Run the Backend API
Create a database named `surgealert_db` in MySQL or PostgreSQL, set up your variables in a `.env` file in the root directory, then run:
```bash
cd backend
./mvnw spring-boot:run
```

### 2. Run the Frontend Dashboard
```bash
cd frontend/WebApp
npm install
npm run dev
```

### 3. Run the Edge System (Simulated / Lab Mode)
```bash
cd EdgeSystem
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m system_main.main_loop
```
