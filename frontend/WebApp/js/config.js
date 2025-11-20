export const views = ['home-view', 'maps-view', 'login-view', 'register-view', 'about-view'];

export const ALERT_GUIDE = {
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
        short_tl: 'Tumataas ang tubig sa ilog. Posible ang pagbaha, lalo na sa mababang lugar.',
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