import { ALERT_GUIDE } from './config.js';

export async function updateAlertStatus() {
    const waterLevelEl = document.getElementById('water-level');
    const alertLevelEl = document.getElementById('alert-level');
    const alertDescEl = document.getElementById('alert-description');
    const actionsCard = document.getElementById('actions-card');
    const leftCard = document.getElementById('left-alert-card');
    const h2 = actionsCard.querySelector('h2');

    try {
        // Fetch from your Backend
        const response = await fetch('http://localhost:8080/api/public/alerts/status');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        // --- HANDLE OFFLINE STATE ---
        // Check waterLevelM (from DTO) instead of level
        if (data.waterLevelM === null || data.alertLevel === 'OFFLINE') {
            waterLevelEl.textContent = "--.-- m";
            alertLevelEl.textContent = "SENSOR OFFLINE";
            alertLevelEl.className = "text-lg mt-2 font-semibold text-gray-500";
            
            // Visuals for Offline
            resetClasses(leftCard, actionsCard, h2);
            leftCard.classList.add('bg-gray-200');
            actionsCard.classList.add('border-gray-400');
            h2.classList.add('text-gray-600');
            
            alertDescEl.innerHTML = `
                <div class="p-4 bg-gray-100 rounded text-gray-600">
                    <strong>System Status: Offline</strong><br/>
                    Waiting for connection to monitoring sensors.
                </div>`;
            return; 
        }

        // --- HANDLE ONLINE STATE ---
        const currentLevel = data.waterLevelM; // Matches DTO
        const levelKey = data.alertLevel.toLowerCase(); // Matches DTO ("GREEN" -> "green")

        // Update Text
        waterLevelEl.textContent = currentLevel.toFixed(2) + ' m';
        
        // Get text guide from config
        const guide = ALERT_GUIDE[levelKey] || ALERT_GUIDE['green'];
        alertLevelEl.textContent = guide.title;

        // Update Actions Description
        let html = '';
        html += `<div class="mb-2"><strong>${guide.title}</strong><br/><em>${guide.title_tl}</em></div>`;
        html += `<p class="mb-2 text-gray-700">${guide.short_en}</p>`;
        html += `<p class="mb-4 text-gray-700"><em>${guide.short_tl}</em></p>`;
        html += `<h4 class="font-semibold mb-2">Actions / Gabay</h4>`;
        html += `<ol class="list-decimal list-inside space-y-2 text-sm">`;
        guide.actions.forEach(act => {
            html += `<li><strong>${act.en}</strong><div class="text-gray-700">${act.tl}</div></li>`;
        });
        html += `</ol>`;
        alertDescEl.innerHTML = html;

        // Update Colors
        updateColors(levelKey, leftCard, actionsCard, h2);

    } catch (error) {
        console.error("Failed to fetch alert status:", error);
        // Fallback to Offline UI on error
        waterLevelEl.textContent = "--.-- m";
        alertLevelEl.textContent = "CONNECTION ERROR";
        leftCard.classList.add('bg-gray-200');
    }
}

// Helper to clean up old classes
function resetClasses(leftCard, actionsCard, h2) {
    const bgClasses = ['bg-green-100', 'bg-yellow-100', 'bg-orange-100', 'bg-red-100', 'bg-gray-200'];
    const borderClasses = ['border-green-500', 'border-yellow-400', 'border-orange-500', 'border-red-600', 'border-gray-400'];
    const textClasses = ['text-green-800', 'text-yellow-800', 'text-orange-800', 'text-red-800', 'text-gray-600'];
    
    leftCard.classList.remove(...bgClasses);
    actionsCard.classList.remove(...borderClasses);
    h2.classList.remove(...textClasses);
}

// Helper to apply colors based on status
function updateColors(levelKey, leftCard, actionsCard, h2) {
    resetClasses(leftCard, actionsCard, h2);
    
    if (levelKey === 'green') {
        leftCard.classList.add('bg-green-100');
        actionsCard.classList.add('border-green-500');
        h2.classList.add('text-green-800');
    } else if (levelKey === 'yellow') {
        leftCard.classList.add('bg-yellow-100');
        actionsCard.classList.add('border-yellow-400');
        h2.classList.add('text-yellow-800');
    } else if (levelKey === 'orange') {
        leftCard.classList.add('bg-orange-100');
        actionsCard.classList.add('border-orange-500');
        h2.classList.add('text-orange-800');
    } else if (levelKey === 'red') {
        leftCard.classList.add('bg-red-100');
        actionsCard.classList.add('border-red-600');
        h2.classList.add('text-red-800');
    }
}