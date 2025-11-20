package com.surgealert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync; // IMPORT THIS
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync // ADD THIS LINE
public class SurgeAlertApplication {
    public static void main(String[] args) {
        SpringApplication.run(SurgeAlertApplication.class, args);
    }
}