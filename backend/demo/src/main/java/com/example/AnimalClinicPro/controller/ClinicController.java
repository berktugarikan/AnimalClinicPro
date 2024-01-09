package com.example.AnimalClinicPro.controller;

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
    public ResponseEntity<List<Clinic>> getAllClinics() {
        List<Clinic> clinics = clinicService.getAllClinics();
        return new ResponseEntity<>(clinics, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clinic> getClinicById(@PathVariable Long id) {
        Clinic clinic = clinicService.getClinicById(id);
        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

    @GetMapping("/name/{clinicName}")
    public ResponseEntity<Clinic> getClinicByClinicName(@PathVariable String clinicName) {
        Clinic clinic = clinicService.getClinicByClinicName(clinicName);
        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Clinic> createClinic(@RequestBody Clinic clinic) {
        Clinic createdClinic = clinicService.createClinic(clinic);
        return new ResponseEntity<>(createdClinic, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinic(@PathVariable Long id) {
        clinicService.deleteClinic(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
