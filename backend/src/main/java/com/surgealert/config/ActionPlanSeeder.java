package com.surgealert.config;

import com.surgealert.entity.ActionPlan;
import com.surgealert.repository.ActionPlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class ActionPlanSeeder implements CommandLineRunner {

    private final ActionPlanRepository repository;

    public ActionPlanSeeder(ActionPlanRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only run if the table is empty
        if (repository.count() == 0) {
            
            // --- GREEN ---
            ActionPlan green = new ActionPlan();
            green.setAlertLevel("GREEN");
            green.setTitleEn("LEVEL 1 GREEN: BE AWARE & PREPARE");
            green.setTitleTl("LEVEL 1 GREEN: MAGING HANDA AT ALERTO");
            green.setShortDescriptionEn("The river is safe. There is no immediate flood risk.");
            green.setShortDescriptionTl("Ligtas ang ilog. Walang direktang panganib ng baha.");
            green.setActionsEn(List.of(
                "KNOW YOUR PLAN: Review your family's evacuation route and check your emergency \"Go Bag.\"",
                "STAY INFORMED: Monitor official weather forecasts."
            ));
            green.setActionsTl(List.of(
                "BALIKAN ANG PLANO: Tingnan muli ang inyong evacuation route at siguraduhing kumpleto ang laman ng inyong \"Go Bag.\"",
                "ANTABAYANAN ANG BALITA: Subaybayan ang mga ulat ng panahon mula sa mga opisyal na ahensya."
            ));
            repository.save(green);

            // --- YELLOW ---
            ActionPlan yellow = new ActionPlan();
            yellow.setAlertLevel("YELLOW");
            yellow.setTitleEn("⚠️ LEVEL 2 YELLOW: GET READY");
            yellow.setTitleTl("⚠️ LEVEL 2 YELLOW: HUMANDA");
            yellow.setShortDescriptionEn("The river is rising. Flooding is possible, especially in low-lying areas.");
            yellow.setShortDescriptionTl("Tumataas ang tubig sa ilog. Posible ang pagbaha, lalo na sa mababang lugar.");
            yellow.setActionsEn(List.of(
                "LISTEN: Pay close attention to official announcements.",
                "CHARGE: Keep phones, power banks, and flashlights fully charged.",
                "SECURE YOUR HOME: Move valuables and documents to higher ground."
            ));
            yellow.setActionsTl(List.of(
                "MAKINIG SA ANUNSYO: Maging alerto sa mga anunsyo mula sa inyong barangay o DRRMO.",
                "I-CHARGE ANG MGA GAMIT: Siguraduhing full-charge ang mga cellphone, power bank, at flashlight.",
                "I-AKYAT ANG GAMIT: Ilipat ang mahahalagang kagamitan at dokumento sa mas mataas at ligtas na lugar."
            ));
            repository.save(yellow);

            // --- ORANGE ---
            ActionPlan orange = new ActionPlan();
            orange.setAlertLevel("ORANGE");
            orange.setTitleEn("🟠 LEVEL 3 ORANGE: PREPARE TO EVACUATE");
            orange.setTitleTl("🟠 LEVEL 3 ORANGE: MAGHANDA PARA LUMIKAS");
            orange.setShortDescriptionEn("The situation is dangerous. Flooding is imminent or already starting in high-risk areas.");
            orange.setShortDescriptionTl("Delikado na ang sitwasyon. Malapit nang bumaha o nagsimula na ang pagbaha sa mga high-risk na lugar.");
            orange.setActionsEn(List.of(
                "EVACUATE IF ADVISED: If you are in a high-risk area, move to a safe place now.",
                "BE READY TO LEAVE: Grab your \"Go Bag.\" Help neighbors who may need assistance.",
                "PROTECT YOUR HOME: Turn off electricity and water only if it is safe to do so before leaving."
            ));
            orange.setActionsTl(List.of(
                "SIMULAN NANG LUMIKAS: Kung kayo ay nasa high-risk na lugar, umpisahan na ang paglikas sa ligtas na lugar.",
                "IHANDA NA ANG \"GO BAG\": Kunin na ang inyong \"Go Bag.\" Tulungan ang mga kapitbahay na nangangailangan.",
                "ISARADO ANG BAHAY: Patayin ang kuryente at isara ang linya ng tubig kung ligtas gawin bago umalis."
            ));
            repository.save(orange);

            // --- RED ---
            ActionPlan red = new ActionPlan();
            red.setAlertLevel("RED");
            red.setTitleEn("🚨 LEVEL 4 RED: EVACUATE NOW!");
            red.setTitleTl("🚨 LEVEL 4 RED: LUMIKAS NA!");
            red.setShortDescriptionEn("The flood has reached a critical level. This is a mandatory evacuation order.");
            red.setShortDescriptionTl("Nasa kritikal na antas na ang baha. Ipinag-uutos ang sapilitang paglikas.");
            red.setActionsEn(List.of(
                "LEAVE IMMEDIATELY: For your safety, you must evacuate now.",
                "AVOID FLOODWATER: Do not walk or drive through flooded areas.",
                "GO TO SAFETY: Proceed directly to the nearest evacuation center or high ground."
            ));
            red.setActionsTl(List.of(
                "UMALIS AGAD: Para sa inyong kaligtasan, dapat na kayong lumikas ngayon.",
                "IWASAN ANG BAHA: Huwag maglakad o magmaneho sa mga lugar na lubog sa baha.",
                "PUMUNTA SA LIGTAS NA LUGAR: Dumiretso agad sa pinakamalapit na evacuation center o sa mas mataas na lugar."
            ));
            repository.save(red);

            System.out.println("SUCCESS: Action Plans have been inserted into the database.");
        }
    }
}