package com.surgealert.service;

import com.surgealert.dto.AlertStatusDTO;
import com.surgealert.entity.SensorData;
import com.surgealert.repository.SensorDataRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AlertService {
    private final SensorDataRepository sensorDataRepository;

    public AlertService(SensorDataRepository sensorDataRepository) {
        this.sensorDataRepository = sensorDataRepository;
    }

    public AlertStatusDTO getCurrentAlertStatus() {
        try {
            SensorData latest = sensorDataRepository.findFirstByOrderByTimestampDesc()
                    .orElse(null);

            if (latest == null) {
                return new AlertStatusDTO(0.0, "GREEN", "No data available", LocalDateTime.now());
            }

            String description = getAlertDescription(latest.getCurrentAlertLevel());
            return new AlertStatusDTO(
                    latest.getWaterLevelM() != null ? latest.getWaterLevelM() : 0.0,
                    latest.getCurrentAlertLevel() != null ? latest.getCurrentAlertLevel() : "GREEN",
                    description,
                    latest.getTimestamp() != null ? latest.getTimestamp() : LocalDateTime.now()
            );
        } catch (Exception e) {
            // Return default status if there's any error
            return new AlertStatusDTO(0.0, "GREEN", "System initializing. No data available yet.", LocalDateTime.now());
        }
    }

    private String getAlertDescription(String alertLevel) {
        Map<String, String> descriptions = new HashMap<>();
        descriptions.put("GREEN", "No immediate threat. River is at a safe level.");
        descriptions.put("YELLOW", "First alarm. Prepare for possible evacuation.");
        descriptions.put("ORANGE", "Second alarm. Evacuate low-lying areas.");
        descriptions.put("RED", "Third and final alarm. Forced evacuation in progress.");
        return descriptions.getOrDefault(alertLevel, "Unknown alert level");
    }
}