package com.surgealert.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "residents")
public class Resident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    // ADDED EMAIL FIELD (Not unique, as requested)
    @Column
    private String email;

    @Column(nullable = false)
    private LocalDateTime registrationDate;

    @Column(nullable = false)
    private Boolean isActive = true;

    @PrePersist
    protected void onCreate() {
        registrationDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    // ADDED EMAIL GETTER/SETTER
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDateTime getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDateTime registrationDate) { this.registrationDate = registrationDate; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}