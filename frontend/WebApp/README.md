# SurgeAlert — Modular Flood Monitoring System

SurgeAlert is a web-based flood monitoring and early-warning system designed for Barangay Marulas, Valenzuela City.  
This version uses a clean, lightweight modular structure inspired by EdgeSystem-style organization, but simplified for easier development and maintenance.

---

## 📁 Project Structure

SurgeAlert/
│
├── core/
│ ├── main.js # Main app initializer (navigation, events, simulation loop)
│ └── views.js # Handles switching between Home, Maps, and Login views
│
├── logic/
│ ├── alert.js # Alert levels + water level UI logic
│ ├── map.js # Leaflet map with evacuation markers
│ └── weather.js # Weather API fetch and forecast rendering
│
├── services/
│ ├── firebase.js # Firebase initialization + login/logout handler
│ └── simulation.js # Simulated water level generator (placeholder for sensors)
│
├── assets/
│ ├── css/
│ │ └── styles.css # Project styling
│ ├── data/
│ │ └── tides.json # Example tide dataset
│ └── templates/
│ └── alert.html # Optional HTML template for alerts
│
└── index.html # Main UI file (loads all modules)

---

## 🚀 Features

### 🌧️ Real-Time Water Level Display  
- Simulates rising and falling river levels  
- Automatically assigns alert status:
  - 🟢 **Green — Safe**
  - 🟡 **Yellow — Caution**
  - 🟠 **Orange — Prepare**
  - 🔴 **Red — Evacuate Now**

### ☁️ Weather Forecast  
- 4-day forecast using Open-Meteo API  
- Displays date and temperature range  
- Lightweight, fast, no API key needed

### 🗺️ Interactive Evacuation Map  
- Powered by Leaflet  
- Shows nearby evacuation centers  
- Click markers to view names and locations

### 🔐 User Authentication (Firebase)
- Login / Logout system  
- Auth state detection  
- Ready for role-based access

### 📦 Modular JavaScript Architecture  
Each major feature is separated into its own module:
- `logic/` for main app logic  
- `services/` for APIs and backend connections  
- `core/` for navigation and app control

This makes the project **easier to understand, maintain, and expand**.

---

## 🛠️ Technologies Used

- **JavaScript ES Modules**
- **HTML5 + TailwindCSS**
- **Firebase Authentication**
- **Leaflet Maps**
- **Open-Meteo Weather API**
- **Modular Project Architecture**

---

## ▶️ How to Run the Project

Because ES modules do **not** load using `file:///`,  
you must run the project using a simple web server.

### **Option 1 — Python (Recommended)**
```sh
python -m http.server 8000
Then open:
http://localhost:8000

🔧 Customization
Change Water-Level Behavior

services/simulation.js

Change Alert Thresholds

core/main.js

Customize Alert UI

logic/alert.js

Modify Map Locations

logic/map.js

🚧 Future Improvements

SMS alert integration

Real IoT sensor data (ESP32/LoRa)

Admin dashboard

Push notifications

ML-based flood prediction

Offline/PWA support

👨‍💻 Developer Notes

This project was intentionally structured to be clean and scalable.
Each folder handles one responsibility, allowing new modules to be added easily.

If you want a more advanced EdgeSystem-style layout later, it can be expanded naturally.

📜 License
This project is licensed under the MIT License.