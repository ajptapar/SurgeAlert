export async function fetchTides() {
    const apiKey = 'c9369bb7-d224-47d7-889d-7fcccc93e23d'; 
    const lat = 14.576; // Latitude for Manila South Harbor
    const lon = 120.963; // Longitude for Manila South Harbor
    
    const url = `https://www.worldtides.info/api/v3?extremes&lat=${14.576}&lon=${120.963}&key=${c9369bb7-d224-47d7-889d-7fcccc93e23d}`; //Check the url on API
    
    const container = document.getElementById('tide-data-container');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.status != 200) {
            // Handle API-specific errors
            console.error('WorldTides API Error:', data.error);
            container.innerHTML = `<p class="text-red-500 text-sm">Could not load tide data: ${data.error}</p>`;
        } else {
            // Success! Send data to be rendered
            updateTideUI(data.extremes);
        }
    } catch (error) {
        console.error('Failed to fetch tide data:', error);
        container.innerHTML = '<p class="text-red-500 text-sm">Could not load tide data.</p>';
    }
}

function updateTideUI(tides) {
    const container = document.getElementById('tide-data-container');
    
    const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const highTideIcon = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>';
    const lowTideIcon = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>';

    let html = `<p class="text-sm text-gray-500 mb-2">Data for: <strong>${today}</strong></p>`;
    html += '<ul class="space-y-2 text-sm">';

    if (!tides || tides.length === 0) {
        html += '<li class="text-gray-500">No tide data available for today.</li>';
    } else {
        tides.forEach(tide => {
            // The API returns time as a Unix timestamp (seconds), so multiply by 1000
            const tideTime = new Date(tide.dt * 1000);
            
            const timeString = tideTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            const isHigh = tide.type === 'High';
            const tideType = isHigh ? 'High Tide' : 'Low Tide';
            const icon = isHigh ? highTideIcon : lowTideIcon;
            const color = isHigh ? 'text-blue-700' : 'text-blue-500';

            html += `
                <li class="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span class="font-semibold ${color} flex items-center">
                        ${icon}
                        ${tideType}
                    </span>
                    <strong>${timeString}</strong>
                </li>
            `;
        });
    }

    html += '</ul>';
    container.innerHTML = html;
}