import { showView } from "./views.js";
import { renderAlertGuide } from "../logic/alert.js";
import { initMap } from "../logic/map.js";
import { fetchWeather } from "../logic/weather.js";
import { simulateWaterLevel } from "../services/simulation.js";
import {
  initFirebase,
  loginUser,
  logoutUser,
  onAuthStateChange
} from "../services/firebase.js";
import { fetchCurrentAlertStatus } from "../services/backend.js";

document.addEventListener("DOMContentLoaded", () => {
  initFirebase();

  // Navigation
  document.querySelectorAll("[data-nav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const v = btn.getAttribute("data-nav");
      if (v === "maps") {
        showView("maps-view");
        setTimeout(() => initMap(), 200);
      } else {
        showView("home-view");
      }
    });
  });

  // Login Handling
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async e => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const pass = document.getElementById("login-password").value;

      const result = await loginUser(email, pass);

      const msg = document.getElementById("login-message");
      msg.classList.remove("hidden");

      if (result.success) {
        msg.textContent = "Login successful!";
        msg.className = "text-green-600";
        setTimeout(() => showView("home-view"), 500);
      } else {
        msg.textContent = result.error;
        msg.className = "text-red-600";
      }
    });
  }

  document.getElementById("logout-btn").addEventListener("click", logoutUser);

  // Auth State
  onAuthStateChange(user => {
    document.getElementById("login-btn").style.display = user ? "none" : "inline";
    document.getElementById("logout-btn").style.display = user ? "inline" : "none";
  });

  // Default View
  showView("home-view");

  // Initial Weather
  fetchWeather();

  async function updateFromBackend() {
    try {
      const status = await fetchCurrentAlertStatus();
      const waterLevel = status.waterLevelM ?? 0;
      const alertLevel = (status.alertLevel || "GREEN").toLowerCase();

      // Use backend description if present
      if (status.description) {
        const descEl = document.getElementById("alert-description");
        if (descEl) descEl.textContent = status.description;
      }

      renderAlertGuide(alertLevel, waterLevel);
    } catch (e) {
      // Fallback to simulated data if backend is down
      const level = simulateWaterLevel();
      let alertLevel = "green";
      if (level >= 15 && level < 16) alertLevel = "yellow";
      else if (level >= 16 && level < 18) alertLevel = "orange";
      else if (level >= 18) alertLevel = "red";

      renderAlertGuide(alertLevel, level);
    }
  }

  // Fetch once immediately
  updateFromBackend();

  // Refresh every 30 seconds
  setInterval(updateFromBackend, 30000);

  // Water level loop every 30s
  setInterval(() => {
    const level = simulateWaterLevel();
    let status = "green";
    if (level >= 15 && level < 16) status = "yellow";
    else if (level >= 16 && level < 18) status = "orange";
    else if (level >= 18) status = "red";

    renderAlertGuide(status, level);
  }, 30000);

  // Initial render
  // renderAlertGuide("green", 14.5);
});
