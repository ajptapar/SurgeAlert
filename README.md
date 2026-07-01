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

I designed the UI, and wrote the code for the web application, backend API, Raspberry Pi runtime, and machine learning models:

### 1. Web Application & UI Design (Designed & Developed)
* **UI/UX Design:** Designed responsive layouts, color-coded warning alert interfaces, and navigation for public and admin dashboards using Tailwind CSS v4.
* **Interactive Mapping & Charts:** Developed dynamic Leaflet map integrations for sensor locations and real-time Chart.js telemetry visualizations.
* **Admin Functions:** Programmed portals for managing residents' directories, customized SMS templates, configurations, and canary latency metrics.

### 2. Raspberry Pi Development (Created & Authored all `EdgeSystem` code)
* **Core Runtime:** Authored the Python runtime system (`system_main.main_loop`) to schedule sensor inputs and manage telemetry packets.
* **Sensor & CV Integration:** Developed hardware drivers for ultrasonic/radar sensors and implemented an OpenCV optical flow algorithm for surface velocity estimation.
* **Offline Resilience:** Built a local SQLite cache for offline logging and a hardware GSM serial interface to broadcast SMS alerts during network outages.

### 3. Machine Learning Engineering (Created & Trained)
* **Predictive Pipeline:** Trained hybrid XGBoost classifier and regressor models to predict risk categories and water levels 1 hour in advance.
* **Class Imbalance:** Applied SMOTE (Synthetic Minority Over-sampling Technique) and custom class-weight boosting to handle rare flood events.
* **Threshold Tuning:** Designed a validation grid search algorithm to optimize multi-class probability decision boundaries for high-risk warning bands.

### 4. Backend & Sync API (Developed)
* **Telemetry Ingestion:** Configured MQTT clients to consume real-time edge telemetry and asynchronously ingest it into the database.
* **Multi-DB Adaptation:** Coded dynamic database configuration drivers supporting automated fallback between PostgreSQL (production) and MySQL (local development).
* **Edge Synchronization:** Built authenticated Spring Boot API endpoints (`/api/edge/sync/*`) to securely distribute configurations, contacts, and model binaries to the Pi.

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
