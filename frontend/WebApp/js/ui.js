import { views } from './config.js';
import { initMap } from './map.js';

let map; // Keep map instance reference

export function showView(viewName) {
    const viewId = viewName.includes('-view') ? viewName : viewName + '-view';
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById(viewId);
    if (target) target.style.display = 'block';
    if (viewId === 'maps-view' && !map) {
        map = initMap();
    }

    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && mobileMenu.style.display === 'block') mobileMenu.style.display = 'none';
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
    alert('OTP resent!');
}