// 1. Define the Backend URL
export const API_BASE_URL = "http://localhost:8080/api";

export const views = ['home-view', 'maps-view', 'login-view', 'register-view', 'about-view'];

/**
 * 2. New Function to Fetch Data
 * Instead of exporting a hardcoded ALERT_GUIDE, we export this function.
 * It calls the backend, gets the data from MySQL, and formats it 
 * so your existing frontend code can understand it.
 */
export async function fetchAlertGuide() {
    try {
        // Call the Spring Boot Endpoint we set up
        const response = await fetch(`${API_BASE_URL}/public/action-plans`);
        
        if (!response.ok) {
            console.error("Failed to fetch Action Plans from Backend");
            return null;
        }

        const data = await response.json();
        
        // 3. Transform Backend Data to Frontend Format
        // The backend sends a List, but your frontend expects an Object with keys (green, yellow, etc.)
        const guide = {};
        
        data.forEach(plan => {
            const key = plan.alertLevel.toLowerCase(); // "RED" -> "red"

            // Combine the separate English and Tagalog action lists
            const combinedActions = plan.actionsEn.map((actionEn, index) => ({
                en: actionEn,
                tl: plan.actionsTl[index] || "" 
            }));

            // Build the object structure your UI expects
            guide[key] = {
                title: plan.titleEn,
                title_tl: plan.titleTl,
                short_en: plan.shortDescriptionEn,
                short_tl: plan.shortDescriptionTl,
                actions: combinedActions
            };
        });

        return guide;

    } catch (error) {
        console.error("Error connecting to backend:", error);
        return null;
    }
}