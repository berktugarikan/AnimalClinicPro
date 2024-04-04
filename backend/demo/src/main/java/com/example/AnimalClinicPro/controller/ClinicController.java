package com.example.AnimalClinicPro.controller;
import com.example.AnimalClinicPro.dto.ClinicDto;
import com.example.AnimalClinicPro.dto.CreateClinicRequest;
import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {
    private final ClinicService clinicService;

    @Autowired
    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping
    public ResponseEntity<List<ClinicDto>> getAllClinics() {
        return ResponseEntity.ok(clinicService.getAllClinics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicDto> getClinicById(@PathVariable Long id) {
        return ResponseEntity.ok(clinicService.getClinicById(id));
    }

    @GetMapping("/name/{clinicName}")
    public ResponseEntity<ClinicDto> getClinicByClinicName(@PathVariable String clinicName) {
        return ResponseEntity.ok(clinicService.getClinicByClinicName(clinicName));
    }

    @PostMapping
    public ResponseEntity<Void> createClinic(@RequestBody CreateClinicRequest request) {
        clinicService.createClinic(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinic(@PathVariable Long id) {
        clinicService.deleteClinic(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
