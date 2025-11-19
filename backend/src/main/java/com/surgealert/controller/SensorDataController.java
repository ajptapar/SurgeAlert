package com.surgealert.controller;

import com.surgealert.dto.SensorDataDTO;
import com.surgealert.entity.SensorData;
import com.surgealert.service.NotificationService;
import com.surgealert.service.ResidentService;
import com.surgealert.service.SensorDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sensor-data")
@CrossOrigin(origins = "*")
public class SensorDataController {

    private final SensorDataService sensorDataService;
    private final NotificationService notificationService;
    private final ResidentService residentService;

    // Inject all required services
    public SensorDataController(SensorDataService sensorDataService, 
                                NotificationService notificationService, 
                                ResidentService residentService) {
        this.sensorDataService = sensorDataService;
        this.notificationService = notificationService;
        this.residentService = residentService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveSensorData(@RequestBody SensorDataDTO dto) {
        // 1. Save the data to Database
        SensorData savedData = sensorDataService.saveSensorData(dto);

        // 2. Prepare the Response for the Raspberry Pi
        Map<String, Object> response = new HashMap<>();
        response.put("saved_id", savedData.getId());
        response.put("status", "success");

        // 3. Check Logic: Do we need to send an SMS?
        String level = savedData.getCurrentAlertLevel();
        
        // Retrieve the template based on level (YELLOW, ORANGE, RED, GREEN)
        String messageToSend = notificationService.getAlertMessage(level);

        // If a message exists for this level AND it is a critical level (or All Clear)
        // Note: You can adjust this 'if' condition if you only want to send SMS on RED/ORANGE
        if (messageToSend != null && (level.equals("ORANGE") || level.equals("RED") || level.equals("YELLOW") || level.equals("GREEN"))) {
            
            // A. Get all phone numbers
            List<String> phoneNumbers = residentService.getAllActivePhoneNumbers();

            // B. Add instructions to the response
            if (!phoneNumbers.isEmpty()) {
                response.put("command", "SEND_SMS");
                response.put("message", messageToSend);
                response.put("recipients", phoneNumbers);
            } else {
                response.put("command", "NO_RECIPIENTS");
            }
        } else {
            // No SMS needed (e.g., Normal readings without state change)
            response.put("command", "NO_ACTION");
        }

        // 4. Return JSON to Python
        return ResponseEntity.ok(response);
    }

    @GetMapping("/latest")
    public ResponseEntity<SensorDataDTO> getLatestSensorData() {
        SensorDataDTO latest = sensorDataService.getLatestSensorData();
        if (latest == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(latest);
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentSensorData(@RequestParam(defaultValue = "24") int hours) {
        return ResponseEntity.ok(sensorDataService.getRecentSensorData(hours));
    }
}