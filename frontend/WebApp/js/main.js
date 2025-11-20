import { showView, setupUIEventListeners, backToPhoneStep, resendOTP, showSuccessStep } from './ui.js';
import { updateAlertStatus } from './alert.js';
import { fetchWeather } from './api.js';
import { fetchTides } from './tides.js';
import { initializeAuth } from './auth.js'; // Import the new initializer function

// Make UI functions globally accessible for inline HTML event handlers
window.showView = showView;
window.backToPhoneStep = backToPhoneStep;
window.resendOTP = resendOTP;
window.showSuccessStep = showSuccessStep;

// This event ensures that the HTML is fully loaded before any JavaScript runs
document.addEventListener('DOMContentLoaded', () => {
    // Set up all event listeners (mobile menu, consent checkbox, etc.)
    setupUIEventListeners();

    // Initialize the Firebase authentication system (login forms, observers, etc.)
    initializeAuth();

    // Initialize the main app features
    showView('home');
    updateAlertStatus();
    setInterval(updateAlertStatus, 30000); 

    // Fetch data from external APIs
    fetchWeather();
    fetchTides(); 
});
