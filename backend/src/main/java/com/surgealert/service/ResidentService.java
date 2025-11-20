package com.surgealert.service;

import com.surgealert.dto.ResidentRequest; // Import the DTO
import com.surgealert.entity.Resident;
import com.surgealert.repository.ResidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResidentService {
    private final ResidentRepository residentRepository;

    public ResidentService(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    // UPDATED: Takes ResidentRequest object now
    public Resident registerResident(ResidentRequest request) {
        if (residentRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number already registered");
        }
        Resident resident = new Resident();
        resident.setPhoneNumber(request.getPhoneNumber());
        resident.setEmail(request.getEmail()); // SAVE EMAIL
        return residentRepository.save(resident);
    }

    public void unregisterResident(String phoneNumber) {
        Resident resident = residentRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new RuntimeException("Phone number not found"));
        resident.setIsActive(false);
        residentRepository.save(resident);
    }

    public List<String> getAllActivePhoneNumbers() {
        return residentRepository.findByIsActiveTrue().stream()
                .map(Resident::getPhoneNumber)
                .collect(Collectors.toList());
    }

    // ADDED: Method to get all active emails
    public List<String> getAllActiveEmails() {
        return residentRepository.findByIsActiveTrue().stream()
                .map(Resident::getEmail)
                .filter(email -> email != null && !email.isEmpty()) // Ignore residents without email
                .collect(Collectors.toList());
    }

    public List<Resident> getAllActiveResidents() {
        return residentRepository.findByIsActiveTrue();
    }
}