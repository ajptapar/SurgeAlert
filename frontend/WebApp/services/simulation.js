      // Global variables and view management
        const views = ['home-view', 'maps-view', 'login-view'];
        let map;

        function showView(viewName) {
            const viewId = viewName.includes('-view') ? viewName : viewName + '-view';
            
            views.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            // Check if the view exists before trying to show it
            const target = document.getElementById(viewId);
            if (target) {
                target.style.display = 'block';
            } else if (viewId === 'register-view') {
                // Friendly warning if someone clicks the (currently) dead button
                console.warn('Register view is not available.');
                alert('Registration is currently disabled.');
            }


            if (viewId === 'maps-view' && !map) {
                setTimeout(initMap, 100);
            }
            
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            }
        }

        // Mobile Menu Toggle
        document.addEventListener('DOMContentLoaded', () => {
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
            
            showView('home');
            // initial run
            updateAlertStatus();
            
            // auto-run every 30 seconds
            setInterval(updateAlertStatus, 30000); 
            
            fetchWeather();
        });
