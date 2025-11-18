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
                // 1. Disable the button on page load
                sendOtpButton.disabled = true;
                sendOtpButton.classList.add('opacity-50', 'cursor-not-allowed');

                // 2. Add listener to the checkbox
                consentCheckbox.addEventListener('change', function() {
                    if (this.checked) {
                        // If checked, enable the button
                        sendOtpButton.disabled = false;
                        sendOtpButton.classList.remove('opacity-50', 'cursor-not-allowed');
                    } else {
                        // If unchecked, disable the button
                        sendOtpButton.disabled = true;
                        sendOtpButton.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                });
            }

            showView('home');
            updateAlertStatus();
            setInterval(updateAlertStatus, 30000); 
            
            fetchWeather();
            fetchTides(); 
        });