import { registerResident } from './api.js'; // --- ADDED IMPORT ---

// Helper to clean up old classes (omitted, logic same as before)

// Temporary storage for registration data between steps
let tempRegistrationData = {};

export function setupUIEventListeners() {
    // Mobile Menu Toggle (same as before)
    const mobileBtn = document.getElementById('mobile-menu-button');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.style.display = (mobileMenu.style.display === 'none' || !mobileMenu.style.display) ? 'block' : 'none';
        });
    }

    // Checkbox Logic (same as before)
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

    // --- UPDATED: Step 1 Form Submission (Collect Data) ---
    const phoneForm = document.getElementById('phone-form');
    if (phoneForm) {
        phoneForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. Capture Data
            tempRegistrationData = {
                fullName: document.getElementById('register-name').value,
                phoneNumber: document.getElementById('register-phone').value,
                address: document.getElementById('register-address').value,
                email: "" // Optional, can be empty if not asked in form
            };

            // 2. UI Transition
            document.getElementById('phone-step').style.display = 'none';
            document.getElementById('otp-step').style.display = 'block';
            document.getElementById('display-phone').textContent = tempRegistrationData.phoneNumber;
            
            // Simulate OTP sent
            alert('Development Mode: OTP is 123456');
        });
    }

    // --- UPDATED: Step 2 OTP Submission (Send to Backend) ---
    const otpForm = document.getElementById('otp-form');
    if (otpForm) {
        otpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const otp = document.getElementById('otp-code').value;
            const messageBox = document.getElementById('otp-message');

            // 1. Fake OTP Check
            if (otp !== '123456') {
                messageBox.textContent = 'Invalid OTP. Try 123456.';
                messageBox.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
                messageBox.style.display = 'block';
                return;
            }

            // 2. Real Backend Call
            try {
                messageBox.style.display = 'none';
                // Call the API
                await registerResident(tempRegistrationData);
                
                // Show Success Step
                showSuccessStep();
                
                // Clear Form
                if(phoneForm) phoneForm.reset();
                if(otpForm) otpForm.reset();
                
            } catch (error) {
                messageBox.textContent = 'Error: ' + error.message;
                messageBox.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
                messageBox.style.display = 'block';
            }
        });
    }
}

// Registration form navigation
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

export function showView(viewName) {
   // ... (View switching logic remains exactly the same as Page 17/21) ...
   // Copy existing showView logic here
   const viewId = viewName.includes('-view') ? viewName : viewName + '-view';
    const views = ['home-view', 'maps-view', 'login-view', 'register-view', 'about-view'];
    
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const target = document.getElementById(viewId);
    if (target) target.style.display = 'block';
    
    // Init map if needed
    if (viewId === 'maps-view' && window.initMap && !window.mapInstance) {
         window.mapInstance = window.initMap();
    }

    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
    }
}