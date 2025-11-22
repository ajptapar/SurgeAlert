package com.surgealert.repository;

import com.surgealert.entity.AlertTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AlertTemplateRepository extends JpaRepository<AlertTemplate, Long> {
    Optional<AlertTemplate> findByAlertType(String alertType);
}