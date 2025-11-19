# SurgeAlert: An Intelligent Flood Level Prediction and Monitoring System

SurgeAlert is a web-based flood monitoring and early-warning system designed for Barangay Marulas, Valenzuela City.  
This version uses a clean, lightweight modular structure inspired by EdgeSystem-style organization, but simplified for easier development and maintenance.

---

## 📁 Project Structure

SurgeAlert/
│
├── js/
│ ├── alert.js # Logic for water level simulation and dynamic UI updates.
│ ├── api.js # Fetches 5-day weather forecast data from Open-Meteo.
│ ├── auth.js # Handles all Firebase authentication (login, logout, state observer).
│ ├── config.js # Stores shared constants like view names and alert guide text.
│ ├── main.js # The main entry point; initializes the app and event listeners.
│ ├── map.js # Initializes the Leaflet.js interactive map and evacuation markers.
│ ├── tides.js # Fetches daily tide data from the WorldTides API.
│ └── ui.js # Manages UI interactions like switching views and handling forms.
│
├── index.html # The single HTML file for the entire application.
├── styles.css # All styling, variables, and animations for the project.
└── README.md # This file.

---

## 🚀 Features

### 🌧️ Real-Time Water Level Display
- Simulates rising and falling river levels with a dynamic display.
- Automatically assigns alert status and detailed action guides:
  - 🟢 **Green — Normal**
  - 🟡 **Yellow — Caution**
  - 🟠 **Orange — Prepare**
  - 🔴 **Red — Evacuate**

### ☁️ 5-Day Weather Forecast
- Fetches and displays a 5-day forecast using the free Open-Meteo API.
- Shows the day, a weather icon, a short description, and the max/min temperatures.
- Lightweight and requires no API key.

### 🌊 Daily Tide Forecast
- Displays high and low tide times for the current day from the WorldTides API.
- Helps residents understand how tides may affect the river's drainage.

### 🗺️ Interactive Evacuation Map
- Powered by Leaflet.js for a fast and interactive experience.
- Shows predefined evacuation centers in the area.
- Users can click on markers to view the name of the location.

### 🔐 User Authentication (Firebase)
- Simple and secure Login / Logout system using Firebase Authentication.
- Automatically detects user auth state to update the UI.
- Ready to be expanded with role-based access or user profiles.

### 📦 Modular JavaScript Architecture
Each feature is cleanly separated into its own JavaScript module within the `js/` directory. This flat structure makes the project **easy to understand, maintain, and expand** without complex folder navigation.

---

## 🛠️ Technologies Used

- **JavaScript (ES Modules)**
- **HTML5 & TailwindCSS**
- **Firebase Authentication**
- **Leaflet.js** (Interactive Maps)
- **Open-Meteo API** (Weather Data)
- **World Tides API** (Tide Data)

---

## ▶️ How to Run the Project

Because this project uses ES Modules, you cannot run it by opening the `index.html` file directly in your browser (`file:///...`). You must serve it from a local web server.

### **Option 1: Using the VS Code Live Server Extension**
1.  Install the **Live Server** extension from the Visual Studio Code marketplace.
2.  Right-click on `index.html` in your file explorer and select "Open with Live Server".

### **Option 2: Using Python (If installed)**
1.  Open your terminal or command prompt in the project's root directory.
2.  Run the following command:
    ```sh
    python -m http.server
    ```
3.  Open your web browser and go to: **`http://localhost:8000`**

---

## 🔧 Customization

-   **Change Alert Thresholds & Water Level Logic:**
    -   Modify the `if/else` conditions in `js/alert.js`.

-   **Update Alert Text & Action Guides:**
    -   Edit the `ALERT_GUIDE` object in `js/config.js`.

-   **Modify Map Locations:**
    -   Update the `evacuationSites` array in `js/map.js`.

-   **Change API Keys or Endpoints:**
    -   Edit the constants in `js/tides.js` or `js/api.js`.

---

## 🚧 Future Improvements

-   [ ] **SMS Alert Integration** (via Twilio or other services)
-   [ ] **Real IoT Sensor Data** (replace simulation with data from an ESP32, etc.)
-   [ ] **Admin Dashboard** for managing users and alerts.
-   [ ] **Push Notifications** for real-time browser alerts.
-   [ ] **Offline Support** (Progressive Web App - PWA).

---

## 📜 License

This project is licensed under the MIT License.
