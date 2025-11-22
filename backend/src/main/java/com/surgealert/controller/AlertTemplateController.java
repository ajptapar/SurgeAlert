package com.surgealert.controller;

import com.surgealert.dto.AlertTemplateDTO;
import com.surgealert.entity.AlertTemplate;
import com.surgealert.repository.AlertTemplateRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/templates")
@CrossOrigin(origins = "*")
public class AlertTemplateController {

    private final AlertTemplateRepository repository;

    public AlertTemplateController(AlertTemplateRepository repository) {
        this.repository = repository;
    }

    // GET all templates (For Admin Dashboard)
    @GetMapping
    public ResponseEntity<List<AlertTemplateDTO>> getAllTemplates() {
        List<AlertTemplateDTO> templates = repository.findAll().stream()
                .map(t -> new AlertTemplateDTO(t.getId(), t.getAlertType(), t.getTemplate()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(templates);
    }

    // UPDATE a specific template (e.g., Update the RED Alert text)
    @PutMapping("/{alertType}")
    public ResponseEntity<?> updateTemplate(@PathVariable String alertType, @RequestBody AlertTemplateDTO dto) {
        AlertTemplate template = repository.findByAlertType(alertType.toUpperCase())
                .orElse(null);

        if (template == null) {
            return ResponseEntity.notFound().build();
        }

        template.setTemplate(dto.getTemplate());
        repository.save(template);

        return ResponseEntity.ok("Template updated successfully");
    }
}