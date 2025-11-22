// Weather Forecast
export async function fetchWeather() {
    const weatherContainer = document.getElementById('weather-forecast');
    const url = 'http://localhost:8080/api/external/weather';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Backend API Error: ${response.statusText}`);
        }
        const data = await response.json();
        
        // ... (Existing Weather Logic remains exactly the same, omitting for brevity) ...
        // ... (Copy the logic from your Page 4/5 here) ...
        
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        if(weatherContainer) weatherContainer.innerHTML = '<p class="text-red-500 col-span-full">Could not load weather data.</p>';
    }
}

// ... (Helper functions for weather remain the same) ...

// --- ADDED THIS FUNCTION ---
export async function registerResident(userData) {
    const url = 'http://localhost:8080/api/residents/register';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // No Authorization header needed because we added permitAll() in SecurityConfig
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Registration failed');
        }

        return await response.text(); // Backend returns a string message
    } catch (error) {
        console.error("Registration Error:", error);
        throw error; // Re-throw to be handled by UI
    }
}