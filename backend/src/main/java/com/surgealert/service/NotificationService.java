package com.surgealert.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationService {

    private final Map<String, String> alertTemplates = new HashMap<>();
    // Format timestamp like "Oct 25, 10:30 AM"
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, hh:mm a");

    public NotificationService() {
        // --- A. ALERT ESCALATION TEMPLATES ---
        
        alertTemplates.put("YELLOW", 
            "SurgeAlert: YELLOW ALERT (Babala). Mabilis na pagtaas ng tubig sa Tullahan River. " +
            "Maging handa at subaybayan ang mga anunsyo. [%s] - Marulas BDRRMO");

        alertTemplates.put("ORANGE", 
            "SurgeAlert: ORANGE ALERT (Maghanda sa Paglikas). Kritikal ang antas ng tubig sa Tullahan River. " +
            "Ang mga nasa mababang lugar ay pinapayuhang lumikas na. [%s] - Marulas BDRRMO");

        alertTemplates.put("RED", 
            "SurgeAlert: RED ALERT (LUMIKAS LAHAT). Mapanganib ang antas ng tubig sa Tullahan River. " +
            "Mahigpit na ipinag-uutos ang paglikas ng lahat ng residente. Pumunta sa pinakamalapit na evacuation center. [%s] - Marulas BDRRMO");

        // --- B. ALERT DE-ESCALATION ---
        // We map "GREEN" to the "ALL-CLEAR" template
        alertTemplates.put("GREEN", 
            "SurgeAlert: ALL-CLEAR. Bumalik na sa normal ang antas ng tubig sa Tullahan River. " +
            "Ligtas nang bumalik sa inyong mga tahanan. Manatiling maingat. [%s] - Marulas BDRRMO");

        // --- C. SYSTEM TEMPLATES ---
        alertTemplates.put("OTP", 
            "Ang iyong SurgeAlert OTP ay: [%s]. Huwag itong ibahagi sa iba. Ang code na ito ay valid sa loob ng 5 minuto.");
            
        alertTemplates.put("MANUAL", 
            "SurgeAlert - Marulas BDRRMO: %s. [%s]");
    }

    public String getAlertMessage(String level) {
        String template = alertTemplates.get(level.toUpperCase());
        if (template == null) return null; // No message for unknown levels

        // Replace [%s] with current Timestamp
        String timestamp = LocalDateTime.now().format(formatter);
        return String.format(template, timestamp);
    }

    public String getOtpMessage(String otpCode) {
        String template = alertTemplates.get("OTP");
        // Replace [%s] with the OTP code
        return String.format(template, otpCode);
    }
    
    public String getManualMessage(String customMessage) {
        String template = alertTemplates.get("MANUAL");
        String timestamp = LocalDateTime.now().format(formatter);
        // Replace first %s with message, second %s with timestamp
        return String.format(template, customMessage, timestamp);
    }
}