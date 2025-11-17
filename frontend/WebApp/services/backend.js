// frontend/WebApp/services/backend.js
const API_BASE = "/api";

async function safeJsonFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchCurrentAlertStatus() {
  // GET /api/public/alerts/status
  return safeJsonFetch(`${API_BASE}/public/alerts/status`);
}

// Optional: latest raw sensor data if you want it later
export async function fetchLatestSensorData() {
  return safeJsonFetch(`${API_BASE}/sensor-data/latest`);
}