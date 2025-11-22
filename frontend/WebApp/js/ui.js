import { views } from './config.js';
import { initMap } from './map.js';
import { registerResident } from './api.js';

let map; // Keep map instance reference
let tempRegistrationData = {}; // Store data between Step 1 and Step 2

export function showView(viewName) {
    const viewId = viewName.includes('-view') ? viewName : viewName + '-view';
    
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const target = document.getElementById(viewId);
    if (target) target.style.display = 'block';

    // Initialize Map only when Maps view is opened
    if (viewId === 'maps-view' && !map) {
        map = initMap();
    }

    // Close Mobile Menu on click
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
    }
}

export function setupUIEventListeners() {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-button');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.style.display === 'none' || !mobileMenu.style.display) {
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.style.display = 'none';
            }
        });
    }

    // Privacy Consent Checkbox Logic
    const consentCheckbox = document.getElementById('privacy-consent');
    const sendOtpButton = document.getElementById('send-otp-btn');
    if (consentCheckbox && sendOtpButton) {
        sendOtpButton.disabled = true;
        sendOtpButton.classList.add('opacity-50', 'cursor-not-allowed');
        
        consentCheckbox.addEventListener('change', function() {
            if (this.checked) {
                sendOtpButton.disabled = false;
                sendOtpButton.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                sendOtpButton.disabled = true;
                sendOtpButton.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    // --- STEP 1: Phone Form Submission ---
    const phoneForm = document.getElementById('phone-form');
    if (phoneForm) {
        phoneForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. Capture Data from Inputs
            const nameInput = document.getElementById('register-name');
            const phoneInput = document.getElementById('register-phone');
            const addressInput = document.getElementById('register-address');

            tempRegistrationData = {
                fullName: nameInput.value,
                phoneNumber: phoneInput.value,
                address: addressInput.value,
                email: "" // Not collecting email in this form based on UI
            };

            // 2. Switch UI to OTP Step
            document.getElementById('phone-step').style.display = 'none';
            document.getElementById('otp-step').style.display = 'block';
            
            // Update the "Sent to..." text
            const displayPhone = document.getElementById('display-phone');
            if(displayPhone) displayPhone.textContent = tempRegistrationData.phoneNumber;
            
            // Alert for Dev Mode
            alert('Development Mode: Your OTP is 123456');
        });
    }

    // --- STEP 2: OTP Form Submission ---
    const otpForm = document.getElementById('otp-form');
    if (otpForm) {
        otpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const otpInput = document.getElementById('otp-code');
            const messageBox = document.getElementById('otp-message');
            const otp = otpInput.value;

            // 1. Simple OTP Check (Simulated)
            if (otp !== '123456') {
                if (messageBox) {
                    messageBox.textContent = 'Invalid OTP. Try 123456.';
                    messageBox.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
                    messageBox.style.display = 'block';
                }
                return;
            }

            // 2. Send Data to Backend
            try {
                if (messageBox) messageBox.style.display = 'none';
                
                // Call the API function
                await registerResident(tempRegistrationData);
                
                // Show Success Screen
                showSuccessStep();
                
                // Clear Forms
                if(phoneForm) phoneForm.reset();
                if(otpForm) otpForm.reset();
                
            } catch (error) {
                if (messageBox) {
                    messageBox.textContent = 'Error: ' + error.message;
                    messageBox.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
                    messageBox.style.display = 'block';
                }
            }
        });
    }
}

export function backToPhoneStep() {
    document.getElementById('otp-step').style.display = 'none';
    document.getElementById('phone-step').style.display = 'block';
}

export function showSuccessStep() {
    document.getElementById('otp-step').style.display = 'none';
    document.getElementById('phone-step').style.display = 'none';
    document.getElementById('success-step').style.display = 'block';
}

export function resendOTP() {
    alert('OTP resent! (Dev Mode: 123456)');
}