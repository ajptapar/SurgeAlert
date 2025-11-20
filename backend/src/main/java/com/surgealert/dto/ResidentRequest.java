package com.surgealert.dto;

public class ResidentRequest {
    private String phoneNumber;
    private String email; // ADDED

    public ResidentRequest() {}

    public ResidentRequest(String phoneNumber, String email) {
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    // ADDED GETTER/SETTER
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}