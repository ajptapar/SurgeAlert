    const ALERT_GUIDE = {
            green: {
                title: 'LEVEL 1 GREEN: BE AWARE & PREPARE',
                title_tl: 'LEVEL 1 GREEN: MAGING HANDA AT ALERTO',
                short_en: 'The river is safe. There is no immediate flood risk.',
                short_tl: 'Ligtas ang ilog. Walang direktang panganib ng baha.',
                actions: [
                    {en: 'KNOW YOUR PLAN: Review your family\'s evacuation route and check your emergency "Go Bag."', tl: 'BALIKAN ANG PLANO: Tingnan muli ang inyong evacuation route at siguraduhing kumpleto ang laman ng inyong "Go Bag."'},
                    {en: 'STAY INFORMED: Monitor official weather forecasts.', tl: 'ANTABAYANAN ANG BALITA: Subaybayan ang mga ulat ng panahon mula sa mga opisyal na ahensya.'}
                ]
            },
            yellow: {
                title: '⚠️ LEVEL 2 YELLOW: GET READY',
                title_tl: '⚠️ LEVEL 2 YELLOW: HUMANDA',
                short_en: 'The river is rising. Flooding is possible, especially in low-lying areas.',
                short_tl: 'Tumataas ang tubig sa ilog. Posible ang pagbaha, lalo na sa mabababang lugar.',
                actions: [
                    {en: 'LISTEN: Pay close attention to official announcements.', tl: 'MAKINIG SA ANUNSYO: Maging alerto sa mga anunsyo mula sa inyong barangay o DRRMO.'},
                    {en: 'CHARGE: Keep phones, power banks, and flashlights fully charged.', tl: 'I-CHARGE ANG MGA GAMIT: Siguraduhing full-charge ang mga cellphone, power bank, at flashlight.'},
                    {en: 'SECURE YOUR HOME: Move valuables and documents to higher ground.', tl: 'I-AKYAT ANG GAMIT: Ilipat ang mahahalagang kagamitan at dokumento sa mas mataas at ligtas na lugar.'}
                ]
            },
            orange: {
                title: '🟠 LEVEL 3 ORANGE: PREPARE TO EVACUATE',
                title_tl: '🟠 LEVEL 3 ORANGE: MAGHANDA PARA LUMIKAS',
                short_en: 'The situation is dangerous. Flooding is imminent or already starting in high-risk areas.',
                short_tl: 'Delikado na ang sitwasyon. Malapit nang bumaha o nagsimula na ang pagbaha sa mga high-risk na lugar.',
                actions: [
                    {en: 'EVACUATE IF ADVISED: If you are in a high-risk area, move to a safe place now.', tl: 'SIMULAN NANG LUMIKAS: Kung kayo ay nasa high-risk na lugar, umpisahan na ang paglikas sa ligtas na lugar.'},
                    {en: 'BE READY TO LEAVE: Grab your "Go Bag." Help neighbors who may need assistance.', tl: 'IHANDA NA ANG "GO BAG": Kunin na ang inyong "Go Bag." Tulungan ang mga kapitbahay na nangangailangan.'},
                    {en: 'PROTECT YOUR HOME: Turn off electricity and water only if it is safe to do so before leaving.', tl: 'ISARADO ANG BAHAY: Patayin ang kuryente at isara ang linya ng tubig kung ligtas gawin bago umalis.'}
                ]
            },
            red: {
                title: '🚨 LEVEL 4 RED: EVACUATE NOW!',
                title_tl: '🚨 LEVEL 4 RED: LUMIKAS NA!',
                short_en: 'The flood has reached a critical level. This is a mandatory evacuation order.',
                short_tl: 'Nasa kritikal na antas na ang baha. Ipinag-uutos ang sapilitang paglikas.',
                actions: [
                    {en: 'LEAVE IMMEDIATELY: For your safety, you must evacuate now.', tl: 'UMALIS AGAD: Para sa inyong kaligtasan, dapat na kayong lumikas ngayon.'},
                    {en: 'AVOID FLOODWATER: Do not walk or drive through flooded areas.', tl: 'IWASAN ANG BAHA: Huwag maglakad o magmaneho sa mga lugar na lubog sa baha.'},
                    {en: 'GO TO SAFETY: Proceed directly to the nearest evacuation center or high ground.', tl: 'PUMUNTA SA LIGTAS NA LUGAR: Dumiretso agad sa pinakamalapit na evacuation center o sa mas mataas na lugar.'}
                ]
            }
        };

        function updateAlertStatus() {
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

            leftCard.classList.remove('bg-green-100','bg-yellow-100','bg-orange-100','bg-red-100','text-green-800','text-yellow-800','text-orange-800','text-red-800');
            if (levelKey === 'green') leftCard.classList.add('bg-green-100');
            if (levelKey === 'yellow') leftCard.classList.add('bg-yellow-100');
            if (levelKey === 'orange') leftCard.classList.add('bg-orange-100');
            if (levelKey === 'red') leftCard.classList.add('bg-red-100');

            actionsCard.classList.remove('border-green-500','border-yellow-400','border-orange-500','border-red-600');

            const h2 = actionsCard.querySelector('h2');
            h2.classList.remove('text-gray-700', 'text-green-800', 'text-yellow-800', 'text-orange-800', 'text-red-800');

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