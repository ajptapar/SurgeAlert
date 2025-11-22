package com.surgealert.dto;

public class AlertTemplateDTO {
    private Long id;
    private String alertType;
    private String template;

    public AlertTemplateDTO() {}

    public AlertTemplateDTO(Long id, String alertType, String template) {
        this.id = id;
        this.alertType = alertType;
        this.template = template;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAlertType() { return alertType; }
    public void setAlertType(String alertType) { this.alertType = alertType; }

    public String getTemplate() { return template; }
    public void setTemplate(String template) { this.template = template; }
}