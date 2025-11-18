import { showView, setupUIEventListeners, backToPhoneStep, resendOTP, showSuccessStep } from './ui.js';
import { updateAlertStatus } from './alert.js';
import { fetchWeather } from './api.js';
import { fetchTides } from './tides.js'; 
// Make functions accessible from inline HTML event handlers
window.showView = showView;
window.backToPhoneStep = backToPhoneStep;
window.resendOTP = resendOTP;
window.showSuccessStep = showSuccessStep;

document.addEventListener('DOMContentLoaded', () => {
    setupUIEventListeners();

    // Initialize the app
    showView('home');
    updateAlertStatus();
    setInterval(updateAlertStatus, 30000); 

    fetchWeather();
    fetchTides(); 
});