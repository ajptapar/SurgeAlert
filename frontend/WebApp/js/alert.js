import { ALERT_GUIDE } from './config.js';

export function updateAlertStatus() {
    const waterLevelEl = document.getElementById('water-level');
    const alertLevelEl = document.getElementById('alert-level');
    const alertDescEl = document.getElementById('alert-description');
    const actionsCard = document.getElementById('actions-card');
    const leftCard = document.getElementById('left-alert-card');

    let currentText = waterLevelEl.textContent.trim();
    let currentLevel = parseFloat(currentText) || 14.50;

    const change = (Math.random() - 0.45) * 0.25;
    let newLevel = currentLevel + change;

    if (newLevel < 13.5) newLevel = 13.5;
    if (newLevel > 19.0) newLevel = 19.0;

    waterLevelEl.textContent = newLevel.toFixed(2) + ' m';

    let levelKey;
    if (newLevel < 15) {
        levelKey = 'green';
    } else if (newLevel >= 15 && newLevel < 16) {
        levelKey = 'yellow';
    } else if (newLevel >= 16 && newLevel < 18) {
        levelKey = 'orange';
    } else {
        levelKey = 'red';
    }

    const guide = ALERT_GUIDE[levelKey];
    alertLevelEl.textContent = guide.title;

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

    const cardClassesToRemove = ['bg-green-100', 'bg-yellow-100', 'bg-orange-100', 'bg-red-100', 'text-green-800', 'text-yellow-800', 'text-orange-800', 'text-red-800'];
    leftCard.classList.remove(...cardClassesToRemove);
    if (levelKey === 'green') leftCard.classList.add('bg-green-100');
    if (levelKey === 'yellow') leftCard.classList.add('bg-yellow-100');
    if (levelKey === 'orange') leftCard.classList.add('bg-orange-100');
    if (levelKey === 'red') leftCard.classList.add('bg-red-100');

    const borderClassesToRemove = ['border-green-500', 'border-yellow-400', 'border-orange-500', 'border-red-600'];
    actionsCard.classList.remove(...borderClassesToRemove);

    const h2 = actionsCard.querySelector('h2');
    const h2TextClasses = ['text-gray-700', 'text-green-800', 'text-yellow-800', 'text-orange-800', 'text-red-800'];
    h2.classList.remove(...h2TextClasses);

    if (levelKey === 'green') {
        actionsCard.classList.add('border-green-500');
        h2.classList.add('text-green-800');
    } else if (levelKey === 'yellow') {
        actionsCard.classList.add('border-yellow-400');
        h2.classList.add('text-yellow-800');
    } else if (levelKey === 'orange') {
        actionsCard.classList.add('border-orange-500');
        h2.classList.add('text-orange-800');
    } else if (levelKey === 'red') {
        actionsCard.classList.add('border-red-600');
        h2.classList.add('text-red-800');
    } else {
        h2.classList.add('text-gray-700');
    }
}