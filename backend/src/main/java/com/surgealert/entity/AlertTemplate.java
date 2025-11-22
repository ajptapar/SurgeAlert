package com.surgealert.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "alert_templates")
public class AlertTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Use specific keys: "YELLOW", "ORANGE", "RED", "GREEN", "OTP", "MANUAL"
    @Column(unique = true, nullable = false)
    private String alertType; 

    @Column(nullable = false, columnDefinition = "TEXT")
    private String template;

    public AlertTemplate() {}

    public AlertTemplate(String alertType, String template) {
        this.alertType = alertType;
        this.template = template;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAlertType() { return alertType; }
    public void setAlertType(String alertType) { this.alertType = alertType; }

    public String getTemplate() { return template; }
    public void setTemplate(String template) { this.template = template; }
}